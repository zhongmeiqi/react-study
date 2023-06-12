// useEffect 代替生命周期函数

class A extends React.component {
     componentDidMount(){
         docuemnt.getElementByID('btn').addEventListener('click',showLog)
     }
 
     componentDidUnMount(){
         docuemnt.getElementByID('btn').removeEventListener('click',showLog)
     }
 }
 
 

const A = ()=>{
    const showLog = ()=>{
        console.log('myLog')
    }
    useEffect(()=>{
        // componentDidMount 、componentDidUpdate
        docuemnt.getElementByID('btn').addEventListener('click',showLog)
        return ()=>{
        // componentDidUnMount
        docuemnt.getElementByID('btn').removeEventListener('click',showLog)
    }
    },[])

    return (
        <button id='btn'>button</button >
    )

}

/* 踩坑点 1

   state变更触发重新渲染，导致重新定义新变量，从而触发useEffect无限循环。
*/
const test = ()=>{
    const [lists,setLists] = useState([])
    const defaultValue = Object //这里表示defaultValue数据的值是Object类型
    
    // state改变，函数重新执行，defaultValue会重新定义为新的对象实例，由于新对象肯定不相等（引用地址变化了），导致useEffect无限循环
    useEffect(()=>{
        doSomeThings() // 这里面拥有处理状态的业务逻辑。 
    },[defaultValue])

}

/* 踩坑点 2

   useEffect 闭包导致state值不变

   由于useEffect没有依赖项，那么useEffect里面的副作用只在组件初次渲染时执行一次，
   此时useEffect里面的状态都是初始值。又由于useEffect闭包的原因，定时器每次执行取得count都是初始值0，
   所以最终页面展示的一直为1。
*/
const test = ()=>{
    // 定时器里修改count的值没有生效，一直显示1.
    const [count,setCount] = useState(0)

    useEffect(()=>{
        const timer = setInterval(()=>{
            setCount(count+1)
        },1000)
        return ()=>clearInterval(timer)
    },[])

    return (
        <div>{count}</div>
    )
}

//有以下两种修改代码方式可以得到正确的结果

 //方式一 以回调函数的形式修改state。 
 //将状态维护在自己的函数局部作用内，每次调用setCount时是直接获取自己内部的状态，因此结果符合预期。
 useEffect(()=>{
         const timer = setInterval(()=>{
             setCount( count => count+1 )
         },1000)
         return ()=>clearInterval(timer)
     },[])
 

 //方式二 将状态变量添加至依赖项
 // 依赖项状态改变，每次副作用里面取到的状态都是最新值。
     useEffect(()=>{
         const timer = setInterval(()=>{
             setCount(count+1)
         },1000)
         return ()=>clearInterval(timer)
     },[count])
 






