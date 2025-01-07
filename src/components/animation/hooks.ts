import { useEffect } from 'react';
import { Props, WebGLContext } from './types';
import { COLUMNS, createProgram, createShader, getDrawType, getFragmentShaderSource, getRandomColorVertices, getVertices, getVerticesCount, setCanvasDimensions, setupBuffers, setupUniforms, updateBuffers, updateDynamicMode } from './utils';
import { vertexShaderSource } from './shaders';

const useWebGLContext = (
  props: Props,
  webGLContext: WebGLContext
) => {
  const { canvasRef, glRef, vShader, fShader, program, vBuffer, cBuffer, isDynamicMode, uniformsRef, animate, animationStartTime, verticesCount } = webGLContext;
  const isDeleted = program.current === null || vShader.current === null || fShader.current === null || vBuffer.current === null || cBuffer.current === null;
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl2", { alpha: true, antialias: props.type === 'shockwave' });
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }
    glRef.current = gl;
    gl.lineWidth(1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Create shaders
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, getFragmentShaderSource(props.type));
    if (vertexShader === null || fragmentShader === null) return;
    vShader.current = vertexShader;
    fShader.current = fragmentShader;

    // Create program
    const shaderProgram = createProgram(gl, vertexShader, fragmentShader);
    if (shaderProgram === null) return;
    program.current = shaderProgram;

    // Setup buffers
    const vertices = getVertices(props.type, props.numVertices);
    const colors = getRandomColorVertices(vertices.length / 3 * 4);
    const { vertexBuffer, colorBuffer } = setupBuffers(gl,shaderProgram, vertices, colors);
    vBuffer.current = vertexBuffer;
    cBuffer.current = colorBuffer;

    const uniforms = setupUniforms(gl, shaderProgram, props, isDynamicMode.current);
    uniformsRef.current = uniforms;
    const { u_time } = uniforms;

    // Draw the scene
    const isCircle = props.type === 'circle';
    const drawType = getDrawType(props.type, gl);
    let animationFrameId: number;
    let elapsedTime = 0;
    verticesCount.current = getVerticesCount(props.type, vertices);
    const offsetTime = 0.8;
    const render = (time: number) => {
      if (isDeleted) return; // Program has been deleted
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(shaderProgram);
      // Calculate the elapsed time based on the animation start time
      const startNewTimer = (isCircle && (isDynamicMode.current || animate.current));
      if (startNewTimer && animationStartTime.current !== null) {
        elapsedTime = (time - animationStartTime.current) * 0.001;
      }
      // Pass the calculated time to the shader
      gl.uniform1f(u_time, startNewTimer ? elapsedTime + offsetTime  : time * 0.001);
      if (isCircle) {
        gl.drawArrays(drawType, 0, verticesCount.current);
      } else if (props.type === 'zigzag') {
        for (let j = 0; j < COLUMNS; j++) {
          const start = j * verticesCount.current;  // Starting index for this column
          gl.drawArrays(drawType, start, verticesCount.current);  // Draw the zigzag column
        }
      } else {
        gl.drawArrays(drawType, 0, verticesCount.current);
        gl.drawArrays(drawType, verticesCount.current, verticesCount.current);
      }
      animationFrameId = requestAnimationFrame(render);
    };
    requestAnimationFrame(render);
    return () => {
      if (!gl) return;
      // Cleanup
      cancelAnimationFrame(animationFrameId);
      // Unset the current program before deleting it
      gl.useProgram(null);

      gl.clear(gl.COLOR_BUFFER_BIT);
      if (vShader.current) gl.deleteShader(vShader.current);
      if (fShader.current) gl.deleteShader(fShader.current);
      if (program.current) gl.deleteProgram(program.current);
      if (vBuffer.current) gl.deleteBuffer(vBuffer.current);
      if (cBuffer.current) gl.deleteBuffer(cBuffer.current);

      vShader.current = null;
      fShader.current = null;
      program.current = null;
      vBuffer.current = null;
      cBuffer.current = null;
    };

  }, [
    isDeleted
  ]);
  return isDeleted;
};

const useEvents = (props: Props, isDeleted: boolean, webGLContext: WebGLContext) => {
  const { canvasRef, glRef, program, uniformsRef, animate, isDynamicMode, verticesCount, vBuffer, cBuffer, animationStartTime, currentNumVertices, isSmallScreen } = webGLContext;
  useEffect(() => {
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
};

export { useWebGLContext, useEvents };