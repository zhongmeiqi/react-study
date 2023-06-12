import { useState } from "react";

// 自定义 hooks 一定要以use开头
export default function useRequestLoadingDispatcher() {
  const [loading, setLoading] = useState(false);

  const executeRequest = async (promiseFn) => {
    setLoading(true);
    await promiseFn();
    /* 
    const result = await promiseFn();
    if (result.code !== 200) {
      alert(result.message);
    } */
    setLoading(false);
  };
  return {
    loading,
    executeRequest,
  };
}
