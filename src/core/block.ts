import { EventBus } from './event-bus';

type Props = Record<string, unknown> & {
  className?: string;
  attr?: Record<string, string>;
  events?: Record<string, EventListener>;
};
type Children = Record<string, Block | Array<Block>>;
type PropsWithChildren = Props & Children;

export abstract class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  } as const;

  private readonly _eventBus: EventBus<typeof Block.EVENTS>;
  private _element: HTMLElement | null = null;
  private _id: string;
  private readonly tagName: string;

  public props: Props;
  public children: Children;
  // ???

  constructor(tagName: string, propsWithChildren: PropsWithChildren) {
    const eventBus = new EventBus<typeof Block.EVENTS>();
    this._eventBus = eventBus;

    const { children, props } = this._getChildrenAndProps(propsWithChildren);

    this.tagName = tagName;
    this.props = this._makePropsProxy(props);
    this.children = children;

    this._id = crypto.randomUUID();

    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus<typeof Block.EVENTS>) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _getChildrenAndProps(propsWithChildren: PropsWithChildren): {
    props: Props;
    children: Children;
  } {
    const props: Props = {};
    const children: Children = {};

    for (const key in propsWithChildren) {
      if (Object.prototype.hasOwnProperty.call(propsWithChildren, key)) {
        const value = propsWithChildren[key];

        if (
          value instanceof Block ||
          (Array.isArray(value) && value.every((item) => item instanceof Block))
        ) {
          children[key] = value;
        } else {
          props[key] = value;
        }
      }
    }

    return {
      props,
      children,
    };
  }

  private _createResources() {
    const props = this.props;
    const tagName = this.tagName;

    this._element = document.createElement(tagName);

    if (typeof props.className === 'string') {
      const classes = props.className.split(' ');
      this._element.classList.add(...classes);
    }

    if (typeof props.attr === 'object' && props.attr !== null) {
      for (const attributeName in props.attr) {
        if (Object.prototype.hasOwnProperty.call(props.attr, attributeName)) {
          const attributeValue = props.attr[attributeName];
          this._element.setAttribute(attributeName, attributeValue);
        }
      }
    }
  }

  private _makePropsProxy(props: Props) {
    const self = this;
    return new Proxy(props, {
      get(target, p, receiver) {
        const value = Reflect.get(target, p, receiver);
        return typeof value === 'function' ? value.bind(target) : value;
      },

      set(target, p, value, receiver) {
        const oldTarget = { ...target };
        const result = Reflect.set(target, p, value, receiver);
        self._eventBus.emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return result;
      },

      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  public setProps(nextProps: Partial<Props>) {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  }

  public getContent(): HTMLElement {
    if (!this._element) {
      throw new Error('Элемент не создан');
    }
    return this._element;
  }

  private _addEvents() {
    const events = this.props.events ?? {};
    Object.entries(events).forEach(([event, handler]) => {
      this._element?.addEventListener(event, handler);
    });
  }

  private _removeEvents() {
    const events = this.props.events ?? {};
    Object.entries(events).forEach(([event, handler]) => {
      this._element?.removeEventListener(event, handler);
    });
  }

  private _compile(): DocumentFragment {
    const propsAndStubs = { ...this.props };
    const children = this.children;

    for (const key in children) {
      const child = children[key];

      if (Array.isArray(child)) {
        propsAndStubs[key] = child
          .map((c) => `<div data-id="${c._id}"></div>`)
          .join('');
      } else {
        propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
      }
    }

    const html = Handlebars.compile(this.render())(propsAndStubs);
    const template = document.createElement('template');
    template.innerHTML = html;

    for (const key in children) {
      const child = children[key];

      if (Array.isArray(child)) {
        child.forEach((c) => {
          const stub = template.content.querySelector(`[data-id="${c._id}"]`);
          if (stub) {
            stub.replaceWith(c.getContent());
          }
        });
      } else {
        const stub = template.content.querySelector(`[data-id="${child._id}"]`);
        if (stub) stub.replaceWith(child.getContent());
      }
    }

    return template.content;
  }

  private _init() {
    this.init();
    this._createResources();
    this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount(): void {
    this.componentDidMount();
  }
  private _componentDidUpdate(oldProps: Props, newProps: Props): void {
    const shouldUpdate = this.componentDidUpdate(oldProps, newProps);
    if (shouldUpdate) {
      this._eventBus.emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  private _render() {
    const fragment = this._compile();
    this._removeEvents();

    if (this._element?.children.length === 0) {
      this._element.appendChild(fragment);
    } else {
      this._element?.replaceChildren(fragment);
    }

    this._addEvents();
  }

  protected init(): void {}
  protected componentDidMount(): void {}
  protected componentDidUpdate(_oldProps: Props, _newProps: Props): boolean {
    return true;
  }
  protected abstract render(): string;
}
