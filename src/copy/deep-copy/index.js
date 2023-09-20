import {
  isPlainObject,
  isArray,
  isFunction,
  isSymobl,
  isSet,
  isMap,
  isWeakMap,
  isWeakSet,
} from "../../utils/general";

export function deepCopy(origin) {
  if (isSymobl(origin)) {
    return Symbol(origin.description);
  }

  if (isFunction(origin)) {
    return origin;
  }

  if (isArray(origin)) {
    return origin.map((item) => deepCopy(item));
  }

  if (!isPlainObject(origin)) {
    return origin;
  }

  const target = {};

  Object.keys(origin).forEach((key) => {
    const value = origin[key];

    if (isSet(value)) {
      let sets = [];
      for (const _value of value.values()) {
        sets.push(deepCopy(_value));
        target[key] = new Set(sets);
      }
    } else {
      target[key] = deepCopy(value);
    }
  });

  Object.getOwnPropertySymbols(origin).forEach((key) => {
    target[key] = deepCopy(origin[key]);
  });

  return target;
}
