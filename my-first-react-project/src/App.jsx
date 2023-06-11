import { useState } from "react"

function App() {

    const [inputVal,setInputVal]= useState("")
    const [checked,setChecked]= useState(false)


    // 这么写是不对的，会频繁造成这个handleInputChange的引用重复创建
    // 并且这不仅仅是性能上的问题，还有渲染方面的问题存在，以及对方都和接口这类工具函数的使用造成影响
    // 只不过我们还没有学习hooks，所以暂时先这么写
    const handleInputChange=(event)=>{
        console.log('event.value',event.target.value)
        // 接下来可以进行搜索操作
       
    }

    const handleControlledInputChange=(event)=>{
        console.log('event.controlled',event.target.value)
        // 接下来可以进行搜索操作
         // 在onChange的时候去修改inputVal的值
         setInputVal(event.target.value)
    }


    const clearAllField = ()=>{
        setInputVal('')
        setChecked(false)
    }

    return <div>
        {/* 非受控：自由的 */}
        {/* 在React里，onInput和onChange是一个意思 */}
        {/* 非受控组件只能通过defaultValue去设置初始值，然后通过绑定对应的事件去监听值 */}
        {/* 当我们学到ref 以后你可以通过 特别反人类的操作强行清空，但这样没什么必要，也违反了react的初衷 */}
        非受控<input type="text" onChange={handleInputChange}  defaultValue = '初始值'/>

        {/* 为啥没有变化，因为开发者没有让他变化，他是受开发者控制，开发者就是这个组件的实际控制者 */}
        受控<input type="text" value={inputVal} onChange={handleControlledInputChange} />


        非受控 <input type="checkbox"  />


        受控 <input type="checkbox" checked={checked} onChange={(event)=>setChecked(event.target.value)} />


        非受控 <input type="radio" />

        受控 <input type="radio" checked={true}/>

        <button onClick={clearAllField}>清空</button>
    </div>
}

export default App;

