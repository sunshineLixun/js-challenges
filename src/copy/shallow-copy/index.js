import { isPlainObject } from "../../utils/general";

export function shallowCopy1(target) {
  if (!isPlainObject(target)) {
    return target;
  }

  return Object.assign({}, target);
}

export function shallowCopy2(target) {
  if (!isPlainObject(target)) {
    return target;
  }
  return { ...target };
}

export function shallowCopy3(target) {
  if (!isPlainObject(target)) {
    return target;
  }

  const result = {};

  for (const key in target) {
    result[key] = target[key];
  }

  return result;
}
