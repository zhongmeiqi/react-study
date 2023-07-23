// deps
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useLayoutEffect,
} from "react";

// api
import { getStudentList } from "../../request";

import StudentItem from "./components/StudentItem";

import useRequestLoadingDispatcher from "../../hooks/useRequestLoadingDispatcher";

// 登录 登录中loading；提交表单 loading

export default function StudentList(props) {
  // 宁愿敲错，也不要什么都不做
  const [studentList, setStudentList] = useState([]);

  const { loading, executeRequest } = useRequestLoadingDispatcher();

  /* const [studentNameListState,setStudentNameList] = useState([])

    useEffect(()=>{
        const _studentNameList = studentList.map(stu=>stu.name)
        setStudentNameList(_studentNameList)
    },[studentList]) // 从逻辑上来讲，就是studentNameList --->一定会依赖于这个studentList这个数据 */

  // 需求：只需要拿studentList里面的每个学生的name，然后去做其他事情
  const studentNameList = useMemo(
    () => studentList.map((stu) => stu.name),
    [studentList]
  ); // 我们想留存他的引用

  const fetchStudentFromServer = useCallback(async () => {
    executeRequest(async () => {
      const studentResponse = await getStudentList();
      setStudentList(studentResponse.data);
      //   setStudentList([]);
    });
  }, [executeRequest]);

  // 先显示了暂无学生数据
  // 在现实了正在加载中
  // 最后显示了对应的学生列表
  useEffect(() => {
    // 之前是setTimeout模拟，现在是在本地搭建一个服务器
    fetchStudentFromServer();
  }, []);
  /* useLayoutEffect(()=>{
        // 之前是setTimeout模拟，现在是在本地搭建一个服务器
        fetchStudentFromServer()
    },[]) */
  // 再引入一个逻辑，就是假设这个studentList为空，studentList.length ===0
  // 显示暂无学生数据，否则显示学生列表
  // 用一种比较刁钻的方式来写，因为只有这样写才能够体现出useEffect和useLayoutEffect的差别

  // 模拟一种情况，让页面渲染非常多的东西，一旦渲染的东西多了，渲染时长必定是要变长的
  // 渲染一个大型项目->2s，但是我们这个demo渲染出来只要0.5s，我们只需要想办法拖延1.5s就可以模拟大型项目了
  /*     for(let i = 0;i<50000;i++){
        console.log(i)
    } */

  return (
    <div>
      {!loading && studentList.length === 0 && <div>暂无学生数据</div>}
      {loading.toString()}{" "}
      {loading ? (
        <div>正在加载中...</div>
      ) : (
        studentList.map((student) => {
          return <StudentItem key={student.id} {...student} />;
        })
      )}
      {studentNameList}
    </div>
  );
}
