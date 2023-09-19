Function.prototype.myBind = function (context) {
  let bindArrs = Array.prototype.slice.call(arguments, 1);
  let _self = this;
  return function (...args) {
    return _self.apply(context, bindArrs.concat(args));
  };
};
