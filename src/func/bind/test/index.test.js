import { describe, test, expect, vi } from "vitest";
import "../index";

describe("func bind", () => {
  const obj = {
    name: "lll",
    age: 11,
  };

  const params = {
    test: true,
  };

  test("equal return this", () => {
    const fn = vi.fn(function () {
      return this;
    });
    const fn2 = fn.myBind(obj);
    expect(fn2()).toStrictEqual(obj);
  });

  test("test func args", () => {
    const fn = vi.fn((arg) => arg);
    const fn2 = fn.myBind(obj, params);
    expect(fn2()).toStrictEqual(params);
  });
});
