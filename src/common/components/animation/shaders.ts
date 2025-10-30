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

const zigzagFragmentShaderSource = `
  precision mediump float;
  varying vec4 v_Color;
  uniform float u_Time;
  uniform bool u_Dynamic;
  uniform vec2 u_Resolution;

  float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - u_Resolution) / u_Resolution; // normalized FragCoord to [-1,1]

    float interval = 2.0; // Interval in seconds
    float speed = 0.15;  // Controls how fast it moves downwards

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
  }
`;

const circleFragmentShaderSource = `
  precision mediump float;
  varying vec4 v_Color;
  uniform float u_Time;
  uniform bool u_Dynamic; // Dynamic mode, create wierd patterns and color effects
  uniform bool u_Animate; // Animate the shape
  uniform vec2 u_Resolution;
  uniform float u_Width;

  vec3 getColors(float t) {
    vec3 a = vec3(0.3);
    vec3 b = vec3(0.2);
    vec3 c = vec3(1.0);
    vec3 d = vec3(0.263, 0.416, 0.557);
    return a + b * cos(2.0 * 6.28318 * (c * t + d));
  }


  void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - u_Resolution) / u_Resolution; // normalized FragCoord to [-1,1]
    float d = length(uv);
    vec3 finalColor = vec3(0.0);

    if (u_Width < 400.0) {
      return;
    }

    // Dynamic mode, create wierd patterns and color effects
    if (u_Dynamic) {
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
      gl_FragColor = mix(vec4(1.0,1.0,1.0,1.0), gl_FragColor, smoothstep(0.12, 0.15, abs(d - 0.56)));
      gl_FragColor = mix(vec4(1.0,1.0,1.0,1.0), gl_FragColor, smoothstep(0.12, 0.15, abs(d - 1.06)));
      gl_FragColor *= smoothstep(0.05, 0.07, abs(d - 0.6));
      gl_FragColor *= smoothstep(0.05, 0.07, abs(d - 1.05));
      
    } else if (u_Width <= 768.0 && u_Width > 400.0) {
      gl_FragColor = mix(vec4(1.0,1.0,1.0,1.0), gl_FragColor, smoothstep(0.03, 0.05, abs(d - 0.98)));
      gl_FragColor = mix(vec4(1.0,1.0,1.0,1.0), gl_FragColor, smoothstep(0.02, 0.04, abs(d - 0.75)));
      gl_FragColor = mix(vec4(1.0,1.0,1.0,1.0), gl_FragColor, smoothstep(0.03, 0.05, abs(d - 0.65)));
      gl_FragColor *= smoothstep(0.03, 0.05, abs(d - 0.7));
      gl_FragColor *= smoothstep(0.05, 0.07, abs(d - 1.05));
        
    } else if (u_Width <= 400.0) {
      gl_FragColor = mix(vec4(1.0,1.0,1.0,1.0), gl_FragColor, smoothstep(0.02, 0.04, abs(d - 0.8)));
      gl_FragColor *= smoothstep(0.02, 0.04, abs(d - 1.0));
    }

    // Animate the shape
    if (u_Animate) {
      gl_FragColor *= smoothstep(0.12, 0.15,1.5 + (-d-(u_Time * 0.4)));
    } else {
      gl_FragColor *= smoothstep(0.12, 0.15,-d+(u_Time * 0.4));
    }
  }
`;


const shockwaveFragmentShaderSource = `
  precision mediump float;
  varying vec4 v_Color;
  uniform float u_Time;
  uniform float u_Width;
  uniform vec2 u_Resolution;

  vec3 getColors(float t) {
    vec3 a = vec3(0.3);
    vec3 b = vec3(0.2);
    vec3 c = vec3(1.0);
    vec3 d = vec3(0.263, 0.416, 0.557);
    return a + b * cos(2.0 * 6.28318 * (c * t + d));
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - u_Resolution) / u_Resolution; // normalized FragCoord to [-1,1]
    if (u_Width < 405.0 && (-0.28 < uv.x && uv.x < 0.28)) {
      return;
    }
    float d = length(uv);
    float xPos = fract(u_Time * 0.26) * 2.0 - 1.0;
    if (xPos < 0.0 && xPos + 0.01 > uv.x && xPos - 0.2 < uv.x) {
      gl_FragColor = mix(vec4(1), vec4(vec3(0.2, 0.4, 0.6), 1) + vec4(getColors(u_Time * 0.4), 1) ,smoothstep(0.09, 0.11, abs(1.0 - d - fract(u_Time*0.26))));
      return;
    } else if (xPos > 0.0 && xPos + 0.2 > uv.x && xPos - 0.01 < uv.x) {
      gl_FragColor = mix(vec4(1), vec4(vec3(0.2, 0.4, 0.6), 1) + vec4(getColors(u_Time * 0.4), 1) ,smoothstep(0.09 , 0.11, abs(d - fract(u_Time*0.26))));
      return;
    }
  }
`;


export {
  vertexShaderSource,
  zigzagFragmentShaderSource,
  shockwaveFragmentShaderSource,
  circleFragmentShaderSource
};