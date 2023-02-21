class MyPromise {
  static all(promise) {
    if (
      !(
        typeof promise === "object" &&
        promise !== null &&
        typeof promise[Symbol.iterator] === "function"
      )
    ) {
      throw new Error(`${promise} is not iterator`);
    }

    return new Promise((resolve, reject) => {
      const length = promise.length;
      if (length === 0) {
        resolve([]);
      }

      const results = [];
      let idx = 0;
      promise.forEach((promise, index) => {
        Promise.resolve(promise)
          .then((res) => {
            idx++;
            // 返回值跟传入的promise一一对应
            results[index] = res;
            // 确保所有promise都执行完成
            if (idx === length) {
              resolve(results);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    });
  }
}

function test() {
  try {
    MyPromise.all(1)
      .then((res) => console.log(res))
      .catch((err) => console.log("reject", err));
  } catch (error) {
    console.log("catch", error);
  }

  try {
    MyPromise.all({})
      .then((res) => console.log(res))
      .catch((err) => console.log("reject", err));
  } catch (error) {
    console.log("catch", error);
  }

  try {
    MyPromise.all([])
      .then((res) => console.log("success", res))
      .catch((err) => console.log("reject", err));
  } catch (error) {
    console.log("catch", error);
  }

  MyPromise.all([Promise.resolve(1), {}])
    .then((res) => console.log("success", res))
    .catch((err) => console.log("reject", err));

  MyPromise.all([Promise.reject("12312321"), Promise.resolve(123)])
    .then((res) => console.log("success", res))
    .catch((err) => console.log("reject", err));
}

test();
