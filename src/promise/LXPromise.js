// promise A+： https://promisesaplus.com/

const Status = {
  pending: "pending",
  fulfilled: "fulfilled",
  rejected: "rejected",
};

class LXPromise {
  constructor(executor) {
    // primise的三种状态： pending fulfilled rejected
    this.status = Status.pending;
    // 成功保存的值
    this.value = undefined;
    // 失败的原因
    this.reason = undefined;
    // 初始化成功处理函数队列
    this.onFulfilledCallbacks = [];
    // 初始化失败处理函数队列
    this.onRejectedCallbacks = [];

    // 外部传入的值，保存在内部
    const resolve = (value) => {
      if (this.status === Status.pending) {
        this.value = value;
        this.status = Status.fulfilled;
        this.onFulfilledCallbacks.forEach((cb) => cb());
      }
    };

    const reject = (reason) => {
      if (this.status === Status.pending) {
        this.reason = reason;
        this.status = Status.rejected;
        this.onRejectedCallbacks.forEach((cb) => cb());
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      // 如果同步函数内部有执行错误，在这里捕获，并修改状态，抛出错误
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function" ? onFulfilled : (value) => value;

    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : (reason) => {
            throw reason;
          };

    // 链式调用
    const promise2 = new LXPromise((resolve, reject) => {
      if (this.status === Status.fulfilled) {
        /**
         * 这里的“平台代码”指的是引擎、环境和 Promise 实现代码。实际上，
         * 此要求可确保 onFulfilled 和 onRejected 在调用 then 的事件循环轮次之后异步执行，并使用新的堆栈。
         * 这可以通过“宏任务”机制（例如 setTimeout 或 setImmediate ）或“微任务”机制（例如 MutationObserver 或 process.nextTick 。
         * 由于 Promise 实现被视为平台代码，因此它本身可能包含一个任务调度队列或“蹦床”，在其中调用处理程序
         *
         * 这里可以用setTimeout宏任务来处理异步,
         * 重点： 每一次的then方法都将回调加入setTimeout队列执行，FI行FO，最先进入的队列的就会先执。所以链式调用的执行顺序也是遵循这个规则
         */
        setTimeout(() => {
          try {
            const res = onFulfilled(this.value);
            resolvePromise(promise2, res, resolve, reject);
          } catch (error) {
            // 将新的promise状态修改为 rejected
            reject(error);
          }
        });
      } else if (this.status === Status.rejected) {
        // 跟上面同理
        setTimeout(() => {
          try {
            const res = onRejected(this.reason);
            resolvePromise(promise2, res, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      } else if (this.status === Status.pending) {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const res = onFulfilled(this.value);
              resolvePromise(promise2, res, resolve, reject);
            } catch (error) {
              // 将新的promise状态修改为 rejected
              reject(error);
            }
          });
        });

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const res = onRejected(this.reason);
              resolvePromise(promise2, res, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    });

    return promise2;
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(callback) {
    // resove reject
    return this.then(
      (value) => {
        return LXPromise.resolve(callback()).then(() => value);
      },
      (reason) => {
        return LXPromise.resolve(callback()).then(() => {
          throw reason;
        });
      }
    );
  }

  static resolve(value) {
    // LXPromise.resolve(() => LXPromise.resolve())
    if (value instanceof LXPromise) {
      return value;
    }
    return new LXPromise((resolve) => resolve(value));
  }

  static reject(reason) {
    // LXPromise.reject(LXPromise.reject())
    if (reason instanceof LXPromise) {
      return reason;
    }
    return new LXPromise((_, reject) => reject(reason));
  }

  static all(promises) {
    return new LXPromise((resolve, reject) => {
      let result = [];
      let count = 0;

      promises.forEach((promise, index) => {
        LXPromise.resolve(promise)
          .then((value) => {
            result[index] = value;
            count++;
            if (count === promises.length) {
              resolve(result);
            }
          })
          .catch((reason) => reject(reason));
      });
    });
  }

  static allSettled(promises) {
    return new LXPromise((resolve, _) => {
      let result = [];
      let count = 0;

      promises.forEach((promise, index) => {
        LXPromise.resolve(promise).then(
          (value) => {
            result[index] = { state: "fulfilled", value };
            count++;
            if (count === promises.length) {
              resolve(result);
            }
          },
          (reason) => {
            result[index] = { state: "rejected", reason };
            count++;
            if (count === promises.length) {
              resolve(result);
            }
          }
        );
      });
    });
  }

  static race(promises) {
    return new LXPromise((resolve, reject) => {
      promises.forEach((promise) => {
        LXPromise.resolve(promise).then(
          (value) => resolve(value),
          (reason) => reject(reason)
        );
      });
    });
  }

  static any(promises) {
    return new LXPromise((resolve, reject) => {
      let errors = [];
      let count = 0;

      promises.forEach((promise, index) => {
        LXPromise.resolve(promise)
          .then((value) => {
            resolve(value);
          })
          .catch((reason) => {
            errors[index] = reason;
            count++;
            if (count === promise.length) {
              reject(new AggregateError(errors, "All Promises rejected"));
            }
          });
      });
    });
  }
}

function resolvePromise(promise, result, resolve, reject) {
  if (promise === result) {
    return reject(new TypeError("Chaining cycle detected for promise"));
  }

  // 标记是否已调用，防止多次调用
  let called = false;
  if (result instanceof LXPromise) {
    result.then(
      // 递归处理，类似这种情况： .then.then.then.then.xxxxxx, 下面一样的道理
      (value) => resolvePromise(promise, value, resolve, reject),
      (reason) => {
        reject(reason);
      }
    );
  } else if (
    result !== null &&
    (typeof result === "object" || typeof result === "function")
  ) {
    try {
      const then = result.then;
      // 不是promise实例，但是实现了then: function() {}
      if (typeof then === "function") {
        then.call(
          result,
          (value) => {
            // 防止循环调用
            if (called) return;
            called = true;
            resolvePromise(promise, value, resolve, reject);
          },
          (reason) => {
            if (called) return;
            called = true;
            reject(reason);
          }
        );
      } else {
        // 普通的对象
        resolve(result);
      }
    } catch (error) {
      if (called) return;
      called = true;
      reject(error);
    }
  } else {
    resolve(result);
  }
}

// cjs  如果是promises-aplus-tests测试，node环境需要cjs
// module.exports = LXPromise;

// esm 浏览器环境测试
export { LXPromise };
