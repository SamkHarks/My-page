import React from "react";
import { getStyle } from "../../utils/utils";

type Props = {
  progress: number;
  text: string;
  size: number;
  strokeWidth?: number;
  backgroundStroke?: string;
  foregroundStroke?: string;
  textFill?: string;
  textProgressFill?: string;
  rx?: number;
  ry?: number;
};
export const RectangleProgress = ({
  progress,
  text,
  size,
  strokeWidth = 3,
  rx = 5,
  ry = 20,
  backgroundStroke = "cyan",
  foregroundStroke = "red",
  textFill = "orangeRed",
  textProgressFill = "cyan",
}: Props) => {
  // Rectangle's side width
  const sideWidth = size / Math.sqrt(2);
  const halfSize = size / 2;
  // Rotation transform
  const startY = 0;
  const rotationTransform = `rotate(45 ${halfSize} ${startY})`;
  // Animation for the stroke
  const strokeDasharray = sideWidth * 4; // Total length of the diamond's border
  const strokeDashoffset = strokeDasharray - (progress / 100) * strokeDasharray;
  const maskId = "text-id-2";
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <linearGradient id="progress-gradient" x1="0" x2="1" y1="0" y2="0">
          <stop offset={`${progress}%`} stopColor="white" />
          <stop offset={`${progress}%`} stopColor="transparent" />
        </linearGradient>
        <mask id={maskId}>
          <rect
            x={halfSize - 14}
            y="0"
            width={halfSize}
            height={size}
            fill={`url(#progress-gradient)`}
          />
        </mask>
      </defs>
      {/* background rectangle */}
      <rect
        x={halfSize}
        y={startY}
        width={sideWidth}
        height={sideWidth}
        transform={rotationTransform}
        fill="none"
        stroke={backgroundStroke}
        strokeWidth={strokeWidth}
        rx={rx}
        ry={ry}
      />
      {/* foreground rectangle */}
      <rect
        x={halfSize}
        y={startY}
        width={sideWidth}
        height={sideWidth}
        transform={rotationTransform}
        fill="none"
        stroke={foregroundStroke}
        strokeWidth={strokeWidth}
        strokeDasharray={strokeDasharray}
        strokeDashoffset={strokeDashoffset}
        pathLength={strokeDasharray}
        rx={rx}
        ry={ry}
      />
      {/* background text */}
      <text
        x={halfSize}
        y={halfSize}
        dominantBaseline="central"
        textAnchor="middle"
        fontSize="16"
        fill={textFill}
        fontFamily={getStyle("--font-family-secondary")}
      >
        {text}
      </text>
      {/* foreground progress text */}
      <text
        x={halfSize}
        y={halfSize}
        dominantBaseline="central"
        textAnchor="middle"
        fontSize="16"
        fill={textProgressFill}
        fontFamily={getStyle("--font-family-secondary")}
        mask={`url(#${maskId})`}
      >
        {text}
      </text>
    </svg>
  );
};
