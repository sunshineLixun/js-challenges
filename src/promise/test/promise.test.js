import { describe, test, expect } from "vitest";
// const LXPromise = require("../LXPromise");
import { LXPromise } from "../LXPromise";

describe("Promises/A+ Tests", function () {
  test("resolve", () => {
    LXPromise.resolve(2).then((value) => expect(value).toBe(2));
  });

  test("resolve, reject", () => {
    new LXPromise((resolve, reject) => {
      resolve(111);
    })
      .then((res) => {
        expect(res).toBe(111);
        return "then1";
      })
      .then((val) => {
        expect(val).toBe("then1");
        throw "error";
      })
      .catch((err) => {
        expect(err).toThrowError("error");
      });
  });

  test("promise all empty", () => {
    LXPromise.all().then((res) => {
      expect(res).toBe([]);
    });
  });

  test("promise all", async () => {
    const promise1 = LXPromise.resolve(1);
    const promise2 = LXPromise.resolve(2);
    const promise3 = LXPromise.resolve(3);

    const res = await LXPromise.all([promise1, promise2, promise3]);

    expect(res).toStrictEqual([1, 2, 3]);
  });

  test("promise for of", async () => {
    const promise1 = LXPromise.resolve(1);
    const promise2 = LXPromise.resolve(2);
    const promise3 = LXPromise.resolve(3);

    const promises = [promise1, promise2, promise3];

    const result = [];
    for (const promise of promises) {
      const res = await promise;
      result.push(res);
    }

    expect(result).toStrictEqual([1, 2, 3]);
  });
});
