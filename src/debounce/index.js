export function debounce(fn, delay, immediate) {
  let timer = null;
  let isInvoke = false;
  let _fn = function (...args) {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    if (immediate && !isInvoke) {
      fn.apply(this, args);
      isInvoke = true;
    } else {
      timer = setTimeout(() => {
        fn.apply(this, args);
        isInvoke = false;
      }, delay);
    }
  };

  _fn.cancel = function () {
    clearTimeout(timer);
    timer = null;
  };

  return _fn;
}
