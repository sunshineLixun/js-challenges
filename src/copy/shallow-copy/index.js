export function shallowCopy1(target) {
  return Object.assign({}, target);
}

export function shallowCopy2(target) {
  return { ...target };
}

export function shallowCopy3(target) {
  const result = {};

  for (const key in target) {
    result[key] = target[key];
  }

  return result;
}
