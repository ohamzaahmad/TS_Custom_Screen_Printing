import React, { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { cn } from "../../lib/utils";

interface NumberTickerProps {
  value: number;
  direction?: "up" | "down";
  delay?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
  decimalPlaces?: number;
}

/**
 * ReactBits NumberTicker / Counter.
 * Smooth ease-out numerical tally animation when entering the viewport.
 */
export const NumberTicker: React.FC<NumberTickerProps> = ({
  value,
  direction = "up",
  delay = 0,
  className,
  prefix = "",
  suffix = "",
  decimalPlaces = 0,
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px" });
  const [displayValue, setDisplayValue] = useState(direction === "down" ? value : 0);

  useEffect(() => {
    if (!inView) return;

    const timeout = setTimeout(() => {
      let startTimestamp: number | null = null;
      const duration = 1800; // 1.8s
      const startValue = direction === "down" ? value : 0;
      const endValue = direction === "down" ? 0 : value;

      const step = (timestamp: number) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        // easeOutExpo
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = startValue + (endValue - startValue) * easeProgress;

        setDisplayValue(current);

        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };

      window.requestAnimationFrame(step);
    }, delay * 1000);

    return () => clearTimeout(timeout);
  }, [inView, value, direction, delay]);

  const formattedValue = displayValue.toLocaleString(undefined, {
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  });

  return (
    <span ref={ref} className={cn("inline-block tabular-nums", className)}>
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  );
};

export default NumberTicker;

