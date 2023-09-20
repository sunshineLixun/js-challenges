const objectToString = Object.prototype.toString;

const toTypeString = (value) => objectToString.call(value);

export const isObject = (value) => typeof value === "object";

export const isPlainObject = (obj) => toTypeString(obj) === "[object Object]";

export const isMap = (map) => toTypeString(map) === "[object Map]";

export const isWeakMap = (map) => toTypeString(map) === "[object WeakMap]";

export const isSet = (set) => toTypeString(set) === "[object Set]";

export const isWeakSet = (set) => toTypeString(set) === "[object WeakSet]";

export const isFunction = (func) => typeof func === "function";

export const isArray = (arr) => Array.isArray(arr);

export const isSymobl = (value) => typeof value === "symbol";
