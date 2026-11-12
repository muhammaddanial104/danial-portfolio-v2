import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import HomeBackground from './HomeBackground.jsx'
import ProjectsBackground from './ProjectsBackground.jsx'
import SkillsBackground from './SkillsBackground.jsx'
import AboutBackground from './AboutBackground.jsx'
import JourneyBackground from './JourneyBackground.jsx'
import ContactBackground from './ContactBackground.jsx'
import { useActiveBackground } from '../hooks/useActiveBackground.js'

/**
 * SceneSwitcher (R3F internal coordinator)
 * 
 * Runs inside the shared Three.js Canvas context.
 * Smoothly interpolates opacity between active and inactive worlds across all 6 pages.
 * When a world's opacity reaches 0, its internal calculations and draw calls are skipped
 * to guarantee 60fps GPU performance.
 */
function SceneSwitcher({ activeWorld, reducedMotion }) {
  const worlds = ['home', 'projects', 'skills', 'about', 'journey', 'contact']

  // Current interpolated opacities
  const opacities = useRef({
    home: activeWorld === 'home' ? 1.0 : 0.0,
    projects: activeWorld === 'projects' ? 1.0 : 0.0,
    skills: activeWorld === 'skills' ? 1.0 : 0.0,
    about: activeWorld === 'about' ? 1.0 : 0.0,
    journey: activeWorld === 'journey' ? 1.0 : 0.0,
    contact: activeWorld === 'contact' ? 1.0 : 0.0,
  })

  const [renderOpacities, setRenderOpacities] = useState({ ...opacities.current })

  useFrame(() => {
    let hasChanged = false
    const lerpSpeed = reducedMotion ? 0.15 : 0.07
    const nextState = {}

    for (const w of worlds) {
      const target = activeWorld === w ? 1.0 : 0.0
      const current = opacities.current[w]
      const nextVal = THREE.MathUtils.lerp(current, target, lerpSpeed)

      if (Math.abs(nextVal - current) > 0.001) {
        hasChanged = true
      }

      opacities.current[w] = nextVal
      nextState[w] = nextVal
    }

    if (hasChanged) {
      setRenderOpacities(nextState)
    }
  })

  return (
    <>
      {/* 1. Home — Liquid Chrome Waves */}
      <HomeBackground
        opacity={renderOpacities.home}
        reducedMotion={reducedMotion}
      />

      {/* 2. Projects — Particle Universe */}
      <ProjectsBackground
        opacity={renderOpacities.projects}
        reducedMotion={reducedMotion}
      />

      {/* 3. Skills — Digital Network */}
      <SkillsBackground
        opacity={renderOpacities.skills}
        reducedMotion={reducedMotion}
      />

      {/* 4. About — Cosmic Aurora */}
      <AboutBackground
        opacity={renderOpacities.about}
        reducedMotion={reducedMotion}
      />

      {/* 5. Journey — Topographic Terrain */}
      <JourneyBackground
        opacity={renderOpacities.journey}
        reducedMotion={reducedMotion}
      />

      {/* 6. Contact — Energy Portal */}
      <ContactBackground
        opacity={renderOpacities.contact}
        reducedMotion={reducedMotion}
      />
    </>
  )
}

function WebGLFallback() {
  return (
    <div className="fixed inset-0 z-0 h-full w-full bg-[#030208] bg-radial-gradient-purple opacity-70 pointer-events-none" />
  )
}

/**
 * BackgroundManager
 * 
 * Master WebGL Canvas & Multi-World Orchestrator.
 * Renders exactly ONE shared Canvas across the entire application, eliminating
 * browser WebGL context limits and avoiding GPU overload.
 */
export default function BackgroundManager() {
  const { activeWorld } = useActiveBackground()
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isSupported, setIsSupported] = useState(true)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(media.matches)
    const handler = (e) => setReducedMotion(e.matches)
    media.addEventListener('change', handler)

    try {
      const c = document.createElement('canvas')
      const gl = c.getContext('webgl') || c.getContext('experimental-webgl')
      if (!gl) setIsSupported(false)
    } catch {
      setIsSupported(false)
    }

    return () => media.removeEventListener('change', handler)
  }, [])

  if (!isSupported) {
    return <WebGLFallback />
  }

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 h-full w-full pointer-events-none select-none overflow-hidden bg-[#030208]"
    >
      <Canvas
        camera={{ position: [0, 0, 4.6], fov: 46 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ pointerEvents: 'none', position: 'absolute', inset: 0 }}
      >
        <SceneSwitcher
          activeWorld={activeWorld}
          reducedMotion={reducedMotion}
        />
      </Canvas>
    </div>
  )
}
