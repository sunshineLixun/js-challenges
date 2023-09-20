import { describe, test, expect } from "vitest";
import {
  isObject,
  isPlainObject,
  isArray,
  isFunction,
  isMap,
  isWeakMap,
  isSet,
  isWeakSet,
  isSymobl,
} from "../general";

describe("test", () => {
  test("isObject", () => {
    const obj = {
      setName() {},
      [Symbol(`1`)]: "1",
    };

    const arr = [];

    expect(isObject(obj)).toBeTruthy();

    expect(isObject(arr)).toBeTruthy();
  });

  test("isPlainObject", () => {
    const obj = {
      setName() {},
      [Symbol(`1`)]: "1",
    };

    const arr = [];

    expect(isPlainObject(obj)).toBeTruthy();

    expect(isPlainObject(arr)).toBeFalsy();
  });

  test("isArray", () => {
    const arr = [];

    expect(isArray(arr)).toBeTruthy();

    expect(isObject(arr)).toBeTruthy();
  });

  test("isFunction", () => {
    const setName = () => {};

    function setAge() {}

    expect(isFunction(setName)).toBe(true);

    expect(isFunction(setAge)).toBe(true);
  });

  test("isMap or isWeakMap", () => {
    const record = new Map([[1, "one"]]);

    const weakRecord = new WeakMap([[{}, "one"]]);

    expect(isMap(record)).toBe(true);

    expect(isWeakMap(weakRecord)).toBe(true);
  });

  test("isSet or isWeakSet", () => {
    const record = new Set([[1, "one"]]);

    const weakRecord = new WeakSet([[{}, "one"]]);

    expect(isSet(record)).toBe(true);

    expect(isWeakSet(weakRecord)).toBe(true);
  });

  test("isSymobl", () => {
    const sym = Symbol();

    const sym1 = Symbol("111");

    expect(isSymobl(sym)).toBe(true);
    expect(isSymobl(sym1)).toBe(true);
  });
});
