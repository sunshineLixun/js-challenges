import { describe, test, expect } from "vitest";

describe("reg", () => {
  test("横向匹配", () => {
    // 连续
    const regexp = /ab{5}c/g;
    const string = "abc abbc abbbc abbbbc abbbbbc abbbbbbc";
    expect(string.match(regexp)[0]).toBe("abbbbbc");
  });

  test("纵向匹配", () => {
    // 任意
    // 表示该字符是可以字符 "1"、"2"、"3" 中的任何一个
    const regexp = /ab[123]c/g;
    const string = "ab233c ab1c ab2c ab3c ab6456c";
    expect(string.match(regexp).join(" ")).toBe("ab1c ab2c ab3c");
  });

  test("获取id", () => {
    const domStr = '<div id="container" class="app"></div>';
    expect(domStr.match(/id="[^"]*"/)[0]).toBe('id="container"');
  });

  test("千分位", () => {
    // (?!^)表示开头的位置不能有xxx
    // (\d{3}) 连续3个数字的分组
    // ?=表示连续3个数字的分组前面的位置
    // + 表示继续添加
    // &表示整个字符串结尾
    expect("123456789".replace(/(?!^)(?=(\d{3})+$)/g, ",")).toBe("123,456,789");
  });
});
