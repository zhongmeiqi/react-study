import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// StrictMode ：React严格模式 js的严格模式

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    {/* <App /> ==== {App()},但是不要用执行的方式使用组件，这会React找不到对应的组件树 都用<Component />*/}

    <App />
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

