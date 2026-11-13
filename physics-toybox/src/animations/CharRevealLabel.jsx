import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * ============================================================================
 * DANIAL® — CharRevealLabel Micro-Animation Component
 * ============================================================================
 * 
 * PURPOSE:
 * Animates editorial eyebrow badges and section labels character-by-character
 * using GSAP ScrollTrigger with intelligent startup scheduling.
 * 
 * PERFORMANCE & OPTIMIZATIONS:
 * 1. Intelligent Scheduling:
 *    Accepts an optional `delay` prop to prevent clashing with WebGL startup.
 * 2. Hardware Acceleration:
 *    Uses compositor-driven translate & opacity with willChange during active
 *    playback, cleanly clearing inline styles upon animation completion.
 * 3. Accessibility & Reduced Motion:
 *    Respects `prefers-reduced-motion` by displaying characters immediately in
 *    their final state with zero motion overhead. Full text is preserved in
 *    `aria-label` while individual split characters are `aria-hidden="true"`.
 */
export default function CharRevealLabel({
  text,
  className = '',
  delay = 0,
  useScrollTrigger = true,
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Accessibility check: immediately render static text if user prefers reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) return

    const chars = containerRef.current.querySelectorAll('.char-item')
    if (!chars.length) return

    const ctx = gsap.context(() => {
      const animConfig = {
        opacity: 1,
        y: 0,
        duration: 0.38,
        stagger: 0.018,
        delay: delay,
        ease: 'power2.out',
        onComplete: () => {
          // Clean up inline styles so browser returns to native static rendering
          gsap.set(chars, { clearProps: 'willChange' })
        },
      }

      if (useScrollTrigger) {
        animConfig.scrollTrigger = {
          trigger: containerRef.current,
          start: 'top 95%',
          toggleActions: 'play none none none',
          once: true,
          fastScrollEnd: true,
        }
      }

      gsap.fromTo(
        chars,
        {
          opacity: 0,
          y: 5,
          willChange: 'transform, opacity',
        },
        animConfig
      )
    }, containerRef)

    return () => ctx.revert()
  }, [text, delay, useScrollTrigger])


  return (
    <span
      ref={containerRef}
      aria-label={text}
      className={`inline-flex flex-wrap items-center ${className}`}
    >
      {text.split('').map((char, index) => (
        <span
          key={index}
          aria-hidden="true"
          className="char-item inline-block whitespace-pre"
        >
          {char}
        </span>
      ))}
    </span>
  )
}

