import { describe, test, expect } from "vitest";
import { deepCopy } from "../index";

describe("deepCopy", () => {
  function arrFunc() {}

  const arr = [
    1,
    2,
    {
      name: "1",
    },
    arrFunc,
  ];

  const originSetName = () => {
    return "setName";
  };

  const symbol = Symbol("2");
  const symbol2 = Symbol("symbol222");

  const set = new Set(["aa", "bb"]);

  const origin = {
    name: "js",
    age: 20,
    sub: {
      name: "go",
      address: "beijing",
    },
    arr,
    setName: originSetName,
    [symbol]: "1",
    s2: symbol2,
    set: set,
  };

  test("测试值类型", () => {
    const or = 1;

    let result = deepCopy(or);

    result = 2;

    expect(result).toBe(2);

    expect(or).toBe(1);
  });

  test("测试copy对象", () => {
    const result = deepCopy(origin);

    result.sub.name = "java";

    expect(result.sub.name).toBe("java");

    expect(origin.sub.name).toBe("go");
  });

  test("测试copy对象属性数组", () => {
    const result = deepCopy(origin);

    const setName = () => {};

    result.arr[2].name = "som";
    result.arr.push(4);
    result.arr[3] = setName;

    expect(result.arr).toStrictEqual([1, 2, { name: "som" }, setName, 4]);

    expect(origin.arr).toStrictEqual(arr);
    expect(origin.arr[3]).toStrictEqual(arrFunc);
  });

  test("测试函数属性copy", () => {
    const result = deepCopy(origin);

    function setName() {
      return "setName copy";
    }

    result.setName = setName;

    expect(result.setName).toStrictEqual(setName);

    expect(origin.setName).toStrictEqual(originSetName);

    expect(result.setName()).toBe("setName copy");

    expect(origin.setName()).toBe("setName");
  });

  test("测试Symobl属性copy", () => {
    const result = deepCopy(origin);

    result[symbol] = "22";

    expect(result[symbol]).toBe("22");

    expect(origin[symbol]).toBe("1");

    const copyS2 = Symbol("s2");
    result.s2 = copyS2;

    expect(result.s2).toBe(copyS2);

    expect(origin.s2).toBe(symbol2);
  });

  test("测试Set属性copy", () => {
    const result = deepCopy(origin);

    result.set = new Set(["bvc"]);

    // console.log(origin, result);
  });
});
