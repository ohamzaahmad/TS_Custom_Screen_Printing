import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface MagneticProps {
  children: React.ReactElement;
  springOptions?: { bounce?: number; damping?: number; stiffness?: number; mass?: number };
  intensity?: number;
  range?: number;
  className?: string;
}

/**
 * ReactBits Magnetic.
 * Pulls elements smoothly toward the cursor within a defined radius using spring physics.
 */
export const Magnetic: React.FC<MagneticProps> = ({
  children,
  intensity = 0.35,
  range = 100,
  className = "",
  springOptions = { damping: 15, stiffness: 150, mass: 0.1 },
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < range) {
      setPosition({ x: distanceX * intensity, y: distanceY * intensity });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", ...springOptions }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default Magnetic;

