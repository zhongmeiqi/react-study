// useState用于处理状态（数据）

import React from 'react'

class A extends React.component {    
    // class组件中，state类型是一个对象，以key:value的形式设置初始state    
    constructor(props) {       
    
    this.state = {        
        state1: value1,        
        state2: value2,        
    }    
    //获取state,例如    
    this.state.state1    
    //设置state,例如        
    this.setState({            
        state1: newValue1        
    })
    }
}



    /* 使用useState hooks */
    function A(){    
        const [state1,setState1] = useState(0)    
        const [state2,setState2] = useState([])    
        //获取state,例如    
        state1 //直接获取    
        //设置state,例如    
        setState1(2)
    }

    /* useState踩坑点：

        对于函数组件，只要props或者state更改了，组件就会重新渲染。
        但是是要真正的更改，如果你setState的值和上次一样或者对象的引用地址没变，则组件是不会重新渲染的，
        一般来说，容易踩坑的地方就是在处理对象上，比如[]===[]永远为false一样，
        在设置对象类型的state时，一定要记得赋值的是一个新对象！！！

        通常方式有2种
    */

    //方式一，采用es6的对象解构
    {...obj}
    //方式二，采用Object.assign()，复制新对象
    Object.assign({},obj,{...})

    <button onClick={()=>{setMaleGod({...maleGod})}}>是他是他就是他</button>


    const getDefaultCheckVals = () => {}
    const [defaultCheckVals,setDefaultCheckVals] = useState(getDefaultCheckVals())
    
    /* 
        每次组件重新渲染，getDefaultVal函数都会执行一次
        为了让这个设置默认值的函数只在最初执行一次
        可以以回调函数形式进行改写
    */
    
    const getDefaultCheckVals = () => {}
    const [defaultCheckVals,setDefaultCheckVals] = useState(()=>getDefaultCheckVals())
    

