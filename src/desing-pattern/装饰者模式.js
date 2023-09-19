Function.prototype.before = function (beforeFn) {
  let _self = this;
  return function (...args) {
    // 外部函数执行
    beforeFn.apply(this, args);
    // 自己执行
    return _self.apply(this, args);
  };
};

//例子1:数据上报
let onLogin = function () {
  console.log("登录");
  //router.push('/pages/index')
};

let onLog = function () {
  console.log("在这里做数据上报请求");
};

onLogin = onLogin.before(onLog);

// 在这里做数据上报请求
// 登录
onLogin();

//例子2:公共请求数据处理
function post(url, data) {
  console.log(url, data); //www.example.com {a: "a", token: "token"}
  //伪代码
  // axios.post({
  //   url,
  //   data
  // })
}

//处理公共请求数据
function setHeader(url, header) {
  header.token = "token";
}

post = post.before(setHeader);

post("www.example.com", { a: "a" });
