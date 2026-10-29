import { Menu, X } from 'lucide-react'
import { useState } from 'react'

import { Button } from './Button'
import { Logo } from './Logo'
import { donateHref, isDonateLive } from '../config'
import { usePledge } from './pledge'
import { nav, site } from '../content'

export function Nav() {
  const [open, setOpen] = useState(false)
  const { openPledge } = usePledge()

  function donate(event: { preventDefault: () => void }) {
    setOpen(false)
    if (isDonateLive) return
    event.preventDefault()
    openPledge()
  }

  return (
    <header className="sticky top-0 z-40 bg-brand text-white shadow-lg shadow-brand-dark/20">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-5">
        <a href="#top" aria-label={site.name}>
          <Logo />
        </a>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="font-semibold hover:text-sun">
              {item.label}
            </a>
          ))}
          <Button href={donateHref()} onClick={donate}>
            Donate
          </Button>
        </nav>

        <button
          type="button"
          className="rounded-full p-2 hover:bg-white/10 lg:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <nav
          className="flex flex-col gap-1 rounded-b-card bg-brand-dark px-5 pb-6 lg:hidden"
          aria-label="Mobile"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="py-3 text-lg font-semibold hover:text-sun"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <Button href={donateHref()} className="mt-3" onClick={donate}>
            Donate
          </Button>
        </nav>
      )}
    </header>
  )
}
