import { useEffect,useState } from "react"
import StudentList from "./component/StudentList"

function App() {

    const [bool,setBool] = useState(true)



    useEffect(()=>{
        console.log('hello App')
    },[bool])
   
    return (
        <div>
            <button onClick={()=>setBool(()=>!bool)}>click me</button> 
            <StudentList />
        </div>
   )
}

export default App;

