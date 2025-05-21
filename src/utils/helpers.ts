interface HandlebarsContext {
    [key: string]: any;
}

function isEqual(argA: unknown, argB: unknown) {
    return argA === argB
}

function assign(this: HandlebarsContext, propertyName: string, value: unknown) {
    this[propertyName] = value;
}

function createArray(this: HandlebarsContext, ...items: unknown[]) {
    const args = items.slice(0, -1);
    return args;
}

function push(this: HandlebarsContext, arr: any[], item: unknown) {
    if (Array.isArray(arr)) {
        arr.push(item);
    }
    return '';
}

function join(this: HandlebarsContext, arr: unknown[], separator: string = '') {
    if (Array.isArray(arr)) {
        return arr.join(separator);
    }
    return '';
}

export const HELPERS = {
    eq: isEqual,
    assign: assign,
    array: createArray,
    push: push,
    join: join,
};

