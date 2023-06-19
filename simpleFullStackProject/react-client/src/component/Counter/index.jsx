import { useCallback, useState } from "react";

export default function Counter(){

    const [count,setCount] = useState(0);

    const addCount=useCallback(()=>{
        setCount(prev=>prev+1)
    },[])
    // 由于没有给getCountValue做任何的性能处理，每次组建的重新渲染他都毫无例外地参与了引用的重新创建 
    // 不给任何依赖的后果是：使用的是首次渲染的时间切片,是0;加了依赖count之后，就能拿到最新值
    const getCountValue=useCallback(()=>{
        console.log('最新的countValue',count); //每一次count改变都会重新渲染，导致getCountValue的重新刷新
    },[count])
    // 当以来发生变化以后，在不同的hook里会有不同的效果
    //1. useEffect: 导致useEffect注册函数重新执行
    //2. useCallback：导致useCallback对应的函数引用重新生成
    

    return (
        <div>
            <span>{count}</span>
            <button onClick={addCount}>add  count</button>
            <button onClick={getCountValue}>get counte value</button>
        </div>
    )
}