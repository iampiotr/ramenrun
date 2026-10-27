import { ArrowDown, Heart } from 'lucide-react'

import { Button } from './Button'
import { RotatingText } from './RotatingText'
import { donateHref } from '../config'
import { hero } from '../content'

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden rounded-b-[40px] bg-brand px-5 pt-14 pb-20 text-white md:pt-20 md:pb-28"
    >
      <div
        className="pointer-events-none absolute -top-32 -right-32 size-[28rem] rounded-full bg-brand-dark"
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.15fr_1fr]">
        <div>
          <h1 className="text-6xl leading-[0.95] sm:text-7xl lg:text-8xl">
            <span className="block">{hero.titleTop}</span>
            <RotatingText phrases={hero.titleRotating} className="text-sun" />
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/90 md:text-xl">{hero.body}</p>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button href={donateHref()} size="lg">
              <Heart className="size-5" aria-hidden />
              Donate Now
            </Button>
            <Button href="#impact" variant="ghost" size="lg">
              See the impact
              <ArrowDown className="size-5" aria-hidden />
            </Button>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[32px] bg-sun" aria-hidden />
          <img
            src={hero.image}
            alt={hero.imageAlt}
            className="relative aspect-[9/10] w-full rounded-[32px] object-cover"
          />
          <div className="absolute -bottom-6 -left-4 rotate-[-4deg] rounded-card bg-white px-5 py-3 text-ink shadow-xl">
            <p className="font-display text-2xl tracking-wide uppercase">50¢ = 1 meal</p>
          </div>
        </div>
      </div>
    </section>
  )
}
