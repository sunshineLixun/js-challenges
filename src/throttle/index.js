export function throttle(fn, wait) {
  let lastTime = 0;
  let timer = null;

  let _throttle = function (...args) {
    const currentTime = Date.now();

    const canRun = currentTime - lastTime >= wait;

    // 如果上次执行的时间距离现在的时间已经超过了wait，则立即执行函数
    if (canRun) {
      fn.apply(this, args);
      lastTime = currentTime;
    } else {
      if (timer) {
        clearTimeout(timer);
        // 剩余时间
        timer = setTimeout(() => {
          fn.apply(this, args);
          lastTime = Date.now();
        }, wait - (currentTime - lastTime));
      }
    }
  };

  _throttle.cancel = function () {
    lastTime = 0;
    clearTimeout(timer);
    timer = null;
  };

  return _throttle;
}
