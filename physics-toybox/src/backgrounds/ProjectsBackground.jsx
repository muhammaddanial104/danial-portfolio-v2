import React, { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'

// Custom Point Shaders for Glowing Violet & Lavender Stars
const particleVertexShader = `
  uniform float uTime;
  uniform float uPixelRatio;
  uniform float uOpacity;
  attribute float aSize;
  attribute vec3 aColor;

  varying vec3 vColor;
  varying float vOpacity;

  void main() {
    vColor = aColor;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    
    // Depth-based perspective point scaling
    gl_PointSize = aSize * uPixelRatio * (28.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
    vOpacity = uOpacity;
  }
`

const particleFragmentShader = `
  varying vec3 vColor;
  varying float vOpacity;

  void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    
    if (dist > 0.5) discard;
    
    // Glowing radial falloff with bright white/lavender core
    float alpha = smoothstep(0.5, 0.05, dist) * vOpacity;
    float core = smoothstep(0.2, 0.0, dist) * 0.65;
    vec3 col = vColor + vec3(core);

    gl_FragColor = vec4(col, alpha);
  }
`

export default function ProjectsBackground({ opacity = 1, reducedMotion = false }) {
  const groupRef = useRef()
  const pointsRef = useRef()
  const bgStarsRef = useRef()
  const linesRef = useRef()
  const { viewport } = useThree()

  const targetMouse = useRef({ x: 0, y: 0 })
  const smoothedMouse = useRef({ x: 0, y: 0 })
  const mouseStrength = useRef(0)

  // Particle counts
  const CONSTELLATION_COUNT = 180
  const BG_STAR_COUNT = 600
  const MAX_LINES = 280
  const CONNECT_DISTANCE = 2.15

  // 1. Constellation Nodes (Connected by lines)
  const { positions, velocities, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(CONSTELLATION_COUNT * 3)
    const vel = new Float32Array(CONSTELLATION_COUNT * 3)
    const col = new Float32Array(CONSTELLATION_COUNT * 3)
    const sz = new Float32Array(CONSTELLATION_COUNT)

    const palette = [
      new THREE.Color('#8B5CF6'), // Electric Purple
      new THREE.Color('#A78BFA'), // Lavender
      new THREE.Color('#C4B5FD'), // Light Lilac
      new THREE.Color('#6D28D9'), // Violet
      new THREE.Color('#FFFFFF'), // Pure White Star Core
    ]

    for (let i = 0; i < CONSTELLATION_COUNT; i++) {
      const idx = i * 3
      pos[idx] = (Math.random() - 0.5) * viewport.width * 1.8
      pos[idx + 1] = (Math.random() - 0.5) * viewport.height * 2.0
      pos[idx + 2] = (Math.random() - 0.5) * 4.0 - 0.5

      vel[idx] = (Math.random() - 0.5) * 0.003
      vel[idx + 1] = (Math.random() - 0.5) * 0.003
      vel[idx + 2] = (Math.random() - 0.5) * 0.0015

      const c = palette[Math.floor(Math.random() * palette.length)]
      col[idx] = c.r
      col[idx + 1] = c.g
      col[idx + 2] = c.b

      sz[i] = Math.random() * 2.8 + 2.0
    }

    return { positions: pos, velocities: vel, colors: col, sizes: sz }
  }, [viewport.width, viewport.height])

  // 2. Deep Ambient Background Stars (Dense starfield)
  const bgStarsData = useMemo(() => {
    const pos = new Float32Array(BG_STAR_COUNT * 3)
    const col = new Float32Array(BG_STAR_COUNT * 3)
    const sz = new Float32Array(BG_STAR_COUNT)

    const palette = [
      new THREE.Color('#6D28D9'),
      new THREE.Color('#8B5CF6'),
      new THREE.Color('#A78BFA'),
    ]

    for (let i = 0; i < BG_STAR_COUNT; i++) {
      const idx = i * 3
      pos[idx] = (Math.random() - 0.5) * viewport.width * 2.5
      pos[idx + 1] = (Math.random() - 0.5) * viewport.height * 2.5
      pos[idx + 2] = -Math.random() * 6.0 - 2.0

      const c = palette[Math.floor(Math.random() * palette.length)]
      col[idx] = c.r
      col[idx + 1] = c.g
      col[idx + 2] = c.b

      sz[i] = Math.random() * 1.8 + 1.0
    }

    return { positions: pos, colors: col, sizes: sz }
  }, [viewport.width, viewport.height])

  // Preallocated buffer for dynamic constellation line geometry
  const linePositions = useMemo(() => new Float32Array(MAX_LINES * 2 * 3), [])
  const lineColors = useMemo(() => new Float32Array(MAX_LINES * 2 * 3), [])

  const lineGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(lineColors, 3))
    return geo
  }, [linePositions, lineColors])

  const particleUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
      uOpacity: { value: opacity },
    }),
    []
  )

  const bgStarUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
      uOpacity: { value: opacity * 0.75 },
    }),
    []
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
        gsap.to(mouseStrength, { current: 0.1, duration: 1.2 })
      }, 400)
    }

    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0]
        const x = (touch.clientX / window.innerWidth) * 2 - 1
        const y = -(touch.clientY / window.innerHeight) * 2 + 1
        targetMouse.current = { x: x * (viewport.width / 2), y: y * (viewport.height / 2) }
        mouseStrength.current = 0.8
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
    if (!groupRef.current) return

    // Efficiency check: if invisible, halt calculations
    if (opacity <= 0.005) {
      if (groupRef.current.visible) groupRef.current.visible = false
      return
    }
    if (!groupRef.current.visible) groupRef.current.visible = true

    particleUniforms.uOpacity.value = opacity
    bgStarUniforms.uOpacity.value = opacity * 0.75
    particleUniforms.uTime.value = state.clock.getElapsedTime()

    smoothedMouse.current.x = THREE.MathUtils.lerp(smoothedMouse.current.x, targetMouse.current.x, 0.05)
    smoothedMouse.current.y = THREE.MathUtils.lerp(smoothedMouse.current.y, targetMouse.current.y, 0.05)

    const motionScale = reducedMotion ? 0.2 : 1.0
    const mX = smoothedMouse.current.x
    const mY = smoothedMouse.current.y
    const mStr = mouseStrength.current

    // Update constellation node positions
    const posAttr = pointsRef.current.geometry.attributes.position
    const posArr = posAttr.array

    const halfW = (viewport.width * 1.8) / 2
    const halfH = (viewport.height * 2.0) / 2

    for (let i = 0; i < CONSTELLATION_COUNT; i++) {
      const idx = i * 3
      posArr[idx] += velocities[idx] * motionScale
      posArr[idx + 1] += velocities[idx + 1] * motionScale
      posArr[idx + 2] += velocities[idx + 2] * motionScale

      if (posArr[idx] > halfW) posArr[idx] = -halfW
      else if (posArr[idx] < -halfW) posArr[idx] = halfW

      if (posArr[idx + 1] > halfH) posArr[idx + 1] = -halfH
      else if (posArr[idx + 1] < -halfH) posArr[idx + 1] = halfH

      // Interactive mouse attraction/repulsion field
      const dx = posArr[idx] - mX
      const dy = posArr[idx + 1] - mY
      const dist = Math.sqrt(dx * dx + dy * dy)
      const maxDist = 2.6

      if (dist < maxDist && dist > 0.001) {
        const force = (1.0 - dist / maxDist) * 0.035 * mStr * motionScale
        posArr[idx] += (dx / dist) * force
        posArr[idx + 1] += (dy / dist) * force
      }
    }
    posAttr.needsUpdate = true

    // Compute dynamic constellation lines
    let lineIdx = 0
    const linePosArr = lineGeo.attributes.position.array
    const lineColArr = lineGeo.attributes.color.array

    for (let i = 0; i < CONSTELLATION_COUNT && lineIdx < MAX_LINES; i++) {
      const i3 = i * 3
      const x1 = posArr[i3]
      const y1 = posArr[i3 + 1]
      const z1 = posArr[i3 + 2]

      for (let j = i + 1; j < CONSTELLATION_COUNT && lineIdx < MAX_LINES; j++) {
        const j3 = j * 3
        const dx = x1 - posArr[j3]
        const dy = y1 - posArr[j3 + 1]
        const dz = z1 - posArr[j3 + 2]
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (d < CONNECT_DISTANCE) {
          const lIdx = lineIdx * 6
          linePosArr[lIdx] = x1
          linePosArr[lIdx + 1] = y1
          linePosArr[lIdx + 2] = z1
          linePosArr[lIdx + 3] = posArr[j3]
          linePosArr[lIdx + 4] = posArr[j3 + 1]
          linePosArr[lIdx + 5] = posArr[j3 + 2]

          const alpha = (1.0 - d / CONNECT_DISTANCE) * 0.42 * opacity

          // Violet to lavender gradient line
          lineColArr[lIdx] = 0.54 * alpha
          lineColArr[lIdx + 1] = 0.36 * alpha
          lineColArr[lIdx + 2] = 0.96 * alpha
          lineColArr[lIdx + 3] = 0.75 * alpha
          lineColArr[lIdx + 4] = 0.65 * alpha
          lineColArr[lIdx + 5] = 0.98 * alpha

          lineIdx++
        }
      }
    }

    for (let k = lineIdx * 6; k < MAX_LINES * 6; k++) {
      linePosArr[k] = 0
      lineColArr[k] = 0
    }

    lineGeo.attributes.position.needsUpdate = true
    lineGeo.attributes.color.needsUpdate = true
    lineGeo.setDrawRange(0, lineIdx * 2)

    // Parallax sway
    groupRef.current.rotation.y = smoothedMouse.current.x * 0.025
    groupRef.current.rotation.x = -smoothedMouse.current.y * 0.025
  })

  return (
    <group ref={groupRef}>
      {/* Deep Background Starfield */}
      <points ref={bgStarsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={BG_STAR_COUNT}
            array={bgStarsData.positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aColor"
            count={BG_STAR_COUNT}
            array={bgStarsData.colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aSize"
            count={BG_STAR_COUNT}
            array={bgStarsData.sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={particleVertexShader}
          fragmentShader={particleFragmentShader}
          uniforms={bgStarUniforms}
          transparent={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Constellation Star Points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={CONSTELLATION_COUNT}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aColor"
            count={CONSTELLATION_COUNT}
            array={colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aSize"
            count={CONSTELLATION_COUNT}
            array={sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={particleVertexShader}
          fragmentShader={particleFragmentShader}
          uniforms={particleUniforms}
          transparent={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Constellation Lines */}
      <lineSegments ref={linesRef} geometry={lineGeo}>
        <lineBasicMaterial
          vertexColors={true}
          transparent={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Subtle Violet Nebula Glow Field */}
      <mesh position={[viewport.width * 0.3, 0.2, -3.0]}>
        <planeGeometry args={[viewport.width * 1.8, viewport.height * 1.8]} />
        <meshBasicMaterial
          color={new THREE.Color('#3B0764')}
          transparent={true}
          opacity={0.16 * opacity}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}
