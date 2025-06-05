interface HandlebarsContext {
  [key: string]: unknown;
}

// Сравнение
export function eq(a: unknown, b: unknown): boolean {
  return a === b;
}

export function neq(a: unknown, b: unknown): boolean {
  return a !== b;
}

// Логические операторы
export function and(...args: unknown[]): boolean {
  // Последний аргумент — это объект опций Handlebars, его игнорируем
  const values = args.slice(0, -1);
  return values.every((v) => Boolean(v));
}

export function or(...args: unknown[]): boolean {
  // Последний аргумент — это объект опций Handlebars, его игнорируем
  const values = args.slice(0, -1);
  return values.some((v) => Boolean(v));
}

export function not(value: unknown): boolean {
  return !value;
}

// Присваивание
export function assign(
  this: HandlebarsContext,
  key: string,
  value: unknown,
): string {
  this[key] = value;
  return '';
}

// Работа с массивами
export function array(...args: unknown[]): unknown[] {
  // Последний аргумент — объект опций Handlebars, его отбрасываем
  return args.slice(0, -1);
}

export function push(
  this: HandlebarsContext,
  arr: unknown[],
  item: unknown,
): string {
  if (Array.isArray(arr)) {
    arr.push(item);
  }
  return '';
}

export function join(arr: unknown[], separator = ''): string {
  return Array.isArray(arr) ? arr.join(separator) : '';
}

// Работа со строками
export function concat(...args: unknown[]): string {
  // Последний аргумент — объект опций Handlebars, его игнорируем
  const values = args.slice(0, -1).map((v) => String(v));
  return values.join('');
}

export function capitalize(str: unknown): string {
  if (typeof str === 'string' && str.length > 0) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  return '';
}

// Безопасный доступ к ключу объекта
export function lookup(
  obj: Record<string, unknown> | null | undefined,
  key: string,
): unknown {
  return obj?.[key];
}

// Условие по умолчанию
export function defaultValue<T>(value: T | null | undefined, defaultVal: T): T {
  return value != null ? value : defaultVal;
}

export function objectHelper(...args: unknown[]): Record<string, unknown> {
  const out: Record<string, unknown> = {};
  // Последний аргумент — объект опций Handlebars, его отбрасываем
  const params = args.slice(0, -1);
  for (let i = 0; i < params.length; i += 2) {
    const key = params[i] as string;
    const value = params[i + 1];
    if (typeof key === 'string') {
      out[key] = value;
    }
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
  object: objectHelper,
};
