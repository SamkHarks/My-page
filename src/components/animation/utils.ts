import { assert } from "../../utils/utils";
import { Type, UniformTypes } from "./types";

export const createRotationMatrix = (angle: number): Float32Array => {
  const cosA = Math.cos(angle);
  const sinA = Math.sin(angle);
  return new Float32Array([
    cosA, -sinA, 0, 0,
    sinA, cosA, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  ]);
};

export const COLUMNS = 60;
export const generateZigZagVertices = (numVertices: number): Float32Array => {
  const vertices = [];
  const step = 2.0 / (numVertices - 1);
  const stepX = 2.0 / (COLUMNS-1);
  for (let j = 0; j < COLUMNS; j++) {
    const xStart = -0.95 + stepX*j;
    for (let i = 0; i < numVertices; i++) {
      const x = i % 2 === 0 ? xStart : xStart - 0.05;
      const y = 1.0 - step * i;
      vertices.push(x, y, 0);
    }
  }
  return new Float32Array(vertices);
};


export const generateCircleVertices = (centerX: number, centerY: number, radius: number, numSegments: number): Float32Array => {
  const vertices = [];
  vertices.push(centerX, centerY, 0); // Center vertex
  for (let i = 0; i <= numSegments; i++) {
    const angle = (i / numSegments) * 2 * Math.PI;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    vertices.push(x, y, 0);
  }
  return new Float32Array(vertices);
};

const generateShockWaveVertices = (numberOfVerticesPerShockWave: number) => {
  assert(numberOfVerticesPerShockWave % 2 === 0, 'Number of vertices per shockwave must be even');
  assert(numberOfVerticesPerShockWave >= 4, 'Number of vertices per shockwave must be at least 4');

  const vertices = [];
  const verticalVertices = numberOfVerticesPerShockWave - 4; // Total vertical vertices for both shockwaves
  const verticalPointsPerWave = verticalVertices / 2; // Divide equally between the two shockwaves

  const maxY = 0.4;
  const minY = 0.1;
  const yValues = []; // Store y-values for vertical lines

  // Generate the y-values for vertical lines (symmetric from minY to maxY and back to minY)
  for (let i = 0; i < (verticalPointsPerWave / 2)-1; i++) {
    const y = minY + ((maxY - minY) * i) / ((verticalPointsPerWave / 2) - 1); // Linear increase in y-values
    yValues.push(y);
  }
  yValues.push(maxY); // Add maxY
  for (let i = yValues.length - 2; i >= 0; i--) {
    yValues.push(yValues[i]); // Mirror the y-values for decreasing part
  }

  const numberOfYValues = yValues.length;
  // Start positions for shockwaves
  const xStartPositions = [-1, 0.2]; // xStart for the first and second shockwave
  const xEndPositions = [-0.2, 1];   // xEnd for the first and second shockwave

  const xHorizontalLineLength = 0.2; // Length of horizontal lines
  const verticalSpace = 0.5; // Space between horizontal lines for verticals (-0.8 to -0.2 for first wave, 0.4 to 1 for second)

  for (let waveIndex = 0; waveIndex < 2; waveIndex++) {
    const xStart = xStartPositions[waveIndex];
    const xEnd = xEndPositions[waveIndex];
    const stepX = verticalSpace / (numberOfYValues+1); // Dynamic stepX based on the number of vertical lines
    // First horizontal line (y = 0)
    vertices.push(xStart, 0, 0); // Start of the line
    vertices.push(xStart + xHorizontalLineLength , 0, 0); // Next point on the horizontal line
    // Vertical lines
    for (let j = 0; j < numberOfYValues; j++) {
      const x = xStart + xHorizontalLineLength + stepX * (j+1); // Shift x forward for vertical lines
      const y = yValues[j];

      // Vertical line: two points, one above and one below the x-axis
      vertices.push(x, y, 0);  // Positive y
      vertices.push(x, -y, 0); // Negative y
    }

    // Second horizontal line (y = 0)
    vertices.push(xEnd - xHorizontalLineLength + 0.1, 0, 0); // Start of the second horizontal line
    vertices.push(xEnd, 0, 0); // End of the second horizontal line
  }

  return new Float32Array(vertices);
};

export const getUniformType = (type: Type): number => {
  switch (type) {
    case 'zigzag':
      return UniformTypes.ZIGZAG;
    case 'circle':
      return UniformTypes.CIRCLE;
    case 'shockwave':
      return UniformTypes.SHOCKWAVE;
  }
};


export const getNumberOfVertices = (type: Type, nOfVertices?: number): number => {
  if (nOfVertices) {
    return nOfVertices;
  }
  switch (type) {
    case 'circle':
      return 50;
    case 'zigzag':
      return 20;
    case 'shockwave':
      return 100;
  }
};

export const getVertices = (type: Type, numberOfVertices: number): Float32Array => {
  if (type === 'circle') {
    return generateCircleVertices(0,0,1,numberOfVertices);
  } else if (type === 'zigzag') {
    return generateZigZagVertices(numberOfVertices);
  } else {
    return generateShockWaveVertices(numberOfVertices);
  }
};

export const getDrawType = (type: Type, gl: WebGL2RenderingContext): GLenum => {
  if (type === 'circle') {
    return gl.TRIANGLE_FAN;
  } else if (type === 'zigzag') {
    return gl.LINE_STRIP;
  } else {
    return gl.LINES;
  }
};

/**
 * @brief Get the number of vertices to be drawn for a given type
 * @param type the shape type
 */
export const getVerticesCount = (type: Type, vertices: Float32Array): number => {
  switch (type) {
    case 'circle':
      return vertices.length / 3;
    case 'zigzag':
      return (vertices.length / 3) / COLUMNS; // Number of vertices per column
    case 'shockwave':
      return (vertices.length / 3) / 2; // Number of vertices per shockwave
    default:
      return 0;
  }
};


export const getCanvasDimensions = (type: Type) => {
  if (type === 'circle') return null; // No need to change canvas dimensions for circle
  if (type === 'zigzag') {
    return { width: Math.max(window.innerWidth, 1000), height: 580 };
  } else {
    const width = window.innerWidth < 768 ? window.innerWidth : window.innerWidth - 100;
    switch (true) {
      case window.innerWidth >= 1050:
        return { width, height: 100 };
      case window.innerWidth > 950:
        return { width, height: 90 };
      case window.innerWidth > 860:
        return { width, height: 85 };
      case window.innerWidth > 800:
        return { width, height: 80 };
      case window.innerWidth > 760:
        return { width, height: 75 };
      case window.innerWidth > 700:
        return { width, height: 72 };
      case window.innerWidth > 670:
        return { width, height: 70 };
      case window.innerWidth > 620:
        return { width, height: 67 };
      case window.innerWidth > 500:
        return { width, height: 63 };
      default:
        return { width, height: 62 };

    }
  }
};


export const setCanvasDimensions = (canvas: HTMLCanvasElement, type: Type): boolean => {
  const dim = getCanvasDimensions(type);
  if (!dim) return false; // No need to change canvas dimensions for circle
  if (dim.width === canvas.width && dim.height === canvas.height) return false; // No need to change dimensions if they are the same as before
  canvas.width = dim.width;
  canvas.height = dim.height;
  return true;
};