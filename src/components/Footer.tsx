import { Check, Mail, Share2 } from 'lucide-react'
import { useState } from 'react'

import { Logo } from './Logo'
import { CONTACT_EMAIL, SOCIAL_LINKS } from '../config'
import { nav, site } from '../content'

const year = new Date().getFullYear()

export function Footer() {
  const [copied, setCopied] = useState(false)

  async function share() {
    const data = { title: site.name, text: site.tagline, url: window.location.href }
    if (navigator.share) {
      await navigator.share(data).catch(() => {})
      return
    }
    await navigator.clipboard.writeText(data.url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <footer className="rounded-t-[40px] bg-ink px-5 pt-16 pb-10 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-3">
        <div>
          <Logo size="lg" />
          <p className="mt-4 text-white/70">{site.tagline}</p>
          <button
            type="button"
            onClick={share}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-sun px-5 py-2.5 font-bold text-ink hover:bg-ramen"
          >
            {copied ? <Check className="size-4" aria-hidden /> : <Share2 className="size-4" aria-hidden />}
            {copied ? 'Link copied!' : 'Share this page'}
          </button>
        </div>

        <nav aria-label="Footer">
          <p className="mb-4 text-sm font-bold tracking-[0.2em] text-sun uppercase">Explore</p>
          <ul className="space-y-2">
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-white/80 hover:text-sun">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mb-4 text-sm font-bold tracking-[0.2em] text-sun uppercase">Get in touch</p>
          <a href={`mailto:${CONTACT_EMAIL}`} className="flex items-center gap-2 text-white/80 hover:text-sun">
            <Mail className="size-4" aria-hidden />
            {CONTACT_EMAIL}
          </a>
          <ul className="mt-5 flex flex-wrap gap-3">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block rounded-full border border-white/30 px-4 py-1.5 text-sm font-semibold hover:border-sun hover:text-sun"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-14 max-w-6xl border-t border-white/15 pt-6 text-sm text-white/50">
        © {year} {site.name}.
      </p>
    </footer>
  )
}
