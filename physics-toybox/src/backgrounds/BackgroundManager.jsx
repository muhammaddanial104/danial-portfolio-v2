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
 * ============================================================================
 * DANIAL® — Multi-World WebGL Background Coordinator
 * ============================================================================
 * 
 * WHY A SINGLE CANVAS ARCHITECTURE?
 * Most modern browsers (Chrome, Safari, Firefox, Edge) enforce a strict limit
 * of 8 to 16 concurrent WebGL contexts per domain. If each route created and
 * destroyed its own <Canvas>, rapid page navigation would quickly trigger:
 * "WARNING: Too many active WebGL contexts. Oldest context will be lost."
 * 
 * Furthermore, recreating WebGL contexts incurs expensive pipeline compilation
 * stalls (shader linking, buffer reallocations, GPU driver initialization).
 * 
 * SOLUTION:
 * We mount exactly ONE persistent <Canvas> fixed behind the viewport (`inset-0`).
 * As the user navigates between routes, `SceneSwitcher` runs inside this single
 * context, smoothly interpolating opacity between worlds. When a world fades to
 * 0 opacity, its render calls and animations are culled to ensure 60fps.
 */

/**
 * SceneSwitcher (R3F internal coordinator)
 * 
 * Runs inside the shared Three.js Canvas context.
 * Smoothly interpolates opacity between active and inactive worlds across all 6 pages.
 * 
 * @param {Object} props
 * @param {string} props.activeWorld - Current route key ('home'|'projects'|'skills'|'about'|'journey'|'contact')
 * @param {boolean} props.reducedMotion - User accessibility preference flag
 */
function SceneSwitcher({ activeWorld, reducedMotion }) {
  const worlds = ['home', 'projects', 'skills', 'about', 'journey', 'contact']

  // Mutable reference tracking the current interpolated opacity of each world [0.0 - 1.0]
  const opacities = useRef({
    home: activeWorld === 'home' ? 1.0 : 0.0,
    projects: activeWorld === 'projects' ? 1.0 : 0.0,
    skills: activeWorld === 'skills' ? 1.0 : 0.0,
    about: activeWorld === 'about' ? 1.0 : 0.0,
    journey: activeWorld === 'journey' ? 1.0 : 0.0,
    contact: activeWorld === 'contact' ? 1.0 : 0.0,
  })

  // State used to re-render React Three Fiber child tree when opacity values change
  const [renderOpacities, setRenderOpacities] = useState({ ...opacities.current })

  // useFrame executes on every browser animation frame (~60-120fps)
  useFrame(() => {
    let hasChanged = false
    // Faster transition speed when reduced motion is preferred
    const lerpSpeed = reducedMotion ? 0.15 : 0.07
    const nextState = {}

    for (const w of worlds) {
      const target = activeWorld === w ? 1.0 : 0.0
      const current = opacities.current[w]
      // Smooth linear interpolation toward target
      const nextVal = THREE.MathUtils.lerp(current, target, lerpSpeed)

      // Only trigger React state update if delta is perceptually significant
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
      {/* 1. Home — Liquid Chrome Waves (Panel 1) */}
      <HomeBackground
        opacity={renderOpacities.home}
        reducedMotion={reducedMotion}
      />

      {/* 2. Projects — Particle Universe & Constellations (Panel 2) */}
      <ProjectsBackground
        opacity={renderOpacities.projects}
        reducedMotion={reducedMotion}
      />

      {/* 3. Skills — Digital Network & Energy Grid (Panel 3) */}
      <SkillsBackground
        opacity={renderOpacities.skills}
        reducedMotion={reducedMotion}
      />

      {/* 4. About — Cosmic Violet Aurora & Nebulae (Panel 4) */}
      <AboutBackground
        opacity={renderOpacities.about}
        reducedMotion={reducedMotion}
      />

      {/* 5. Journey — Topographic Terrain & River of Light (Panel 5) */}
      <JourneyBackground
        opacity={renderOpacities.journey}
        reducedMotion={reducedMotion}
      />

      {/* 6. Contact — Concentric Energy Portal Rings (Panel 6) */}
      <ContactBackground
        opacity={renderOpacities.contact}
        reducedMotion={reducedMotion}
      />
    </>
  )
}

/**
 * WebGLFallback
 * Rendered when WebGL is disabled or unsupported in the client browser.
 */
function WebGLFallback() {
  return (
    <div className="fixed inset-0 z-0 h-full w-full bg-[#030208] bg-radial-gradient-purple opacity-70 pointer-events-none" />
  )
}

/**
 * BackgroundManager
 * 
 * Master WebGL Canvas & Multi-World Orchestrator.
 * Renders exactly ONE shared Canvas across the entire application.
 */
export default function BackgroundManager() {
  const { activeWorld } = useActiveBackground()
  const [reducedMotion, setReducedMotion] = useState(false)
  const [isSupported, setIsSupported] = useState(true)

  useEffect(() => {
    // Detect OS/Browser reduced motion accessibility preference
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(media.matches)
    const handler = (e) => setReducedMotion(e.matches)
    media.addEventListener('change', handler)

    // Verify client WebGL capability
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
