import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * PageTransition
 * 
 * Elegant container transition wrapper for smooth editorial section reveals.
 */
export default function PageTransition({ children, activeKey, className = '' }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeKey}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
