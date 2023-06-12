// deps
import { useEffect,useState } from "react"

// api
import { getStudentList } from "../../request"

export default function StudentList(){
    // 宁愿敲错，也不要什么都不做
    const [studentList,setStudentList] = useState([])

    const fetchStudentFromServer = async()=>{
        const studentData = await getStudentList;
        console.log(setStudentList)
    }

    useEffect(()=>{
        // 之前是setTimeout模拟，现在是在本地搭建一个服务器
        fetchStudentFromServer()
    },[])

    return (
        <div></div>
    )
}