import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// 我们的render函数 ，只不过它的性能比较差，我们没有diff算法
export default function render() {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <div className="app">
      <App />
    </div>
  );
}

render();

window.render = render;
