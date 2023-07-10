const LXPromise = require("../LXPromise");

module.exports = {
  resolved: LXPromise.resolve,
  rejected: LXPromise.reject,
  deferred() {
    const result = {};
    result.promise = new LXPromise((resolve, reject) => {
      result.resolve = resolve;
      result.reject = reject;
    });
    return result;
  },
};
