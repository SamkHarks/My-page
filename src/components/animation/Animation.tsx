import React from "react";
import styles from "./Animation.module.css";
import { COLUMNS, generateCircleVertices, generateZigZagVertices } from "./utils";

const vertexShaderSource = `
  attribute vec3 a_Position;
  attribute vec4 a_Color;
  uniform mat4 trans;
  varying vec4 v_Color;
  void main() {
    gl_Position = trans * vec4(a_Position, 1.0);
    v_Color = a_Color;
  }
`;

const fragmentShaderSource = `
  precision mediump float;
  varying vec4 v_Color;
  uniform float u_Time;
  uniform bool u_Wierd; // Wierd mode
  uniform bool u_Border; // Border mode
  uniform int u_Type; // Type of shape, 0 = zigzag, 1 = circle
  uniform vec2 u_Resolution;
  float borderSize = 0.05;

  vec3 getColors(float t) {
    vec3 a = vec3(0.5);
    vec3 b = vec3(0.2);
    vec3 c = vec3(1.0);
    vec3 d = vec3(0.263, 0.416, 0.557);
    return a + b * cos(6.28318 * (c * t + d));
  }

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - u_Resolution) / u_Resolution; // normalized FragCoord to [-1,1]

    float interval = 2.0; // Interval in seconds
    float speed = 0.15;  // Controls how fast it moves downwards

    // Zigzag
    if (u_Type == 0) {
      for (int i = 0; i < 30; i++) {
        float stableTime = floor(u_Time / interval) + float(i);
        float xPos = random(vec2(stableTime, 0.0)) * 2.0 - 1.0;
        float yPosStart = random(vec2(stableTime, 1.0));
        float yPos = (fract(yPosStart + u_Time * speed) * 2.0 - 1.0) * -1.0;  // Subtract to move downwards
        if (!u_Border && yPos + 0.2 > uv.y
          && yPos - 0.2 < uv.y
          && xPos + 0.0013 > uv.x
          && xPos - 0.0013 < uv.x
        ) {
          gl_FragColor =  v_Color; //vec4(0.0, 1.0, 1.0, 1.0);
          break;
        }// else {
        // gl_FragColor = vec4(1.0, 1.0, 1.0, 1);
        // continue;
        //} //transparent line 
      }
    
    // Circle, u_Type == 1
    } else {
      float d = length(uv);
      if (u_Border && 0.45 < d && d < 0.8 ) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
        return; // transparent areas inside the circle
      }

      //if (u_Border && 0.41 < d && d < 0.45 ) { //d > 0.96) {
      //  gl_FragColor = vec4(1.0, 1.0, 1.0, 0.0); //vec4(1.0, 1.0, 1.0, 1.0);
      //  return; white borders
      //}

      if (!u_Wierd) {
        vec3 colors = getColors(u_Time * 0.15);
        gl_FragColor = vec4(colors, 1);
        return; // Normal mode, change color over time
      }

      // Wierd mode, create wierd patterns and color effects
      vec2 uv0 = uv;
      vec3 finalColor = vec3(0.0);

      for (int i = 0; i < 2; i++) {
        uv = fract(uv * 1.5) - 0.5;

        float dist = length(uv);
        vec3 colors = getColors(length(uv0) + u_Time * 0.3);
        dist = sin(dist * 10.0 + u_Time) / 10.0;
        dist = abs(dist);
        dist = 0.02 / dist;
        finalColor += colors * dist;
      }
      gl_FragColor = vec4(finalColor, 1.0);
    }
    
  }
`;

type Props = {
  type: 'circle' | 'zigzag';
  allowWierdMode?: boolean;
  numVertices?: number;
  width?: number;
  height?: number;
  styles?: React.CSSProperties;
}

const Animation = (props: Props) => {
  const width = props.width || 200;
  const height = props.height || 200;
  const numberOfVertices = props.numVertices || (props.type === 'circle' ? 50 : 20);
  const allowWierdMode = props.allowWierdMode || false;
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const isWierdMode = React.useRef<boolean>(false);
  const vShader = React.useRef<WebGLShader | null>(null);
  const fShader = React.useRef<WebGLShader | null>(null);
  const program = React.useRef<WebGLProgram | null>(null);
  const vBuffer = React.useRef<WebGLBuffer | null>(null);
  const cBuffer = React.useRef<WebGLBuffer | null>(null);
  const allowBorders = props.type === 'circle';
  const isBorderMode = React.useRef<boolean>(false);

  // Create WebGL context
  React.useEffect(() => {
    console.log('effect', props.type);
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl2", { alpha: true });
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }
    gl.lineWidth(1);
    gl.clear(gl.COLOR_BUFFER_BIT);


    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    if (!vertexShader) {
      console.error("Failed to create vertex shader");
      return;
    }

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!fragmentShader) {
      console.error("Failed to create fragment shader");
      return;
    }

    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS) ) {
      alert(gl.getShaderInfoLog(vertexShader));
      gl.deleteShader(vertexShader);
      return;
    }
    vShader.current = vertexShader;

    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      alert(gl.getShaderInfoLog(fragmentShader));
      gl.deleteShader(fragmentShader);
      return;
    }
    fShader.current = fragmentShader;

    // Create shader program
    const shaderProgram = gl.createProgram();
    if (shaderProgram === null) {
      console.error("Failed to create shader program");
      return;
    }
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    program.current = shaderProgram;

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.error("Failed to link program");
      alert(gl.getProgramInfoLog(shaderProgram));
      gl.deleteProgram(shaderProgram);
      return;
    }

    // Create buffer
    const vertexBuffer = gl.createBuffer();
    if (!vertexBuffer) {
      console.error("Failed to create buffer");
      return;
    }
    vBuffer.current = vertexBuffer;
    // Define triangle vertices
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    //generateCircleVertices(0,0,1,50);
    const vertices = props.type === 'circle'
      ? generateCircleVertices(0,0,1,numberOfVertices)
      : generateZigZagVertices(numberOfVertices);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    // Get attribute location
    const colorBuffer = gl.createBuffer();
    if (!colorBuffer) {
      console.error("Failed to create color buffer");
      return;
    }
    cBuffer.current = colorBuffer;
    // Define triangle colors
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

    // Generate colors for the vertices
    const colors = new Float32Array(vertices.length / 3 * 4);
    for (let i = 0; i < colors.length; i += 4) {
      colors[i] = Math.random();
      colors[i + 1] = Math.random();
      colors[i + 2] = Math.random();
      colors[i + 3] = 1.0;
    }
    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);

    const matrix = new Float32Array([
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ]);

    const m = gl.getUniformLocation(shaderProgram, 'trans');
    gl.useProgram(shaderProgram);
    gl.uniformMatrix4fv(m, false, matrix);

    const u_time = gl.getUniformLocation(shaderProgram, 'u_Time');
    gl.useProgram(shaderProgram);
    gl.uniform1f(u_time, 0);

    const u_wierd = gl.getUniformLocation(shaderProgram, 'u_Wierd');
    gl.useProgram(shaderProgram);
    gl.uniform1i(u_wierd, 0);

    const u_border = gl.getUniformLocation(shaderProgram, 'u_Border');
    gl.useProgram(shaderProgram);
    gl.uniform1i(u_border, allowBorders && window.innerWidth > 400 ? 1 : 0);

    const u_resolution = gl.getUniformLocation(shaderProgram, 'u_Resolution');
    gl.useProgram(shaderProgram);
    gl.uniform2f(u_resolution, width, height);

    const u_type = gl.getUniformLocation(shaderProgram, 'u_Type');
    gl.useProgram(shaderProgram);
    gl.uniform1i(u_type, props.type === 'circle' ? 1 : 0);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    const a_Position = gl.getAttribLocation(shaderProgram, "a_Position");
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    const a_Color = gl.getAttribLocation(shaderProgram, "a_Color");
    gl.vertexAttribPointer(a_Color, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Color);

    // Draw the triangle
    const drawType = props.type === 'circle' ? gl.TRIANGLE_FAN : gl.LINE_STRIP;
    const verticesPerColumn = (vertices.length / 3) / COLUMNS;
    const render = (time: number) => {
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(shaderProgram);
      gl.uniform1f(u_time, time * 0.001);
      if (props.type === 'circle') {
        gl.drawArrays(drawType, 0, vertices.length / 3);
      } else {
        for (let j = 0; j < COLUMNS; j++) {
          const start = j * verticesPerColumn;  // Starting index for this column
          gl.drawArrays(drawType, start, verticesPerColumn);  // Draw the zigzag column
        }
      }

      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    // Control wierd mode in scroll events
    const handleScroll = () => {
      if (!allowWierdMode || isWierdMode.current || window.innerWidth <= 400) return; // Already set or not allowed
      gl.useProgram(shaderProgram);
      gl.uniform1i(u_wierd, 1);
      isWierdMode.current = true;
    };

    const handleScrollEnd = () => {
      if (!allowWierdMode || !isWierdMode.current) return; // Already set or not allowed
      gl.useProgram(shaderProgram);
      gl.uniform1i(u_wierd, 0);
      isWierdMode.current = false;
    };

    // Control border mode in resize event
    const handleResize = () => {
      if (!allowBorders) return;
      if (window.innerWidth <= 400) {
        if (isBorderMode.current) {
          gl.useProgram(shaderProgram);
          gl.uniform1i(u_border, 0);
          isBorderMode.current = false;
        }
      } else if (window.innerWidth > 400) {
        if (!isBorderMode.current) {
          gl.useProgram(shaderProgram);
          gl.uniform1i(u_border, 1);
          isBorderMode.current = true;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scrollend', handleScrollEnd);

    return () => {
      if (!gl) return;
      // Cleanup
      console.log('cleanup');
      gl.clear(gl.COLOR_BUFFER_BIT);
      /*if (vShader.current) gl.deleteShader(vShader.current);
      if (fShader.current) gl.deleteShader(fShader.current);
      if (program.current) gl.deleteProgram(program.current);
      if (vBuffer.current) gl.deleteBuffer(vBuffer.current);
      if (cBuffer.current) gl.deleteBuffer(cBuffer.current);
      */

      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scrollend', handleScrollEnd);
    };

  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className={styles.background}
    />
  );
};

export { Animation };