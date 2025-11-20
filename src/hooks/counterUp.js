import { useEffect, useRef } from "react";

const useCounterUp = ({ end, delay = 10, time = 400 }) => {
  const ref = useRef();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const steps = time / delay;
          const isFloat = String(end).includes(".");
          const decimals = isFloat ? end.toString().split(".")[1].length : 0;

          let current = 0;
          const counter = setInterval(() => {
            current++;
            let value = ((end / steps) * current).toFixed(decimals);
            el.innerText = value;
            if (current >= steps) {
              clearInterval(counter);
              el.innerText = end.toLocaleString();
            }
          }, delay);

          observer.disconnect(); // Run only once
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [end, delay, time]);

  return ref;
};

export default useCounterUp;
