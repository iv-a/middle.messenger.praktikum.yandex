// core/block.ts
import Handlebars from 'handlebars';
import { EventBus } from './event-bus';

type TypedEventCallback<Args extends unknown[]> = (
  ...args: Args
) => void | Promise<void>;

const EVENTS_CONFIG = {
  INIT: 'init',
  FLOW_CDM: 'flow:component-did-mount',
  FLOW_CDU: 'flow:component-did-update',
  FLOW_RENDER: 'flow:render',
} as const;

export type BlockEventSignatures = {
  [EVENTS_CONFIG.INIT]: [];
  [EVENTS_CONFIG.FLOW_CDM]: [];
  [EVENTS_CONFIG.FLOW_CDU]: [
    oldProps: Record<string, unknown>,
    newProps: Record<string, unknown>
  ];
  [EVENTS_CONFIG.FLOW_RENDER]: [];
};

type BaseProps = {
  className?: string;
  attrs?: Record<string, string>;
  events?: Record<string, EventListener>;
} & Record<string, unknown>;

type Children = Record<string, Block<any> | Block<any>[]>;

export abstract class Block<P extends BaseProps> {
  static EVENTS = EVENTS_CONFIG;

  private _eventBus: EventBus<BlockEventSignatures>;
  private _element: HTMLElement | null = null;
  private _id: string;
  private _mounted: boolean = false;
  private readonly tagName: string;
  private readonly _templateFn: Handlebars.TemplateDelegate;

  public props: P;
  public children: Children;

  constructor(tagName: string, propsWithChildren: P) {
    this._id = crypto.randomUUID();
    this.tagName = tagName;

    const eventBus = new EventBus<BlockEventSignatures>();
    this._eventBus = eventBus;

    const { props, children } = this._getChildrenAndProps(propsWithChildren);
    this.props = this._makePropsProxy(props as P) as P;
    this.children = children;

    // Компилируем шаблон (строку, которую вернёт render()) в функцию
    this._templateFn = Handlebars.compile(this.render());

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _getChildrenAndProps(propsWithChildren: P): {
    props: Partial<P>;
    children: Children;
  } {
    const props: Partial<P> = {};
    const children: Children = {};

    for (const key in propsWithChildren) {
      if (!Object.prototype.hasOwnProperty.call(propsWithChildren, key))
        continue;
      const value = propsWithChildren[key];
      if (
        value instanceof Block ||
        (Array.isArray(value) && value.every((item) => item instanceof Block))
      ) {
        children[key] = value as Block<any> | Block<any>[];
      } else {
        props[key] = value;
      }
    }
    return { props, children };
  }

  private _makePropsProxy(props: Partial<P>): Partial<P> {
    const self = this;
    return new Proxy(props, {
      get(target, prop, receiver) {
        const value = Reflect.get(target, prop, receiver);
        return typeof value === 'function'
          ? (value as Function).bind(target)
          : value;
      },
      set(target, prop, value, receiver) {
        const prev = (target as any)[prop as string];
        if (prev === value) return true;
        const oldTarget = { ...(target as object) };
        const result = Reflect.set(target, prop, value, receiver);
        self._eventBus.emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return result;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  private _registerEvents(eventBus: EventBus<BlockEventSignatures>) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _init(): void {
    this._createResources();
    this.init();
    this._render();
    setTimeout(() => this.dispatchComponentDidMount(), 0);
  }

  private _componentDidMount(): void {
    this.componentDidMount();
  }

  private _componentDidUpdate(
    oldProps: Record<string, unknown>,
    newProps: Record<string, unknown>
  ) {
    const shouldUpdate = this.componentDidUpdate(oldProps as P, newProps as P);
    if (shouldUpdate) {
      this._render();
    }
  }

  private _render() {
    if (!this._element) return;

    // 1. Обновляем className и attrs (очищаем старые)
    this._element.className = '';
    if (typeof this.props.className === 'string') {
      this._element.classList.add(...this.props.className.split(' '));
    }
    Array.from(this._element.attributes).forEach((attr) => {
      if (attr.name !== 'class') {
        this._element!.removeAttribute(attr.name);
      }
    });
    if (typeof this.props.attrs === 'object' && this.props.attrs !== null) {
      for (const [attrName, attrValue] of Object.entries(this.props.attrs)) {
        this._element.setAttribute(attrName, attrValue);
      }
    }

    // 2. Снимаем события
    this._removeEvents();

    // 3. Генерируем новый контент с учётом children + контекста из getTemplateContext()
    const fragment = this._compile();
    this._element.replaceChildren(fragment);

    // 4. Вешаем события заново
    this._addEvents();
  }

  private _createResources() {
    this._element = document.createElement(this.tagName);
    if (typeof this.props.className === 'string') {
      this._element.classList.add(...this.props.className.split(' '));
    }
    if (typeof this.props.attrs === 'object' && this.props.attrs !== null) {
      for (const [attrName, attrValue] of Object.entries(this.props.attrs)) {
        this._element.setAttribute(attrName, attrValue);
      }
    }
  }

  private _compile(): DocumentFragment {
    // Формируем контекст: props + getTemplateContext()
    const propsAndStubs: Record<string, unknown> = {
      ...(this.props as object),
      ...this.getTemplateContext(),
    };

    // Заменяем children на заглушки <div data-id="..."></div>
    for (const key in this.children) {
      const child = this.children[key];
      if (Array.isArray(child)) {
        propsAndStubs[key] = child
          .map((c) => `<div data-id="${c._id}"></div>`)
          .join('');
      } else {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
      }
    }

    // Скомпилированный шаблон (this._templateFn) возвращает строку HTML
    const html = this._templateFn(propsAndStubs);
    const wrapper = document.createElement('template');
    wrapper.innerHTML = html;

    // Заменяем все заглушки на реальные дети
    for (const key in this.children) {
      const child = this.children[key];
      if (Array.isArray(child)) {
        child.forEach((c) => {
          const stub = wrapper.content.querySelector(`[data-id="${c._id}"]`);
          if (stub) {
            stub.replaceWith(c.getContent());
          }
        });
      } else {
        const stub = wrapper.content.querySelector(`[data-id="${child._id}"]`);
        if (stub) {
          stub.replaceWith(child.getContent());
        }
      }
    }

    return wrapper.content;
  }

  private _addEvents() {
    if (!this._element) return;
    const events = this.props.events ?? {};
    for (const [event, handler] of Object.entries(events)) {
      this._element.addEventListener(event, handler);
    }
  }

  private _removeEvents() {
    if (!this._element) return;
    const events = this.props.events ?? {};
    for (const [event, handler] of Object.entries(events)) {
      this._element.removeEventListener(event, handler);
    }
  }

  public getContent(): HTMLElement {
    if (!this._element) throw new Error('Элемент не создан');
    return this._element;
  }

  public setProps(nextProps: Partial<P>) {
    if (!nextProps) return;
    Object.assign(this.props, nextProps);
  }

  public dispatchComponentDidMount() {
    if (!this._mounted) {
      this._eventBus.emit(Block.EVENTS.FLOW_CDM);
      this._mounted = true;
    }
  }

  public hide() {
    this.getContent().style.display = 'none';
  }

  public show() {
    this.getContent().style.display = 'block';
  }

  public destroy() {
    this._removeEvents();
    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((c) => c.destroy && c.destroy());
      } else {
        child.destroy && child.destroy();
      }
    });
    // Очищаем EventBus и DOM
    this._eventBus = new EventBus<BlockEventSignatures>();
    this._element = null;
  }

  /**
   * Позволяет потомкам (Button, Card и т. д.) подмешать дополнительные поля
   * (например, CSS-модуль) в контекст шаблона. По умолчанию — пустой объект.
   */
  protected getTemplateContext(): Record<string, unknown> {
    return {};
  }

  protected init(): void {}
  protected componentDidMount(): void {}
  protected componentDidUpdate(_oldProps: P, _newProps: P): boolean {
    return true;
  }
  protected abstract render(): string;
}
