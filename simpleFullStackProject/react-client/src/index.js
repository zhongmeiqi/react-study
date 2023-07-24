import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assests/CSS/init.css";

// StrictMode ：React严格模式 js的严格模式
const root = ReactDOM.createRoot(document.getElementById("root"));

function render() {
  root.render(
    //在进行渲染的工作：渲染-->将你写的JSX（虚拟DOM）转换成页面真实DOM的工作叫做渲染
    <div className="app">
      {/* <App /> ==== {App()},但是不要用执行的方式使用组件，这会React找不到对应的组件树 都用<Component />*/}

      <App />
    </div>
  );
}

render();

window.render = render;
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

// 1.我可以在这个下方直接访问到对应的app类名的真实dom吗
// jsx ---> 真实dom，是要经过编译还有一系列转换工作，那既然是这样，render函数就应该是异步的
// 既然是异步的，那我就不可能在下面可以直接获取到对应app类名的真实dom

/* 
  eventloop js进阶里面的事件循环 逻辑 js是有逻辑的，你不需要去刻意的背很多 只有你对逻辑掌握的不够深，你才会觉得很多东西需要背
  setTimeout(()=>{})
*/

// 暂时的把它理解为setTimeout(()=>{},0) 你不懂浏览器渲染帧的话，那就这么理解
requestIdleCallback(() => {
  // 接下来的只是 就是和事件有关的
  const app = document.getElementsByClassName("app")[0];

  // 阻止app这个元素的事件冒泡
  app.addEventListener("click", (e) => {
    // e.stopPropagation(); // 意味着app的所有父级元素的点击事件就不会被冒泡触发
    // 因为app的父级就是root元素，如果我们给真实dom取消了事件冒泡，那该真实dom的事件全部都不会往上冒泡
  });

  /*
    如果我们阻止了app的事件冒泡，那么app父级的所有真实dom元素的点击事件都不会被冒泡触发
    正常点击后流程
    button click
    div click
    app dom click  

    1、这个button没有绑定任何的真实事件
    2、冒泡到app dom，触发真实dom的事件处理函数 app dom click
    3、冒泡到root元素，root元素开始根据对应的event.target进行事件的处理 进行对应的【标签属性事件】的触发 
    eventHandlers.forEach(eventH=>const eventObj = createEventObj(),eventH(eventObj))
  */
});

// 冒泡--->一个事件从子元素依次向父元素传播 这个叫做冒泡 如果阻止冒泡，则事件不会向该元素的父级传播
