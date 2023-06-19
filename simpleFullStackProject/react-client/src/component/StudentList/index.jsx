// deps
import { useCallback, useEffect,useMemo,useState } from "react"

// api
import { getStudentList } from "../../request"

import StudentItem from "./components/StudentItem"

import useRequestLoadingDispatcher from "../../hooks/useRequestLoadingDispatcher"

// 登录 登录中loading；提交表单 loading

export default function StudentList(){
    // 宁愿敲错，也不要什么都不做
    const [studentList,setStudentList] = useState([])

    const {loading,executeRequest} = useRequestLoadingDispatcher()

    /* const [studentNameListState,setStudentNameList] = useState([])

    useEffect(()=>{
        const _studentNameList = studentList.map(stu=>stu.name)
        setStudentNameList(_studentNameList)
    },[studentList]) // 从逻辑上来讲，就是studentNameList --->一定会依赖于这个studentList这个数据 */



    // 需求：只需要拿studentList里面的每个学生的name，然后去做其他事情
    const studentNameList = useMemo(()=>studentList.map(stu=>stu.name),[studentList]);// 我们想留存他的引用


    const fetchStudentFromServer = useCallback(async()=>{

            executeRequest(async()=>{
                const studentResponse = await getStudentList();    
                setStudentList(studentResponse.data)
            }) 
        },[executeRequest]
    ) 

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
            {studentNameList}
        </div>
    )
}