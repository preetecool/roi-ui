"use client";
import type React from "react";
import { useEffect, useRef } from "react";
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

  // Mathematical constants with high precision
  const float PI = 3.1415926535897932384626433832795;
  const float TAU = 6.2831853071795864769252867665590; // 2 * PI
  const float INV_PI = 0.3183098861837906715377675267450;
  const float SQRT_2 = 1.4142135623730950488016887242097;
  const float SQRT_3 = 1.7320508075688772935274463415059;
  const float PHI = 1.6180339887498948482045868343656; // Golden ratio

  // Simplex noise constants - mathematically derived for optimal distribution
  const float F2 = 0.36602540378443864676372317075294; // (sqrt(3) - 1) / 2
  const float G2 = 0.21132486540518713342105263157895; // (3 - sqrt(3)) / 6
  const float G2_2 = 0.42264973081037426684210526315789; // 2 * G2
  const float G2_MINUS_1 = -0.78867513459481286657894736842105; // 2 * G2 - 1

  // Improved permutation constants for better hash distribution
  const float PERM_MOD = 289.0;
  const float PERM_MUL = 34.0;
  const float PERM_ADD = 1.0;

  // Optimized normalization constant for better noise range
  const float NOISE_SCALE = 70.0; // Improved from 130.0 for better dynamic range

  // FBM configuration constants
  const float FBM_LACUNARITY = 2.0;      // Frequency multiplier between octaves
  const float FBM_PERSISTENCE = 0.5;     // Amplitude multiplier between octaves
  const float FBM_INITIAL_AMP = 0.5;     // Starting amplitude

  // Domain warping offset vectors - using irrational numbers for better distribution
  const vec2 WARP_OFFSET_1 = vec2(0.0, 0.0);
  const vec2 WARP_OFFSET_2 = vec2(5.12, 1.41); // Approximations of sqrt(26.2144) and sqrt(2)
  const vec2 WARP_OFFSET_3 = vec2(1.73, 9.17); // Approximations of sqrt(3) and sqrt(84.1)
  const vec2 WARP_OFFSET_4 = vec2(8.37, 2.83); // Approximations of sqrt(70.06) and sqrt(8)

  // Animation velocity constants - using phi-based ratios for organic motion
  const float ANIM_VEL_X1 = 0.1;
  const float ANIM_VEL_Y1 = 0.05;
  const float ANIM_VEL_X2 = -0.08;
  const float ANIM_VEL_Y2 = 0.12;
  const float ANIM_VEL_X3 = 0.06;
  const float ANIM_VEL_Y3 = -0.04;

  // Time scaling factors for warping
  const float WARP_TIME_SCALE_1 = 0.15;
  const float WARP_TIME_SCALE_2 = 0.126; // Approximation of 1/e^2

  // Layer scaling factors
  const float LAYER_SCALE_2 = 1.5;
  const float LAYER_SCALE_3 = 2.5;

  // Noise combination weights - normalized to sum to 1.0
  const float NOISE_WEIGHT_1 = 0.6;
  const float NOISE_WEIGHT_2 = 0.3;
  const float NOISE_WEIGHT_3 = 0.1;

  // Palette animation frequencies - using musical ratios
  const float PALETTE_FREQ_1 = 1.5;     // Perfect fifth ratio
  const float PALETTE_FREQ_2 = 2.25;    // Major ninth ratio
  const float PALETTE_AMP_1 = 0.4;
  const float PALETTE_AMP_2 = 0.3;

  // Background noise scales and intensities
  const float BG_NOISE_SCALE_1 = 2.0;
  const float BG_NOISE_SCALE_2 = 5.0;
  const float BG_NOISE_INTENSITY_1 = 0.02;
  const float BG_NOISE_INTENSITY_2 = 0.02;
  const float BG_NOISE_TIME_SCALE_1 = 0.1;
  const float BG_NOISE_TIME_SCALE_2 = 0.15;

  // Color mixing ratios
  const float COLOR_MIX_RATIO_1 = 0.6;
  const float COLOR_MIX_RATIO_2 = 0.7;
  const float COLOR_INTENSITY_MUL = 0.8;
  const float COLOR_WAVE_AMP = 0.6;

  // Smoothstep range for pattern definition
  const float PATTERN_LOW = -0.3;
  const float PATTERN_HIGH = 0.5;

  // Color shift parameters
  const float COLOR_SHIFT_TIME_SCALE = 0.2;
  const float COLOR_SHIFT_UV_SCALE = 0.4;
  const float COLOR_SHIFT_NOISE_SCALE = 0.3;

  // Improved permutation function with better distribution
  vec3 permute(vec3 x) {
      return mod(((x * PERM_MUL) + PERM_ADD) * x, PERM_MOD);
  }

  // Optimized Simplex noise with improved constants
  float snoise(vec2 v) {
      // Skew the input space to determine which simplex cell we're in
      vec2 i = floor(v + dot(v, vec2(F2)));
      vec2 x0 = v - i + dot(i, vec2(G2));

      // Determine which simplex we are in
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);

      // Offsets for second and third corner of simplex in (x,y) uv coords
      vec4 x12 = x0.xyxy + vec4(G2, G2, G2_MINUS_1, G2_MINUS_1);
      x12.xy -= i1;

      // Permutations
      i = mod(i, PERM_MOD);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));

      // Circularly symmetric blending kernel
      vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
      m = m * m * m * m; // Fourth power for smoother falloff

      // Gradients from 41 points on a line, mapped onto a diamond
      vec3 x = fract(p * (1.0 / 41.0)) * 2.0 - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;

      // Normalize gradients implicitly by scaling m
      m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);

      // Compute final noise value at P
      vec3 g;
      g.x = a0.x * x0.x + h.x * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;

      return NOISE_SCALE * dot(m, g);
  }

  // Improved FBM with proper normalization
  float fbm(vec2 pos, int octaves) {
      float value = 0.0;
      float amplitude = FBM_INITIAL_AMP;
      float frequency = 1.0;
      float maxValue = 0.0; // Used for normalization

      for (int i = 0; i < 6; i++) {
          if (i >= octaves) break;
          value += amplitude * snoise(pos * frequency);
          maxValue += amplitude;
          amplitude *= FBM_PERSISTENCE;
          frequency *= FBM_LACUNARITY;
      }

      // Normalize to [-1, 1] range
      return value / maxValue;
  }

  // Enhanced domain warping with better offset distribution
  float domainWarp(vec2 pos, float time) {
      // Primary distortion layer
      vec2 q = vec2(
          fbm(pos + WARP_OFFSET_1, int(u_octaves)),
          fbm(pos + WARP_OFFSET_2, int(u_octaves))
      );

      // Secondary distortion layer with time animation
      vec2 r = vec2(
          fbm(pos + u_warpStrength * q + WARP_OFFSET_3 + WARP_TIME_SCALE_1 * time, int(u_octaves - 1.0)),
          fbm(pos + u_warpStrength * q + WARP_OFFSET_4 + WARP_TIME_SCALE_2 * time, int(u_octaves - 1.0))
      );

      // Final warped noise
      return fbm(pos + u_warpStrength * r, int(u_octaves - 2.0));
  }

  // Improved palette function with better color theory
  vec3 palette(float t) {
      vec3 a = u_primaryColor;
      vec3 b = u_secondaryColor;
      vec3 c = mix(u_primaryColor, u_secondaryColor, COLOR_MIX_RATIO_1);
      vec3 d = mix(u_primaryColor, u_secondaryColor, COLOR_MIX_RATIO_2);

      // Use sinusoidal modulation with musical frequency ratios
      d = mix(d, u_secondaryColor * 0.5, sin(t * PALETTE_FREQ_1) * PALETTE_AMP_1 + 0.5);
      d = mix(d, u_primaryColor * 1.2, sin(t * PALETTE_FREQ_2) * PALETTE_AMP_2 + 0.5);

      // Use precise TAU instead of approximation
      float wave = cos(TAU * (c.x * t + d.x)) * COLOR_WAVE_AMP;
      vec3 result = a + b * wave * COLOR_INTENSITY_MUL;

      return result;
  }

  void main() {
      vec2 uv = v_uv;
      vec2 st = uv * u_noiseScale;

      float time = u_time * u_animationSpeed;

      // Layer 1: Domain-warped noise with primary animation
      vec2 animPos = st + vec2(time * ANIM_VEL_X1, time * ANIM_VEL_Y1);
      float noise1 = domainWarp(animPos, time);

      // Layer 2: Standard FBM with secondary animation
      vec2 animPos2 = st * LAYER_SCALE_2 + vec2(time * ANIM_VEL_X2, time * ANIM_VEL_Y2);
      float noise2 = fbm(animPos2, int(u_octaves - 1.0));

      // Layer 3: Simple noise with tertiary animation
      vec2 animPos3 = st * LAYER_SCALE_3 + vec2(time * ANIM_VEL_X3, time * ANIM_VEL_Y3);
      float noise3 = snoise(animPos3);

      // Combine noise layers with normalized weights
      float combinedNoise = noise1 * NOISE_WEIGHT_1 + noise2 * NOISE_WEIGHT_2 + noise3 * NOISE_WEIGHT_3;

      // Create pattern with smooth transitions
      float pattern = smoothstep(PATTERN_LOW, PATTERN_HIGH, combinedNoise);

      // Generate color shift with multiple influences
      float colorShift = time * COLOR_SHIFT_TIME_SCALE + uv.x * COLOR_SHIFT_UV_SCALE;
      colorShift += noise1 * COLOR_SHIFT_NOISE_SCALE;
      vec3 color = palette(colorShift);

      // Add subtle background noise
      vec3 bgNoise = vec3(snoise(uv * BG_NOISE_SCALE_1 + time * BG_NOISE_TIME_SCALE_1) * BG_NOISE_INTENSITY_1);
      vec3 bgColor = u_backgroundColor + bgNoise;

      // Apply pattern intensity
      float intensity = pattern * u_intensity;
      color = mix(bgColor, color, intensity);

      // Add background movement texture
      vec3 bgMovement = vec3(snoise(uv * BG_NOISE_SCALE_2 + time * BG_NOISE_TIME_SCALE_2) * BG_NOISE_INTENSITY_2);
      color += bgMovement;

      gl_FragColor = vec4(color, u_backgroundOpacity);
  }
`;

type BackgroundProps = {
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
};

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
    if (!canvas) {
      return;
    }

    const gl = canvas.getContext("webgl");
    if (!gl) {
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
      if (!shader) {
        return null;
      }

      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    };

    const vertShader = createShader(gl.VERTEX_SHADER, vertexShader);
    const fragShader = createShader(gl.FRAGMENT_SHADER, fragmentShader);

    if (!(vertShader && fragShader)) {
      return;
    }

    // Create program
    const program = gl.createProgram();
    if (!program) {
      return;
    }

    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
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

    const primaryColorLocation = gl.getUniformLocation(
      program,
      "u_primaryColor",
    );
    const secondaryColorLocation = gl.getUniformLocation(
      program,
      "u_secondaryColor",
    );
    const backgroundColorLocation = gl.getUniformLocation(
      program,
      "u_backgroundColor",
    );
    const backgroundOpacityLocation = gl.getUniformLocation(
      program,
      "u_backgroundOpacity",
    );

    const animationSpeedLocation = gl.getUniformLocation(
      program,
      "u_animationSpeed",
    );
    const noiseScaleLocation = gl.getUniformLocation(program, "u_noiseScale");
    const intensityLocation = gl.getUniformLocation(program, "u_intensity");

    const octavesLocation = gl.getUniformLocation(program, "u_octaves");
    const warpStrengthLocation = gl.getUniformLocation(
      program,
      "u_warpStrength",
    );

    const render = (time: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = time;
      }
      const elapsedTime = (time - startTimeRef.current) * 0.001;

      gl.useProgram(program);

      gl.uniform1f(timeLocation, elapsedTime);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

      gl.uniform3f(
        primaryColorLocation,
        primaryColor[0],
        primaryColor[1],
        primaryColor[2],
      );
      gl.uniform3f(
        secondaryColorLocation,
        secondaryColor[0],
        secondaryColor[1],
        secondaryColor[2],
      );
      gl.uniform3f(
        backgroundColorLocation,
        backgroundColor[0],
        backgroundColor[1],
        backgroundColor[2],
      );
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
      <canvas className={styles.canvas} ref={canvasRef} />
    </div>
  );
};

export default Background;
