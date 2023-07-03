import { forwardRef, useCallback, useState,useImperativeHandle } from "react";
// import ForceUpdate from "../ForceUpdateTest";
import useForceUpdate from "../../hooks/useForceUpdate";

 function Counter(props,ref){
    console.log(props.defaultCount)

    const [count,setCount] = useState(0);

    const forceUpdate = useForceUpdate();

    // 需求：父组件要拿到子组件提供的一个密钥 这个密钥是通过count + 一个随机字符串生成的
    // 同时count如果不变，则这个密钥是不会变的

    // ref.current = count + Math.random(); // 每次函数组件的重新渲染都会将它重新赋值 会造成一些问题
    
    // 第一个参数ref:意味着他在底层会去改你这个ref的current属性
    // 第二个参数是一个函数：这个函数的返回值最终会被丢到这个ref.current属性上去
    // 第三个参数是依赖项：重头戏 意味着依赖项不变的化 ref的current值不会被重新赋值
    useImperativeHandle(ref,()=>{
        return count+ Math.random()
    },[count])
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
            <button onClick={forceUpdate}>强制刷新Counter组件</button>
        </div>
    )
}

export default forwardRef(Counter)