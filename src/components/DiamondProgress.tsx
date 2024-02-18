import React from "react";

type Props= {
    progress: number;
    text: string;
    size: number;
}

export const DiamondProgress = ({ progress, text }: Props) => {
    const size = 40;
    const sideWidth = size / Math.sqrt(2);
    const halfSize = size / 2;
    const maskId = "text-id-2";
    // Rotation transform
    const rotationTransform = `rotate(45 ${halfSize} ${0})`;
    // Animation for the stroke
    const strokeDasharray = sideWidth * 4; // Total length of the diamond's border
    const strokeDashoffset = strokeDasharray - (progress / 100) * strokeDasharray;
    const reversedDashoffset = (progress * strokeDasharray) / 100;
    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>


            <defs>
                <linearGradient id="progress-gradient" x1="0" x2="1" y1="0" y2="0">
                    <stop offset={`${progress}%`} stopColor="white" />
                    <stop offset={`${progress}%`} stopColor="transparent" />
                </linearGradient>
                <mask id={maskId}>
                    <rect x="10" y="0" width={halfSize} height={size} fill={`url(#progress-gradient)`} />
                </mask>
            </defs>

            <rect
                x={halfSize}
                y="0"
                width={sideWidth}
                height={sideWidth}
                transform={rotationTransform}
                fill="none"
                stroke="cyan"
                strokeWidth="1"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={-reversedDashoffset}
            />
            <rect
                x={halfSize}
                y="0"
                width={sideWidth}
                height={sideWidth}
                transform={rotationTransform}
                fill="none"
                stroke="orangered"
                strokeWidth="1"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                style={{ strokeLinecap: 'round' }}
            />
            <text
                x={halfSize}
                y={halfSize}
                dominantBaseline="central"
                textAnchor="middle"
                fontSize="15"
                fill="orangered"
            >
                {text}
            </text>
            <text
                x={halfSize}
                y={halfSize}
                dominantBaseline="central"
                textAnchor="middle"
                fontSize="15"
                fill="cyan"
                mask={`url(#${maskId})`}
            >
                {text}
            </text>
        </svg>
    );
};