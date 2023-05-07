import ReportButton from "./component/ReportButton";

const obj = {
  a: 1,
};

obj[Symbol.iterator] = function* () {
  for (let prop in obj) {
    yield [prop, obj[prop]];
  }
};
function App() {
  return (
    // 这个div不是真正的dom元素，而是react元素
    <div>
    <ReportButton/>
    </div>
    // 如果是大写开头的 React默认为组件
  );
}

export default App;

