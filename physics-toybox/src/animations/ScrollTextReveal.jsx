import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * ============================================================================
 * DANIAL® — ScrollTextReveal Kinetic Typography Component
 * ============================================================================
 * 
 * PURPOSE:
 * Reusable scroll-driven paragraph reveal component. Words start in a legible
 * muted slate-lavender tone (#A09BB0 at 0.75 opacity for WCAG accessibility)
 * and smoothly illuminate to bright radiant white (#FFFFFF) with radiant
 * lavender highlights (#E9D5FF) as the user scrolls through the section.
 * 
 * INTERACTION & PERFORMANCE:
 * - Scrub-linked: animation smoothly tracks scrollbar movement bidirectionally.
 * - fastScrollEnd & preventOverlaps: prevents layout thrashing during fast scrolls.
 * - Reduced Motion: respects accessibility preferences and avoids mounting
 *   unnecessary scroll event listeners when reduced motion is preferred.
 * - Cleanup: automatically reverts GSAP context on unmount to prevent memory leaks.
 */
export default function ScrollTextReveal({
  text,
  highlightWords = [],
  className = '',
  as = 'p',
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Accessibility check: immediately preserve legible static text if user prefers reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) return

    const words = containerRef.current.querySelectorAll('.scroll-word')
    if (!words.length) return

    let ctx
    // Defer ScrollTrigger initialization until after initial hero/WebGL startup has stabilized
    const timer = setTimeout(() => {
      if (!containerRef.current) return
      ctx = gsap.context(() => {
        gsap.fromTo(
          words,
          {
            color: '#A09BB0',
            opacity: 0.75,
            y: 3,
          },
          {
            color: (i, target) => {
              const isHl = target.getAttribute('data-highlight') === 'true'
              return isHl ? '#E9D5FF' : '#FFFFFF'
            },
            opacity: 1,
            y: 0,
            stagger: 0.03,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 92%',
              end: 'top 55%',
              scrub: 0.6,
              fastScrollEnd: true,
              preventOverlaps: true,
            },
          }
        )
      }, containerRef)
    }, 450)

    return () => {
      clearTimeout(timer)
      if (ctx) ctx.revert()
    }
  }, [text])

  const words = text.split(' ')
  const Component = as

  return (
    <Component
      ref={containerRef}
      aria-label={text}
      className={`font-display select-none ${className}`}
    >
      {words.map((word, idx) => {
        const clean = word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '').toLowerCase()
        const isHighlight = highlightWords.includes(clean)

        return (
          <span
            key={idx}
            aria-hidden="true"
            data-highlight={isHighlight ? 'true' : 'false'}
            className={`scroll-word inline-block mr-[0.28em] transition-colors ${
              isHighlight ? 'italic text-brand-lavender font-medium' : ''
            }`}
          >
            {word}
          </span>
        )
      })}
    </Component>
  )
}

