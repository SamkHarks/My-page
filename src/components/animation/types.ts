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
  allowWierdMode?: boolean;
  dynamicColor?: boolean;
}