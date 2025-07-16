import { expect } from 'chai';
import sinon from 'sinon';
import { Router } from './router';
import { type BaseProps, Block } from '../block';
import { Route } from '../route';
import { ROUTES } from '../../utils';

class TestBlock extends Block<BaseProps> {
  constructor(props = {}) {
    super('div', props);
  }

  init(): void {}
  componentDidMount(): void {}
  componentDidUpdate(): boolean {
    return true;
  }
  componentWillUnmount(): void {}
  render(): string {
    return '<span>{{foo}}</span>';
  }
}

describe('Router', () => {
  let router: Router;

  beforeEach(() => {
    // Сброс singleton: Reflect.set обходит private-ограничения без any
    Reflect.set(Router, '__instance', null);
    router = new Router('#app');
  });

  afterEach(() => {
    sinon.restore();
  });

  it('getInstance() should throw if router is not yet initialized', () => {
    Reflect.set(Router, '__instance', null);
    expect(() => Router.getInstance()).to.throw(
      'Router ещё не инициализирован',
    );
  });

  it('constructor always returns the same instance', () => {
    const r1 = new Router('#foo');
    const r2 = new Router('#bar');
    expect(r1).to.equal(r2);
  });

  it('use() registers a route and getRoute() returns it', () => {
    router.use('/path', TestBlock, { foo: 'bar' });
    const route = router.getRoute('/path');
    expect(route).to.exist;
    // по контракту Route.match должен возвращать true на ровное совпадение
    expect(route!.match('/path')).to.be.true;
  });

  describe('History API integration', () => {
    let pushSpy: sinon.SinonSpy;
    let renderSpy: sinon.SinonSpy;
    let backSpy: sinon.SinonSpy;
    let forwardSpy: sinon.SinonSpy;

    beforeEach(() => {
      pushSpy = sinon.spy(window.history, 'pushState');
      backSpy = sinon.spy(window.history, 'back');
      forwardSpy = sinon.spy(window.history, 'forward');
      renderSpy = sinon.spy(Route.prototype, 'render');

      router.use(ROUTES.MESSENGER, TestBlock).use(ROUTES.SIGN_IN, TestBlock);
    });

    it('go() should call pushState and render the correct route', () => {
      router.go(ROUTES.MESSENGER);
      expect(pushSpy.calledOnceWith({}, '', ROUTES.MESSENGER)).to.be.true;
      expect(renderSpy.calledOnce).to.be.true;
    });

    it('back() and forward() should invoke history methods', () => {
      router.back();
      router.forward();
      expect(backSpy.calledOnce).to.be.true;
      expect(forwardSpy.calledOnce).to.be.true;
    });
  });
});
