const Koa = require("koa"); //服务端是不能用esmodule的 import koa from 'koa'

const koaApp = new Koa();

koaApp.listen(8888, () => {
  console.log("koa started at 8888");
});

function delay(duration = 2000) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(true);
    }, duration);
  });
}

koaApp.use(async (ctx) => {
  console.log("ctx", ctx);

  const { path } = ctx;
  if (path === "/student") {
    //如果有人请求 /student接口，我们就要干点什么
    console.log("student matched");
    // 返回数据,require不一定非要写在顶部，写在中间也可以
    const jsonData = require("./student.json");
    console.log("jsonData", jsonData);
    await delay(2000);
    // 返回给客户端
    ctx.response.body = jsonData;
  }
});
