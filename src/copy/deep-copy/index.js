import {
  isPlainObject,
  isArray,
  isFunction,
  isSymobl,
  isSet,
  isMap,
  isWeakMap,
} from "../../utils/general";

export function deepCopy(origin, map = new WeakMap()) {
  if (isSymobl(origin)) {
    return Symbol(origin.description);
  }

  if (isFunction(origin)) {
    return origin;
  }

  if (isArray(origin)) {
    return origin.map((item) => deepCopy(item, map));
  }

  if (!isPlainObject(origin)) {
    return origin;
  }

  if (map.has(origin)) {
    // 存在原始对象，就返回
    return map.get(origin);
  }

  const target = {};

  // 用属性关联原始对象
  map.set(origin, target);

  Object.keys(origin).forEach((key) => {
    const value = origin[key];

    if (isSet(value)) {
      const sets = [];
      for (const _value of value) {
        sets.push(deepCopy(_value, map));
        target[key] = new Set(sets);
      }
    } else if (isMap(value)) {
      const maps = [];
      for (const _value of value) {
        maps.push(deepCopy(_value, map));
        target[key] = new Map(maps);
      }
    } else {
      target[key] = deepCopy(value, map);
    }
  });

  Object.getOwnPropertySymbols(origin).forEach((key) => {
    target[key] = deepCopy(origin[key], map);
  });

  return target;
}
