import { Section, SectionHeading } from './Section'
import { drops } from '../content'

export function Drops() {
  return (
    <Section id="drops">
      <SectionHeading eyebrow={drops.eyebrow} title={drops.title} intro={drops.intro} />
      <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
        <span
          aria-hidden
          className="absolute top-8 right-[16%] left-[16%] hidden h-1 rounded-full bg-brand/20 md:block"
        />
        {drops.stops.map((stop, index) => (
          <li key={stop.year} className="relative text-center">
            <div
              className={`relative z-10 mx-auto inline-flex h-16 min-w-32 items-center justify-center rounded-full px-6 font-display text-3xl ${
                index === 0 ? 'bg-brand text-white' : 'bg-lilac text-brand'
              }`}
            >
              {stop.year}
            </div>
            <h3 className="mt-6 text-4xl">{stop.place}</h3>
            <p className="mt-2 text-sm font-bold tracking-[0.16em] text-brand uppercase">
              {stop.status}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  )
}
