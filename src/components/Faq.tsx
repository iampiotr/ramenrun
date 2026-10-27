import { Plus } from 'lucide-react'

import { Section, SectionHeading } from './Section'
import { faq } from '../content'

export function Faq() {
  return (
    <Section id="faq" className="bg-sky-light">
      <div className="grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <SectionHeading eyebrow={faq.eyebrow} title={faq.title} />
        <div className="space-y-4">
          {faq.items.map((item) => (
            <details
              key={item.q}
              className="group rounded-card bg-white p-6 shadow-sm open:shadow-lg open:shadow-brand/10"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold [&::-webkit-details-marker]:hidden">
                {item.q}
                <Plus
                  className="size-8 shrink-0 rounded-full bg-sun p-1.5 transition-transform group-open:rotate-45"
                  aria-hidden
                />
              </summary>
              <p className="mt-4 text-ink/75">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </Section>
  )
}
