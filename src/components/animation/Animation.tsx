import React from "react";
import styles from "./Animation.module.css";
import { Props } from "./types";
import { useWebGL } from "./hooks";


const Animation = (props: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  useWebGL(props, canvasRef);
  return (
    <canvas
      ref={canvasRef}
      width={props.width}
      height={props.height}
      className={styles.background}
    />
  );
};

export { Animation };