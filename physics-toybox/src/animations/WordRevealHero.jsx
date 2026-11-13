import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * ============================================================================
 * DANIAL® — WordRevealHero Cinematic Heading Animation
 * ============================================================================
 * 
 * PURPOSE:
 * Powers the grand entrance of the hero headline:
 * "I CREATE DIGITAL WORLDS."
 * 
 * ANIMATION MECHANICS:
 * 1. Hardware-Accelerated Multi-Stage Timeline:
 *    - Each word translates vertically from within its masked overflow container.
 *    - Staggered timing (0.12s) creates a majestic, fluid editorial rhythm.
 *    - Pure GPU-composited transforms (`translateY`, `opacity`) prevent CPU/GPU
 *      rasterization stalls during WebGL initialization.
 *    - Gradient glowing underline blooms beneath the key phrase "WORLDS."
 * 
 * 2. Intelligent Startup Scheduling:
 *    - Accepts a configurable `delay` (default 0.55s) to allow Three.js WebGL
 *      canvas and liquid chrome shaders to compile and stabilize prior to
 *      triggering typography reveals.
 * 
 * 3. Scroll-Linked Parallax:
 *    - Gentle scroll scrub elevates and dims the hero heading as the user explores.
 * 
 * 4. Accessibility & Lifecycle Safety:
 *    - Respects `prefers-reduced-motion`.
 *    - Encapsulated within `gsap.context()` for clean teardown on unmount.
 */
export default function WordRevealHero({ className = '', delay = 0.55 }) {
  const containerRef = useRef(null)
  const lineUnderRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Accessibility check: immediately render static headline if user prefers reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      if (lineUnderRef.current) {
        lineUnderRef.current.style.transform = 'scaleX(1)'
        lineUnderRef.current.style.opacity = '1'
      }
      return
    }

    const words = containerRef.current.querySelectorAll('.hero-word-reveal')
    if (!words.length) return

    const ctx = gsap.context(() => {
      // 1. Cinematic entrance timeline: words float up and fade in with hardware transforms
      const tl = gsap.timeline({ delay: delay })

      tl.fromTo(
        words,
        {
          opacity: 0,
          y: 48,
          willChange: 'transform, opacity',
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.05,
          stagger: 0.12,
          ease: 'power3.out',
          onComplete: () => {
            gsap.set(words, { clearProps: 'willChange' })
          },
        }
      )

      // Animated underline expands smoothly beneath WORLDS.
      if (lineUnderRef.current) {
        tl.fromTo(
          lineUnderRef.current,
          { scaleX: 0, opacity: 0, willChange: 'transform, opacity' },
          {
            scaleX: 1,
            opacity: 1,
            duration: 0.9,
            ease: 'expo.out',
            onComplete: () => {
              gsap.set(lineUnderRef.current, { clearProps: 'willChange' })
            },
          },
          '-=0.45'
        )
      }

      // 2. Subtle scroll-controlled upward drift & fade
      // Defer ScrollTrigger attachment until entrance completes to eliminate measureScroll during startup
      const scrollTimer = setTimeout(() => {
        if (!containerRef.current) return
        gsap.to(containerRef.current, {
          y: -40,
          opacity: 0.45,
          ease: 'none',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 20%',
            end: 'bottom top',
            scrub: 0.6,
            fastScrollEnd: true,
          },
        })
      }, Math.round((delay + 1.2) * 1000))

      return () => clearTimeout(scrollTimer)
    }, containerRef)

    return () => ctx.revert()
  }, [delay])

  return (
    <h1
      ref={containerRef}
      className={`font-editorial font-extrabold leading-[0.9] tracking-[-0.04em] ${className}`}
    >
      <span className="block overflow-hidden py-1 whitespace-nowrap">
        <span className="hero-word-reveal inline-block mr-[0.35em] text-[#FFFFFF]">I</span>
        <span className="hero-word-reveal inline-block text-[#FFFFFF]">CREATE</span>
      </span>

      <span className="block overflow-hidden py-1">
        <span className="hero-word-reveal inline-block bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#A78BFA] bg-clip-text text-transparent">
          DIGITAL
        </span>
      </span>

      <span className="block overflow-hidden py-1">
        <span className="relative inline-block text-[#A78BFA] italic font-display font-medium">
          <span className="hero-word-reveal inline-block text-[#A78BFA]">WORLDS.</span>
          <span
            ref={lineUnderRef}
            className="absolute -bottom-1 left-0 h-[3px] w-full origin-left bg-gradient-to-r from-[#7C3AED] via-[#A78BFA] to-transparent shadow-[0_0_12px_rgba(167,139,250,0.5)]"
          />
        </span>
      </span>
    </h1>
  )
}

