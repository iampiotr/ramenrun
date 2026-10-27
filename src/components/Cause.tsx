import { Section, SectionHeading } from './Section'
import { cause } from '../content'

export function Cause() {
  return (
    <Section id="cause">
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div>
          <SectionHeading eyebrow={cause.eyebrow} title={cause.title} />
          <div className="space-y-5 text-lg text-ink/80">
            {cause.paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>

          <figure className="mt-8 rounded-card border-l-8 border-ramen bg-sky-light p-6">
            <p className="text-xl font-semibold">
              <span className="marker font-display text-3xl tracking-wide uppercase">
                {cause.fact.stat}
              </span>{' '}
              {cause.fact.text}
            </p>
            <figcaption className="mt-2 text-sm text-ink/60">Source: {cause.fact.source}</figcaption>
          </figure>
        </div>

        <img
          src={cause.image}
          alt={cause.imageAlt}
          className="aspect-[4/3] w-full rounded-card object-cover shadow-xl"
          loading="lazy"
        />
      </div>
    </Section>
  )
}
