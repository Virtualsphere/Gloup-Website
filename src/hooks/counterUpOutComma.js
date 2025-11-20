import { useEffect, useRef, useState } from "react";

const useCounterUpOut = ({ end, delay = 10, time = 1000 }) => {
  const ref = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animateCounter();
          setHasAnimated(true);
          observer.unobserve(el); // stop observing after animation
        }
      },
      { threshold: 0.6 }
    );

    observer.observe(el);

    function animateCounter() {
      const steps = Math.ceil(time / delay);
      const increment = end / steps;
      let current = 0;
      let count = 0;

      const tick = () => {
        current += increment;
        count++;

        if (count >= steps) {
          el.textContent = end;
        } else {
          el.textContent = Math.floor(current);
          setTimeout(tick, delay);
        }
      };

      el.textContent = "0";
      tick();
    }

    return () => observer.disconnect();
  }, [end, delay, time, hasAnimated]);

  return ref;
};

export default useCounterUpOut;

