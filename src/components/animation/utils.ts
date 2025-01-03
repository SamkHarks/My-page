
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

export const generateShockWaveVertices = (): Float32Array => {
  return new Float32Array([
    // first shockwave
    -1, 0, 0,
    -0.55, 0, 0,
    -0.5, 0.2, 0,
    -0.5, -0.2, 0,
    -0.4, 0.4, 0,
    -0.4, -0.4, 0,
    -0.3, 0.2, 0,
    -0.3, -0.2, 0,
    -0.2, 0, 0,

    // second shockwave
    0.2, 0, 0,
    0.3, -0.2, 0,
    0.3, 0.2, 0,
    0.4, -0.4, 0,
    0.4, 0.4, 0,
    0.5, -0.2, 0,
    0.5, 0.2, 0,
    0.55, 0, 0,
    1, 0, 0
  ]);
};

export const getType = (type: 'circle' | 'zigzag' | 'shockwave'): number => {
  switch (type) {
    case 'zigzag':
      return 0;
    case 'circle':
      return 1;
    case 'shockwave':
      return 2;
  }
};

export const getVertices = (type: 'circle' | 'zigzag' | 'shockwave', numberOfVertices: number): Float32Array => {
  if (type === 'circle') {
    return generateCircleVertices(0,0,1,numberOfVertices);
  } else if (type === 'zigzag') {
    return generateZigZagVertices(numberOfVertices);
  } else {
    return generateShockWaveVertices();
  }
};

export const getDrawType = (type: 'circle' | 'zigzag' | 'shockwave', gl: WebGL2RenderingContext): GLenum => {
  return type === 'circle' ? gl.TRIANGLE_FAN : gl.LINE_STRIP;
};