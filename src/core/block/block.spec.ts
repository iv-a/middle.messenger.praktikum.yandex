import { expect } from 'chai';
import sinon from 'sinon';
import { type BaseProps, Block } from './block';

class TestBlock extends Block<BaseProps & { foo?: string }> {
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
    return `<span>{{foo}}</span>`;
  }
}

describe('Block (abstract) — basic behavior', () => {
  let block: TestBlock;
  let spyInit: sinon.SinonSpy;
  let spyRender: sinon.SinonSpy;
  let spyCDM: sinon.SinonSpy;
  let spyCDU: sinon.SinonSpy;
  let spyCWU: sinon.SinonSpy;

  beforeEach(() => {
    sinon.restore();

    spyInit = sinon.spy(TestBlock.prototype, 'init');
    spyRender = sinon.spy(TestBlock.prototype, 'render');
    spyCDM = sinon.spy(TestBlock.prototype, 'componentDidMount');
    spyCDU = sinon.spy(TestBlock.prototype, 'componentDidUpdate');
    spyCWU = sinon.spy(TestBlock.prototype, 'componentWillUnmount');

    block = new TestBlock({
      foo: 'bar',
      className: 'cls',
      attrs: { 'data-test': 'ok' },
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should call init and render once on creation', () => {
    expect(spyInit.calledOnce).to.be.true;
    expect(spyRender.calledOnce).to.be.true;

    const el = block.getContent();
    expect(el.tagName).to.equal('DIV');
    expect(el.classList.contains('cls')).to.be.true;
    expect(el.getAttribute('data-test')).to.equal('ok');
  });

  it('dispatchComponentDidMount should call componentDidMount once', (done) => {
    setTimeout(() => {
      expect(spyCDM.calledOnce).to.be.true;
      done();
    }, 10);
  });

  it('should call componentDidUpdate and update DOM when props change via setProps', () => {
    const spanBefore = block.getContent().querySelector('span')!;
    expect(spanBefore.textContent).to.equal('bar');

    block.setProps({ foo: 'baz' });

    expect(spyCDU.calledOnce).to.be.true;

    const spanAfter = block.getContent().querySelector('span')!;
    expect(spanAfter.textContent).to.equal('baz');
  });

  it('hide and show should control display style', () => {
    block.hide();
    expect(block.getContent().style.display).to.equal('none');
    block.show();
    expect(block.getContent().style.display).to.equal('flex');
  });

  it('destroy should clean up events and call componentWillUnmount', () => {
    block.destroy();
    expect(spyCWU.calledOnce).to.be.true;
    expect(() => block.getContent()).to.throw('Элемент не создан');
  });
});
