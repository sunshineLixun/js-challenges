import { describe, test, expect } from "vitest";
const LXPromise = require("../LXPromise");

describe("Promises/A+ Tests", function () {
  test("resolve", () => {
    LXPromise.resolve(2).then((value) => expect(value).toBe(2));
  });

  test("resolve, reject", () => {
    new LXPromise((resolve, reject) => {
      resolve(111);
    })
      .then((res) => {
        return LXPromise.resolve(res);
      })
      .then((val) => console.log("val", val));
  });
});
