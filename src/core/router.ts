import { ROUTES } from '../utils/constants';
import { BaseProps } from './block';
import { BlockClass, GuardFn, IRoute, Route } from './route';

export class Router {
  private static __instance: Router | null = null;

  private _routes: Array<IRoute> = [];
  private _currentRoute: IRoute | null = null;
  private _history: History = window.history;
  private _rootQuery!: string;

  constructor(rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this._rootQuery = rootQuery;
    Router.__instance = this;
  }

  public use<P extends BaseProps = BaseProps>(
    pathname: string,
    blockClass: BlockClass<P>,
    props: P = {} as P,
    guard?: GuardFn,
  ): this {
    const routeProps = { ...props, rootQuery: this._rootQuery };
    const route = new Route<P>(pathname, blockClass, routeProps, guard);
    this._routes.push(route);
    return this;
  }

  public start(): void {
    window.onpopstate = (event: PopStateEvent) => {
      // console.log(event);

      this._onRoute((event.currentTarget as Window).location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);

    if (!route) {
      const notFoundRoute = this.getRoute(ROUTES.NOT_FOUND);
      if (notFoundRoute) {
        this._onRoute(ROUTES.NOT_FOUND);
      }
      return;
    }

    if (!route.isAllowed()) {
      const signInRoute = this.getRoute(ROUTES.SIGN_IN);
      if (signInRoute) {
        this.go(ROUTES.SIGN_IN);
      } else if (this.getRoute(ROUTES.NOT_ALLOWED)) {
        this._onRoute(ROUTES.NOT_ALLOWED);
      }
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;
    route.render();
  }

  public go(pathname: string): void {
    this._history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  public back(): void {
    this._history.back();
  }

  public forward(): void {
    this._history.forward();
  }

  public getRoute(pathname: string) {
    return this._routes.find((route) => route.match(pathname));
  }

  public static getInstance(): Router {
    if (!Router.__instance) {
      throw new Error(
        'Router ещё не инициализирован. Сначала вызовите new Router(rootQuery).',
      );
    }
    return Router.__instance;
  }
}
