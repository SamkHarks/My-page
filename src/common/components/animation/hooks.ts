import { useEffect, useRef } from 'react';
import { AnimationContext, Props, WebGLContext } from 'src/common/components/animation/types';
import {
  COLUMNS,
  createProgram,
  createShader,
  getDrawType,
  getFragmentShaderSource,
  getRandomColorVertices,
  getVertices,
  getVerticesCount,
  setCanvasDimensions,
  setupBuffers,
  setupUniforms,
  updateBuffers,
  updateDynamicMode
} from 'src/common/components/animation/utils';
import { vertexShaderSource } from 'src/common/components/animation/shaders';

const useWebGLContext = (
  props: Props,
  canvasRef: React.RefObject<HTMLCanvasElement | null>
): {webGLContext: WebGLContext, animationContext: AnimationContext } => {
  const isDynamicMode = useRef<boolean>(props.allowDynamic && props.type === 'zigzag');
  const vShader = useRef<WebGLShader | null>(null);
  const fShader = useRef<WebGLShader | null>(null);
  const program = useRef<WebGLProgram | null>(null);
  const vBuffer = useRef<WebGLBuffer | null>(null);
  const cBuffer = useRef<WebGLBuffer | null>(null);
  const glRef = useRef<WebGL2RenderingContext | null>(null);
  const uniformsRef = useRef<Record<string, WebGLUniformLocation | null>>({});
  const animate = useRef<boolean>(false);
  const animationStartTime = useRef<DOMHighResTimeStamp | null>(null);
  const verticesCount = useRef<number>(0);
  const prevElapsedTime = useRef<number>(0);
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl2", { alpha: true, antialias: props.type === 'shockwave' });
    if (!gl) {
      return; // WebGL not supported
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
    const { vertexBuffer, colorBuffer } = setupBuffers(gl,program.current, vertices, colors);
    vBuffer.current = vertexBuffer;
    cBuffer.current = colorBuffer;

    const uniforms = setupUniforms(gl, program.current, props, isDynamicMode.current);
    uniformsRef.current = uniforms;

    // Draw the scene
    const isCircle = props.type === 'circle';
    const drawType = getDrawType(props.type, gl);
    let animationFrameId: number;
    let elapsedTime = 0;
    verticesCount.current = getVerticesCount(props.type, vertices);
    const offsetTime = 0.8;
    const render = (time: number) => {
      if (!glRef.current || !program.current) return; // Program has been deleted
      const currentGl = glRef.current;
      currentGl.clear(currentGl.COLOR_BUFFER_BIT);
      currentGl.useProgram(program.current);
      const u_time = uniformsRef.current.u_time;
      if (!u_time) return;
      // Calculate the elapsed time based on the animation start time
      if (isCircle) {
        const startTime = animationStartTime.current ?? 0;
        if (animate.current) {
          // Forward animation
          elapsedTime = (time - startTime) * 0.001;
          prevElapsedTime.current = elapsedTime;
        } else {
          // Reverse animation
          elapsedTime = ((time - startTime) * 0.001) - prevElapsedTime.current;
        }
      }
      // Pass the calculated time to the shader
      gl.uniform1f(u_time, isCircle ? elapsedTime + offsetTime  : time * 0.001);
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
      glRef.current = null;
    };

    /**
     * Disabling 'react-hooks/exhaustive-deps' rule for this effect because refs are not needed in the dependency array.
     * canvasRef is stable (.current value doesn't trigger re-render).
     * Adding only non-ref dependencies to ensure the effect runs when the relevant state or props change.
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);
  return {
    webGLContext: { canvasRef, glRef, program, uniformsRef, vBuffer, cBuffer, vShader, fShader },
    animationContext: { animate, isDynamicMode, verticesCount, animationStartTime }
  };
};

const useEvents = (props: Props, webGLContext: WebGLContext, animationContext: AnimationContext) => {
  const documentRef = useRef<Document | null>(document);
  const isSmallScreen = useRef<boolean>(window.innerWidth <= 400);
  const currentNumVertices = useRef<number>(props.numVertices);
  const { canvasRef, glRef, program, uniformsRef, vBuffer, cBuffer } = webGLContext;
  const { animate, isDynamicMode, verticesCount, animationStartTime } = animationContext;
  useEffect(() => {
    if (!canvasRef.current || !glRef.current || !program.current || !documentRef.current) return;
    const currentDocument = documentRef.current;
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
      if (value) {
        animationStartTime.current = performance.now();
      }
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
      setAnimation(false);
    };

    window.addEventListener('resize', handleResize);
    if (props.type === 'circle') {
      currentDocument.getElementById('about')?.addEventListener('mouseenter', handleMouseEnter);
      currentDocument.getElementById('about')?.addEventListener('mouseleave', handleMouseLeave);
    }
    return () => {
      window.removeEventListener('resize', handleResize);
      if (props.type === 'circle') {
        currentDocument.getElementById('about')?.removeEventListener('mouseenter', handleMouseEnter);
        currentDocument.getElementById('about')?.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  /**
  * Disabling 'react-hooks/exhaustive-deps' for this effect because
  * the following variables are refs: canvasRef, glRef, program, uniformsRef,
  * vBuffer, cBuffer, animate, isDynamicMode, verticesCount, animationStartTime.
  *
  * Since refs are stable (their .current value changes don't trigger re-renders),
  * they don't need to be included in the dependency array.
  *
  * We only add non-ref dependencies to ensure the effect
  * runs when the relevant state or props change.
  */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);
};

const useWebGL = (props: Props, canvasRef: React.RefObject<HTMLCanvasElement | null>): void => {
  // Create the WebGL context
  const { webGLContext, animationContext } = useWebGLContext(props, canvasRef);
  // Add event listeners
  useEvents(props, webGLContext, animationContext);
};

export { useWebGL };