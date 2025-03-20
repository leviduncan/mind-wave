
import React from "react";

interface ProgressRingProps {
  progress: number;
  className?: string;
}

const ProgressRing: React.FC<ProgressRingProps> = ({ progress, className = "" }) => {
  // Calculate the circumference of the circle
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  
  return (
    <svg 
      className={`w-full h-full -rotate-90 animate-pulse-subtle ${className}`} 
      viewBox="0 0 100 100"
      aria-label={`Session progress: ${Math.round(progress * 100)}%`}
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke="rgba(0,0,0,0.1)"
        strokeWidth="4"
      />
      <circle
        cx="50"
        cy="50"
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - progress)}
        className="text-primary transition-all duration-1000"
      />
    </svg>
  );
};

export default ProgressRing;
