import React from "react";
import { cn } from "../../lib/utils";

interface ShinyTextProps {
  text: string;
  className?: string;
  speed?: number;
}

/**
 * ReactBits-style ShinyText.
 * A lightweight gradient sweep used for small eyebrow labels.
 */
export const ShinyText: React.FC<ShinyTextProps> = ({
  text,
  className,
  speed = 4,
}) => (
  <span
    className={cn("shiny-text", className)}
    style={{ animationDuration: `${speed}s` }}
  >
    {text}
  </span>
);

export default ShinyText;
