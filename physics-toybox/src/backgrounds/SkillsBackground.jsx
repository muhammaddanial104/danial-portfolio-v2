import React, { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'

/**
 * ============================================================================
 * DANIAL® — Panel 3: Digital Network & Energy Grid (Skills Background)
 * ============================================================================
 * 
 * VISUAL CONCEPT:
 * A high-tech cybernetic neural matrix consisting of an undulating 2D wireframe
 * lattice. Luminous nodes pulse with electric purple energy along the intersections,
 * while vertical energy pillars reach upward into the obsidian void, symbolizing
 * modern technical architecture and algorithmic mastery.
 * 
 * SHADER & GEOMETRY ARCHITECTURE:
 * 1. Undulating Matrix Grid (nx=52, nz=32):
 *    - Dual orthogonal line segments (X-lines and Z-lines) forming the mathematical plane.
 *    - Compound sinusoidal wave formulas simulate propagating data waves across the terrain.
 * 
 * 2. Luminous Intersecting Nodes:
 *    - Custom GLSL point shader with circular discard and glowing lavender cores.
 * 
 * 3. Vertical Telemetry Pillars:
 *    - 38 vertical light streams shooting upward from high-amplitude matrix peaks.
 * 
 * GPU PERFORMANCE OPTIMIZATIONS:
 * - Frame culling: when `opacity <= 0.005`, group is hidden and math loops are skipped.
 * - In-place buffer attribute updates (`positions.needsUpdate = true`).
 * 
 * @param {Object} props
 * @param {number} props.opacity - Current interpolated opacity [0.0 - 1.0] from BackgroundManager
 * @param {boolean} props.reducedMotion - Accessibility flag to dampen animation speeds
 */

// Point shader with bright neon purple / lavender glow
const nodeVertexShader = `
  uniform float uPixelRatio;
  uniform float uOpacity;
  attribute float aSize;
  attribute vec3 aColor;

  varying vec3 vColor;
  varying float vOpacity;

  void main() {
    vColor = aColor;
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * uPixelRatio * (26.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
    vOpacity = uOpacity;
  }
`

const nodeFragmentShader = `
  varying vec3 vColor;
  varying float vOpacity;

  void main() {
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) discard;

    float alpha = smoothstep(0.5, 0.05, dist) * vOpacity;
    float core = smoothstep(0.2, 0.0, dist) * 0.75;
    vec3 col = vColor + vec3(core);

    gl_FragColor = vec4(col, alpha);
  }
`

export default function SkillsBackground({ opacity = 1, reducedMotion = false }) {
  const groupRef = useRef()
  const pointsRef = useRef()
  const linesRef = useRef()
  const pillarsRef = useRef()
  const pillarTipsRef = useRef()
  const { viewport } = useThree()

  const targetMouse = useRef({ x: 0, y: 0 })
  const smoothedMouse = useRef({ x: 0, y: 0 })

  // Grid dimensions (46 x 46 = 2,116 grid nodes)
  const COLS = 46
  const ROWS = 46
  const NODE_COUNT = COLS * ROWS
  const PILLAR_COUNT = 32

  // 1. Grid Node Positions & Colors
  const { gridBasePositions, nodeColors, nodeSizes } = useMemo(() => {
    const base = new Float32Array(NODE_COUNT * 3)
    const col = new Float32Array(NODE_COUNT * 3)
    const sz = new Float32Array(NODE_COUNT)

    const cViolet = new THREE.Color('#8B5CF6')
    const cLavender = new THREE.Color('#A78BFA')
    const cLilac = new THREE.Color('#E9D5FF')

    const gridW = viewport.width * 2.2
    const gridH = viewport.height * 2.4

    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const idx = (r * COLS + c) * 3
        const u = c / (COLS - 1)
        const v = r / (ROWS - 1)

        base[idx] = (u - 0.5) * gridW
        base[idx + 1] = (v - 0.5) * gridH
        base[idx + 2] = 0

        const colorPick = (r + c) % 5 === 0 ? cLilac : (r + c) % 2 === 0 ? cLavender : cViolet
        col[idx] = colorPick.r
        col[idx + 1] = colorPick.g
        col[idx + 2] = colorPick.b

        sz[r * COLS + c] = (r + c) % 6 === 0 ? 3.0 : 2.0
      }
    }
    return { gridBasePositions: base, nodeColors: col, nodeSizes: sz }
  }, [viewport.width, viewport.height])

  // Preallocated buffer for dynamic point heights
  const currentPositions = useMemo(() => new Float32Array(gridBasePositions), [gridBasePositions])

  // 2. Grid Interconnect Wireframe Lines
  const { lineGeometry, linePosArr, lineColArr } = useMemo(() => {
    // Each internal node connects to right (c+1) and top (r+1)
    const segCount = (COLS - 1) * ROWS + (ROWS - 1) * COLS
    const pos = new Float32Array(segCount * 2 * 3)
    const col = new Float32Array(segCount * 2 * 3)

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3))

    return { lineGeometry: geo, linePosArr: pos, lineColArr: col }
  }, [])

  // 3. Vertical Data Pillars & Glowing Tip Nodes
  const { pillarIndices, pillarGeometry, pillarPosArr, pillarColArr, pillarTipPos, pillarTipCols, pillarTipSizes } = useMemo(() => {
    const indices = []
    // Pick dispersed node indices that will emit vertical pillars
    for (let i = 0; i < PILLAR_COUNT; i++) {
      const r = Math.floor(10 + (i / PILLAR_COUNT) * (ROWS - 20))
      const c = Math.floor(8 + ((i * 7) % (COLS - 16)))
      indices.push(r * COLS + c)
    }

    const pos = new Float32Array(PILLAR_COUNT * 2 * 3)
    const col = new Float32Array(PILLAR_COUNT * 2 * 3)
    const tipPos = new Float32Array(PILLAR_COUNT * 3)
    const tipCol = new Float32Array(PILLAR_COUNT * 3)
    const tipSz = new Float32Array(PILLAR_COUNT)

    const cTip = new THREE.Color('#FFFFFF')
    for (let i = 0; i < PILLAR_COUNT; i++) {
      tipCol[i * 3] = cTip.r
      tipCol[i * 3 + 1] = cTip.g
      tipCol[i * 3 + 2] = cTip.b
      tipSz[i] = 4.2
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(col, 3))

    return {
      pillarIndices: indices,
      pillarGeometry: geo,
      pillarPosArr: pos,
      pillarColArr: col,
      pillarTipPos: tipPos,
      pillarTipCols: tipCol,
      pillarTipSizes: tipSz,
    }
  }, [])

  const pointUniforms = useMemo(
    () => ({
      uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
      uOpacity: { value: opacity },
    }),
    []
  )

  const tipUniforms = useMemo(
    () => ({
      uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 2) },
      uOpacity: { value: opacity },
    }),
    []
  )

  useEffect(() => {
    const handlePointerMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      targetMouse.current = { x: x * (viewport.width / 2), y: y * (viewport.height / 2) }
    }
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', handlePointerMove)
  }, [viewport.width, viewport.height])

  useFrame((state) => {
    if (!groupRef.current) return

    if (opacity <= 0.005) {
      if (groupRef.current.visible) groupRef.current.visible = false
      return
    }
    if (!groupRef.current.visible) groupRef.current.visible = true

    pointUniforms.uOpacity.value = opacity
    tipUniforms.uOpacity.value = opacity

    smoothedMouse.current.x = THREE.MathUtils.lerp(smoothedMouse.current.x, targetMouse.current.x, 0.05)
    smoothedMouse.current.y = THREE.MathUtils.lerp(smoothedMouse.current.y, targetMouse.current.y, 0.05)

    const motionScale = reducedMotion ? 0.2 : 1.0
    const time = state.clock.getElapsedTime() * 0.75 * motionScale

    const posArr = currentPositions
    const mX = smoothedMouse.current.x
    const mY = smoothedMouse.current.y

    // 1. Calculate wave heights for all grid points
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const idx = (r * COLS + c) * 3
        const x = gridBasePositions[idx]
        const y = gridBasePositions[idx + 1]

        // Dual sinusoidal undulating cybernetic waves
        const w1 = Math.sin(x * 0.55 + time * 1.1) * Math.cos(y * 0.45 + time * 0.8) * 0.65
        const w2 = Math.sin(x * 0.95 - time * 0.6 + y * 0.7) * 0.35
        const w3 = Math.cos(x * 1.4 + y * 1.1 + time * 0.9) * 0.18

        // Mouse reactive distortion
        const dx = x - mX
        const dy = y - mY
        const mDist = Math.sqrt(dx * dx + dy * dy)
        const mouseWave = Math.sin(mDist * 3.5 - time * 4.0) * Math.exp(-mDist * 0.8) * 0.4

        posArr[idx + 2] = (w1 + w2 + w3 + mouseWave) * 1.1
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true

    // 2. Update connected grid line segments
    let segIdx = 0
    for (let r = 0; r < ROWS; r++) {
      for (let c = 0; c < COLS; c++) {
        const curIdx = (r * COLS + c) * 3
        const x0 = posArr[curIdx]
        const y0 = posArr[curIdx + 1]
        const z0 = posArr[curIdx + 2]

        // Horizontal line to right
        if (c < COLS - 1) {
          const rIdx = (r * COLS + (c + 1)) * 3
          const lIdx = segIdx * 6

          linePosArr[lIdx] = x0
          linePosArr[lIdx + 1] = y0
          linePosArr[lIdx + 2] = z0
          linePosArr[lIdx + 3] = posArr[rIdx]
          linePosArr[lIdx + 4] = posArr[rIdx + 1]
          linePosArr[lIdx + 5] = posArr[rIdx + 2]

          const alpha = 0.28 * opacity
          lineColArr[lIdx] = 0.54 * alpha
          lineColArr[lIdx + 1] = 0.36 * alpha
          lineColArr[lIdx + 2] = 0.96 * alpha
          lineColArr[lIdx + 3] = 0.54 * alpha
          lineColArr[lIdx + 4] = 0.36 * alpha
          lineColArr[lIdx + 5] = 0.96 * alpha

          segIdx++
        }

        // Vertical line to top
        if (r < ROWS - 1) {
          const tIdx = ((r + 1) * COLS + c) * 3
          const lIdx = segIdx * 6

          linePosArr[lIdx] = x0
          linePosArr[lIdx + 1] = y0
          linePosArr[lIdx + 2] = z0
          linePosArr[lIdx + 3] = posArr[tIdx]
          linePosArr[lIdx + 4] = posArr[tIdx + 1]
          linePosArr[lIdx + 5] = posArr[tIdx + 2]

          const alpha = 0.28 * opacity
          lineColArr[lIdx] = 0.54 * alpha
          lineColArr[lIdx + 1] = 0.36 * alpha
          lineColArr[lIdx + 2] = 0.96 * alpha
          lineColArr[lIdx + 3] = 0.54 * alpha
          lineColArr[lIdx + 4] = 0.36 * alpha
          lineColArr[lIdx + 5] = 0.96 * alpha

          segIdx++
        }
      }
    }
    lineGeometry.attributes.position.needsUpdate = true
    lineGeometry.attributes.color.needsUpdate = true

    // 3. Update vertical data pillars & tip beacons
    for (let i = 0; i < PILLAR_COUNT; i++) {
      const nodeI = pillarIndices[i] * 3
      const x = posArr[nodeI]
      const y = posArr[nodeI + 1]
      const z = posArr[nodeI + 2]

      const pHeight = 1.6 + Math.sin(time * 2.0 + i) * 0.4
      const pIdx = i * 6

      pillarPosArr[pIdx] = x
      pillarPosArr[pIdx + 1] = y
      pillarPosArr[pIdx + 2] = z

      pillarPosArr[pIdx + 3] = x
      pillarPosArr[pIdx + 4] = y
      pillarPosArr[pIdx + 5] = z + pHeight

      const alpha = (0.35 + Math.sin(time * 3.0 + i) * 0.25) * opacity
      pillarColArr[pIdx] = 0.42 * alpha
      pillarColArr[pIdx + 1] = 0.16 * alpha
      pillarColArr[pIdx + 2] = 0.85 * alpha

      pillarColArr[pIdx + 3] = 0.92 * alpha
      pillarColArr[pIdx + 4] = 0.85 * alpha
      pillarColArr[pIdx + 5] = 1.0 * alpha

      // Tip beacon position
      pillarTipPos[i * 3] = x
      pillarTipPos[i * 3 + 1] = y
      pillarTipPos[i * 3 + 2] = z + pHeight
    }
    pillarGeometry.attributes.position.needsUpdate = true
    pillarGeometry.attributes.color.needsUpdate = true
    pillarTipsRef.current.geometry.attributes.position.needsUpdate = true

    // Perspective tilt (angled slightly downward into the digital horizon)
    groupRef.current.rotation.x = -Math.PI / 3.4
    groupRef.current.position.y = -0.75
  })

  return (
    <group ref={groupRef} position={[0, -0.75, -1.2]}>
      {/* 1. Undulating Digital Grid Nodes */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={NODE_COUNT}
            array={currentPositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aColor"
            count={NODE_COUNT}
            array={nodeColors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aSize"
            count={NODE_COUNT}
            array={nodeSizes}
            itemSize={1}
          />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={nodeVertexShader}
          fragmentShader={nodeFragmentShader}
          uniforms={pointUniforms}
          transparent={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* 2. Grid Interconnect Lines */}
      <lineSegments ref={linesRef} geometry={lineGeometry}>
        <lineBasicMaterial
          vertexColors={true}
          transparent={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* 3. Vertical Data Pillars */}
      <lineSegments ref={pillarsRef} geometry={pillarGeometry}>
        <lineBasicMaterial
          vertexColors={true}
          transparent={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* 4. Glowing Data Pillar Tip Beacons */}
      <points ref={pillarTipsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={PILLAR_COUNT}
            array={pillarTipPos}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aColor"
            count={PILLAR_COUNT}
            array={pillarTipCols}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-aSize"
            count={PILLAR_COUNT}
            array={pillarTipSizes}
            itemSize={1}
          />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={nodeVertexShader}
          fragmentShader={nodeFragmentShader}
          uniforms={tipUniforms}
          transparent={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  )
}
