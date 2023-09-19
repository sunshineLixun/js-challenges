//模拟表单验证
document.getElementById("formId").onclick = function () {
  //伪代码
  if (!nameInput.value) {
    toast("输入框内容不能为空");
    return;
  }
  if (pwdInput.valuee < 6) {
    toast("密码不能小于6位数");
    return;
  }
  if (!/(^1[0-9]{9}$)/.test(phone)) {
    toast("手机格式不正确");
    return;
  }
  //onSumbit
};

//维护一个所有规则对象
const strategies = {
  isValueEmpty: function (value, errorMsg) {
    if (value === "") {
      return errorMsg;
    }
  },
  minLength: function (value, minLength, errorMsg) {
    if (value.length < minLength) {
      return errorMsg;
    }
  },
  isPhone: function (phone, errorMsg) {
    if (!/^1[3456789]\d{9}$/.test(phone)) {
      return errorMsg;
    }
  },
  isSpecialText: function (value, errorMsg) {
    const regEn = /[`!@#$%^&*()_+<>?:"{},.\/;'[\]]/im,
      regCn = /[·！#￥（——）：；“”‘、，|《。》？、【】[\]]/im;
    if (regEn.test(value) || regCn.test(value)) {
      return errorMsg;
    }
  },
};

const validator = {
  cache: [], //存储校验规则
  add: function (value, rule, errorMsg) {
    let _array = rule.split(":");
    const strategy = _array.shift();
    _array.unshift(value);
    _array.push(errorMsg);
    this.cache.push(function () {
      return strategies[strategy].apply(value, _array);
    });
  },
  valid: function () {
    for (let index = 0; index < this.cache.length; index++) {
      const validatorFunc = this.cache[index];
      const errorMsg = validatorFunc();
      if (errorMsg) {
        //如果有错误信息返回，立即中断循环，返回该错误信息
        return errorMsg;
      }
    }
  },
};

const validatorFun = function () {
  const name = "js";
  const pwd = "123456";
  const phone = "13011112222";
  const text = "$${{}{[]][]【】】";
  validator.add(name, "isValueEmpty", "姓名不能为空");
  validator.add(pwd, "minLength:6", "密码不能小于6位数");
  validator.add(phone, "isPhone", "手机号码格式不对");
  validator.add(text, "isSpecialText", "不能输入特殊字符串");
  return validator.valid();
};

document.getElementById("formId").onclick = function () {
  const errorMsg = validatorFun();
  if (errorMsg) {
    alert(errorMsg);
    return;
  }
};
