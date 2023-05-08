import Counter from "./component/Counter";
import {useState} from "react"


function App() {


/*
    let countValue = 10  
    const handleClick = ()=>{
    countValue ++
  } */
  const [countValue,setCountValue] = useState(10)
const handleClick = ()=>{
  setCountValue(prev=>prev+1)
}
  
  return (
    // 这个div不是真正的dom元素，而是react元素
    <div>
      <Counter defaultValue={countValue}/>
      <Counter defaultValue={countValue}/>
      <Counter />

      <button onClick={handleClick}>点击我</button>

      {/* document.addEventListener("click") */}
    </div>
    // 如果是大写开头的 React默认为组件
  );
}

export default App;

