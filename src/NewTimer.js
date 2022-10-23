import React from "react";

const Timer = (props) => {
  const [ms, setMs] = React.useState(0);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      setMs((currentMs) => {
        let newMs = currentMs + 100;
        return newMs;
      });
    }, 100);
    return () => clearInterval(intervalId);
  }, []);

  React.useEffect(() => {
    if (ms > props.maxMs) {
      return props.onOver();
    }
  }, [ms]);

  const el = React.useRef(null);
  React.useLayoutEffect(() => {
    const hotMs = 2500 - Math.min(2500, props.maxMs - ms);
    const hot = hotMs / 2500;
    el.current.style.setProperty("--timer-hot", Math.min(1, hot));
  }, [ms, props]);

  return (
    <div className="timer" ref={el} onClick={props.onRemove}>
      <div>
        {(ms / 1000).toFixed(1)}s / {(props.maxMs / 1000).toFixed(1)}s
      </div>
    </div>
  );
};

export default Timer;
