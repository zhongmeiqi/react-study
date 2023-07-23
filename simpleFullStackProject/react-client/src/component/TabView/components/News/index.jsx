import { useState } from "react";
import NewsItem from "./NewsItem";

const arr = [];
for (let i = 0; i < 500; i++) {
  arr.push(i);
}

export default function NewsList() {
  const [news] = useState(arr);

  //  列表页 往往都是需要循环 循环必定会生成很多元素 我们最好是将这些元素单独封装成一个组件
  // 新闻列表 ---> 单条新闻
  //  学生列表---> 单个学生
  return (
    <div>
      {news.map(
        (newDescriptor) => (
          <NewsItem newDescriptor={newDescriptor} />
        )
        // return (
        //   <div>
        //     {/* title */}
        //     {/* author */}
        //     {/* content */}
        //     {/* time */}
        //     <NewsItem></NewsItem>
        //   </div>
        // );
      )}
    </div>
  );
}
