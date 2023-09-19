const Event = {
  clientList: [], //存储所有订阅者消息
  trigger: function () {
    const key = Array.prototype.shift.call(arguments);
    const fns = this.clientList[key];
    if (!fns || fns.length == 0) {
      return false;
    }
    fns.forEach((fn) => {
      fn.apply(this, arguments);
    });
  },
  listen: function (key, fn) {
    if (!this.clientList[key]) {
      this.clientList[key] = [];
    }
    this.clientList[key].push(fn);
  },
  remove: function (key, fn) {
    const fns = this.clientList[key];
    if (!fns) {
      return;
    }
    if (!fn) {
      if (fns) {
        fns.length = 0; //清空所有订阅消息
      }
    } else {
      for (let index = fns.length - 1; index >= 0; index--) {
        let _fn = fns[index];
        if (_fn === fn) {
          fns.splice(index, 1); //删除订阅消息
        }
      }
    }
  },
};
