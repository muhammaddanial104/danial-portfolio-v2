import React, { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'

/**
 * ============================================================================
 * DANIAL® — MagneticButton Interactive Component
 * ============================================================================
 * 
 * PURPOSE:
 * Creates an award-winning tactile magnetic button effect. When the cursor hovers
 * near the button, GSAP pulls the button element toward the cursor coordinates.
 * On mouse leave, an elastic bounce-back spring (`elastic.out(1.1, 0.4)`) snaps
 * the button back to its origin.
 * 
 * VERSATILITY:
 * Automatically renders as a React Router `<Link>`, an external anchor `<a>`,
 * or a standard `<button>` depending on the presence of `to`, `href`, or `onClick`.
 * Automatically disables magnetic translation on touch devices.
 */
export default function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  to,
  strength = 0.28,
  target,
  rel,
  ...props
}) {
  const buttonRef = useRef(null)
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setIsTouch(isTouchDevice || prefersReducedMotion)
  }, [])

  const handleMouseMove = (e) => {
    if (isTouch || !buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)

    gsap.to(buttonRef.current, {
      x: x * strength,
      y: y * strength,
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    if (isTouch || !buttonRef.current) return
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: 'elastic.out(1.1, 0.4)',
    })
  }

  const linkTarget = to || (href && href.startsWith('/') ? href : null)

  if (linkTarget) {
    return (
      <Link
        ref={buttonRef}
        to={linkTarget}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`inline-flex items-center justify-center transition-shadow ${className}`}
        {...props}
      >
        {children}
      </Link>
    )
  }

  if (href) {
    return (
      <a
        ref={buttonRef}
        href={href}
        onClick={onClick}
        target={target}
        rel={rel}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`inline-flex items-center justify-center transition-shadow ${className}`}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      type="button"
      ref={buttonRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-flex items-center justify-center transition-shadow ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
