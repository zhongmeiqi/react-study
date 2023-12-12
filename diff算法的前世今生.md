# diff 算法

1. 什么是 diff 算法？为什么要使用 diff 算法？ 找不同的方式有很多种，这些方式都是 diff 算法

diff 全称：difference，差异，不同

diff 算法是用来得到差异点的，同时我们需要一个本体，一个参照物，通过对本体和参照的比较得出他们有哪些差异点，这个过程我们简称找不同，这也是 diff 算法的本质

Eg: 一个找不同的小游戏，我们去比较 A（本体）和 B（参照体）两个图之间的差异的时候，我们使用的方式就叫做 diff

1. 我们可以直接用肉眼去找出不同，那么此时我们的 diff 算法的核心逻辑是肉眼分析

2. 我们可以直接把这张图导入到电脑中，使用 python 等 AI 手段来识别出差异点，此时我们的 diff 算法的核心逻辑就是 AI 分析

在前端领域里，diff 算法，他的本地和参照体都是虚拟 dom，那么这里又引出来另一个新的问题，什么是虚拟 DOM？

**虚拟 DOM 本质上就是一个对象，该对象描述了一个 UI 节点所对应的一些必要信息** 不要固化了，只要能清楚表达 DOM，就可以称为虚拟 DOM
主要是因为 diff 算法需要虚拟 dom, 大大减少比对属性

diff 去比较真实 dom -> 找出差异点（需要更新一个虚拟 dom） -> 真实 dom -> render

diff 去比较真实 dom -> 找出差异点（需要更新一个真实 dom） -> render

```js
<div class="text">你好<div>

const virtualNode = {
    type:"div",
    content:"你好"，
    props:{
        class:["text"]
    }
}
```

为什么需要虚拟 dom?
因为真实 dom 在创建的时候会携带非常多的属性，最终进行 diff 的时候是需要本体和参照体的，在目前不考虑前端 diff 的具体实现细节，仅从宏观逻辑角度去考虑，至少可以明白一个观点：就是本地和参照物细节越多，比对所消耗的精力（性能）和时间也就越多，而整个真实 dom 的属性有这么多，我们都一个一个拿出来比较，这无疑是一笔巨大的损耗。不是因为虚拟 dom 的 crud。
还有创建对象（虚拟 don）的开销可以忽略不计 但是构建类的实例对象可不能忽略不计

```js
function bar() { console.time(); const div = document.createElement("div"); console.timeEnd() } // 创建真实dom消耗的时间
bar()  default: 0.029052734375 ms

function test() { console.time(); const div = { type: "div" }; console.timeEnd() } // 创建虚拟dom所消耗的时间
test() default: 0.006103515625 ms
```

**前端的 diff 其实就是在比较虚拟 dom 的差异，或者说是虚拟 dom 树的差异，（虚拟 dom 树就是很多歌虚拟 dom 以树形结构组合在一起，就叫做虚拟 dom 树），这就是 diff 算法的一个概念**

虚拟 dom 运用场景：1. 比对 diff 2. render

2. 手写 Vue 的 diff 算法

3. 手写 React 的 diff 算法

