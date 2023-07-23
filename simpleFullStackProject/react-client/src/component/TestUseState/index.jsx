import { useCallback } from "react";
import useState from "../../hooks/useState";

function TestUseState(props, ref) {
  console.log(props.defaultCount);

  //   const [selfCount, setSelfCount] = myUseState(0);
  const [count, setCount] = useState(0);
  const [words, setWords] = useState("hello world");

  console.log("selfCount:", "重新渲染", "count:", count);

  const increase = useCallback(() => {
    setCount((prev) => prev + 1);
    // setSelfCount((prev) => prev + 1);
  }, []);
  const decrease = useCallback(() => {
    setCount((prev) => prev - 1);
    // setSelfCount((prev) => prev - 1);
  }, []);

  const changeWords = useCallback(() => {
    setWords(Math.random());
  }, []);

  return (
    <div>
      <span>count:{count}</span>

      {/* <span>selfCount:{selfCount}</span> */}
      <button onClick={increase}>increase count</button>
      <button onClick={decrease}>decrease count</button>
      <span>words:{words}</span>

      <button onClick={changeWords}>changeWords</button>
    </div>
  );
}

export default TestUseState;
