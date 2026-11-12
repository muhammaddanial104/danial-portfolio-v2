import React, { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Custom GLSL Shaders for Dark Obsidian & Luminous Violet Liquid Waves
const waveVertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uMouseStrength;
  uniform float uScrollProgress;
  uniform float uReducedMotion;

  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  // 2D Simplex Noise for smooth, organic fluid waves
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

  void main() {
    vUv = uv;
    vec3 pos = position;

    float motionScale = uReducedMotion > 0.5 ? 0.15 : 1.0;
    float time = uTime * 0.45 * motionScale;

    // 1. Broad rolling fluid swells
    float wave1 = sin(pos.x * 0.65 + time * 1.05) * cos(pos.y * 0.55 + time * 0.8) * 0.38;
    float wave2 = sin(pos.x * 1.15 - time * 0.7 + pos.y * 0.95) * 0.22;

    // 2. Multi-frequency organic liquid turbulence
    float noiseFreq = 0.5 + uScrollProgress * 0.25;
    float noise1 = snoise(pos.xy * noiseFreq + vec2(time * 0.25, -time * 0.18)) * 0.35;
    float noise2 = snoise(pos.xy * (noiseFreq * 1.8) - vec2(time * 0.2, time * 0.25)) * 0.15;

    // 3. Mouse pointer reactive liquid displacement (subtle organic ripple)
    float mouseDist = length(pos.xy - uMouse);
    float mouseRipple = sin(mouseDist * 6.0 - time * 5.0) * exp(-mouseDist * 1.3) * uMouseStrength * 0.55;

    // Cumulative 3D height displacement
    float elevation = (wave1 + wave2 + noise1 + noise2 + mouseRipple) * (0.8 + uScrollProgress * 0.5);
    pos.z += elevation;

    vElevation = elevation;
    vNormal = normalize(normalMatrix * normal);
    
    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vWorldPosition = worldPos.xyz;

    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`

const waveFragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uScrollProgress;
  uniform vec3 uColorObsidian;
  uniform vec3 uColorDeepViolet;
  uniform vec3 uColorElectricPurple;
  uniform vec3 uColorLavender;
  uniform vec3 uColorChrome;

  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  void main() {
    // Normalizing elevation across smooth gradient thresholds
    float factor = clamp((vElevation + 0.35) * 0.9, 0.0, 1.0);

    // Deep Obsidian & Royal Violet Base Troughs
    vec3 color = mix(uColorObsidian, uColorDeepViolet, smoothstep(0.0, 0.4, factor));
    // Mid Slopes: Electric Purple
    color = mix(color, uColorElectricPurple, smoothstep(0.35, 0.75, factor));
    // Crests: Luminous Lavender
    color = mix(color, uColorLavender, smoothstep(0.7, 0.98, factor));

    // Liquid Chrome Fresnel Specular Sheen (Deep iridescent chrome)
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    vec3 normal = normalize(vNormal);
    float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 3.5);

    // Virtual key directional specular highlights
    vec3 lightDir = normalize(vec3(0.5, 0.8, 0.65));
    vec3 halfVec = normalize(lightDir + viewDir);
    float spec = pow(max(dot(normal, halfVec), 0.0), 22.0) * 0.45;

    // Traveling energy pulse across the waves
    float energyBeam = sin(vUv.x * 4.0 + vUv.y * 3.0 - uTime * 0.75) * 0.5 + 0.5;
    energyBeam = pow(energyBeam, 4.0) * 0.28;

    // Blend chrome highlights with lavender tint (never blinding white)
    color += uColorChrome * (fresnel * 0.35 + spec);
    color += uColorElectricPurple * energyBeam;

    // Interactive mouse aura (soft glow around pointer)
    float mouseDist = length(vUv * 2.0 - 1.0 - uMouse * 0.35);
    float mouseAura = exp(-mouseDist * 2.5) * 0.25;
    color += uColorLavender * mouseAura;

    // Contrast Shield for Text:
    // Gently dims the left/center zone where typography sits
    float textProtection = smoothstep(0.0, 0.75, vUv.x);
    color = mix(uColorObsidian, color, 0.45 + textProtection * 0.55);

    // Peripheral vignette ensuring seamless border blending into #08070D
    float edgeVignette = smoothstep(1.25, 0.35, length(vUv - 0.5) * 1.3);
    color = mix(uColorObsidian, color, clamp(edgeVignette + 0.2, 0.0, 1.0));

    // Luxury dark grade: preserves Obsidian black depth
    color = mix(color, uColorObsidian, 0.22 + uScrollProgress * 0.08);

    gl_FragColor = vec4(color, 1.0);
  }
`

function WavePlane({ reducedMotion }) {
  const meshRef = useRef()
  const { viewport } = useThree()

  const targetMouse = useRef({ x: 0, y: 0 })
  const smoothedMouse = useRef({ x: 0, y: 0 })
  const mouseStrength = useRef(0)
  const scrollProgress = useRef(0)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uMouseStrength: { value: 0 },
      uScrollProgress: { value: 0 },
      uReducedMotion: { value: reducedMotion ? 1.0 : 0.0 },
      // Design System Colors in Linear RGB
      uColorObsidian: { value: new THREE.Color('#08070D') },
      uColorDeepViolet: { value: new THREE.Color('#2A0E5C') },
      uColorElectricPurple: { value: new THREE.Color('#6D28D9') },
      uColorLavender: { value: new THREE.Color('#9333EA') },
      uColorChrome: { value: new THREE.Color('#C4B5FD') },
    }),
    [reducedMotion]
  )

  useEffect(() => {
    let timer

    const handlePointerMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      targetMouse.current = { x: x * (viewport.width / 2), y: y * (viewport.height / 2) }
      mouseStrength.current = 1.0

      clearTimeout(timer)
      timer = setTimeout(() => {
        gsap.to(mouseStrength, { current: 0.15, duration: 1.5 })
      }, 300)
    }

    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0]
        const x = (touch.clientX / window.innerWidth) * 2 - 1
        const y = -(touch.clientY / window.innerHeight) * 2 + 1
        targetMouse.current = { x: x * (viewport.width / 2), y: y * (viewport.height / 2) }
        mouseStrength.current = 0.85
      }
    }

    const st = ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        scrollProgress.current = self.progress
      },
    })

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('touchmove', handleTouchMove)
      clearTimeout(timer)
      st.kill()
    }
  }, [viewport.width, viewport.height])

  useFrame((state) => {
    if (!meshRef.current) return

    uniforms.uTime.value = state.clock.getElapsedTime()

    // Smoothly damp mouse movements for fluid momentum
    smoothedMouse.current.x = THREE.MathUtils.lerp(smoothedMouse.current.x, targetMouse.current.x, 0.05)
    smoothedMouse.current.y = THREE.MathUtils.lerp(smoothedMouse.current.y, targetMouse.current.y, 0.05)
    uniforms.uMouse.value.set(smoothedMouse.current.x, smoothedMouse.current.y)

    uniforms.uMouseStrength.value = THREE.MathUtils.lerp(uniforms.uMouseStrength.value, mouseStrength.current, 0.07)
    uniforms.uScrollProgress.value = THREE.MathUtils.lerp(uniforms.uScrollProgress.value, scrollProgress.current, 0.05)

    // Gentle camera perspective shifts with scroll
    meshRef.current.rotation.x = -Math.PI / 3.8 + uniforms.uScrollProgress.value * 0.14
    meshRef.current.position.y = -0.55 + uniforms.uScrollProgress.value * 0.35
  })

  // Sizing geometry generously across the viewport
  const planeWidth = viewport.width * 1.7
  const planeHeight = viewport.height * 2.0

  return (
    <mesh ref={meshRef} position={[0, -0.55, -1.0]} rotation={[-Math.PI / 3.8, 0, 0]}>
      <planeGeometry args={[planeWidth, planeHeight, 140, 140]} />
      <shaderMaterial
        vertexShader={waveVertexShader}
        fragmentShader={waveFragmentShader}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

function Fallback() {
  return (
    <div className="fixed inset-0 z-0 h-full w-full bg-[#08070D] bg-radial-gradient-purple opacity-70 pointer-events-none" />
  )
}

export default function LiquidWaveBackground() {
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isSupported, setIsSupported] = useState(true)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(media.matches)
    const handler = (e) => setReducedMotion(e.matches)
    media.addEventListener('change', handler)

    try {
      const c = document.createElement('canvas')
      const gl = c.getContext('webgl') || c.getContext('experimental-webgl')
      if (!gl) setIsSupported(false)
    } catch {
      setIsSupported(false)
    }

    return () => media.removeEventListener('change', handler)
  }, [])

  if (!isSupported) {
    return <Fallback />
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 h-full w-full pointer-events-none select-none overflow-hidden bg-[#08070D]"
    >
      <Canvas
        camera={{ position: [0, 0, 4.6], fov: 46 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ pointerEvents: 'none', position: 'absolute', inset: 0 }}
      >
        <WavePlane reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  )
}
