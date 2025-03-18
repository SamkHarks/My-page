import { getStyle } from "src/utils/utils";

const SMALL = 75;
const MEDIUM = 100;
const LARGE = 125;

export const getSpinnerSize = (
  size: "small" | "medium" | "large" | number,
  strokeWidth?: number
): { size: number; strokeWidth: number; fontSize: string | undefined; }  => {
  if (typeof size === "number") {
    return { size, strokeWidth: strokeWidth ?? 1 , fontSize: undefined };
  }

  if (size === "small") {
    return {
      size: SMALL,
      strokeWidth: 1,
      fontSize: getStyle("--font-size-XS"),
    };
  } else if (size === "medium") {
    return {
      size: MEDIUM,
      strokeWidth: 1,
      fontSize: getStyle("--font-size-M"),
    };
  } else {
    return { size: LARGE, strokeWidth: 2, fontSize: getStyle("--font-size-L") };
  }
};
