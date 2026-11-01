import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "../../lib/utils";

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  onAnimationComplete?: () => void;
}

/**
 * ReactBits BlurText.
 * Smooth word- or character-by-character reveals triggered by viewport intersection using customizable blur and opacity transitions.
 */
export const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 0.05,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "-50px",
  onAnimationComplete,
}) => {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, amount: threshold });

  const defaultFrom =
    direction === "top"
      ? { filter: "blur(12px)", opacity: 0, transform: "translate3d(0,-20px,0)" }
      : { filter: "blur(12px)", opacity: 0, transform: "translate3d(0,20px,0)" };

  const defaultTo = {
    filter: "blur(0px)",
    opacity: 1,
    transform: "translate3d(0,0,0)",
  };

  return (
    <span ref={ref} className={cn("inline-flex flex-wrap", className)}>
      {elements.map((element, i) => (
        <motion.span
          key={i}
          initial={defaultFrom}
          animate={inView ? defaultTo : defaultFrom}
          transition={{
            duration: 0.6,
            delay: i * delay,
            ease: [0.16, 1, 0.3, 1],
          }}
          onAnimationComplete={i === elements.length - 1 ? onAnimationComplete : undefined}
          className="inline-block will-change-[transform,filter,opacity]"
        >
          {element === " " ? "\u00A0" : element}
          {animateBy === "words" && i < elements.length - 1 && "\u00A0"}
        </motion.span>
      ))}
    </span>
  );
};

export default BlurText;

