import { useEffect } from 'react';
import { Props, WebGLContext } from './types';
import { COLUMNS, createProgram, createShader, getDrawType, getFragmentShaderSource, getRandomColorVertices, getVertices, getVerticesCount, setupBuffers, setupUniforms } from './utils';
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
    //let animationStartTime: DOMHighResTimeStamp | null = null;
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

export { useWebGLContext };