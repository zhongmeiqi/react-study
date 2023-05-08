import { useState } from "react";


// Counter组件可以用在任何你需要计数的地方

export default function Counter(props){
/* 
    count的值变动了，count虽然是Counter内部的数据，但是他凭什么能够让React去重新渲染组件呢
    我们要知道 函数组件内部的数据有很多种，那我们要选能够通知React去重新渲染组件的状态
    那么我们需要在内部创造出一种数据，这种数据可以和React产生直接关联，从而使得当组件状态变化时，React可以重新更新页面
*/

/* function useState(){
    if(isInit){
        // 第一次调用useState 我们就可以理解为初始化
    }else{

    }
} */
// 这段代码是百分之百执行的，但是useState内部的初始化工作不会再做了

let [count,setCount] = useState(props.defaultValue||0);//调用React的useState函数去生成了一个数据
console.log("组件渲染",props)
const increase = ()=>{
    // 这里我们虽然改变了count的值，但是没有让Counter组件重新执行 count+=1 
     
    // 这个count的值是异步更新的
    setCount(pre=>pre+1) // 只要你调用了setCount函数去对数据产生了变动，那么当前使用了该状态的React组件就会重新渲染
    setCount(pre=>pre+1)
    console.log(11)
    // 增加 每一次都在上一次的值上面+1,
    /* setCount(count+1)
    setCount(count+1) */

  /*   function setCount(newValue){
        count = newValue;
        reRenderThisCOmponent() 重新渲染该组件
    } */
}

const decrease = ()=>{
    setCount(pre=>pre-1)

}

window.getCount=()=>{
    console.log("count",count)
}
/* 
    我们最终执行的代码是通过Babel编译以后的代码
    React.createElement("span",{},count) ---> 调用document上面的一些方法去改变真实的dom的显示状态
    count---> 0 如果我们想要页面里发生一点显示效果的变化，我们得让React.createElement这段代码重复执行
    渲染 === 执行 / 重新渲染 === 函数组件的重新执行
*/
    return (
        <div>
            <button onClick={increase}>+</button>
            <span>{count}</span>
            <button onClick={decrease}>-</button>
            <span>{props.defaultValue}</span>

        </div>
    )
}