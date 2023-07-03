import Counter from "./component/Counter";
import {useState} from "react"


function App() {


/*
    let countValue = 10  
    const handleClick = ()=>{
    countValue ++
  } */
const [countValue,setCountValue] = useState(10)

// 一个问题：虽然js的创建引用值的效率非常高 但是也经不住一个超大项目的成千上万次的重复创建
// React给我们提供了一个叫做useCallback的api来协助我们缓存引用，涉及到hook依赖
const handleClick = ()=>{
  setCountValue(prev=>prev+1)
}
  
  return (
    // 这个div不是真正的dom元素，而是react元素
    <div>
      <Counter defaultValue={countValue}/>
      <Counter defaultValue={countValue}/>

      {/* 
      1、我们给Counter组件挂了一个onClick的组件属性
      2、这个组件属性会被作为参数传递给Counter函数
      3、我们有在Counter组件里去使用props.onClick嘛？
      */}
      <Counter onClick={handleClick}/>

      <button onClick={handleClick}>点击我</button>

      {/* 标签属性：标签属性是会被React自行处理的 */}
      <div style={{widht:"100px",height:"100px",background:"pink"}} onMouseEnter={(event)=>{console.log("event",event)}}>
        i am a div
      </div>
    </div>
    // 如果是大写开头的 React默认为组件
  );
}

export default App;

