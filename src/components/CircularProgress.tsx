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
  let bgFillColor = "text-emerald-50";
  let textColor = "text-emerald-900";

  if (score < 50) {
    strokeColor = "stroke-rose-500";
    bgFillColor = "text-rose-50";
    textColor = "text-rose-900";
  } else if (score < 75) {
    strokeColor = "stroke-amber-500";
    bgFillColor = "text-amber-50";
    textColor = "text-amber-900";
  }

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          className="stroke-slate-200 fill-none"
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
        <span className={`text-3xl font-bold font-sans tracking-tight ${textColor}`}>
          {score}
        </span>
        {label && (
          <span className="text-[10px] font-sans font-medium uppercase tracking-wider text-slate-500 mt-0.5">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
