import React, { useRef, useState, useEffect, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import LiquidTorus from '../three/HeroSculpture/LiquidTorus.jsx'
import CrystalCore from '../three/HeroSculpture/CrystalCore.jsx'
import OrbitalRings from '../three/HeroSculpture/OrbitalRings.jsx'
import Lighting from '../three/HeroSculpture/Lighting.jsx'
import CameraRig from '../three/HeroSculpture/CameraRig.jsx'
import WebGLFallback from '../three/HeroSculpture/WebGLFallback.jsx'

// Simple robust Error Boundary for WebGL context
class WebGLErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.warn('WebGL context warning:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

export default function HeroSculpture() {
  const containerRef = useRef(null)
  const pointerRef = useRef({ x: 0, y: 0 })
  const [reducedMotion, setReducedMotion] = useState(false)
  const [webGLSupported, setWebGLSupported] = useState(true)

  // Check prefers-reduced-motion & WebGL support on mount
  useEffect(() => {
    // 1. Accessibility: prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    const handleChange = (e) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)

    // 2. WebGL Hardware Capability Detection
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) setWebGLSupported(false)
    } catch {
      setWebGLSupported(false)
    }

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  // Normalized pointer movement listener (-1 to 1)
  const handlePointerMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1)
    pointerRef.current = {
      x: Math.max(-1, Math.min(1, x)),
      y: Math.max(-1, Math.min(1, y)),
    }
  }

  const handlePointerLeave = () => {
    // Smoothly return pointer coordinates to origin on pointer exit
    pointerRef.current = { x: 0, y: 0 }
  }

  // Graceful fallback if WebGL is unavailable
  if (!webGLSupported) {
    return <WebGLFallback />
  }

  return (
    <WebGLErrorBoundary fallback={<WebGLFallback />}>
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="relative h-full w-full min-h-[340px] sm:min-h-[420px] md:min-h-[500px] select-none"
      >
        {/* Ambient radial violet lighting backdrop */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[260px] w-[260px] sm:h-[350px] sm:w-[350px] md:h-[450px] md:w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-purple/25 blur-[75px] md:blur-[95px]" />

        <Canvas
          camera={{ position: [0, 0, 4.8], fov: 44 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          className="cursor-grab active:cursor-grabbing"
          style={{ touchAction: 'pan-y' }}
        >
          <Suspense fallback={null}>
            {/* Cinematic Lighting System */}
            <Lighting />

            {/* Interactive Camera Parallax & Scroll Choreography */}
            <CameraRig reducedMotion={reducedMotion} pointerRef={pointerRef} />

            {/* Coordinated Floating 3D Sculpture Artifact */}
            <Float
              speed={reducedMotion ? 0 : 2.2}
              rotationIntensity={reducedMotion ? 0 : 0.4}
              floatIntensity={reducedMotion ? 0 : 0.6}
            >
              <group scale={1.05}>
                {/* 1. Liquid Chrome & Electric Violet Torus Knot */}
                <LiquidTorus reducedMotion={reducedMotion} pointerRef={pointerRef} />

                {/* 2. Concentric Multi-faceted Geometric Crystal Core */}
                <CrystalCore reducedMotion={reducedMotion} />

                {/* 3. Thin Gyroscopic Orbital Rings with Traveling Satellite Beads */}
                <OrbitalRings reducedMotion={reducedMotion} />
              </group>
            </Float>
          </Suspense>
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  )
}
