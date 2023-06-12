// 注意将函数用useCallback 包起来，防止每次渲染组件都调用Effect。

// useCallback用于避免不必要的渲染，主要用于缓存函数。
// 一般在子组件调用父组件的方法时，父组件的方法都用useCallback包起来
const handleSearch = useCallback(()=>{
    // 一系列业务逻辑
})
<Child  handleSearch={handleSearch}/>

/* 
useCallback()接收两个参数
第一个必填参数是定义的回调函数，用于组件的事件处理，他在组件的渲染过程中，只是定义，并不运行；
第二个可选参数是一个依赖项数组，用于控制该回调函数是否需要重新定义

💡注意💡：当里面的回调函数用到了状态数据时，一定要记得将该状态变量添加进依赖项里，使得状态变更，重新以最新状态值更新回调函数，否则回调函数里面的状态变量永远是第一次渲染时的初始值。

*/ 
// test1 ：简答粗暴的传一个箭头函数
const test1 = ()=>{
    ...
    return (
        <Button onClick={()=>{}} />
    )
}
// 问题：test1 代码中，直接将业务逻辑以匿名函数的形式传给了Button，先不说业务逻辑与UI耦合，这种形式还存在一个问题就是当test组件每次重新渲染的时候，都会生成一个新的重复的匿名箭头函数，导致Button组件的 onClick 属性变更，从而触发Button组件的重新渲染 （渲染结果没有变化）

// test2 : 解耦业务逻辑和UI组件
const test2 = ()=>{
    const [count,setCount] = useState(0)
    const [initVal, setInitVal] = useSatte('')
    
    const onChange = (e) => {
        setInitVal(e.target.value)
    }

    const addCount = () => {
        setCount(count+1)
    }

    return (
        <Input onChange={onChange} value={initVal}/>
        <button onClick={addCount}>点我+1: {count}</button>
    )
}
// 问题：test2代码中，将业务逻辑抽离出来了，传递引用地址给组件。但是点击button组件时，由于更改了count state的值，会导致组件test2重新渲染，函数组件的重新渲染就是整个函数的重新执行，因此又重新定义了新的 onChange 函数，导致Input组件的onChange属性变化了 （因为函数是对象类型，每次新定义的函数引用地址是不一样的），从而导致Input组件做了不必要的渲染（因为点击button,只是更改了count的值，与Input相关的props都没有改变）
// test3 : 体现useCalllback价值的地方来了
const test3 = ()=>{
    const [count,setCount] = useState(0)
    const [initVal, setInitVal] = useSatte('')
    
    const onChange = useCallback((e) => {
        setInitVal(e.target.value)
    },[]) //如果不传递参数，则组件每次渲染也都会重新定义回调函数。又因为该回调函数不依赖状态，所以只传递空数组依赖即可，仅在组件初次渲染时定义回调函数

    const addCount = useCallback(() => {
        setCount(count+1)
    },[count]) // 因为回调函数中用到了状态变量，所以需要将该状态作为依赖项传递，使得每次回调拿到的状态都是最新值，而不是初次渲染时的初始值。

    return (
        <Input onChange={onChange} value={initVal}/>
        <button onClick={addCount}>点我+1: {count}</button>
    )
}
// 优势：用了useCallback包裹回调函数后，则不会因为父组件的重新渲染导致子组件不必要的渲染，从而减少渲染，提升组件性能。

