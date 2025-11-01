"use client";

import { useEffect, useRef } from "react";

const HEX_COLOR_REGEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
const RGB_MAX_VALUE = 255;
const MS_TO_SECONDS = 1000;
const QUAD_VERTICES = 4;

type DitheringCubeProps = {
  colorFront?: string;
  colorBack?: string;
  speed?: number;
  pixelSize?: number;
};

export const DitheringCube = ({
  colorFront = "#000000",
  colorBack = "#ffffff",
  speed = 0.3,
  pixelSize = 3,
}: DitheringCubeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGL2RenderingContext | WebGLRenderingContext | null>(
    null
  );
  const programRef = useRef<WebGLProgram | null>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const startTimeRef = useRef<number>(Date.now());

  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: WebGL setup requires complex initialization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    // Try WebGL 2 first
    const gl =
      canvas.getContext("webgl2", {
        alpha: true,
        premultipliedAlpha: false,
      }) ||
      canvas.getContext("webgl", {
        alpha: true,
        premultipliedAlpha: false,
      });

    if (!gl) {
      return;
    }

    const isWebGL2 = gl instanceof WebGL2RenderingContext;
    glRef.current = gl;

    // Vertex shader
    const vertexShaderSource = isWebGL2
      ? `#version 300 es
      in vec2 a_position;
      out vec2 v_uv;

      void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }`
      : `
      attribute vec2 a_position;
      varying vec2 v_uv;

      void main() {
        v_uv = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }`;

    // Common shader functions
    const shaderFunctions = `
      // 3x3 rotation matrices
      mat3 rotateX(float angle) {
        float c = cos(angle);
        float s = sin(angle);
        return mat3(1.0, 0.0, 0.0, 0.0, c, -s, 0.0, s, c);
      }

      mat3 rotateY(float angle) {
        float c = cos(angle);
        float s = sin(angle);
        return mat3(c, 0.0, s, 0.0, 1.0, 0.0, -s, 0.0, c);
      }

      mat3 rotateZ(float angle) {
        float c = cos(angle);
        float s = sin(angle);
        return mat3(c, -s, 0.0, s, c, 0.0, 0.0, 0.0, 1.0);
      }

      // SDF for a box
      float sdBox(vec3 p, vec3 b) {
        vec3 q = abs(p) - b;
        return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
      }
    `;

    // Recursive Bayer Matrix Dithering
    const ditheringFunction = `
      // Base 2x2 Bayer matrix
      float Bayer2(vec2 a) {
        a = floor(a);
        return fract(a.x / 2.0 + a.y * a.y * 0.75);
      }

      // Recursive Bayer matrices
      float Bayer4(vec2 a) {
        return Bayer2(0.5 * a) * 0.25 + Bayer2(a);
      }

      float Bayer8(vec2 a) {
        return Bayer4(0.5 * a) * 0.25 + Bayer2(a);
      }

      float Bayer16(vec2 a) {
        return Bayer8(0.5 * a) * 0.25 + Bayer2(a);
      }

      float getBayerValue(vec2 uv) {
        vec2 pixelId = floor(uv * u_resolution / u_pixelSize);
        return Bayer8(pixelId);
      }
    `;

    // Main shader code
    const mainShaderCode = `
      void main() {
        // Pixelate UV coordinates
        vec2 pixelUv = floor(v_uv * u_resolution / u_pixelSize) * u_pixelSize / u_resolution;

        // Center the coordinates
        vec2 uv = (pixelUv - 0.5) * 2.0;
        uv.x *= u_resolution.x / u_resolution.y;

        // Set up the ray
        vec3 rayOrigin = vec3(0.0, 0.0, 3.0);
        vec3 rayDir = normalize(vec3(uv, -1.5));

        // Rotate the cube
        float t = u_time * 0.5;
        mat3 rotation = rotateY(t * 0.8) * rotateX(t * 0.6) * rotateZ(t * 0.3);

        // Ray march to find the cube
        float depth = 0.0;
        float shape = 0.0;
        vec3 pos = rayOrigin;

        for (int i = 0; i < 64; i++) {
          pos = rayOrigin + rayDir * depth;
          vec3 rotatedPos = rotation * pos;

          float dist = sdBox(rotatedPos, vec3(0.8));

          if (dist < 0.001) {
            // Hit the cube - calculate lighting
            vec3 normal = normalize(vec3(
              sdBox(rotatedPos + vec3(0.001, 0.0, 0.0), vec3(0.8)) - dist,
              sdBox(rotatedPos + vec3(0.0, 0.001, 0.0), vec3(0.8)) - dist,
              sdBox(rotatedPos + vec3(0.0, 0.0, 0.001), vec3(0.8)) - dist
            ));

            // Animated light position
            vec3 lightPos = normalize(vec3(cos(t * 1.2), 0.8, sin(t * 0.9)));

            // Diffuse lighting
            float diffuse = max(dot(normal, lightPos), 0.0);

            // Add some ambient and edge lighting
            float ambient = 0.3;
            float edgeLight = pow(1.0 - abs(dot(normal, normalize(pos))), 2.0) * 0.3;

            shape = ambient + diffuse * 0.7 + edgeLight;
            break;
          }

          depth += dist;
          if (depth > 10.0) break;
        }

        // Only render where we hit the cube
        if (shape > 0.0) {
          // Apply recursive Bayer matrix dithering
          float dither = getBayerValue(v_uv);
          float mask = shape + dither - 0.5;
          float dithered = step(0.5, mask);

          // Mix colors
          vec3 color = mix(u_colorBack, u_colorFront, dithered);

          ${isWebGL2 ? "fragColor" : "gl_FragColor"} = vec4(color, 1.0);
        } else {
          // Transparent background
          ${isWebGL2 ? "fragColor" : "gl_FragColor"} = vec4(0.0, 0.0, 0.0, 0.0);
        }
      }
    `;

    // Complete fragment shader
    const fragmentShaderSource = isWebGL2
      ? `#version 300 es
      precision highp float;

      in vec2 v_uv;
      out vec4 fragColor;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec3 u_colorFront;
      uniform vec3 u_colorBack;
      uniform float u_pixelSize;

      ${ditheringFunction}
      ${shaderFunctions}
      ${mainShaderCode}
    `
      : `
      precision highp float;

      varying vec2 v_uv;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec3 u_colorFront;
      uniform vec3 u_colorBack;
      uniform float u_pixelSize;

      ${ditheringFunction}
      ${shaderFunctions}
      ${mainShaderCode}
    `;

    // Compile shaders
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    if (!(vertexShader && fragmentShader)) {
      return;
    }

    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      return;
    }

    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      return;
    }

    // Create program
    const program = gl.createProgram();
    if (!program) {
      return;
    }

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      return;
    }

    // biome-ignore lint/correctness/useHookAtTopLevel: This is WebGL's useProgram method, not a React hook
    gl.useProgram(program);
    programRef.current = program;

    // Set up geometry (full-screen quad)
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Get uniform locations
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const colorFrontLocation = gl.getUniformLocation(program, "u_colorFront");
    const colorBackLocation = gl.getUniformLocation(program, "u_colorBack");
    const pixelSizeLocation = gl.getUniformLocation(program, "u_pixelSize");

    // Helper to convert hex to RGB
    const hexToRgb = (hex: string): [number, number, number] => {
      const result = HEX_COLOR_REGEX.exec(hex);
      return result
        ? [
            Number.parseInt(result[1], 16) / RGB_MAX_VALUE,
            Number.parseInt(result[2], 16) / RGB_MAX_VALUE,
            Number.parseInt(result[3], 16) / RGB_MAX_VALUE,
          ]
        : [0, 0, 0];
    };

    // Resize handler
    const resize = () => {
      if (!canvas) {
        return;
      }

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;

      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);

    // Render loop
    const render = () => {
      if (!(gl && programRef.current)) {
        return;
      }

      const currentTime = (Date.now() - startTimeRef.current) / MS_TO_SECONDS;

      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, currentTime * speed);
      gl.uniform3fv(colorFrontLocation, hexToRgb(colorFront));
      gl.uniform3fv(colorBackLocation, hexToRgb(colorBack));
      gl.uniform1f(pixelSizeLocation, pixelSize);

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, QUAD_VERTICES);

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (gl && programRef.current) {
        gl.deleteProgram(programRef.current);
      }
    };
  }, [colorFront, colorBack, speed, pixelSize]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: "30%",
        right: "-5%",
        transform: "translateY(-50%)",
        width: "45%",
        aspectRatio: "1",
        height: "auto",
        maxHeight: "90%",
        opacity: 0.4,
        pointerEvents: "none",
      }}
    />
  );
};
