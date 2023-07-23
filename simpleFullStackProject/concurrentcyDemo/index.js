// 实现React的可中断渲染

function Counter() {
  /* <div>
      <span>helloWorld</span>
      <button>click me</button>
    </div> */

  /*   return React.createElement(
    "div",
    {},
    React.createElement("span", {}, "helloWorld"),
    React.createElement("button", {}, "click me")
  ); */
  return {
    type: "span",
    value: "helloworld", // fiber里是区分文本节点和react元素节点
    next: {
      type: "button",
      value: "click me",
    },
  };
}

// createElement转换成什么样子？concurrency实际上是对createElement的执行结果进行可中断化

// 链表  ---> useState hooks源码都是要用链表 环形链表
const CounterElementDescriptors = {
  type: "Function",
  fn: Counter,
};

// 我们要做的就是如何将这堆数据进行可中断化
let presentWork = null; // 目前要做的工作

let rootElementDescriptor = null;

let elementContainer = null;

function performUnitOfWork(deadLine) {
  console.log("presentWork", presentWork, deadLine);

  // 双等会强制类型转换 undefined == null
  if (presentWork == null) {
    // 第二次进来是span
    // 代表目前没有工作要做了
    commitRoot(rootElementDescriptor);
    return;
  }
  //   当前有工作，我们还要看一个东西 这个东西不确定
  if (deadLine.timeRemaining() < 1) {
    // 返回当前帧还剩余的毫秒，
    // 没有空闲时间
    // 我们把任务推进到下一帧执行

    // 这样做的我们是不是本来应该在一帧内执行完成的渲染任务分到多帧去了

    // 假设当前帧没有时间了 ---> 渲染工作停了 是不是好像就是中断了
    requestIdleCallback(executeWorkLoop); // 把span推向下一帧
    // 如果span执行完以后，我们又要渲染button 如果span真的要渲染16ms 那么我们又将button推进下一帧

    // 这样保证无论你的组件写的有多大，它实际上都会被拆分成很多个小的任务去分散在每一帧里执行
    // 那这样的话就不会出现掉帧，用户的交互是不是不会失效

    return;
  }
  //   执行真正的工作
  if (presentWork.type === "Function") {
    // 我们需要判断一下根组件
    rootElementDescriptor = presentWork; //代表保存一下是根组件

    // 代表是组件
    const fstChildren = presentWork.fn();
    console.log("children", fstChildren);
    fstChildren.parent = presentWork; // 父子关系，主要和fiber有关
    presentWork.children = fstChildren;

    // 开始进入下一阶段的工作 ------
    presentWork = fstChildren; //等于当前工作的元素从函数组件变成了第一个span元素
    performUnitOfWork(deadLine); // 还是当前帧在做事情

    // 渲染完span 是不是又要渲染button
    // 假设渲染span就要耗费16ms
  } else {
    // 代表是真实的元素
    const dom = document.createElement(presentWork.type);
    dom.innerHTML = presentWork.value;
    // 不会马上塞到页面中去 render阶段
    presentWork.dom = dom;
    // 比方说你有class 事件 事件也要绑定上---
    // 等待commit阶段，一次性提交到页面中去
    presentWork = presentWork.next; // 转到button button.next没东西了，就return
    performUnitOfWork(deadLine);
  }
}

presentWork = CounterElementDescriptors;
// 你把fiber直接挂到页面 生成真实dom 逻辑很简单所以不可能卡帧
// 唯一可能卡帧的地方是 很多个组件的非常多的逻辑加在一起就可能超过16ms
// 一个函数组件再怎么些 也不可能执行超过16ms，之前是for 50000次；常规的百分之九十九点九的函数执行时间是不能可能超过16ms，剩下百分之一是不是自己写的有问题

// 多个函数就有可能

//  执行我们自己的工作的时候，去将一个大的任务拆分成多个任务去执行，让每一帧的最大可渲染单元为组件
// 【当然如果本帧时间充裕的话是会渲染多个组件的，但是只要发现不充裕，立马推入下一帧】如果有连续两帧都没时间，是不是渲染就被推后两帧，是不是有意味着停止了两帧没有进行渲染工作，停止就是中断
// 所以这就是可中断渲染

function executeWorkLoop(deadLine) {
  console.log("executeWorkLoop", deadLine);
  // deadline.didTimeout：表示当前帧是否还有空闲时间
  performUnitOfWork(deadLine);
}

// requestIdleCallback --->你给他传一个回调，他会在下一帧还有时间的时候去执行对应的回调，如果下一帧没有足够的时间，则不会执行你的回调

// render阶段
function render(element) {
  elementContainer = element;
  presentWork = CounterElementDescriptors;
  requestIdleCallback(executeWorkLoop);
}

// commit阶段
function commitRoot(_rootElement) {
  console.log("进入commit阶段，开始挨个的生成真实dom", _rootElement);

  let renderChildrenElement = _rootElement.children;
  console.log(renderChildrenElement);
  do {
    console.log("come in", renderChildrenElement, elementContainer);
    elementContainer.appendChild(renderChildrenElement.dom);
    renderChildrenElement = renderChildrenElement.next;
  } while (renderChildrenElement);
}

render(document.getElementById("root"));
