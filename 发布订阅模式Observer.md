# 发布订阅模式 Observer

1.  什么是发布者和订阅者
    闹钟给我们提供**设置闹铃**的功能，当我们设置好对应时间后，当**时间到达**时，闹钟会发出叮叮当的叫声来**告诉我们时间到了**
    定书... B 站关注的博主

2.  发布订阅模式
    他定义了对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于他的对象都将得到通知

JS 天生对发布订阅模式支持

```js
document: 发布者;

document.addEventListener("click", () => {
  console.log("document click");
});
```

# 发布订阅模型

1. 发布者会给订阅者提供一个方法以便于订阅某些事件发生时要做的事情
2. 当发布者可以通过触发一些操作来告知订阅者订阅已经到来，可以去做对应的后续处理了
3. 当某个订阅者不想在订阅的时候可以进行订阅的取消（removeEventListener）

# 手写订阅模型

```js
发布订阅模式又叫做观察者模式 new Observer -> 发布者
发布者首先提供一些窗口让订阅者可以订阅某些事件 -> addEventListener
发布者可以触发订阅的事件
发布者可以解除某些订阅
class Observer {

    obj = {}

    on(subscribeName,callback){
        if(！this.obj[subscribeName]){
            this.obj[subscribeName] = [callback]
        } else{
            this.obj[subscribeName].push(callback)
        }
    }

    trigger(subscribeName){
        const subscribers = this.obj[subscribeName] || []

    }

    remove(subscribeName){

    }
}

const bookStoreBoss = new Observer();

bookStoreBoss.on('newBook',()=>{
    console.log("用户1要去买书")
})
bookStoreBoss.on('newBook',()=>{
    console.log("用户2要去买书")
})

bookStoreBoss.on('newPan',()=>{
    console.log("我要去买笔")
})

bookStoreBoss.trigger("newBook")

bookStoreBoss.remove("newBook")

```

3. Vue 在源码中对于发布订阅模式的使用

