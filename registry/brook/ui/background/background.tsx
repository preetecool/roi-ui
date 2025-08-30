"use client";
import React, { useEffect, useRef } from "react";
import styles from "./background.module.css";

const vertexShader = `
  attribute vec2 a_position;
  varying vec2 v_uv;

  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform float u_time;
  uniform vec2 u_resolution;

  uniform vec3 u_primaryColor;
  uniform vec3 u_secondaryColor;
  uniform vec3 u_backgroundColor;
  uniform float u_backgroundOpacity;

  // Animation uniforms
  uniform float u_animationSpeed;
  uniform float u_noiseScale;
  uniform float u_intensity;

  uniform float u_octaves;
  uniform float u_warpStrength;
  varying vec2 v_uv;

  vec3 permute(vec3 x) {
      return mod(((x*34.0)+1.0)*x, 289.0);
  }

  float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy));
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m;
      m = m*m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
  }

  float fbm(vec2 pos, int octaves) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 1.0;

      for (int i = 0; i < 6; i++) {
          if (i >= octaves) break;
          value += amplitude * snoise(pos * frequency);
          amplitude *= 0.5;
          frequency *= 2.0;
      }

      return value;
  }

  float domainWarp(vec2 pos, float time) {
      vec2 q = vec2(
          fbm(pos + vec2(0.0, 0.0), int(u_octaves)),
          fbm(pos + vec2(5.2, 1.3), int(u_octaves))
      );

      vec2 r = vec2(
          fbm(pos + u_warpStrength*q + vec2(1.7, 9.2) + 0.15*time, int(u_octaves-1.0)),
          fbm(pos + u_warpStrength*q + vec2(8.3, 2.8) + 0.126*time, int(u_octaves-1.0))
      );

      return fbm(pos + u_warpStrength*r, int(u_octaves-2.0));
  }

  vec3 palette(float t) {
      vec3 a = u_primaryColor;
      vec3 b = u_secondaryColor;
      vec3 c = mix(u_primaryColor, u_secondaryColor, 0.6);
      vec3 d = mix(u_primaryColor, u_secondaryColor, 0.7);

      d = mix(d, u_secondaryColor * 0.5, sin(t * 1.5) * 0.4 + 0.5);
      d = mix(d, u_primaryColor * 1.2, sin(t * 2.2) * 0.3 + 0.5);

      float wave = cos(6.28318 * (c.x * t + d.x)) * 0.6;
      vec3 result = a + b * wave * 0.8;

      return result;
  }


  void main() {
      vec2 uv = v_uv;
      vec2 st = uv * u_noiseScale;

      float time = u_time * u_animationSpeed;

      vec2 animPos = st + vec2(time * 0.1, time * 0.05);

      float noise1 = domainWarp(animPos, time);

      vec2 animPos2 = st * 1.5 + vec2(-time * 0.08, time * 0.12);
      float noise2 = fbm(animPos2, int(u_octaves-1.0));

      vec2 animPos3 = st * 2.5 + vec2(time * 0.06, -time * 0.04);
      float noise3 = snoise(animPos3);

      float combinedNoise = noise1 * 0.6 + noise2 * 0.3 + noise3 * 0.1;

      float pattern = smoothstep(-0.3, 0.5, combinedNoise);

      float colorShift = time * 0.2 + uv.x * 0.4;
      colorShift += noise1 * 0.3;
      vec3 color = palette(colorShift);

      vec3 bgNoise = vec3(snoise(uv * 2.0 + time * 0.1) * 0.02);
      vec3 bgColor = u_backgroundColor + bgNoise;

      float intensity = pattern * u_intensity;
      color = mix(bgColor, color, intensity);

      vec3 bgMovement = vec3(snoise(uv * 5.0 + time * 0.15) * 0.02);
      color += bgMovement;

      gl_FragColor = vec4(color, u_backgroundOpacity);
  }
`;

interface BackgroundProps {
  className?: string;
  primaryColor?: [number, number, number];
  secondaryColor?: [number, number, number];
  backgroundColor?: [number, number, number];
  backgroundOpacity?: number;
  animationSpeed?: number;
  noiseScale?: number;
  intensity?: number;
  octaves?: number;
  warpStrength?: number;
}

const Background: React.FC<BackgroundProps> = ({
  className,
  primaryColor = [0.85, 0.85, 0.85],
  secondaryColor = [0.25, 0.25, 0.25],
  backgroundColor = [0.0, 0.0, 0.0],
  backgroundOpacity = 0.0,
  animationSpeed = 0.3,
  noiseScale = 3.0,
  intensity = 0.9,
  octaves = 4,
  warpStrength = 4.0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    setCanvasSize();
    window.addEventListener("resize", setCanvasSize);

    // Create shaders
    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;

      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    };

    const vertShader = createShader(gl.VERTEX_SHADER, vertexShader);
    const fragShader = createShader(gl.FRAGMENT_SHADER, fragmentShader);

    if (!vertShader || !fragShader) return;

    // Create program
    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    // Set up geometry
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Get uniform locations
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");

    const primaryColorLocation = gl.getUniformLocation(program, "u_primaryColor");
    const secondaryColorLocation = gl.getUniformLocation(program, "u_secondaryColor");
    const backgroundColorLocation = gl.getUniformLocation(program, "u_backgroundColor");
    const backgroundOpacityLocation = gl.getUniformLocation(program, "u_backgroundOpacity");

    const animationSpeedLocation = gl.getUniformLocation(program, "u_animationSpeed");
    const noiseScaleLocation = gl.getUniformLocation(program, "u_noiseScale");
    const intensityLocation = gl.getUniformLocation(program, "u_intensity");

    const octavesLocation = gl.getUniformLocation(program, "u_octaves");
    const warpStrengthLocation = gl.getUniformLocation(program, "u_warpStrength");

    const render = (time: number) => {
      if (!startTimeRef.current) startTimeRef.current = time;
      const elapsedTime = (time - startTimeRef.current) * 0.001;

      gl.useProgram(program);

      gl.uniform1f(timeLocation, elapsedTime);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

      gl.uniform3f(primaryColorLocation, primaryColor[0], primaryColor[1], primaryColor[2]);
      gl.uniform3f(secondaryColorLocation, secondaryColor[0], secondaryColor[1], secondaryColor[2]);
      gl.uniform3f(backgroundColorLocation, backgroundColor[0], backgroundColor[1], backgroundColor[2]);
      gl.uniform1f(backgroundOpacityLocation, backgroundOpacity);

      gl.uniform1f(animationSpeedLocation, animationSpeed);
      gl.uniform1f(noiseScaleLocation, noiseScale);
      gl.uniform1f(intensityLocation, intensity);

      gl.uniform1f(octavesLocation, octaves);
      gl.uniform1f(warpStrengthLocation, warpStrength);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationRef.current = requestAnimationFrame(render);
    };

    render(0);

    return () => {
      window.removeEventListener("resize", setCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    primaryColor,
    secondaryColor,
    backgroundColor,
    backgroundOpacity,
    animationSpeed,
    noiseScale,
    intensity,
    octaves,
    warpStrength,
  ]);

  return (
    <div className={`${styles.backgroundContainer} ${className || ""}`}>
      <canvas ref={canvasRef} className={styles.canvas} />
    </div>
  );
};

export default Background;
