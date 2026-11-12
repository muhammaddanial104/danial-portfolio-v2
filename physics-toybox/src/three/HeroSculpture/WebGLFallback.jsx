import React from 'react'
import { Sparkles } from 'lucide-react'

export default function WebGLFallback() {
  return (
    <div className="relative flex h-full w-full min-h-[380px] items-center justify-center overflow-hidden rounded-[28px] border border-brand-purple/20 bg-gradient-to-b from-obsidian-card to-obsidian p-6 text-center">
      <div className="absolute inset-0 bg-radial-gradient-purple opacity-40" />
      <div className="relative z-10 flex flex-col items-center">
        {/* CSS Parametric Crystal Emblem */}
        <div className="relative mb-4 flex h-32 w-32 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-brand-purple/20 blur-xl animate-pulse" />
          <div className="relative h-20 w-20 rotate-45 rounded-2xl border-2 border-brand-lavender/40 bg-gradient-to-tr from-brand-violet/30 to-brand-purple/10 shadow-glow-sm" />
          <div className="absolute h-14 w-14 -rotate-12 rounded-xl border border-brand-lilac/30 bg-obsidian-card/60 backdrop-blur-md" />
          <Sparkles className="absolute text-brand-lilac animate-spin" style={{ animationDuration: '8s' }} size={24} />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-brand-lavender">
          3D Interactive Studio Artifact
        </span>
        <h4 className="mt-1 font-editorial text-lg font-bold text-white">
          DANIAL® Sculpture Core
        </h4>
        <p className="mt-2 max-w-xs font-display text-xs text-brand-lilac/60">
          Hardware WebGL fallback mode active. Interactive 3D features ready.
        </p>
      </div>
    </div>
  )
}
