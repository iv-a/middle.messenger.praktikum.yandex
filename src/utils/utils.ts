import Handlebars, { type HelperDelegate } from 'handlebars';
import { Indexed, PartialComponent } from '../types';

export const registerHelpers = (helpers: Record<string, HelperDelegate>) => {
  Object.entries(helpers).forEach(([name, helper]) => {
    Handlebars.registerHelper(name, helper);
  });
};

export const registerPartialComponents = (
  partials: Record<string, PartialComponent>,
) => {
  Object.entries(partials).forEach(([name, { Component }]) => {
    Handlebars.registerPartial(name, Component);
  });
};

export const registerPartials = (partials: Record<string, string>) => {
  Object.entries(partials).forEach(([name, partial]) => {
    Handlebars.registerPartial(name, partial);
  });
};

export const trim = (str: string, chars: string = ' ') => {
  const exclude = new Set(chars.split(''));

  let start = 0;
  let end = str.length - 1;

  while (start <= end && exclude.has(str[start])) start++;
  while (end >= start && exclude.has(str[end])) end--;

  return str.slice(start, end + 1);
};

export const merge = (lhs: Indexed, rhs: Indexed): Indexed => {
  if (typeof lhs !== 'object' || lhs === null) return rhs;
  if (typeof rhs !== 'object' || rhs === null) return lhs;

  const result: Indexed = {};

  for (const key in lhs) {
    if (Object.prototype.hasOwnProperty.call(rhs, key)) {
      const lhsVal = lhs[key];
      const rhsVal = rhs[key];

      if (
        typeof lhsVal === 'object' &&
        lhsVal !== null &&
        typeof rhsVal === 'object' &&
        rhsVal !== null
      ) {
        result[key] = merge(lhsVal as Indexed, rhsVal as Indexed);
      } else {
        result[key] = lhsVal;
      }
    } else {
      result[key] = lhs[key];
    }
  }

  for (const key in rhs) {
    if (!Object.prototype.hasOwnProperty.call(lhs, key)) {
      result[key] = rhs[key];
    }
  }

  return result;
};

export const set = <T = unknown>(
  object: Indexed<T> | unknown,
  path: string,
  value: T,
): Indexed<T> | unknown => {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const result = path
    .split('.')
    .reduceRight<
      Indexed<T>
    >((acc, key) => ({ [key]: acc }), value as Indexed<T>);

  return merge(object as Indexed<T>, result);
};

export const isArray = (value: unknown): value is unknown[] => {
  return Array.isArray(value);
};

export type PlainObject<T = unknown> = {
  [k: string]: T;
};

export const isPlainObject = (value: unknown): value is PlainObject => {
  return (
    typeof value === 'object' &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === '[object Object]'
  );
};

export const isArrayOrObject = (
  value: unknown,
): value is unknown[] | PlainObject => {
  return isPlainObject(value) || isArray(value);
};

export const isEqual = (
  lhs: PlainObject<unknown>,
  rhs: PlainObject<unknown>,
): boolean => {
  const lhsKeys = Object.keys(lhs);
  const rhsKeys = Object.keys(rhs);

  if (lhsKeys.length !== rhsKeys.length) {
    return false;
  }

  for (const key of lhsKeys) {
    const leftValue = lhs[key];
    const rightValue = rhs[key];

    const bothAreObjects =
      isArrayOrObject(leftValue) && isArrayOrObject(rightValue);

    if (bothAreObjects) {
      if (!isEqual(leftValue as PlainObject, rightValue as PlainObject)) {
        return false;
      }
    } else if (leftValue !== rightValue) {
      return false;
    }
  }

  return true;
};
