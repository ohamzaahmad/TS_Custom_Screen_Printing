
import React from 'react';

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div 
      className={`skeleton rounded-2xl ${className}`} 
      aria-hidden="true"
    />
  );
};

export default Skeleton;
