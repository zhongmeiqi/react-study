import { useState } from "react"

function App() {

    const [obj,setObj] = useState({
        a:1,
        b:2
    })

    const [arr,setArr] = useState([])


    const updateObjValue=()=>{
        console.log(11)
        // 如果是更新引用值的状态，我们必须是传递一个新的引用
        setObj(prev=>{
            return {
                ...prev,
                b:3
            }
        })

        setArr(prev=>[...prev,1])

        // 错误:immutable state 不可变状态，就是你每一次给状态传递的值都是不可变化的也就意味着这个值是一次性的
        // 如果你想要变更状态，则要传递一个新的值进去
      /*   setObj(prev=>{
            prev.b=3;
            return prev
        }) */
    }

    return (
        <div onClick={updateObjValue}>
            a:{obj.a}
            b:{obj.b}

            数组：{arr}
        </div>
    )
}

export default App;

