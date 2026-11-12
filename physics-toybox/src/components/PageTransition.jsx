import React from 'react'
import { motion } from 'framer-motion'

/**
 * ============================================================================
 * DANIAL® — PageTransition Wrapper Component
 * ============================================================================
 * 
 * WHY THIS COMPONENT EXISTS:
 * Used across all 6 pages (`Home`, `About`, `Projects`, `Skills`, `Journey`, `Contact`)
 * to standardize entry and exit animations during route changes.
 * 
 * ANIMATION MECHANICS:
 * - Initial: Subtle 16px downward translation with 0 opacity.
 * - Animate: Glides into place (y: 0, opacity: 1) using custom cubic-bezier `[0.16, 1, 0.3, 1]`.
 * - Exit: Smoothly fades and ascends (y: -16, opacity: 0) as next route mounts.
 * - Works in tandem with <AnimatePresence mode="wait"> inside App.jsx.
 */
export default function PageTransition({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className={`relative w-full max-w-full ${className}`}
    >
      {children}
    </motion.div>
  )
}
