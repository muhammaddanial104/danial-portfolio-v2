import { Link } from 'react-router-dom'
import {
  ArrowUp,
  Github,
  Linkedin,
  Facebook,
  Instagram,
  MessageCircle,
  Mail,
} from 'lucide-react'

/**
 * ============================================================================
 * DANIAL® — Global Editorial Footer
 * ============================================================================
 * 
 * FEATURES:
 * - Brand Monogram & Copyright
 * - Fast internal page navigation links matching all 6 primary routes
 * - Direct social & contact channels: WhatsApp, Email, GitHub, LinkedIn, Facebook, Instagram
 * - Smooth scroll-to-top micro-interaction trigger
 */
export default function Footer() {
  const scrollToTop = (e) => {
    e.preventDefault()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const footerLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Skills', path: '/skills' },
    { name: 'Journey', path: '/journey' },
    { name: 'Contact', path: '/contact' },
  ]

  const socialLinks = [
    {
      name: 'WhatsApp',
      href: 'https://wa.me/923137525862',
      icon: MessageCircle,
      label: 'WhatsApp Chat',
    },
    {
      name: 'Email',
      href: 'mailto:innocentdanial00@gmail.com',
      icon: Mail,
      label: 'Email Inquiry',
    },
    {
      name: 'GitHub',
      href: 'https://github.com/muhammaddanial104/danial-tech',
      icon: Github,
      label: 'GitHub Profile',
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/muhammad-danial-2584b4432',
      icon: Linkedin,
      label: 'LinkedIn Profile',
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/share/1CD8FQZmT6/',
      icon: Facebook,
      label: 'Facebook Profile',
    },
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/muhammad_danial604?exln=amEzODdkdHZzcnVp',
      icon: Instagram,
      label: 'Instagram Profile',
    },
  ]

  return (
    <footer className="w-full max-w-full overflow-hidden border-t border-brand-purple/15 bg-obsidian-surface/60 py-10 md:py-12 relative z-20">
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

        {/* Footer Navigation */}
        <div className="flex flex-wrap gap-4 sm:gap-6 font-mono text-[10px] uppercase tracking-wider text-brand-lilac/60">
          {footerLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Social & Contact Channels */}
        <div className="flex flex-wrap items-center gap-2.5">
          {socialLinks.map((item) => {
            const Icon = item.icon
            const isMail = item.href.startsWith('mailto:')
            return (
              <a
                key={item.name}
                href={item.href}
                target={isMail ? undefined : '_blank'}
                rel={isMail ? undefined : 'noopener noreferrer'}
                aria-label={item.label}
                title={item.name}
                className="grid h-8 w-8 place-items-center rounded-full border border-brand-purple/20 bg-obsidian-card/80 text-brand-lilac/70 transition-all hover:border-brand-purple hover:bg-brand-purple/20 hover:text-white focus:outline-none focus:ring-1 focus:ring-brand-purple"
              >
                <Icon size={14} />
              </a>
            )
          })}
        </div>

        {/* Copyright & Top Trigger */}
        <div className="flex flex-wrap items-center justify-between sm:justify-start gap-4 sm:gap-6 font-mono text-[10px] sm:text-xs uppercase tracking-widest text-brand-lilac/60">
          <span>© 2026 DANIAL®</span>
          <button
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="group flex items-center gap-1.5 sm:gap-2 rounded-full border border-brand-purple/20 bg-obsidian-card px-3 sm:px-4 py-1.5 sm:py-2 text-brand-lilac transition-all hover:border-brand-purple hover:bg-brand-purple/20 hover:text-white cursor-pointer"
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
