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
    <footer className="w-full max-w-full overflow-hidden border-t border-brand-purple/20 bg-[#08070D]/95 backdrop-blur-xl py-10 md:py-12 relative z-20">
      <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-6 px-4 sm:px-6 md:flex-row md:items-center md:px-12 w-full">
        <div>
          <div className="flex items-center gap-3">
            <Link to="/" className="transition-opacity hover:opacity-90 inline-flex items-center gap-2.5" aria-label="DANIAL® Home">
              <img
                src="/danial-icon.png"
                alt="DANIAL® Icon"
                className="h-8 w-8 sm:h-9 sm:w-9 rounded-xl object-contain shadow-glow-sm"
              />
              <span className="font-editorial text-lg sm:text-xl font-bold tracking-wider text-white">
                DANIAL<span className="text-brand-purple font-mono text-xs ml-0.5">®</span>
              </span>
            </Link>
            <span className="font-mono text-[9px] sm:text-[10px] font-normal tracking-widest text-brand-lavender/60 border-l border-brand-purple/20 pl-3">
              / STUDIO
            </span>
          </div>
          <p className="mt-2 font-mono text-[11px] sm:text-xs text-brand-lilac/50">
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
                className="grid h-8 w-8 place-items-center rounded-full btn-icon text-brand-lilac/90"
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
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll back to top"
            className="group flex items-center gap-1.5 sm:gap-2 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 btn-secondary cursor-pointer"
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
