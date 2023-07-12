import { useCallback, useEffect, useState ,useRef ,forwardRef } from "react"

// let inputDomElement = null;

function TestInput(props,parentRef){

    // 设计理念：就是react始终希望组建的props是纯净的，属性一旦变化，就会造成组建的重新渲染
    // 但是我们知道ref的变动时不会造成组建的重新渲染
    // 我们要避免的是一个东西的不确定型 我们应该尽量去保证一个东西的稳定性



    // const [inputDomElement,setInputDOmElement] = useState(null);
    const inputElementRef = useRef(null);
    const divElementRef = useRef(null);

    console.log("Test input渲染")
  /*   useEffect(()=>{
        // 这个真实dom和react没有任何关系，然后确定有没有必要给它设置状态？（通过如果不给他设置状态会不会对页面有什么不好的效果）
        // const inputExampleElement = document.getElementsByClassName("input-example")[0];
        //设置进去的目的是为了在其他地方可以访问这个真实dom
        // setInputDOmElement(inputExampleElement);

        inputElementRef.current = document.getElementsByClassName("input-example")[0];
    },
    []) */

    useEffect(()=>{
        parentRef.current = 1
    }, [parentRef])

    const handleInput = useCallback(()=>{
        console.log('用户对应的输入事件触发')
    },[])

    // 来顶帧
    const handleClick = useCallback(()=>{
        for(let i=0;i<50000;i++){
            console.log('222')
        }
    },[])
    return (
        <div ref={divElementRef}>
            {/* 拿到input的真实dom 去调用真实dom上的focus方法 */}
            {/* 它使用了useEffect去帮你获取真实dom并且赋值 */}
            {/* <input ref={parentRef} className="input-example" type="text" /> */}
            <input onChange={handleInput} className="input-example" type="text" />
        <button onClick={handleClick}>click me</button>
        </div>
    )
}

// export default TestInput
export default forwardRef(TestInput)

// 给子组件挂ref 是要求子组件去追加forWardRef的，同时forwardRef会得到的这个ref属性通过第二个参数传递给真实的函数组件

/* function forwardRef(Component){
    return function(props){
        const {ref,...realProps} = props;
        return Component(realProps,ref)
    }
} */
