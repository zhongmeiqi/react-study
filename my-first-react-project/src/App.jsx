import Counter from "./component/Counter";

function App() {
  return (
    // 这个div不是真正的dom元素，而是react元素
    <div>
      <Counter/>
    </div>
    // 如果是大写开头的 React默认为组件
  );
}

export default App;

