import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8888",

  // 跨域代理配置
  //   proxy:
});

export const getStudentList = () => {
  return axios.get("/studentList");
};
