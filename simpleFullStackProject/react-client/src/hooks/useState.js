let callIndex; // 代表当前到第几个hook了
const currentStateArr = [
  //   {}, // 0
  //   {}, // hello world
];

// react源码，用的是环形链表
/* let currentState = {
  memorizedState: 0,
  next: {},
}; */

// 第一次是0 那我dispatch的时候就要稳稳地找到0这个人
// 第二次是helloWorld，那我dispatch的时候就要稳稳地找到1这个地方

// 让多次调用useState 不要去共享同一份数据
export default function useState(initialState) {
  if (callIndex === undefined) {
    // 第二次hhelloWOrld进来的时候callIndex ===0
    // 全局一个useState都没调用过
    callIndex = 0;
  }
  // 重新渲染的时候callIndex ===0
  // 全局一个useState都没调用过
  if (!currentStateArr[callIndex]) {
    currentStateArr.push({
      isFirst: false,
      state: typeof initialState === "function" ? initialState() : initialState,
    });
  }

  // 修改状态的函数
  const dispatchState = (() => {
    let _callIndex = callIndex; // 很关键 永久的这个_callIndex===0
    return (newState) => {
      // 直接修正这个callIndex，将callIndex设置为0
      callIndex = 0;

      console.log("修改前的currentState", currentStateArr[_callIndex]);
      const prevState = currentStateArr[_callIndex].state;

      //   _callIndex 在首次渲染的时候，就留存了_callIndex，它代表当前这个状态在整个currentStateArr的位置
      // 实际上就是修改currentState的值
      currentStateArr[_callIndex].state =
        typeof newState === "function" ? newState(prevState) : newState;
      console.log("修改后的currentState", currentStateArr[_callIndex]);
      window.render();
    };
  })();

  const matchState = currentStateArr[callIndex++]; //这段代码走完以后 callIndex已经是1了
  return [matchState.state, dispatchState];
}
// 首次渲染完毕以后，callIndex ---> 1的位置

// 因为我们点击了increase以后会导致页面的重新渲染
