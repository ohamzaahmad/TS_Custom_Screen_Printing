import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "../../lib/utils";

interface TiltedCardProps {
  children?: React.ReactNode;
  imageSrc?: string;
  altText?: string;
  captionText?: string;
  containerHeight?: string;
  containerWidth?: string;
  imageHeight?: string;
  imageWidth?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  displayOverlayContent?: boolean;
  overlayContent?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const springValues = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

/**
 * ReactBits TiltedCard.
 * 3D card tilt with spring physics and dynamic specular glare that responds to cursor coordinates.
 */
export const TiltedCard: React.FC<TiltedCardProps> = ({
  children,
  imageSrc,
  altText = "Card image",
  scaleOnHover = 1.03,
  rotateAmplitude = 14,
  overlayContent,
  className,
  onClick,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(y, [-0.5, 0.5], [rotateAmplitude, -rotateAmplitude]),
    springValues
  );
  const rotateY = useSpring(
    useTransform(x, [-0.5, 0.5], [-rotateAmplitude, rotateAmplitude]),
    springValues
  );

  const glareX = useTransform(x, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(y, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={cn("relative cursor-pointer select-none [perspective:1000px]", className)}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: scaleOnHover }}
        transition={{ duration: 0.3 }}
        className="relative w-full h-full rounded-3rem overflow-hidden bg-slate-900 border border-slate-200/80 shadow-lg hover:shadow-2xl transition-shadow duration-300"
      >
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={altText}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        ) : (
          children
        )}

        {/* Specular Glare Effect */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 mix-blend-overlay opacity-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 0.35 : 0,
            background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 60%)`,
          }}
          aria-hidden="true"
        />

        {overlayContent && (
          <div className="absolute inset-0 z-10">{overlayContent}</div>
        )}
      </motion.div>
    </div>
  );
};

export default TiltedCard;

