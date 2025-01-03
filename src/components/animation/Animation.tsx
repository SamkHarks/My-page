import React from "react";
import styles from "./Animation.module.css";
import { COLUMNS, getDrawType, getType, getVertices } from "./utils";

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
  uniform bool u_Wierd; // Wierd mode, create wierd patterns and color effects
  uniform bool u_Animate; // Animate the shape
  uniform int u_Type; // Type of shape, 0 = zigzag, 1 = circle
  uniform vec2 u_Resolution;
  uniform bool u_Dynamic; // 0 = only one color, 1 = change color over time
  uniform float u_Width;

  vec3 getColors(float t) {
    vec3 a = vec3(0.3);
    vec3 b = vec3(0.2);
    vec3 c = vec3(1.0);
    vec3 d = vec3(0.263, 0.416, 0.557);
    return a + b * cos(2.0 * 6.28318 * (c * t + d));
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
        if (yPos + 0.2 > uv.y
          && yPos - 0.2 < uv.y
          && xPos + 0.0013 > uv.x
          && xPos - 0.0013 < uv.x
        ) {
          gl_FragColor = u_Dynamic ? v_Color : vec4(0.0, 0.8, 0.8, 1.0);
          break;
        }
      }
    
    // Circle, u_Type == 1
    } else if (u_Type == 1) {
      float d = length(uv);
      vec3 finalColor = vec3(0.0);

      // Wierd mode, create wierd patterns and color effects
      if (u_Wierd) {
        vec2 uv0 = uv;
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

      // Default mode
      } else {
        finalColor = vec3(0.2, 0.42, 0.7); // Default color
        gl_FragColor = vec4(finalColor, 1);
      }

      // Add white borders and transparerent areas
      if (u_Width > 768.0) {
        gl_FragColor = mix(vec4(1.0,1.0,1.0,1.0), gl_FragColor, smoothstep(0.12, 0.15, abs(d - 0.6)));
        gl_FragColor = mix(vec4(1.0,1.0,1.0,1.0), gl_FragColor, smoothstep(0.12, 0.15, abs(d - 0.55)));
        gl_FragColor = mix(vec4(1.0,1.0,1.0,1.0), gl_FragColor, smoothstep(0.12, 0.15, abs(d - 1.06)));
        gl_FragColor *= smoothstep(0.05, 0.07, abs(d - 0.6));

        
      } else if (u_Width <= 768.0 && u_Width > 400.0) {
        gl_FragColor = mix(vec4(1.0,1.0,1.0,1.0), gl_FragColor, smoothstep(0.03, 0.05, abs(d - 0.98)));
        gl_FragColor = mix(vec4(1.0,1.0,1.0,1.0), gl_FragColor, smoothstep(0.02, 0.04, abs(d - 0.75)));
        gl_FragColor = mix(vec4(1.0,1.0,1.0,1.0), gl_FragColor, smoothstep(0.03, 0.05, abs(d - 0.65)));
        gl_FragColor *= smoothstep(0.03, 0.05, abs(d - 0.7));
          
      } else if (u_Width <= 400.0) {
        gl_FragColor = mix(vec4(1.0,1.0,1.0,1.0), gl_FragColor, smoothstep(0.02, 0.04, abs(d - 0.8)));
        gl_FragColor *= smoothstep(0.02, 0.04, abs(d - 1.0));
      }

      // Animate the shape
      if (u_Animate) {
        gl_FragColor *= smoothstep(0.12, 0.15,sin(2.0 * d + 3.0*pow(sin(u_Time*0.5),2.0)) / 2.0);
      }
      return;
    } else {
      // Shockwave, u_Type == 2
      if (u_Width < 320.0 && (-0.32 < uv.x && uv.x < 0.32)) {
        return;
      }
      float xPos = fract(u_Time * 0.3) * 2.0 - 1.0;
      if (xPos < 0.0 && xPos + 0.02 > uv.x && xPos - 0.2 < uv.x) {
        gl_FragColor = vec4(getColors(u_Time * 0.4), 1) + v_Color;
        return;
      } else if (xPos > 0.0 && xPos + 0.2 > uv.x && xPos - 0.02 < uv.x) {
        gl_FragColor = vec4(getColors(u_Time * 0.4), 1) + v_Color;
        return;
      }
      return;
    }
    
  }
`;

type Props = {
  type: 'circle' | 'zigzag' | 'shockwave';
  width: number;
  height: number;
  allowWierdMode?: boolean;
  numVertices?: number;
  dynamicColor?: boolean;
}

const Animation = (props: Props) => {
  const width = props.width;
  const height = props.height;
  const numberOfVertices = props.numVertices || (props.type === 'circle' ? 50 : 20);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const isWierdMode = React.useRef<boolean>(false);
  const isSmallScreen = React.useRef<boolean>(window.innerWidth <= 400);
  const allowWierdMode = React.useRef<boolean>(props.allowWierdMode || false);
  const vShader = React.useRef<WebGLShader | null>(null);
  const fShader = React.useRef<WebGLShader | null>(null);
  const program = React.useRef<WebGLProgram | null>(null);
  const vBuffer = React.useRef<WebGLBuffer | null>(null);
  const cBuffer = React.useRef<WebGLBuffer | null>(null);
  const isDynamicColor = props.dynamicColor || false;
  const animate = React.useRef<boolean>(false);
  const isDeleted = program.current === null || vShader.current === null || fShader.current === null || vBuffer.current === null || cBuffer.current === null;
  // Create WebGL context
  React.useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const gl = canvas.getContext("webgl2", { alpha: true, antialias: props.type === 'shockwave' });
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

    const vertices = getVertices(props.type, numberOfVertices);
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

    const u_animate = gl.getUniformLocation(shaderProgram, 'u_Animate');
    gl.useProgram(shaderProgram);
    gl.uniform1i(u_animate, 0);

    const u_resolution = gl.getUniformLocation(shaderProgram, 'u_Resolution');
    gl.useProgram(shaderProgram);
    gl.uniform2f(u_resolution, width, height);

    const u_type = gl.getUniformLocation(shaderProgram, 'u_Type');
    gl.useProgram(shaderProgram);
    gl.uniform1i(u_type, getType(props.type));

    const u_dynamic = gl.getUniformLocation(shaderProgram, 'u_Dynamic');
    gl.useProgram(shaderProgram);
    gl.uniform1i(u_dynamic, isDynamicColor ? 1 : 0);

    const u_width = gl.getUniformLocation(shaderProgram, 'u_Width');
    gl.useProgram(shaderProgram);
    gl.uniform1f(u_width, window.innerWidth);

    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    const a_Position = gl.getAttribLocation(shaderProgram, "a_Position");
    gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Position);

    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    const a_Color = gl.getAttribLocation(shaderProgram, "a_Color");
    gl.vertexAttribPointer(a_Color, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(a_Color);

    // Draw the scene
    const isCircle = props.type === 'circle';
    const drawType = getDrawType(props.type, gl);
    const verticesPerColumn = (vertices.length / 3) / COLUMNS;
    let animationFrameId: number;
    let animationStartTime: DOMHighResTimeStamp | null = null;
    let elapsedTime = 0;
    const offsetTime = 0.8;
    const render = (time: number) => {
      if (isDeleted) return; // Program has been deleted
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(shaderProgram);
      // Calculate the elapsed time based on the animation start time
      const startNewTimer = (isCircle && (isWierdMode.current || animate.current));
      if (startNewTimer && animationStartTime !== null) {
        elapsedTime = (time - animationStartTime) * 0.001;
      }
      // Pass the calculated time to the shader
      gl.uniform1f(u_time, startNewTimer ? elapsedTime + offsetTime  : time * 0.001);
      if (isCircle) {
        gl.drawArrays(drawType, 0, vertices.length / 3);
      } else if (props.type === 'zigzag') {
        for (let j = 0; j < COLUMNS; j++) {
          const start = j * verticesPerColumn;  // Starting index for this column
          gl.drawArrays(drawType, start, verticesPerColumn);  // Draw the zigzag column
        }
      } else {
        gl.drawArrays(drawType, 0, 9);
        gl.drawArrays(drawType, 9, 9);
      }
      animationFrameId = requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    // Control border mode in resize event
    const handleResize = () => {
      gl.useProgram(shaderProgram);
      gl.uniform1f(u_width, window.innerWidth);

      if (props.type === 'shockwave') {
        canvas.width = window.innerWidth < 768 ? window.innerWidth : window.innerWidth - 100;
        canvas.height = window.innerWidth >= 900 ? 100 : 75;
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(u_resolution, canvas.width, canvas.height);
      } else if (props.type === 'zigzag') {
        canvas.width = Math.max(window.innerWidth, 1000);
        canvas.height = 580;
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(u_resolution, canvas.width, canvas.height);
      }

      if (window.innerWidth <= 400) {
        if (isSmallScreen.current) return; // Already in small screen mode
        if (isWierdMode.current) {
          gl.uniform1i(u_wierd, 0);
          isWierdMode.current = false;
        }
        allowWierdMode.current = false;
        isSmallScreen.current = true;
      } else if (window.innerWidth > 400) {
        if (!isSmallScreen.current) return; // Already in large screen mode
        allowWierdMode.current = true;
        isSmallScreen.current = false;
      }
    };

    const setAnimation = (value: boolean) => {
      if (animate.current === value) return; // Already in the same state
      gl.useProgram(shaderProgram);
      gl.uniform1i(u_animate, value ? 1 : 0);
      animate.current = value;
      animationStartTime = value ? performance.now() : null;
    };
    // Handle scroll events
    let isScrolling = false;
    let timeout: NodeJS.Timeout;
    const isScrollendSupported = 'onscrollend' in window;
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
      setAnimation(isWierdMode.current);
      isScrolling = false;
    };

    const handleMouseEnter = () => {
      if (!allowWierdMode.current || isWierdMode.current || isSmallScreen.current) return; // Already set or not allowed
      gl.useProgram(shaderProgram);
      gl.uniform1i(u_wierd, 1);
      isWierdMode.current = true;
      setAnimation(true);
    };

    const handleMouseLeave = () => {
      if (!allowWierdMode.current || !isWierdMode.current || isSmallScreen.current) return; // Already set or not allowed
      gl.useProgram(shaderProgram);
      gl.uniform1i(u_wierd, 0);
      isWierdMode.current = false;
      setAnimation(isScrolling);
    };

    window.addEventListener('resize', handleResize);
    if (isCircle) {
      document.getElementById('about')?.addEventListener('mouseenter', handleMouseEnter);
      document.getElementById('about')?.addEventListener('mouseleave', handleMouseLeave);
      window.addEventListener('scroll', handleScroll);
      window.addEventListener('scrollend', handleScrollEnd);
    }

    return () => {
      if (!gl) return;
      // Cleanup
      cancelAnimationFrame(animationFrameId);
      // Unset the current program before deleting it
      gl.useProgram(null);

      gl.clear(gl.COLOR_BUFFER_BIT);
      if (vShader.current) {
        gl.deleteShader(vShader.current);
        vShader.current = null;
      }
      if (fShader.current) {
        gl.deleteShader(fShader.current);
        fShader.current = null;
      }
      if (program.current) {
        gl.deleteProgram(program.current);
        program.current = null;
      }
      if (vBuffer.current) {
        gl.deleteBuffer(vBuffer.current);
        vBuffer.current = null;
      }
      if (cBuffer.current) {
        gl.deleteBuffer(cBuffer.current);
        cBuffer.current = null;
      }

      window.removeEventListener('resize', handleResize);
      if (isCircle) {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('scrollend', handleScrollEnd);
        document.getElementById('about')?.removeEventListener('mouseenter', handleMouseEnter);
        document.getElementById('about')?.removeEventListener('mouseleave', handleMouseLeave);
        clearTimeout(timeout);
      }
    };

  }, [
    isDeleted
  ]);

  return (
    <canvas
      id={'animation-canvas'}
      ref={canvasRef}
      width={width}
      height={height}
      className={styles.background}
    />
  );
};

export { Animation };