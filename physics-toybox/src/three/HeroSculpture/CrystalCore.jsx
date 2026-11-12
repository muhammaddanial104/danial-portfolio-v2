import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function CrystalCore({ reducedMotion }) {
  const outerRef = useRef()
  const innerRef = useRef()
  const glowMatRef = useRef()

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime()

    if (!reducedMotion) {
      if (outerRef.current) {
        // Reverse counter-rotation for dynamic visual tension
        outerRef.current.rotation.y -= delta * 0.4
        outerRef.current.rotation.z += delta * 0.25
        outerRef.current.position.y = Math.sin(time * 1.4) * 0.05
      }

      if (innerRef.current) {
        innerRef.current.rotation.x += delta * 0.35
        innerRef.current.rotation.y += delta * 0.5
      }

      // Organic energy pulse in the core
      if (glowMatRef.current) {
        glowMatRef.current.emissiveIntensity = 0.9 + Math.sin(time * 2.5) * 0.4
      }
    }
  })

  return (
    <group scale={0.72}>
      {/* Outer Lattice Crystal Cage */}
      <mesh ref={outerRef}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color="#E9D5FF"
          emissive="#8B5CF6"
          emissiveIntensity={0.8}
          roughness={0.15}
          metalness={0.6}
          wireframe={true}
        />
      </mesh>

      {/* Inner Glowing Crystal Core */}
      <mesh ref={innerRef} scale={0.52}>
        <icosahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          ref={glowMatRef}
          color="#A78BFA"
          emissive="#7C3AED"
          emissiveIntensity={1.2}
          roughness={0.2}
          metalness={0.4}
        />
      </mesh>
    </group>
  )
}
