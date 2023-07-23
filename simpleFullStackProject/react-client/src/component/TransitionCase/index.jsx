import { useCallback, useState, useTransition } from "react";

export default function TransitionCase() {
  const [inputValue, setInputValue] = useState("");
  const [recommendList, setRecommendList] = useState([]); // 开始啥推荐都没有
  const [isPending, startTransition] = useTransition();

  const handleChange = useCallback((event) => {
    setInputValue(event.target.value); // setInputValue的优先级就不会被抢了
    // 很多时候，在设置完inputValue的值以后 会做一些额外的事情
    // 注册用户名，会有格式限制，那这个我们会子安到本地校验一次这个用户名是否合法
    // 为啥要在本地校验，对，后端也会给你校验
    // 因为你本地校验了是不是就不用产生额外的网络请求（后端为什么要做校验，后端一定要做校验，但不是为了你前端服务的）
    // 后端做校验是为了别人绕过前端直接请求他的API，是为了数据的安全性和完整性（postman）

    // 那我们有一个需求，就是本地校验完如果不合法 那么我们就给他推荐几个合法的用户名，这些合法的用户名都是经过运算的

    // 我们默认他永远不合格，生成推荐数据
    // 假设一个点：生成推荐数据这个运算要500ms
    startTransition(() => {
      //把这段代码放低优先级，不会阻止用户正常交互
      const _innerRecommendList = [];
      for (let i = 0; i < 15000; i++) {
        _innerRecommendList.push(`${event.target.value}_${i}_rec`);
      }
      setRecommendList(_innerRecommendList);
    });
  }, []);

  return (
    <div>
      <input value={inputValue} onChange={handleChange} />
      {isPending ? (
        <div>正在计算中...</div>
      ) : (
        recommendList.map((elm) => {
          return <div>{elm}</div>;
        })
      )}
    </div>
  );
}
