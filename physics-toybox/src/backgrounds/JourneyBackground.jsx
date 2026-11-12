import React, { useRef, useMemo, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

// Custom Vertex & Fragment Shaders for Neon Topographic Contour Terrain
const topoVertexShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vWorldPosition;

  // 2D Simplex Noise for mountain ridge displacement
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

    // Mountain ridges with central winding valley
    float n1 = snoise(pos.xy * 0.45) * 0.95;
    float n2 = snoise(pos.xy * 1.1) * 0.35;
    float ridges = (n1 + n2);

    // Carve central winding valley for path
    float valleyCurve = sin(pos.y * 0.7) * 0.6;
    float distFromValley = abs(pos.x - valleyCurve);
    float valleyFactor = smoothstep(0.2, 1.6, distFromValley);

    float elevation = ridges * valleyFactor * 1.45;
    pos.z += elevation;

    vElevation = elevation;
    vec4 worldPos = modelMatrix * vec4(pos, 1.0);
    vWorldPosition = worldPos.xyz;

    gl_Position = projectionMatrix * viewMatrix * worldPos;
  }
`

const topoFragmentShader = `
  uniform float uTime;
  uniform float uOpacity;
  uniform vec3 uColorObsidian;
  uniform vec3 uColorViolet;
  uniform vec3 uColorNeonPurple;
  uniform vec3 uColorPath;

  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vWorldPosition;

  void main() {
    // 1. Topographic Contour Line Generation
    // Compute fractional frequency along elevation
    float contourFreq = 16.0;
    float contourVal = fract((vElevation + 2.0) * contourFreq);
    
    // Antialiased line width
    float lineWidth = 0.14;
    float isContour = smoothstep(0.0, lineWidth * 0.5, contourVal) * 
                      smoothstep(lineWidth, lineWidth * 0.5, contourVal);

    // 2. Base Dark Mountain Color
    vec3 color = mix(uColorObsidian, uColorViolet, smoothstep(0.0, 1.2, vElevation) * 0.35);

    // 3. Add glowing neon purple contour lines
    color = mix(color, uColorNeonPurple, isContour * 0.85);

    // 4. Glowing Central Winding Path
    // Path follows valley curve along y
    float valleyCurve = sin(vWorldPosition.y * 0.7) * 0.6;
    float distToPath = abs(vWorldPosition.x - valleyCurve);
    
    // Core path line
    float pathCore = smoothstep(0.12, 0.02, distToPath);
    // Outer atmospheric path aura
    float pathAura = exp(-distToPath * 4.5) * 0.65;

    // Traveling light pulse along the path
    float pathPulse = sin(vWorldPosition.y * 3.0 + uTime * 3.5) * 0.5 + 0.5;
    vec3 pathGlow = mix(uColorNeonPurple, uColorPath, pathPulse);

    color += pathGlow * (pathCore * 1.8 + pathAura);

    // 5. Distance Horizon Fog (Fades distant mountains into deep space)
    float horizonFog = smoothstep(1.5, 6.5, vWorldPosition.y);
    color = mix(color, uColorObsidian, horizonFog * 0.85);

    gl_FragColor = vec4(color, uOpacity);
  }
`

export default function JourneyBackground({ opacity = 1, reducedMotion = false }) {
  const groupRef = useRef()
  const terrainRef = useRef()
  const celestialSphereRef = useRef()
  const haloRef = useRef()
  const { viewport } = useThree()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uOpacity: { value: opacity },
      uColorObsidian: { value: new THREE.Color('#030208') },
      uColorViolet: { value: new THREE.Color('#2E1065') },
      uColorNeonPurple: { value: new THREE.Color('#8B5CF6') },
      uColorPath: { value: new THREE.Color('#E9D5FF') },
    }),
    []
  )

  useFrame((state) => {
    if (!groupRef.current) return

    if (opacity <= 0.005) {
      if (groupRef.current.visible) groupRef.current.visible = false
      return
    }
    if (!groupRef.current.visible) groupRef.current.visible = true

    uniforms.uOpacity.value = opacity

    const motionScale = reducedMotion ? 0.2 : 1.0
    uniforms.uTime.value = state.clock.getElapsedTime() * motionScale

    // Gentle camera elevation
    groupRef.current.position.y = -0.6
    groupRef.current.rotation.x = -Math.PI / 3.2
  })

  const terrainWidth = viewport.width * 2.2
  const terrainHeight = viewport.height * 2.6

  return (
    <group ref={groupRef} position={[0, -0.6, -1.0]}>
      {/* 1. 3D Mountain Terrain with Neon Topographic Contour Lines & River */}
      <mesh ref={terrainRef} position={[0, 0, 0]}>
        <planeGeometry args={[terrainWidth, terrainHeight, 120, 120]} />
        <shaderMaterial
          vertexShader={topoVertexShader}
          fragmentShader={topoFragmentShader}
          uniforms={uniforms}
          transparent={true}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* 2. Distant Celestial Sphere (Dark Moon with glowing purple halo) */}
      <group position={[0.4, 3.2, -4.5]}>
        <mesh ref={celestialSphereRef}>
          <sphereGeometry args={[0.75, 32, 32]} />
          <meshBasicMaterial color={new THREE.Color('#08070D')} />
        </mesh>
        {/* Luminous Atmospheric Halo Ring */}
        <mesh ref={haloRef} scale={[1.18, 1.18, 1.18]}>
          <ringGeometry args={[0.75, 0.95, 36]} />
          <meshBasicMaterial
            color={new THREE.Color('#8B5CF6')}
            transparent={true}
            opacity={0.35 * opacity}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </group>
  )
}
