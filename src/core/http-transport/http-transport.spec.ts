import { expect } from 'chai';

import sinon from 'sinon';

import { queryStringify } from './http-transport';

describe('queryStringify', () => {
  let encodeSpy: sinon.SinonSpy;

  beforeEach(() => {
    encodeSpy = sinon.spy(global, 'encodeURIComponent' as any);
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should throw an error if params is not a non-null object', () => {
    // @ts-expect-error намеренно некорректный тип
    expect(() => queryStringify(null)).to.throw(
      'Data for queryStringify must be a non-null object',
    );
    // @ts-expect-error
    expect(() => queryStringify(123)).to.throw(
      'Data for queryStringify must be a non-null object',
    );
  });

  it('should return an empty string for empty object or all null/undefined values', () => {
    expect(queryStringify({})).to.equal('');
    expect(queryStringify({ a: null, b: undefined })).to.equal('');
  });

  it('should build query string for simple parameters', () => {
    const result = queryStringify({ foo: 'bar', baz: 123 });
    expect(result).to.equal('?foo=bar&baz=123');

    expect(encodeSpy.callCount).to.equal(4);
  });

  it('should encode special characters in keys and values', () => {
    const result = queryStringify({ 'a b': 'c d', '%': '?' });
    expect(result).to.equal('?a%20b=c%20d&%25=%3F');
    expect(encodeSpy.calledWith('a b')).to.be.true;
    expect(encodeSpy.calledWith('c d')).to.be.true;
    expect(encodeSpy.calledWith('%')).to.be.true;
    expect(encodeSpy.calledWith('?')).to.be.true;
  });

  it('should skip null and undefined but include other falsy values', () => {
    const params = {
      skipNull: null,
      skipUndef: undefined,
      includeZero: 0,
      includeFalse: false,
      includeEmpty: '',
    };
    const result = queryStringify(params);
    expect(result).to.equal('?includeZero=0&includeFalse=false&includeEmpty=');
  });

  it('should stringify nested objects via String()', () => {
    const result = queryStringify({ nested: { x: 1 } });

    expect(result).to.equal('?nested=%5Bobject%20Object%5D');
  });
});
