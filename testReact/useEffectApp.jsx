import { useEffect,useState } from "react"
import StudentList from "./component/StudentList"
import Tick from "./component/Tick"

function App() {


    const [showStudentList,setShowStudent] = useState(false)

    const [showTick,setShowTick] = useState(true)


   
   
    return (
        <div>
            <div>{showStudentList.toString()}</div>
            <button onClick={()=>setShowStudent((prev)=>!prev)}>{showStudentList?'隐藏':'显示'}学生列表</button>
            {showStudentList?<StudentList />:null}

            {showTick?<Tick />:null}
            <button onClick={()=>setShowTick((prev)=>!prev)}>{showStudentList?'隐藏':'显示'}活动抢购</button>

        </div>
   )
}

export default App;

