import React from "react";

interface CircularProgressProps {
  score: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  label?: string;
}

export default function CircularProgress({
  score,
  size = 120,
  strokeWidth = 10,
  className = "",
  label = ""
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  // Compute color based on score range
  let strokeColor = "stroke-emerald-500";
  let bgFillColor = "text-emerald-400";
  let textColor = "text-white";

  if (score < 50) {
    strokeColor = "stroke-rose-500";
    bgFillColor = "text-rose-400";
    textColor = "text-rose-400";
  } else if (score < 75) {
    strokeColor = "stroke-amber-500";
    bgFillColor = "text-amber-400";
    textColor = "text-amber-400";
  }

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="stroke-white/10 fill-none"
          strokeWidth={strokeWidth}
        />
        {/* Progress Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className={`${strokeColor} fill-none transition-all duration-1000 ease-out`}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      {/* Content overlays */}
      <div className="absolute flex flex-col items-center justify-center">
        <span className={`text-4xl font-light font-sans tracking-tight ${textColor === "text-white" ? "text-white" : textColor}`}>
          {score}
        </span>
        {label && (
          <span className="text-[9px] font-sans font-semibold uppercase tracking-wider text-white/40 mt-1">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
