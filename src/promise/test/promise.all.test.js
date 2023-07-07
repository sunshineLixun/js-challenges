import { describe, expect, test } from "vitest";
import { MyPromise } from "../promise.all";

// function test() {
//   try {
//     MyPromise.all(1)
//       .then((res) => console.log(res))
//       .catch((err) => console.log("reject", err));
//   } catch (error) {
//     console.log("catch", error);
//   }

//   try {
//     MyPromise.all({})
//       .then((res) => console.log(res))
//       .catch((err) => console.log("reject", err));
//   } catch (error) {
//     console.log("catch", error);
//   }

//   try {
//     MyPromise.all([])
//       .then((res) => console.log("success", res))
//       .catch((err) => console.log("reject", err));
//   } catch (error) {
//     console.log("catch", error);
//   }

//   MyPromise.all([Promise.resolve(1), {}])
//     .then((res) => console.log("success", res))
//     .catch((err) => console.log("reject", err));

//   MyPromise.all([Promise.reject("12312321"), Promise.resolve(123)])
//     .then((res) => console.log("success", res))
//     .catch((err) => console.log("reject", err));
// }

// test();

function promiseTest(successCb, errorCb) {
  MyPromise.all([Promise.reject("12312321"), Promise.resolve(123)])
    .then((data) => successCb(data))
    .catch((err) => errorCb?.(err));
}

describe("promise.all", () => {
  test("promise.all.success", () => {
    function successCb(data) {
      console.log("success:", data);
      expect(data[0]).toBe(123);
    }

    function errorCb(data) {
      console.log("error:", data);
      expect(data).toBe("12312321");
    }

    promiseTest(successCb, errorCb);
  });
});
