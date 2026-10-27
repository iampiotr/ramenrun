import { Heart } from 'lucide-react'

import { Button } from './Button'
import { donateHref } from '../config'
import { finalCta } from '../content'

export function FinalCta() {
  return (
    <section className="px-5 py-20">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[40px] bg-sun px-8 py-16 text-center md:py-20">
        <div className="pointer-events-none absolute -top-16 -left-16 size-56 rounded-full bg-ramen/40" aria-hidden />
        <div className="pointer-events-none absolute -right-20 -bottom-20 size-72 rounded-full bg-white/40" aria-hidden />
        <div className="relative">
          <h2 className="text-5xl leading-none md:text-7xl">{finalCta.title}</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg md:text-xl">{finalCta.body}</p>
          <Button href={donateHref()} variant="brand" size="lg" className="mt-9">
            <Heart className="size-5" aria-hidden />
            Donate Now
          </Button>
        </div>
      </div>
    </section>
  )
}
