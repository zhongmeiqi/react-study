import { useState, useMemo, useCallback, useTransition } from "react";
import News from "./components/News";
import Home from "./components/Home";
import About from "./components/About";

// 现在要做的就是让切换tab以后的渲染不要影响切换tab本身的工作

export default function TabView() {
  // pending ---> 代表当前是否有Transition任务在执行
  // startTransition(fn) ---> 代表开启一个transition任务 类似 loading(是否在请求中) startRequest（发起请求）
  const [pending, starTransition] = useTransition();

  // home news about 三个页面
  const [presentActiveTab, setPresentActiveTab] = useState("home");

  const tabs = useMemo(() => {
    return [
      {
        key: "home",
        label: "首页",
        component: <Home />,
      },
      {
        key: "news",
        label: "新闻页面",
        component: <News />,
      },
      {
        key: "about",
        label: "关于我们",
        component: <About />,
      },
    ];
  }, []); // 如果没有依赖的话这个tabs就永远不变

  const presentComponent = useMemo(() => {
    return tabs.find((tabObj) => tabObj.key === presentActiveTab).component;
  }, [presentActiveTab, tabs]);

  const changeTab = useCallback((tab) => {
    // 优先级是react底层内部源码中区分的
    // 变为一个transition工作，transition工作是低优先级的，他不会阻塞用户的交互，也不会让页面失去响应
    // 等到下一节课 再讲一个useTransition的案例 大概就能够明白useTransition的用途了，即使你不是很懂优先级
    // hooks的底层是用环形链表
    starTransition(() => {
      setPresentActiveTab(tab);
    });
    // setPresentActiveTab(tab);
  }, []);

  return (
    <div>
      {/*这个和http的加载是有天壤之别的，这个你可以理解为 正在渲染加载中  */}
      {pending ? "正在渲染loading" : null}
      {/* 1、展示tab 2、切换tab渲染不同的页面 */}
      {tabs.map((tabObj) => {
        return (
          <button onClick={() => changeTab(tabObj.key)}>{tabObj.label}</button>
        );
      })}
      {presentComponent}
    </div>
  );
}
//
