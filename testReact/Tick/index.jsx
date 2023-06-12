import { useEffect, useState } from "react";

export default function Tick(){
    // 拼多多 淘宝 京东 有倒计时抢购 一天 6小时
    const [tickTime,setTime] = useState(100);

    useEffect(()=>{
        let timer = setInterval(()=>{
            setTime((prev)=>prev-1)

            console.log('计时器在工作')
        },1000)    

        return()=>{
            clearInterval(timer)
        }
    },[])

    return (
        <div>抢购剩余时间：{tickTime}秒</div>
    )
}