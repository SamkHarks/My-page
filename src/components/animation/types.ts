export type Type = 'circle' | 'zigzag' | 'shockwave';

export enum UniformTypes {
  ZIGZAG,
  CIRCLE,
  SHOCKWAVE,
}

export type Props = {
  type: 'circle' | 'zigzag' | 'shockwave';
  width: number;
  height: number;
  numVertices: number;
  allowDynamic: boolean;
}

export type WebGLContext = {
  canvasRef: React.RefObject<HTMLCanvasElement>,
  glRef: React.MutableRefObject<WebGL2RenderingContext | null>,
  vShader: React.MutableRefObject<WebGLShader | null>,
  fShader: React.MutableRefObject<WebGLShader | null>,
  program: React.MutableRefObject<WebGLProgram | null>,
  vBuffer: React.MutableRefObject<WebGLBuffer | null>,
  cBuffer: React.MutableRefObject<WebGLBuffer | null>,
  isDynamicMode: React.MutableRefObject<boolean>,
  uniformsRef: React.MutableRefObject<Record<string, WebGLUniformLocation | null>>,
  animate: React.MutableRefObject<boolean>,
  animationStartTime: React.MutableRefObject<DOMHighResTimeStamp | null>,
  verticesCount: React.MutableRefObject<number>,
};