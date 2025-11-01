import { getStyle } from "src/common/utils/utils";
import { useScrollListener } from "src/features/header/hooks/useScrollListener";

type Props = {
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
export const HeaderLogo = ({
  text,
  size,
  strokeWidth = 3,
  rx = 5,
  ry = 20,
  backgroundStroke = "cyan",
  foregroundStroke = "white",
  textFill = "white",
  textProgressFill = "cyan",
}: Props): React.JSX.Element => {
  const progress = useScrollListener();
  // Rectangle's side width
  const sideWidth = size / Math.sqrt(2);
  const halfSize = size / 2;
  // Rotation transform
  const startY = 0;
  const rotationTransform = `rotate(45 ${halfSize} ${startY})`;
  // Animation for the stroke
  const strokeDasharray = sideWidth * 4;
  const strokeDashoffset = strokeDasharray - (progress / 100) * strokeDasharray;
  // clipPath definitions
  const clipId = "text-id-2";
  const clipWidth = ((progress + 0.01) / 100) * 28;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <clipPath id={clipId}>
          <rect x={"17"} y={"0"} width={clipWidth} height={size} />
        </clipPath>
      </defs>
      {/* background rectangle */}
      <rect
        x={halfSize}
        y={startY}
        width={sideWidth}
        height={sideWidth}
        transform={rotationTransform}
        fill={"none"}
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
        fill={"none"}
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
        dominantBaseline={"central"}
        textAnchor={"middle"}
        fontSize={"16"}
        fill={textFill}
        fontFamily={getStyle("--font-family-secondary")}
      >
        {text}
      </text>
      {/* foreground progress text */}
      <text
        x={halfSize}
        y={halfSize}
        dominantBaseline={"central"}
        textAnchor={"middle"}
        fontSize={"16"}
        fill={textProgressFill}
        fontFamily={getStyle("--font-family-secondary")}
        clipPath={`url(#${clipId})`}
      >
        {text}
      </text>
    </svg>
  );
};
