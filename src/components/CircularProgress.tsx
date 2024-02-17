import React from "react";
import '../App.css';

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

                />
            </g>
        </svg>
    );
};