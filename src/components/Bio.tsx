import { Quote } from 'lucide-react'

import { Section, SectionHeading } from './Section'
import { bio } from '../content'

export function Bio() {
  return (
    <Section id="bio" className="bg-sky-light">
      <div className="grid items-start gap-12 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="text-center">
          <div className="relative mx-auto size-64 md:size-80">
            <div className="absolute inset-0 translate-x-4 translate-y-3 rounded-full bg-sun" aria-hidden />
            <img
              src={bio.photo}
              alt={bio.photoAlt}
              className="relative size-full rounded-full border-8 border-white object-cover"
              loading="lazy"
            />
          </div>
          <p className="mt-6 font-display text-3xl tracking-wide uppercase">{bio.name}</p>
          <p className="font-semibold text-brand">{bio.role}</p>
        </div>

        <div>
          <SectionHeading eyebrow={bio.eyebrow} title="Why I do this" />
          <blockquote className="relative mb-8 rounded-card bg-brand p-7 text-white">
            <Quote className="absolute -top-4 left-6 size-9 rounded-full bg-sun p-2 text-ink" aria-hidden />
            <p className="font-display text-2xl leading-snug tracking-wide uppercase md:text-3xl">
              {bio.quote}
            </p>
          </blockquote>
          <div className="space-y-5 text-lg text-ink/80">
            {bio.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
