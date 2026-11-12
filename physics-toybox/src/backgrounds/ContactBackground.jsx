import React, { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'

/**
 * ============================================================================
 * DANIAL® — Panel 6: Concentric Energy Portal Rings (Contact Background)
 * ============================================================================
 * 
 * VISUAL CONCEPT:
 * A cinematic futuristic gateway comprised of concentric luminous circular arcs
 * of electric purple and white neon light. Light emanates outward across a glossy
 * mirror-reflective obsidian stage, while vertical light pillars and rising sparks
 * invite the visitor to initiate collaboration or connect.
 * 
 * SHADER & GEOMETRY ARCHITECTURE:
 * 1. Portal Arch Geometry:
 *    - 9 concentric nested ring segments with alternating radius offsets.
 *    - Rotation and pulsation driven by sinusoidal time functions.
 * 
 * 2. Glossy Reflective Floor (floorVertexShader / floorFragmentShader):
 *    - Planar reflective shader receiving portal light spill and concentric ripples.
 * 
 * 3. Spark Pillars & Floating Light Embers:
 *    - Vertical laser line pillars framing the sides of the stage.
 *    - 160 rising energy embers with custom circular discard and twinkle glow.
 * 
 * GPU PERFORMANCE OPTIMIZATIONS:
 * - Frame culling: when `opacity <= 0.005`, group is hidden and all animation loops halt.
 * 
 * @param {Object} props
 * @param {number} props.opacity - Current interpolated opacity [0.0 - 1.0] from BackgroundManager
 * @param {boolean} props.reducedMotion - Accessibility flag to dampen animation speeds
 */

// Custom Shader for Reflective Glossy Floor with Expanding Circular Ripples (Panel 6 Reference)
const floorVertexShader = `
  varying vec2 vUv;
  varying vec3 vWorldPosition;
  void main() {
    vUv = uv;
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`

const floorFragmentShader = `
  uniform float uTime;
  uniform float uOpacity;
  uniform vec3 uColorObsidian;
  uniform vec3 uColorViolet;
  uniform vec3 uColorLavender;
  varying vec2 vUv;
  varying vec3 vWorldPosition;

  void main() {
    // Distance from the portal base on the floor
    vec2 center = vec2(0.0, 0.0);
    float r = length(vWorldPosition.xz - center);

    // Expanding concentric circular ripples
    float ripple = sin(r * 5.8 - uTime * 2.8) * 0.5 + 0.5;
    ripple = pow(ripple, 4.0) * exp(-r * 0.42);

    // Mirror reflection of portal light
    float portalGlow = exp(-r * 0.6) * 0.48;

    vec3 color = uColorObsidian;
    color += uColorViolet * (portalGlow + ripple * 0.38);
    color += uColorLavender * (ripple * 0.55);

    // Peripheral vignette
    float vig = smoothstep(6.5, 1.2, r);
    color = mix(uColorObsidian, color, vig);

    gl_FragColor = vec4(color, uOpacity);
  }
`

// Circular antialiased point shader for portal sparks
const sparkVertexShader = `
  uniform float uPixelRatio;
  uniform float uOpacity;
  attribute float aSize;

  varying float vOpacity;

  void main() {
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uPixelRatio * (20.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
    vOpacity = uOpacity;
  }
`

const sparkFragmentShader = `
  varying float vOpacity;
  void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) discard;
    float alpha = smoothstep(0.5, 0.05, dist) * vOpacity;
    gl_FragColor = vec4(0.92, 0.85, 1.0, alpha * 0.9);
  }
`

export default function ContactBackground({ opacity = 1, reducedMotion = false }) {
  const groupRef = useRef()
  const portalRingsRef = useRef()
  const floorRef = useRef()
  const pillarsRef = useRef()
  const sparksRef = useRef()
  const { viewport } = useThree()

  const targetMouse = useRef({ x: 0, y: 0 })
  const smoothedMouse = useRef({ x: 0, y: 0 })

  const RING_COUNT = 6
  const PILLAR_COUNT = 28
  const SPARK_COUNT = 90

  // 1. Concentric Portal Rings
  const ringRadii = [0.85, 1.25, 1.7, 2.2, 2.75, 3.35]

  // 2. Vertical Light Pillars along perimeter
  const { pillarGeo, pillarPosArr, pillarColArr } = useMemo(() => {
    const pos = new Float32Array(PILLAR_COUNT * 2 * 3)
    const col = new Float32Array(PILLAR_COUNT * 2 * 3)

    for (let i = 0; i < PILLAR_COUNT; i++) {
      const angle = (i / PILLAR_COUNT) * Math.PI * 2
      const radius = 3.6 + (i % 3) * 0.5
      const x = Math.cos(angle) * radius
      const z = Math.sin(angle) * radius * 0.6 - 1.2
      const baseIdx = i * 6

      pos[baseIdx] = x
      pos[baseIdx + 1] = -1.2 // Ground level
      pos[baseIdx + 2] = z

      pos[baseIdx + 3] = x
      pos[baseIdx + 4] = 2.4 + ((i * 3) % 4) * 0.5 // Variable height
      pos[baseIdx + 5] = z

      col[baseIdx] = 0.54
      col[baseIdx + 1] = 0.22
      col[baseIdx + 2] = 0.96
      col[baseIdx + 3] = 0.88
      col[baseIdx + 4] = 0.72
      col[baseIdx + 5] = 1.0
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3))
    return { pillarGeo: geo, pillarPosArr: pos, pillarColArr: col }
  }, [])

  // 3. Orbiting Energy Spark Motes
  const sparksData = useMemo(() => {
    const pos = new Float32Array(SPARK_COUNT * 3)
    const sz = new Float32Array(SPARK_COUNT)
    for (let i = 0; i < SPARK_COUNT; i++) {
      const angle = Math.random() * Math.PI * 2
      const r = 0.8 + Math.random() * 2.6
      pos[i * 3] = Math.cos(angle) * r
      pos[i * 3 + 1] = Math.sin(angle) * r + 0.6
      pos[i * 3 + 2] = (Math.random() - 0.5) * 1.5 - 1.2
      sz[i] = Math.random() * 2.2 + 1.5
    }
    return { positions: pos, sizes: sz }
  }, [])

  const floorUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uOpacity: { value: opacity },
      uColorObsidian: { value: new THREE.Color('#030208') },
      uColorViolet: { value: new THREE.Color('#6D28D9') },
      uColorLavender: { value: new THREE.Color('#C4B5FD') },
    }),
    []
  )

  const sparkUniforms = useMemo(
    () => ({
      uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
      uOpacity: { value: opacity },
    }),
    []
  )

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

    floorUniforms.uOpacity.value = opacity
    sparkUniforms.uOpacity.value = opacity

    // When reduced motion is preferred, keep portal rings in a stationary majestic formation
    const time = reducedMotion ? 1.0 : state.clock.getElapsedTime()
    floorUniforms.uTime.value = time

    if (!reducedMotion) {
      smoothedMouse.current.x = THREE.MathUtils.lerp(smoothedMouse.current.x, targetMouse.current.x, 0.05)
      smoothedMouse.current.y = THREE.MathUtils.lerp(smoothedMouse.current.y, targetMouse.current.y, 0.05)

      // Rotate concentric portal rings
      if (portalRingsRef.current) {
        const children = portalRingsRef.current.children
        for (let i = 0; i < children.length; i++) {
          const ring = children[i]
          const dir = i % 2 === 0 ? 1 : -1
          ring.rotation.z = time * 0.16 * dir * (1.0 + i * 0.08)
          ring.rotation.y = Math.sin(time * 0.3 + i) * 0.06 + smoothedMouse.current.x * 0.08
        }
      }

      if (sparksRef.current) {
        sparksRef.current.rotation.z = -time * 0.12
        sparksRef.current.rotation.y = time * 0.08
      }

      groupRef.current.rotation.y = smoothedMouse.current.x * 0.04
      groupRef.current.rotation.x = -smoothedMouse.current.y * 0.03
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* 1. Concentric Glowing Portal Rings */}
      <group ref={portalRingsRef} position={[0, 0.7, -1.8]}>
        {ringRadii.map((radius, idx) => (
          <mesh key={idx} rotation={[0, 0, (idx * Math.PI) / 6]}>
            <torusGeometry args={[radius, 0.022 + idx * 0.005, 16, 80]} />
            <meshBasicMaterial
              color={idx === 0 ? new THREE.Color('#FFFFFF') : idx < 3 ? new THREE.Color('#A78BFA') : new THREE.Color('#7C3AED')}
              transparent={true}
              opacity={(0.85 - idx * 0.08) * opacity}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}

        {/* Central Luminous Portal Aura Disc */}
        <mesh position={[0, 0, -0.05]}>
          <circleGeometry args={[0.9, 48]} />
          <meshBasicMaterial
            color={new THREE.Color('#8B5CF6')}
            transparent={true}
            opacity={0.3 * opacity}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>

      {/* 2. Reflective Obsidian Floor with Concentric Ripple Waves */}
      <mesh ref={floorRef} position={[0, -1.2, -1.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[viewport.width * 2.2, viewport.height * 2.2]} />
        <shaderMaterial
          vertexShader={floorVertexShader}
          fragmentShader={floorFragmentShader}
          uniforms={floorUniforms}
          transparent={true}
          depthWrite={false}
        />
      </mesh>

      {/* 3. Vertical Light Shafts along the perimeter */}
      <lineSegments ref={pillarsRef} geometry={pillarGeo}>
        <lineBasicMaterial
          vertexColors={true}
          transparent={true}
          opacity={0.6 * opacity}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* 4. Orbiting Energy Spark Motes (Circular antialiased point shader) */}
      <points ref={sparksRef} position={[0, 0.7, -1.8]}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={SPARK_COUNT}
            array={sparksData.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aSize"
            count={SPARK_COUNT}
            array={sparksData.sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={sparkVertexShader}
          fragmentShader={sparkFragmentShader}
          uniforms={sparkUniforms}
          transparent={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}
