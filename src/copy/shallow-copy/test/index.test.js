import { describe, test, expect } from "vitest";
import { shallowCopy1, shallowCopy2, shallowCopy3 } from "../index";

describe("shallow copy", () => {
  const target = {
    name: "lll",
    age: 111,
  };

  test("测试copy值类型", () => {
    const target = 1;

    let result = shallowCopy1(target);

    result = 2;

    expect(result).toBe(2);

    expect(target).toBe(1);
  });

  test("测试copy1之后的结果", () => {
    const target1 = shallowCopy1(target);

    target1.name = "jjj";

    expect(target1.name).toEqual("jjj");

    expect(target.name).toEqual("lll");
  });

  test("测试copy2之后的结果", () => {
    const target2 = shallowCopy2(target);

    target2.age = 222;

    expect(target2.age).toEqual(222);

    expect(target.age).toEqual(111);
  });

  test("测试copy3之后的结果", () => {
    const target3 = shallowCopy3(target);

    target3.name = "vvv";
    target3.age = 333;

    expect(target3.age).toEqual(333);
    expect(target.age).toEqual(111);

    expect(target3.name).toEqual("vvv");
    expect(target.name).toEqual("lll");
  });
});
