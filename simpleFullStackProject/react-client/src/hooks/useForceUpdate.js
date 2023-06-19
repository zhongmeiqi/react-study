import { useState } from "react";

export default function useForceUpdate() {
  // 因为空对象是个引用值，所以每次创建都会有新的引用

  const [_, setForceObj] = useState({});

  const forceUpdate = () => {
    setForceObj({});
  };

  return forceUpdate;
}
