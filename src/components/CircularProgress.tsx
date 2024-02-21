import React from "react";

type Props = {
    radius: number;
    strokeWidth: number;
    progress: number;
    viewBox: string;
    cx: string;
    cy: string;
    stroke: string;
    width?: number;
    height?: number;
}
export const CircularProgress = ({
    radius,
    strokeWidth,
    progress,
    viewBox,
    cx,
    cy,
    stroke,
    height,
    width
}: Props) => {
    const circumference = 2 * Math.PI * radius;
    const toValue = circumference - (progress / 100) * circumference;

    return (
        <svg width={width} height={height} viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
            <circle
                cx={cx}
                cy={cy}
                r={radius}
                fill="none"
                stroke="gray"
                strokeWidth={strokeWidth}
                style={{ opacity: 0.7 }}
            />
            <g transform="rotate(-90 50 50)">
                <circle
                    cx={cx}
                    cy={cy}
                    r={radius}
                    fill="none"
                    stroke={stroke}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={toValue}
                    style={{ strokeLinecap: 'round' }}
                />
            </g>
            <text
                x={50}
                y={50}
                fill="white"
                textAnchor="middle" // Center the text horizontally
                dominantBaseline="central" // Center the text vertically
                fontSize="10" // Adjust the font size as needed
            >
                {`${Math.round(progress)}%`} {/* Display the progress as text */}
            </text>
        </svg>
    );
};