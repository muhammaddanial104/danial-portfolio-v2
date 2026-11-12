import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * ScrollTextReveal
 * 
 * Reusable scroll-controlled text component.
 * Words start with comfortable readability and progressively illuminate
 * to radiant white and glowing lavender highlights as the user scrolls.
 * Fully reversible when scrolling backward.
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

    const words = containerRef.current.querySelectorAll('.scroll-word')
    if (!words.length) return

    const ctx = gsap.context(() => {
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
          stagger: 0.04,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 92%',
            end: 'top 55%',
            scrub: 0.6,
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
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
