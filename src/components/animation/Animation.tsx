import React from "react";
import styles from "./Animation.module.css";
import {
  getVertices,
  getVerticesCount,
  setCanvasDimensions,
  updateBuffers,
  updateDynamicMode,
} from "./utils";
import { Props } from "./types";
import { useWebGLContext } from "./hooks";

const Animation = (props: Props) => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const isDynamicMode = React.useRef<boolean>(props.allowDynamic && props.type === 'zigzag'); // initial dynamic mode
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
  //const isDeleted = program.current === null || vShader.current === null || fShader.current === null || vBuffer.current === null || cBuffer.current === null;
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
  };

  // Create the WebGL context
  const isDeleted = useWebGLContext(props, webGLContext);

  React.useEffect(() => {
    if (!canvasRef.current || !glRef.current || !program.current) return;
    const canvas = canvasRef.current;
    const gl = glRef.current;
    const { u_animate, u_dynamic, u_width, u_resolution } = uniformsRef.current;


    let newNumVertices = currentNumVertices.current;
    const handleResize = () => {
      gl.useProgram(program.current);
      gl.uniform1f(u_width, window.innerWidth);

      const isChanged = setCanvasDimensions(canvas, props.type);
      if (isChanged) {
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(u_resolution, canvas.width, canvas.height);
      }

      // Dynamic mode can only be updated for circle type
      if (props.type === 'circle') {
        updateDynamicMode(gl, u_dynamic, isSmallScreen, isDynamicMode);
        return;
      }
      // update buffer data if the number of vertices has changed
      if (props.type !== 'shockwave') return; // Only for shockwave

      if (window.innerWidth <= 600) {
        newNumVertices = 50;
      } else if (window.innerWidth > 600) {
        newNumVertices = 100;
      }

      if (newNumVertices === currentNumVertices.current) return; // No change in vertices count
      if (vBuffer.current === null || cBuffer.current === null || program.current === null) return; // Buffers not created
      const newVertices = getVertices(props.type, newNumVertices);
      updateBuffers(newVertices, gl, vBuffer.current, cBuffer.current, program.current);
      verticesCount.current = getVerticesCount(props.type, newVertices); // vertices count represenst the number of data points to draw
      currentNumVertices.current = newNumVertices;
    };

    const setAnimation = (value: boolean) => {
      if (animate.current === value) return; // Already in the same state
      gl.useProgram(program.current);
      gl.uniform1i(u_animate, value ? 1 : 0);
      animate.current = value;
      animationStartTime.current = value ? performance.now() : null;
    };
    const isScrollendSupported = 'onscrollend' in window;
    let isScrolling = false;
    let timeout: NodeJS.Timeout;
    const handleScroll = () => {
      setAnimation(true);
      isScrolling = true;
      // Manually handle scrollend event if not supported by the browser
      if (!isScrollendSupported) {
        clearTimeout(timeout);
        timeout = setTimeout(handleScrollEnd, 500);
      }
    };

    const handleScrollEnd = () => {
      setAnimation(isDynamicMode.current);
      isScrolling = false;
    };

    const handleMouseEnter = () => {
      if (isDynamicMode.current || isSmallScreen.current) return; // Already set or not allowed
      gl.useProgram(program.current);
      gl.uniform1i(u_dynamic, 1);
      isDynamicMode.current = true;
      setAnimation(true);
    };

    const handleMouseLeave = () => {
      if (!isDynamicMode.current || isSmallScreen.current) return; // Already set or not allowed
      gl.useProgram(program.current);
      gl.uniform1i(u_dynamic, 0);
      isDynamicMode.current = false;
      setAnimation(isScrolling);
    };

    window.addEventListener('resize', handleResize);
    if (props.type === 'circle') {
      document.getElementById('about')?.addEventListener('mouseenter', handleMouseEnter);
      document.getElementById('about')?.addEventListener('mouseleave', handleMouseLeave);
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('scrollend', handleScrollEnd);
    }
    return () => {
      window.removeEventListener('resize', handleResize);
      if (props.type === 'circle') {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('scrollend', handleScrollEnd);
        document.getElementById('about')?.removeEventListener('mouseenter', handleMouseEnter);
        document.getElementById('about')?.removeEventListener('mouseleave', handleMouseLeave);
        clearTimeout(timeout);
      }
    };
  }, [isDeleted]);

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