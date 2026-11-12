import React, { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'

// Custom GLSL Shaders for Liquid Chrome Waves (Matching Panel 1 Reference)
const waveVertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uMouseStrength;
  uniform float uReducedMotion;

  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec3 vEyeVector;

  // 2D Simplex Noise for organic fluid ribbons
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

    float motionScale = uReducedMotion > 0.5 ? 0.2 : 1.0;
    float time = uTime * 0.42 * motionScale;

    // Dramatic rolling metallic ribbon waves
    float wave1 = sin(pos.x * 0.75 + time * 1.1) * cos(pos.y * 0.6 + time * 0.85) * 0.48;
    float wave2 = sin(pos.x * 1.3 - time * 0.75 + pos.y * 1.1) * 0.28;
    float wave3 = cos(pos.y * 1.8 + pos.x * 0.85 + time * 0.6) * 0.16;

    // Multi-frequency organic liquid turbulence
    float noise1 = snoise(pos.xy * 0.55 + vec2(time * 0.2, -time * 0.15)) * 0.38;
    float noise2 = snoise(pos.xy * 1.2 - vec2(time * 0.18, time * 0.22)) * 0.18;

    // Mouse pointer reactive liquid displacement
    float mouseDist = length(pos.xy - uMouse);
    float mouseRipple = sin(mouseDist * 5.5 - time * 4.5) * exp(-mouseDist * 1.2) * uMouseStrength * 0.65;

    float elevation = (wave1 + wave2 + wave3 + noise1 + noise2 + mouseRipple) * 1.15;
    pos.z += elevation;

    vElevation = elevation;

    // Analytical-like normal perturbation for crisp chrome reflections
    vec3 transformedNormal = normal;
    transformedNormal.x -= (cos(pos.x * 0.75 + time * 1.1) * 0.35 + snoise(pos.xy * 1.1) * 0.2);
    transformedNormal.y -= (sin(pos.y * 0.6 + time * 0.85) * 0.35);
    vNormal = normalize(normalMatrix * transformedNormal);

    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vWorldPosition = worldPos.xyz;
    vEyeVector = normalize(cameraPosition - worldPos.xyz);

    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`

const waveFragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uGlobalOpacity;
  uniform vec3 uColorObsidian;
  uniform vec3 uColorDeepViolet;
  uniform vec3 uColorElectricPurple;
  uniform vec3 uColorLavender;
  uniform vec3 uColorChrome;

  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;
  varying vec3 vEyeVector;

  void main() {
    // Normalizing elevation across smooth gradient thresholds
    float factor = clamp((vElevation + 0.45) * 0.75, 0.0, 1.0);

    // Deep Obsidian Base Troughs (#030208 -> #2E1065)
    vec3 color = mix(uColorObsidian, uColorDeepViolet, smoothstep(0.05, 0.45, factor));
    // Mid Slopes: Electric Purple (#8B5CF6)
    color = mix(color, uColorElectricPurple, smoothstep(0.4, 0.75, factor));
    // Crests: Luminous Lavender (#A78BFA)
    color = mix(color, uColorLavender, smoothstep(0.7, 0.98, factor));

    // Liquid Chrome Metallic Specular (Dual Specular for high gloss)
    vec3 normal = normalize(vNormal);
    vec3 viewDir = vEyeVector;

    // Fresnel reflection
    float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 3.2);

    // Key Specular Highlight (Crisp metallic sheen)
    vec3 lightDir1 = normalize(vec3(0.65, 0.85, 0.75));
    vec3 halfVec1 = normalize(lightDir1 + viewDir);
    float spec1 = pow(max(dot(normal, halfVec1), 0.0), 48.0) * 0.85;

    // Secondary Specular Highlight (Soft violet rim light)
    vec3 lightDir2 = normalize(vec3(-0.7, -0.5, 0.6));
    vec3 halfVec2 = normalize(lightDir2 + viewDir);
    float spec2 = pow(max(dot(normal, halfVec2), 0.0), 24.0) * 0.4;

    // Glowing chrome ribbons along wave crests
    float ribbon = pow(smoothstep(0.55, 0.95, factor), 3.0) * 0.6;

    // Blend glossy chrome highlights
    color += uColorChrome * (spec1 + ribbon);
    color += uColorLavender * (spec2 + fresnel * 0.45);

    // Subtle traveling energy pulse
    float energyBeam = sin(vUv.x * 3.5 + vUv.y * 2.5 - uTime * 0.65) * 0.5 + 0.5;
    energyBeam = pow(energyBeam, 5.0) * 0.35;
    color += uColorElectricPurple * energyBeam;

    // Interactive mouse aura
    float mouseDist = length(vUv * 2.0 - 1.0 - uMouse * 0.35);
    float mouseAura = exp(-mouseDist * 2.2) * 0.3;
    color += uColorLavender * mouseAura;

    // Contrast Shield for Typography: Gentle dampening on left zone
    float textProtection = smoothstep(0.0, 0.75, vUv.x);
    color = mix(uColorObsidian, color, 0.42 + textProtection * 0.58);

    // Peripheral vignette blending into deep obsidian space
    float edgeVignette = smoothstep(1.3, 0.3, length(vUv - 0.5) * 1.35);
    color = mix(uColorObsidian, color, clamp(edgeVignette + 0.15, 0.0, 1.0));

    // Dark luxury grade
    color = mix(color, uColorObsidian, 0.18);

    gl_FragColor = vec4(color, uGlobalOpacity);
  }
`

export default function HomeBackground({ opacity = 1, reducedMotion = false }) {
  const meshRef = useRef()
  const { viewport } = useThree()

  const targetMouse = useRef({ x: 0, y: 0 })
  const smoothedMouse = useRef({ x: 0, y: 0 })
  const mouseStrength = useRef(0)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uMouseStrength: { value: 0 },
      uReducedMotion: { value: reducedMotion ? 1.0 : 0.0 },
      uGlobalOpacity: { value: opacity },
      uColorObsidian: { value: new THREE.Color('#030208') },
      uColorDeepViolet: { value: new THREE.Color('#2E1065') },
      uColorElectricPurple: { value: new THREE.Color('#8B5CF6') },
      uColorLavender: { value: new THREE.Color('#A78BFA') },
      uColorChrome: { value: new THREE.Color('#FFFFFF') },
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

    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('touchmove', handleTouchMove, { passive: true })

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('touchmove', handleTouchMove)
      clearTimeout(timer)
    }
  }, [viewport.width, viewport.height])

  useFrame((state) => {
    if (!meshRef.current) return

    // Efficiency check: if invisible, halt calculations entirely
    if (opacity <= 0.005) {
      if (meshRef.current.visible) meshRef.current.visible = false
      return
    }
    if (!meshRef.current.visible) meshRef.current.visible = true

    uniforms.uGlobalOpacity.value = opacity
    uniforms.uTime.value = state.clock.getElapsedTime()

    smoothedMouse.current.x = THREE.MathUtils.lerp(smoothedMouse.current.x, targetMouse.current.x, 0.05)
    smoothedMouse.current.y = THREE.MathUtils.lerp(smoothedMouse.current.y, targetMouse.current.y, 0.05)
    uniforms.uMouse.value.set(smoothedMouse.current.x, smoothedMouse.current.y)
    uniforms.uMouseStrength.value = THREE.MathUtils.lerp(uniforms.uMouseStrength.value, mouseStrength.current, 0.07)

    meshRef.current.rotation.x = -Math.PI / 3.6
    meshRef.current.position.y = -0.45
  })

  const planeWidth = viewport.width * 1.75
  const planeHeight = viewport.height * 2.1

  return (
    <mesh ref={meshRef} position={[0, -0.45, -1.0]} rotation={[-Math.PI / 3.6, 0, 0]}>
      <planeGeometry args={[planeWidth, planeHeight, 130, 130]} />
      <shaderMaterial
        vertexShader={waveVertexShader}
        fragmentShader={waveFragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}
