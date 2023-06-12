// deps
import { useEffect,useState } from "react"

// api
import { getStudentList } from "../../request"

import StudentItem from "./components/StudentItem"

import useRequestLoadingDispatcher from "../../hooks/useRequestLoadingDispatcher"

// 登录 登录中loading；提交表单 loading

export default function StudentList(){
    // 宁愿敲错，也不要什么都不做
    const [studentList,setStudentList] = useState([])

    const {loading,executeRequest} = useRequestLoadingDispatcher()


    const fetchStudentFromServer = async()=>{
        executeRequest(async()=>{
            const studentResponse = await getStudentList();    
            setStudentList(studentResponse.data)
        })
        
    }

    useEffect(()=>{
        // 之前是setTimeout模拟，现在是在本地搭建一个服务器
        fetchStudentFromServer()
    },[])

    return (
        <div>
            {
                loading? <div>正在加载中...</div>:( studentList.map((student)=>{
                        return <StudentItem {...student}/>
                    })
                )   
            }
        </div>
    )
}