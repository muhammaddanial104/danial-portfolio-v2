import React from 'react'
import { Environment } from '@react-three/drei'

export default function Lighting() {
  return (
    <>
      {/* Soft Base Ambient Light */}
      <ambientLight intensity={0.8} />

      {/* Main Specular Key Light: Crisp white chrome glints */}
      <directionalLight
        position={[6, 9, 6]}
        intensity={2.6}
        color="#FFFFFF"
        castShadow
        shadow-mapSize={[512, 512]}
      />

      {/* Violet Backlight Rim: Deep luminous edge silhouette */}
      <pointLight position={[-5, -4, -3]} intensity={4.5} color="#7C3AED" distance={15} />

      {/* Electric Lavender Fill: Front-under soft illumination */}
      <pointLight position={[3, -3, 3]} intensity={3.2} color="#A78BFA" distance={12} />

      {/* Cool Neon Accent for Edge Sparkle */}
      <pointLight position={[0, 4, -4]} intensity={2.0} color="#E9D5FF" distance={10} />

      {/* Studio / City HDR Environment Reflections */}
      <Environment preset="city" />
    </>
  )
}
