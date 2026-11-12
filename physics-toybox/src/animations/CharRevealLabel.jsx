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
 * using GSAP ScrollTrigger.
 * 
 * ACCESSIBILITY (a11y):
 * The container retains the full text string inside `aria-label`, while individual
 * split characters are marked `aria-hidden="true"`. This prevents screen readers
 * from spelling out each character separately.
 */
export default function CharRevealLabel({ text, className = '' }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const chars = containerRef.current.querySelectorAll('.char-item')

    const ctx = gsap.context(() => {
      gsap.fromTo(
        chars,
        { opacity: 0, y: 6 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.02,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 92%',
            toggleActions: 'play none none none',
            once: true,
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [text])

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
