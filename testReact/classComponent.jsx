//下面是一个Class类组件
import React from 'react'
import ReactDOM from 'react-dom';

// 需要通过this去获取组件实例的数据和方法

class Counter extends React.Component {   
     static defaultProps = { //设置props的默认值       
         name: 'Wangyibo',        
         age:23    
        };    
        //调用构造函数   
        constructor(props) {       
            super(props); //接受到父组件传入进来的props        
            //初始化state        
            this.state = {number: 0}    
        }    
        componentWillMount() {        
            console.log('父组件挂载之前');   
        }  

        componentDidMount() {        
            console.log('父组件挂载完成');    
        }    
        shouldComponentUpdate(newProps, newState) {        
            console.log('父组件是否需要更新');        
            if (newState.number<15) return true; //true 表示需要更新        
            return false //false表示不需要更新    
        }    
        componentWillUpdate() {        
            console.log('父组件将要更新');    
        }    
        componentDidUpdate() {       
            console.log('父组件更新完成');    
        }    
        handleClick = () => { 
            //使用箭头函数，利用箭头函数的this特性，这里就不需要在constructor里面去给函数绑定this了        
            this.setState({ number: this.state.number + 1  })};    
            render() {   
                console.log('render(父组件挂载)');        
                return (            
                    <div>                
                        <p>{this.state.number}</p>                
                        <button onClick={this.handleClick}>+</button>                    
                        { this.state.number < 10 ?  (此处可渲染其他子组件) :null}            
                    </div>        
                    )    
        }}
                
        ReactDOM.render(<Counter/>, document.getElementById('root'));
