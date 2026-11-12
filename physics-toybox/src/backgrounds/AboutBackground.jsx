import React, { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * ============================================================================
 * DANIAL® — Panel 4: Cosmic Violet Aurora & Atmospheric Nebulae (About Background)
 * ============================================================================
 * 
 * VISUAL CONCEPT:
 * A breathtaking cosmic sky ablaze with an ethereal aurora borealis in electric violet,
 * deep magenta, and luminous lilac. The aurora curtains drift and fold rhythmically
 * above dark obsidian cloudscapes, interspersed with thousands of shimmering stars.
 * 
 * SHADER & RENDERING ARCHITECTURE:
 * 1. Procedural Aurora Curtains (auroraFragmentShader):
 *    - 3-octave Fractal Brownian Motion (FBM) with domain warping.
 *    - Vertical curtain modulation (`smoothstep`) produces vertical light folds that
 *      sway with time and respond subtly to pointer position.
 *    - Obsidian sky gradient blending with luminous purple ribbons and warm lilac peaks.
 * 
 * 2. Drifting Starfield:
 *    - 500 circular star points using custom antialiased disc shaders.
 *    - Subtle sinusoidal twinkle phases computed per-star.
 * 
 * GPU PERFORMANCE OPTIMIZATIONS:
 * - Frame culling: when `opacity <= 0.005`, mesh is hidden and shader uniforms are untouched.
 * - Screen-space quad rendering minimizes vertex count while maximizing visual fidelity.
 * 
 * @param {Object} props
 * @param {number} props.opacity - Current interpolated opacity [0.0 - 1.0] from BackgroundManager
 * @param {boolean} props.reducedMotion - Accessibility flag to dampen animation speeds
 */

// Custom GLSL Shaders for Cosmic Aurora Borealis (Panel 4 Reference)
const auroraVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const auroraFragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uOpacity;
  uniform vec3 uColorSky;
  uniform vec3 uColorDarkViolet;
  uniform vec3 uColorElectricPurple;
  uniform vec3 uColorLavender;
  uniform vec3 uColorLilac;

  varying vec2 vUv;

  vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
             -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
      dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // Multi-layered fractal noise for atmospheric aurora curtains
  float fbm(vec2 p) {
    float f = 0.0;
    f += 0.5000 * snoise(p); p = p * 2.02;
    f += 0.2500 * snoise(p); p = p * 2.03;
    f += 0.1250 * snoise(p); p = p * 2.01;
    f += 0.0625 * snoise(p);
    return f;
  }

  void main() {
    vec2 uv = vUv;
    float time = uTime * 0.25;

    // Vertical curtain folds distortion
    float curtainFold = sin(uv.x * 6.0 + time * 0.8) * 0.12 + cos(uv.x * 12.0 - time * 0.5) * 0.06;
    vec2 warpedUv = uv + vec2(curtainFold * 0.4, curtainFold);

    // Domain Warping for cosmic fluid clouds
    vec2 q = vec2(
      fbm(warpedUv * 1.6 + vec2(time * 0.3, time * 0.12) + uMouse * 0.08),
      fbm(warpedUv * 1.6 + vec2(-time * 0.2, time * 0.35) - uMouse * 0.08)
    );

    vec2 r = vec2(
      fbm(warpedUv * 2.0 + 2.4 * q + vec2(time * 0.15, -time * 0.2)),
      fbm(warpedUv * 2.0 + 2.4 * q + vec2(-time * 0.18, time * 0.18))
    );

    float f = fbm(warpedUv * 1.4 + 2.8 * r);

    // Aurora vertical curtain mask (intense in mid-upper sky)
    float auroraMask = smoothstep(0.12, 0.72, uv.y) * smoothstep(1.05, 0.38, uv.y);
    float auroraStrength = clamp(f * 1.4 + 0.32, 0.0, 1.0) * auroraMask;

    // Deep Obsidian Night Sky
    vec3 color = uColorSky;

    // Swirling Aurora Colors
    color = mix(color, uColorDarkViolet, smoothstep(0.15, 0.5, auroraStrength));
    color = mix(color, uColorElectricPurple, smoothstep(0.42, 0.75, auroraStrength));
    color = mix(color, uColorLavender, smoothstep(0.68, 0.92, auroraStrength));
    color += uColorLilac * pow(smoothstep(0.82, 1.0, auroraStrength), 2.5) * 0.75;

    // Soft atmospheric horizon fog rising from bottom
    float fog = smoothstep(0.48, 0.0, uv.y) * 0.38;
    color += uColorDarkViolet * fog;

    // Vignette
    float vig = smoothstep(1.35, 0.35, length(uv - 0.5) * 1.3);
    color = mix(uColorSky, color, clamp(vig + 0.1, 0.0, 1.0));

    gl_FragColor = vec4(color, uOpacity);
  }
`

// Tiny circular star point shader (replaces standard pointsMaterial to eliminate square billboard glitch)
const starVertexShader = `
  uniform float uPixelRatio;
  uniform float uOpacity;
  attribute float aSize;

  varying float vOpacity;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uPixelRatio;
    gl_Position = projectionMatrix * mvPosition;
    vOpacity = uOpacity;
  }
`

const starFragmentShader = `
  varying float vOpacity;
  void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) discard;
    float alpha = smoothstep(0.5, 0.05, dist) * vOpacity;
    gl_FragColor = vec4(1.0, 1.0, 1.0, alpha * 0.85);
  }
`

export default function AboutBackground({ opacity = 1, reducedMotion = false }) {
  const groupRef = useRef()
  const auroraMeshRef = useRef()
  const mountainsRef = useRef()
  const starsRef = useRef()
  const { viewport } = useThree()

  const targetMouse = useRef({ x: 0, y: 0 })
  const smoothedMouse = useRef({ x: 0, y: 0 })

  const STAR_COUNT = 180

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uOpacity: { value: opacity },
      uColorSky: { value: new THREE.Color('#030208') },
      uColorDarkViolet: { value: new THREE.Color('#2E1065') },
      uColorElectricPurple: { value: new THREE.Color('#7C3AED') },
      uColorLavender: { value: new THREE.Color('#A78BFA') },
      uColorLilac: { value: new THREE.Color('#E9D5FF') },
    }),
    []
  )

  const starUniforms = useMemo(
    () => ({
      uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
      uOpacity: { value: opacity },
    }),
    []
  )

  // Starfield data
  const starsData = useMemo(() => {
    const pos = new Float32Array(STAR_COUNT * 3)
    const sz = new Float32Array(STAR_COUNT)
    for (let i = 0; i < STAR_COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * viewport.width * 2.0
      pos[i * 3 + 1] = Math.random() * viewport.height * 1.2
      pos[i * 3 + 2] = -2.5
      sz[i] = Math.random() * 2.5 + 1.2
    }
    return { positions: pos, sizes: sz }
  }, [viewport.width, viewport.height])

  // Mountain Silhouette along bottom horizon
  const mountainGeometry = useMemo(() => {
    const shape = new THREE.Shape()
    const w = viewport.width * 2.4
    const h = viewport.height * 0.42
    const left = -w / 2
    const bottom = -viewport.height / 2 - 0.5

    shape.moveTo(left, bottom)
    const segments = 40
    for (let i = 0; i <= segments; i++) {
      const x = left + (i / segments) * w
      const normX = i / segments
      const ridge =
        Math.sin(normX * 6.5) * 0.16 +
        Math.sin(normX * 15.0) * 0.08 +
        Math.cos(normX * 24.0) * 0.04
      const y = bottom + h * 0.52 + ridge * h
      shape.lineTo(x, y)
    }
    shape.lineTo(w / 2, bottom)
    shape.closePath()

    return new THREE.ShapeGeometry(shape)
  }, [viewport.width, viewport.height])

  useEffect(() => {
    if (reducedMotion) return
    const handlePointerMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      targetMouse.current = { x, y }
    }
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [reducedMotion])

  useFrame((state) => {
    if (!groupRef.current) return

    if (opacity <= 0.005) {
      if (groupRef.current.visible) groupRef.current.visible = false
      return
    }
    if (!groupRef.current.visible) groupRef.current.visible = true

    uniforms.uOpacity.value = opacity
    starUniforms.uOpacity.value = opacity

    // When reduced motion is preferred, lock aurora time to a static scenic curtain
    uniforms.uTime.value = reducedMotion ? 2.5 : state.clock.getElapsedTime()

    if (!reducedMotion) {
      smoothedMouse.current.x = THREE.MathUtils.lerp(smoothedMouse.current.x, targetMouse.current.x, 0.04)
      smoothedMouse.current.y = THREE.MathUtils.lerp(smoothedMouse.current.y, targetMouse.current.y, 0.04)
      uniforms.uMouse.value.set(smoothedMouse.current.x, smoothedMouse.current.y)
      groupRef.current.position.x = smoothedMouse.current.x * 0.12
    }
  })

  return (
    <group ref={groupRef}>
      {/* 1. Volumetric Cosmic Aurora Shader Plane */}
      <mesh ref={auroraMeshRef} position={[0, 0, -2.0]}>
        <planeGeometry args={[viewport.width * 2.2, viewport.height * 2.2]} />
        <shaderMaterial
          vertexShader={auroraVertexShader}
          fragmentShader={auroraFragmentShader}
          uniforms={uniforms}
          transparent={true}
          depthWrite={false}
        />
      </mesh>

      {/* 2. Twinkling Night Stars (Circular antialiased point shader) */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={STAR_COUNT}
            array={starsData.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aSize"
            count={STAR_COUNT}
            array={starsData.sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={starVertexShader}
          fragmentShader={starFragmentShader}
          uniforms={starUniforms}
          transparent={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* 3. Dark Mountain Ridge Silhouette along horizon */}
      <mesh ref={mountainsRef} geometry={mountainGeometry} position={[0, 0, -1.0]}>
        <meshBasicMaterial
          color={new THREE.Color('#030208')}
          transparent={true}
          opacity={0.96 * opacity}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}
