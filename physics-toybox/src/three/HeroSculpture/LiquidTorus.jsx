import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import gsap from 'gsap'

export default function LiquidTorus({ reducedMotion, pointerRef }) {
  const meshRef = useRef()

  // GSAP Cinematic Entrance Animation
  useEffect(() => {
    if (!meshRef.current || reducedMotion) return

    // Animate smoothly from 0.6 to natural 1.0 scale
    gsap.from(meshRef.current.scale, {
      x: 0.6,
      y: 0.6,
      z: 0.6,
      duration: 1.4,
      ease: 'power3.out',
    })

    gsap.from(meshRef.current.rotation, {
      y: -Math.PI * 0.5,
      duration: 1.8,
      ease: 'power3.out',
    })
  }, [reducedMotion])

  useFrame((state, delta) => {
    if (!meshRef.current) return

    const time = state.clock.getElapsedTime()

    if (!reducedMotion) {
      // Idle continuous rotation & organic breathing sway
      meshRef.current.rotation.x += delta * 0.22
      meshRef.current.rotation.y += delta * 0.32
      meshRef.current.position.y = Math.sin(time * 0.9) * 0.08

      // Pointer interactive reaction (smooth damping)
      const targetRotX = (pointerRef.current.y * Math.PI) / 8
      const targetRotY = (pointerRef.current.x * Math.PI) / 8
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, meshRef.current.rotation.x + targetRotX * 0.015, 0.08)
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, meshRef.current.rotation.y + targetRotY * 0.015, 0.08)
    }
  })

  return (
    <mesh ref={meshRef} castShadow receiveShadow scale={[1, 1, 1]}>
      {/* Optimized Torus Knot Geometry: 180 tubular segments, 36 radial segments */}
      <torusKnotGeometry args={[1.2, 0.36, 180, 36, 2, 3]} />
      {/* High-Fidelity PBR Liquid Chrome with Electric Violet Sheen */}
      <meshPhysicalMaterial
        color="#8B5CF6"
        emissive="#4C1D95"
        emissiveIntensity={0.28}
        roughness={0.12}
        metalness={0.92}
        clearcoat={1.0}
        clearcoatRoughness={0.06}
        reflectivity={1.0}
        sheen={1.0}
        sheenColor="#E9D5FF"
        sheenRoughness={0.12}
      />
    </mesh>
  )
}
