import React from "react";
import '../App.css';

type Props= {
    progress: number;
    text: string;
    size: number;
}
interface CustomStyle extends React.CSSProperties {
    '--dynamic-dashoffset': string;
}
export const DiamondProgress = ({ progress, text, size }: Props) => {
    // Diamond's side width
    const sideWidth = size / Math.sqrt(2);
    const halfSize = size / 2;
    const maskId = "text-id-2";
    // Rotation transform
    const rotationTransform = `rotate(45 ${halfSize} ${0})`;
    // Animation for the stroke
    const strokeDasharray = sideWidth * 4; // Total length of the diamond's border
    const strokeDashoffset = strokeDasharray - (progress / 100) * strokeDasharray;
    const reversedDashoffset = (progress * strokeDasharray) / 100;
    // Inline styles to dynamically set CSS variables
    const foregroundStyle: CustomStyle = {
        '--dynamic-dashoffset': `${strokeDashoffset}`
    };

    const backgroundStyle: CustomStyle = {
        '--dynamic-dashoffset': `${-reversedDashoffset}`
    };
    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>


            <defs>
                <linearGradient id="progress-gradient" x1="0" x2="1" y1="0" y2="0">
                    <stop offset={`${progress}%`} stopColor="white" />
                    <stop offset={`${progress}%`} stopColor="transparent" />
                </linearGradient>
                <mask id={maskId}>
                    <rect x="8" y="0" width={halfSize+2} height={size} fill={`url(#progress-gradient)`} />
                </mask>
            </defs>
            {/* background rectangle */}
            <rect
                className="animated-stroke"
                x={halfSize}
                y="0"
                width={sideWidth}
                height={sideWidth}
                transform={rotationTransform}
                fill="none"
                stroke="cyan"
                strokeWidth="1.5"
                strokeDasharray={strokeDasharray}
                style={backgroundStyle}
            />
            {/* foreground rectangle */}
            <rect
                className="animated-stroke"
                x={halfSize}
                y="0"
                width={sideWidth}
                height={sideWidth}
                transform={rotationTransform}
                fill="none"
                stroke="orangered"
                strokeWidth="1.5"
                strokeDasharray={strokeDasharray}
                style={foregroundStyle}
            />
            {/*  */}
            {/* background text */}
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
            {/* foreground progress text */}
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
