/* useMemo
useMemo 用于避免不必要的重复计算，主要用于缓存一些复杂的计算结果，
防止每次渲染组件都要重新执行这个复杂的计算过程，类似于Vue里面的计算属性，它在组件渲染过程中直接执行。 */

const sum = useMemo(()=>{
    // 一系列计算
},[count])

/*  
useMemo() 接收两个参数：
第一个必填参数是一个函数，用于执行相应的计算，返回计算后的新值，这个值将被缓存起来 
（也可以没有返回值，单纯的缓存某个函数的运行过程，依赖项不改变，这个函数就不会重新运行，适合处理高阶函数的场景）； 

第二个可选参数是一个依赖项数组，只要依赖项有值改变了，这个函数就会重新执行。如果没有提供这个依赖项，useMemo在每次渲染时都会计算新的值。
*/ 

const App = () => {
    const [count1,setCount1] = useState(0)
    const [message,setMessage] = useState('abcdefg')
    
    useEffect(()=>{
      const timer = setInterval(()=>{
        setCount1((count1)=>count1+1) // 每秒都要更新一次count1，那么组件也是每秒重新渲染一次
      },1000)
      return ()=>clearInterval(timer)
      },[])
  
  // 定义一个用于反转字符串的函数
    const reverse = () => {
       console.log(message)
       return message.split('').reverse().join('')
    }
  
  // 获得反转字符串。由于前面定义的定时器，导致组件每秒都要重新渲染一次，
//   因此该计算反转字符串的函数也是每秒都会重新调用执行一次。如果计算量很大，则每次都要执行是很消耗性能的。
    const reversedMessage = reverse()
  
    const doChangeStr = ()=>{
      setMessage(message=>message+Math.ceil(Math.random()*10))
    }
    
    return (
      <div className="App">
        <div>{count1}</div>
        <button onClick={doChangeStr}>修改字符串</button>
        <p>原始字符串{ message }</p>
        <p>计算后反转字符串: { reversedMessage }</p>
      </div>
    );
  }


  // ****** 体现useMemo价值的地方来了 ******
  const App = () => {
    const [count1,setCount1] = useState(0)
    const [message,setMessage] = useState('abcdefg')
    
    useEffect(()=>{
      const timer = setInterval(()=>{
        setCount1((count1)=>count1+1)
      },1000)
      return ()=>clearInterval(timer)
      },[])
  
  // 组件初次渲染时计算得到reversedMessage，然后后面组件的每秒刷新，
  // reversedMessage这个值都是从缓存中读取，而不会重新计算得到，
  // 只有当依赖项message改变才会重新计算reversedMessage的值
  const reversedMessage = useMemo(()=>{
    console.log(message)
    return message.split('').reverse().join('')
  },[message])
  
    const doChangeStr = ()=>{
      setMessage(message=>message+Math.ceil(Math.random()*10))
    }
    
    return (
      <div className="App">
        <div>{count1}</div>
        <button onClick={doChangeStr}>修改字符串</button>
        <p>原始字符串{ message }</p>
        <p>计算后反转字符串: { reversedMessage }</p>
      </div>
    );
  }
  