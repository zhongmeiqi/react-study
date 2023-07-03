import { useCallback, useState,useRef } from "react"

// let timerId=null;

/* 
    闭包

    也为这使用多个Ticker组件访问道德timerId都是同一个
    如果写在 Ticker组件里面，那又会每次渲染都会被初始化
    写成状态useState，又会造成没有必要的页面性能浪费
*/
export default function Ticker(){

    const [timeCount,setTimeCount] = useState(60)
    const timerIdRef = useRef(1);
    console.log('timerIRef',timerIdRef)




    const startTick = useCallback(()=>{
        timerIdRef.current = setInterval(()=>{
            setTimeCount((prev)=>prev-1)
        },1000)
        // timerId的变化有必要去造成页面的重新渲染吗？
        // 什么时候应该去使用状态？？如果你的组件里的数据需要和react产生连接（视图需要变化），那么你就需要使用状态
        // timerId有必要和react产生连接吗？判断是否需要产生连接的标准是：不产生连接的情况下对页面有没有影响
        // setTimeId(_timerId)
    },[])

    const stopTick = useCallback(()=>{
        // 停止计时器
        clearInterval(timerIdRef.current)

    },[])

    return (
        <>
            <button onClick={startTick}>start</button>
            <span>{timeCount}</span>
            <button onClick={stopTick}>stop</button>

        </>
    )
}