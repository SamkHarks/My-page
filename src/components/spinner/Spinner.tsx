import React from 'react';
import { getSpinnerSize } from './utils';
import styles from './Spinner.module.css';
import { useTranslation } from 'react-i18next';

type Props = {
    size: 'small' | 'medium' | 'large';
}

const Spinner = (props: Props) => {
    const { t } = useTranslation('common');
    const { size, strokeWidth, fontSize } = getSpinnerSize(props.size);
    const halfSize = size / 2;
    const radius = halfSize - (strokeWidth/2);
    const circumference = 2 * Math.PI * radius;
    return (
        <div className={styles.container}>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg" >
                <circle
                    cx={halfSize}
                    cy={halfSize}
                    r={radius}
                    fill='none'
                    stroke='rgb(162, 162, 162)'
                    strokeWidth={strokeWidth}
                />
                <defs>
                    <linearGradient id="fade" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style={{ stopColor: 'cyan', stopOpacity: '1' }} />
                        <stop offset="100%" style={{ stopColor: 'cyan', stopOpacity: '0' }} />
                    </linearGradient>
                </defs>
                <g transform={`rotate(225 ${halfSize} ${halfSize})`}>
                    <circle
                        cx={halfSize}
                        cy={halfSize}
                        r={radius}
                        fill="none"
                        stroke="url(#fade)"
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference / 2}
                        className={styles.spinner}
                    />
                </g>
                <text
                    x={halfSize}
                    y={halfSize}
                    fill='rgb(162, 162, 162)'
                    textAnchor="middle"
                    dominantBaseline="central"
                    fontSize={fontSize}
                >
                    {t("loadindg")}
                </text>
            </svg>
        </div>
    );
};

export { Spinner };
