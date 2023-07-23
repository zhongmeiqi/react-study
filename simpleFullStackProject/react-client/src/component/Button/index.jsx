import "./index.css";
// 只不过实际工作中，我们并不会直接使用css
// 而是使用效率更高的less scss sass postcss

// 我们怎么封装这个button组件

export default function Button(props) {
  return <div className="wrapper">{props.children || "click me"}</div>;
}
