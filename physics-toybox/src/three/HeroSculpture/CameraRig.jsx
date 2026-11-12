import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

export default function CameraRig({ reducedMotion, pointerRef }) {
  const { camera } = useThree()
  const scrollOffsetRef = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress relative to hero height (~800px)
      const scrolled = Math.min(window.scrollY / 800, 1)
      scrollOffsetRef.current = scrolled
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useFrame((_, delta) => {
    if (reducedMotion) {
      camera.position.set(0, 0, 4.8)
      camera.lookAt(0, 0, 0)
      return
    }

    const scrollProgress = scrollOffsetRef.current

    // Target camera positions blending pointer parallax + scroll-triggered depth
    const targetX = pointerRef.current.x * 0.75
    const targetY = pointerRef.current.y * 0.5 - scrollProgress * 0.8
    const targetZ = 4.8 + scrollProgress * 0.9

    // Dampen camera translation for luxury fluid feel (delta * 3.2)
    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, 3.2, delta)
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, 3.2, delta)
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, 3.2, delta)

    // Maintain focal focus on sculpture epicenter
    camera.lookAt(0, -scrollProgress * 0.2, 0)
  })

  return null
}
