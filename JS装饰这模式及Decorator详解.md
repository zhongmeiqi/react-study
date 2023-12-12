# JS 装饰者模式及 Decorator 详解

Decorator

什么是装饰器：
天气冷了，身上穿的大衣，赋予我们保暖的功能，脱下来之后也不会有任何影响和副作用

装饰者模式：
曾探在《JavaScript 设计模式与开发实践》一书中对装饰者描述：装饰者模式能够在不改变对象自身的基础上，在程序运行期间给对象动态的增加职责

```js
// 装饰者模式
// 假设我们现在有一个函数，这个函数功能非常简单就是获取用户信息

// userId：用户id
function getUserInfo(userId) {
  console.log("后端同学，有人在获取用户信息啦"); // 后续产品新加的需求，也要补上去
  console.log("通过userId 我获取了用户的信息");
}
```

但是我们要思考一个问题？这样好吗？ 假设我们的上报代码有几百行，然后又过去了几个月，你敢乱删代码吗？
或者不止这一个需求，有非常多的需求，那你更加不敢删了
所以这时候装饰器模式就来了，他可以让我们更好的维护我们的功能

```js
// 以下是我们的基础代码
function getUserInfo(userId) {
  console.log("通过userId 我获取了用户的信息");
}

// 当有一天需要上报的时候，我们只需要来写一个上报装饰器，这是一个高阶函数，高阶函数本身就是装饰器的实现（埋点、KOA、redux）
function reportToServer(decorateTarget) {
  return function (...args) {
    console.log("后端同学，有人在获取用户信息啦");
    if (typeof decorateTarget !== "function") return;
    return decorateTarget.apply(this, ...args);
  };
}

// 然后当我们使用的时候
const wrappedReportGetUserInfo = reportToServer(getUserInfo)
wrappedReportGetUserINfo() // 当这个函数执行的时候，就等于完成了我们上面的功能

如果哪天产品说我们不需要这个功能了，ok没问题，我们直接调用原来的getUserInfo，我们不包装了
getUserInfo(); // 这样就等于没有了这个功能

```

TypeScript 赋予我们的 @decorator 及原理

```js
// 这时多了一个装饰器
function logger(decorateTarget) {
  return function (...args) {
    console.log("正在请求数据中...");
    if (typeof decorateTarget !== "function") return;
    return decorateTarget.apply(this, ...args);
  };
}

const newGetUserInfo = logger(reportToServer(getUserInfo));

newGetUserINfo();
```

@decorate 升级后（主要是代码整洁度的提升）装饰器函数的语法糖

```js
// 伪代码，不一定能执行，主要是因为函数声明的提升
@logger
@reportToServer
function getUserInfo(userId){
    console.log("通过userId 我获取了用户的信息")
}
```

但是目前 js、ts 还不允许在函数上面 加装饰器，是识别不出来的【目前来说，整个的装饰器是没有办法应用到函数上面去的 】

# TS 的装饰器

目前 ES6 只能类里使用，因为在类里面不会有函数的提升 - 3 种

类装饰器（Class Decorator）

成员装饰器（Member Decorator ）

参数装饰器（Parmeter Decorator）

```js
// 类装饰器语法
// 类装饰器接受一个参数，这个参数就是类本身
// 同时类装饰器有两种返回值：
// - void: 当没有返回值的时候，整个类的行为不会被返回值所影响
// - new Class: 返回一个新的类的时候
// 被装饰的类会被这个新的类直接替换（不建议）
class TestB {}
function classDecorator(target:object){
    return TestB
}

@classDecorator
class TestClass{

}

// 成员装饰器语法
成员装饰器接受三个参数：
1. target：如果装饰器装饰的是静态成员（static），则target是类本身，
如果装饰器修饰的是实例成员（public），则target是该类的prototype
2. key: 代表当前修饰的键值
3. descriptor: 该key的属性描述符，可读可写
成员装饰器不能有返回值
function memberDecorator(
    target:object,
    key:string,
    descriptor:PropertyDescriptor
){}

class TestClass{
    @memberDecorator
    public testProp:string
}

// 参数装饰器语法
参数装饰器接受三个参数：
1. target：如果装饰器装饰的是静态成员（static），则target是类本身，
如果装饰器修饰的是实例成员（public），则target是该类的prototype
2. methodName: 代表当前方法名称
3. index: 被修饰参数在函数参数列表中的索引
成员装饰器不能有返回值
function parameterDecorator(
    target:object,
    methodName:string,
    index:number
){}

class TestClass{
    public method(
        @parameterDecorator
        param:string
    ){

    }
}
```

# 装饰器的注意点

1. 装饰器是会参与到最终 JS 运行的

2. 装饰器的运行时机是：读到这个类的时候就会立马被运行

3. 开启 TS 的相关配置可以将 TypeScript 的类型约束作为元数据放入运行时态中，TypeScript 将有机会在运行时态中进行类型约束

```js
function memberDecorator(target, key) {
  console.log("target", target, "key", key);
}

var Test = /** @class*/ (function () {
  function Test() {}

  __decorate([memberDecorator], Test.prototype, "propName");
  return Test;
})();
```

```js
tsconfig.json
{
    "compilerOptions":{
        "emitDecoratorMetadata":true
    }，
    "include":['./*']
}
```

```js
function memberDecorator(target, key) {
  console.log("target", target, "key", key);
}

var Test = /** @class*/ (function () {
  function Test() {}

  __decorate(
    [memberDecorator, __metadata("design:type", String)],
    Test.prototype,
    "propName"
  );
  return Test;
})();
```

