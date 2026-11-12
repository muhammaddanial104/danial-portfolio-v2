import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollFillText({
  text,
  highlightWords = [],
  className = '',
  wordClassName = '',
  scrub = 0.8,
  start = 'top 85%',
  end = 'bottom 45%',
  as = 'p',
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const words = containerRef.current.querySelectorAll('.kinetic-word-target')

    const ctx = gsap.context(() => {
      // Create scroll-driven scrub animation
      gsap.fromTo(
        words,
        {
          color: '#3B354D',
          opacity: 0.28,
        },
        {
          color: (i, target) => {
            const isHighlight = target.getAttribute('data-highlight') === 'true'
            return isHighlight ? '#E9D5FF' : '#FFFFFF'
          },
          opacity: 1,
          stagger: 0.08,
          ease: 'power1.inOut',
          scrollTrigger: {
            trigger: containerRef.current,
            start,
            end,
            scrub,
          },
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [text, highlightWords, scrub, start, end])

  const words = text.split(' ')

  const cleanWord = (w) => w.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '').toLowerCase()
  const cleanHighlights = highlightWords.map((w) => cleanWord(w))

  const Component = as

  return (
    <Component
      ref={containerRef}
      aria-label={text}
      className={`relative inline-block ${className}`}
    >
      {words.map((word, idx) => {
        const isHighlight = cleanHighlights.includes(cleanWord(word))
        return (
          <span
            key={idx}
            aria-hidden="true"
            data-highlight={isHighlight ? 'true' : 'false'}
            className={`kinetic-word-target inline-block whitespace-nowrap mr-[0.28em] transition-colors ${
              isHighlight ? 'font-medium' : ''
            } ${wordClassName}`}
          >
            {word}
          </span>
        )
      })}
    </Component>
  )
}
