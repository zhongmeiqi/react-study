import{useState,useEffect} from 'react'


export default function StudentList(){

    const [studentList,setStudentList] = useState([]);// 很多学生数据，我们需要循环学生数据，然后生成div
    const getStudentListFromServer = async ()=>{
        return new Promise((resolve,reject)=>{
        // setTimeout假设网络请求

            setTimeout(()=>{
                setStudentList([{name:'王晓华'},{name:'黎明'}])
                resolve(true)
            },1000)
        })

    }

    useEffect(()=>{
        // 在这里向服务器获取学生列表
         getStudentListFromServer()

        /*   document.onkeydown=(e)=>{
            console.log('hello key down')
          } */

          const eventHandler = (e)=>{
            console.log('hello key down')
          }
          document.addEventListener('keydown',eventHandler) ;

        //  要不返回undefined，要不返回一个函数
        return()=>{
            document.removeEventListener('keydown',eventHandler)
        }

    },[]) // 依赖也必须是react构建出来的数据 useState


    return (
        <div className="student-list-wrapper">
            {/* 学生列表 */}
            {
                studentList.map(student=>(<div>{student.name}</div>))
            }
        </div>
    )
}