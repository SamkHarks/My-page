import React from "react";
import styles from "./Animation.module.css";
import { Props } from "./types";
import { useWebGLContext, useEvents } from "./hooks";


const Animation = (props: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  // Create the WebGL context
  const { isDeleted, webGLContext, animationContext } = useWebGLContext(props, canvasRef);
  // Add event listeners
  useEvents(props, isDeleted, webGLContext, animationContext);
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