import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function OrbitalRings({ reducedMotion }) {
  const ring1Ref = useRef()
  const ring2Ref = useRef()
  const bead1Ref = useRef()
  const bead2Ref = useRef()

  useFrame((state, delta) => {
    if (!reducedMotion) {
      const time = state.clock.getElapsedTime()

      // Primary ring orbital rotation
      if (ring1Ref.current) {
        ring1Ref.current.rotation.z += delta * 0.12
        ring1Ref.current.rotation.x = Math.PI / 3 + Math.sin(time * 0.5) * 0.08
      }

      // Secondary ring counter-orbital rotation
      if (ring2Ref.current) {
        ring2Ref.current.rotation.z -= delta * 0.09
        ring2Ref.current.rotation.y = -Math.PI / 4 + Math.cos(time * 0.4) * 0.06
      }

      // Satellite Beads following orbital trajectories
      if (bead1Ref.current) {
        const angle = time * 0.7
        bead1Ref.current.position.set(Math.cos(angle) * 2.05, Math.sin(angle) * 2.05, 0)
      }

      if (bead2Ref.current) {
        const angle = -time * 0.5 + 1.2
        bead2Ref.current.position.set(Math.cos(angle) * 2.35, Math.sin(angle) * 2.35, 0)
      }
    }
  })

  return (
    <group>
      {/* Primary Inner Orbital Ring */}
      <group ref={ring1Ref} rotation={[Math.PI / 3, 0.2, 0]}>
        <mesh>
          <torusGeometry args={[2.05, 0.016, 16, 120]} />
          <meshStandardMaterial
            color="#E9D5FF"
            emissive="#8B5CF6"
            emissiveIntensity={0.6}
            roughness={0.15}
            metalness={0.9}
            transparent
            opacity={0.75}
          />
        </mesh>
        {/* Orbital Satellite Bead 1 */}
        <mesh ref={bead1Ref}>
          <sphereGeometry args={[0.045, 16, 16]} />
          <meshStandardMaterial
            color="#FFFFFF"
            emissive="#A78BFA"
            emissiveIntensity={1.5}
            roughness={0.1}
            metalness={1.0}
          />
        </mesh>
      </group>

      {/* Secondary Outer Orbital Ring */}
      <group ref={ring2Ref} rotation={[-Math.PI / 4, -0.3, 0]}>
        <mesh>
          <torusGeometry args={[2.35, 0.012, 16, 120]} />
          <meshStandardMaterial
            color="#C084FC"
            emissive="#6D28D9"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.85}
            transparent
            opacity={0.6}
          />
        </mesh>
        {/* Orbital Satellite Bead 2 */}
        <mesh ref={bead2Ref}>
          <sphereGeometry args={[0.038, 16, 16]} />
          <meshStandardMaterial
            color="#E9D5FF"
            emissive="#8B5CF6"
            emissiveIntensity={1.8}
            roughness={0.1}
            metalness={1.0}
          />
        </mesh>
      </group>
    </group>
  )
}
