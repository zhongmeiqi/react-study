import { useState } from "react"

import useRequestLoadingDispatcher from "../../hooks/useRequestLoadingDispatcher"

export default function Login(){
    // 再加入一个功能，假设服务器崩了或者服务器返回了错误，我们要进行弹窗

    const {loading,executeRequest} = useRequestLoadingDispatcher()

    const login = ()=>{
        executeRequest(async()=>{
        /* 
            发起网络请求，假设发起网络请求到拿到结果要2秒钟，是不是又要写个loading
        */

        })
      
    }

    return (
        <div>
            <button onClick={login}>{loading?'正在登录中':'已登录'}</button>
        </div>
    )
}