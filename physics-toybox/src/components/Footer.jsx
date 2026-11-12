import { ArrowUp, Sparkles } from 'lucide-react'

export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="w-full max-w-full overflow-hidden border-t border-brand-purple/15 bg-obsidian-surface/60 py-10 md:py-12">
      <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center md:px-12 w-full">
        <div>
          <div className="flex items-center gap-2 font-editorial text-base sm:text-lg font-bold tracking-tight text-white">
            <span className="grid h-6 w-6 place-items-center rounded bg-brand-purple text-[10px] font-mono text-white">
              D
            </span>
            <span>DANIAL®</span>
            <span className="font-mono text-[9px] sm:text-[10px] font-normal tracking-widest text-brand-lavender/60">
              / STUDIO
            </span>
          </div>
          <p className="mt-1.5 font-mono text-[11px] sm:text-xs text-brand-lilac/50">
            Digital Experiences & 3D Web Creative Development.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between sm:justify-start gap-4 sm:gap-6 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-brand-lilac/60">
          <span>© 2026 DANIAL®</span>
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="group flex items-center gap-1.5 sm:gap-2 rounded-full border border-brand-purple/20 bg-obsidian-card px-3 sm:px-4 py-1.5 sm:py-2 text-brand-lilac transition-all hover:border-brand-purple hover:bg-brand-purple/20 hover:text-white"
          >
            <span>Top</span>
            <ArrowUp
              size={13}
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          </button>
        </div>
      </div>
    </footer>
  )
}
