import { useEffect, useState } from "react"
import useForceUpdate from "../../hooks/useForceUpdate"
import useWindowScrollWatcher from "../../hooks/useWindowScrollWatcher"


export default function ForceUpdate(){
    console.log("组件进行了渲染")
    
    const forceUpdate = useForceUpdate()

    useWindowScrollWatcher(()=>{
        console.log('ForceUpdateTest这个组件的浏览器滚动事件触发了')
    });//你在监听浏览器滚动事件

    // useEffect(()=>{
    //     const scrollHandler = ()=>{
    //         console.log('浏览器滚动了')
    //     }
    //     document.addEventListener('scroll',scrollHandler)
    //     return ()=>{
    //         document.removeEventListener('scroll',scrollHandler)
    //     }
    // })

    return (
        // <div style={{height:"1000px"}}>
        <div>

        <button onClick={forceUpdate}>force update</button>

        </div>
    )
}