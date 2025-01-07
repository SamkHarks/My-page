import React from "react";
import styles from "./Animation.module.css";
import { Props } from "./types";
import { useWebGLContext, useEvents } from "./hooks";


const Animation = (props: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const isDynamicMode = React.useRef<boolean>(props.allowDynamic && props.type === 'zigzag');
  const isSmallScreen = React.useRef<boolean>(window.innerWidth <= 400);
  const currentNumVertices = React.useRef<number>(props.numVertices);
  const vShader = React.useRef<WebGLShader | null>(null);
  const fShader = React.useRef<WebGLShader | null>(null);
  const program = React.useRef<WebGLProgram | null>(null);
  const vBuffer = React.useRef<WebGLBuffer | null>(null);
  const cBuffer = React.useRef<WebGLBuffer | null>(null);
  const glRef = React.useRef<WebGL2RenderingContext | null>(null);
  const uniformsRef = React.useRef<Record<string, WebGLUniformLocation | null>>({});
  const animate = React.useRef<boolean>(false);
  const animationStartTime = React.useRef<DOMHighResTimeStamp | null>(null);
  const verticesCount = React.useRef<number>(0);
  const webGLContext = {
    canvasRef,
    glRef,
    vShader,
    fShader,
    program,
    vBuffer,
    cBuffer,
    isDynamicMode,
    uniformsRef,
    animate,
    animationStartTime,
    verticesCount,
    currentNumVertices,
    isSmallScreen,
  };
  // Create the WebGL context
  const isDeleted = useWebGLContext(props, webGLContext);
  // Add event listeners
  useEvents(props, isDeleted, webGLContext);

  return (
    <canvas
      id={'animation-canvas'}
      ref={canvasRef}
      width={props.width}
      height={props.height}
      className={styles.background}
    />
  );
};

export { Animation };