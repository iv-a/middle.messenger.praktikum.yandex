// interface HandlebarsContext {
//     [key: string]: any;
// }

// function isEqual(argA: unknown, argB: unknown) {
//     return argA === argB
// }

// function assign(this: HandlebarsContext, propertyName: string, value: unknown) {
//     this[propertyName] = value;
// }

// function createArray(this: HandlebarsContext, ...items: unknown[]) {
//     const args = items.slice(0, -1);
//     return args;
// }

// function push(this: HandlebarsContext, arr: any[], item: unknown) {
//     if (Array.isArray(arr)) {
//         arr.push(item);
//     }
//     return '';
// }

// function join(this: HandlebarsContext, arr: unknown[], separator: string = '') {
//     if (Array.isArray(arr)) {
//         return arr.join(separator);
//     }
//     return '';
// }

// export const HELPERS = {
//     eq: isEqual,
//     assign: assign,
//     array: createArray,
//     push: push,
//     join: join,
// };

interface HandlebarsContext {
  [key: string]: any;
}

// Сравнение
function eq(a: unknown, b: unknown): boolean {
  return a === b;
}

function neq(a: unknown, b: unknown): boolean {
  return a !== b;
}

// Логические операторы
function and(...args: any[]): boolean {
  args.pop();
  return args.every(Boolean);
}

function or(...args: any[]): boolean {
  args.pop();
  return args.some(Boolean);
}

function not(value: unknown): boolean {
  return !value;
}

// Присваивание
function assign(this: HandlebarsContext, key: string, value: unknown): string {
  this[key] = value;
  return '';
}

// Работа с массивами
function array(...args: unknown[]): unknown[] {
  return args.slice(0, -1); // последний аргумент — Handlebars options
}

function push(this: HandlebarsContext, arr: any[], item: unknown): string {
  if (Array.isArray(arr)) {
    arr.push(item);
  }
  return '';
}

function join(arr: unknown[], separator = ''): string {
  return Array.isArray(arr) ? arr.join(separator) : '';
}

// Работа со строками
function concat(...args: any[]): string {
  args.pop();
  return args.join('');
}

function capitalize(str: string): string {
  return typeof str === 'string' && str.length > 0
    ? str.charAt(0).toUpperCase() + str.slice(1)
    : str;
}

// Безопасный доступ к ключу объекта
function lookup(obj: any, key: string): any {
  return obj?.[key];
}

// Условие по умолчанию
function defaultValue(value: any, defaultVal: any): any {
  return value != null ? value : defaultVal;
}

function objectHelper(...args: any[]) {
  const out: Record<string, any> = {};
  const params = args.slice(0, -1); // без options
  for (let i = 0; i < params.length; i += 2) {
    out[params[i]] = params[i + 1];
  }
  return out;
}

export const HELPERS = {
  eq,
  neq,
  and,
  or,
  not,

  assign,
  array,
  push,
  join,

  concat,
  capitalize,
  lookup,
  default: defaultValue,
  object: objectHelper
};