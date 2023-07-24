// import "./index.less";

// import styles from "./index.module.less";

// console.log("styles", styles);
// 只不过实际工作中，我们并不会直接使用css
// 而是使用效率更高的less scss sass postcss

// 我们怎么封装这个button组件

export default function Button(props) {
  // return <div className={styles.wrapper}>{props.children || "click me"}</div>;
  return (
    <div className="bg-red-500 text-white w-26 h-48 ">
      {props.children || "click me"}
    </div>
  );
}
