import StudentList from "./component/StudentList"
import ForceUpdate from "./component/ForceUpdateTest"
import Counter from "./component/Counter"
import Ticker from "./component/Ticker"
import TestInput from "./component/TestInput"
import {useEffect, useRef, useCallback,useState} from "react"
import ThemeContext from "./context/themeContext"


// 过去给类组件挂ref可以得到类组件的实例 new 
/* import ClassComponent from "XXX"

我们简单理解 类组件就是一个构造函数（class类组件就是构造函数的语法糖）
ClassComponent--->是一个构造函数，new一个实例出来，挂上ref之后，会把这个组件实例给你
<ClassComponent ref={}/> */


function App(){
    const divRef = useRef(null)
    const testInputRef = useRef(null);
    const counterRef = useRef(null);
    const [theme,setTheme] = useState('light')

    useEffect(()=>{
        // 要等到节点渲染出来
        console.log("divRef",divRef)
        console.log("testInputRef",testInputRef)


    })
    const handleClick = useCallback(()=>{
        // 获取真实dom
        // console.log(inputDomElement,inputDomElement.focus())
        // inputElementRef.current.focus()
        // divElementRef.current.innerHTML = 'hello'
        console.log('TestInput',testInputRef)
        // testInputRef.current.focus()

        console.log('counterRef',counterRef)
    },[])

    const changeTheme = useCallback(()=>{
        setTheme((prev)=>{
            if(prev==='light') return "dark"
            return "light"
        })
    },[])

    return (
        <div ref={divRef} className="wrapper">
            <ThemeContext.Provider value={theme}>
                <StudentList />
                <ForceUpdate />
                <Counter defaultCount={10} ref={counterRef}/>
                <Ticker/>
                <Ticker/>
                {/* 给组件ref 函数组件就是一个函数 一个函数的执行我们无非可以得到两个东西：1.函数的引用 2.返回值 上下文*/}
                {/* 返回值是要渲染到页面里的元素，也不能给你 */}
                {/* 函数的上下文随着函数的执行而创建 随着函数的执行完毕而销毁 */}
                {/* 但是有一种场景是有必要的，父组件想要去访问子组件的一些东西【这节课先说真实DOM】 */}
                <TestInput ref={testInputRef}/>
                {/* <button onClick={handleClick}>click me</button> */}
                <button onClick={changeTheme}>change theme</button>
            </ThemeContext.Provider>

        </div>
    )
}

export default App