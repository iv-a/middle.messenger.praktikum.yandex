import { BaseProps, Block } from './block';

export type GuardFn = () => boolean;

export type RouteProps<P extends BaseProps = BaseProps> = {
  rootQuery: string;
} & P;

export type BlockClass<P extends BaseProps = BaseProps> = new (
  props: P,
) => Block<P>;

export interface IRoute {
  match(pathname: string): boolean;
  isAllowed(): boolean;
  leave(): void;
  render(): void;
}

export class Route<P extends BaseProps = BaseProps> implements IRoute {
  private _pathname: string;
  private _blockClass: BlockClass<P>;
  private _block: Block<P> | null;
  private _guard?: GuardFn;
  private _props: RouteProps<P>;

  constructor(
    pathname: string,
    view: BlockClass<P>,
    props: RouteProps<P>,
    guard?: GuardFn,
  ) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
    this._guard = guard;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return this._pathname === pathname;
  }

  isAllowed(): boolean {
    return this._guard ? this._guard() : true;
  }

  private _renderDom(rootQuery: string, block: Block<P>) {
    const root = document.querySelector(rootQuery);
    if (!root) {
      throw new Error(`Root not found: ${this._props.rootQuery}`);
    }

    root.innerHTML = '';
    root.appendChild(block.getContent());
  }

  render() {
    if (!this.isAllowed()) return;

    if (!this._block) {
      const { rootQuery, ...rest } = this._props;
      const props = rest as unknown as P;
      this._block = new this._blockClass(props);
    }

    this._renderDom(this._props.rootQuery, this._block);
    this._block.dispatchComponentDidMount();
    this._block.show();
  }
}
