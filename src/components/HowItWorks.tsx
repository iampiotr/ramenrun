import { HandHeart, ShoppingCart, Truck, Utensils } from 'lucide-react'

import { Section, SectionHeading } from './Section'
import { howItWorks } from '../content'

const icons = [HandHeart, ShoppingCart, Truck, Utensils]
const accents = ['bg-sun', 'bg-sky', 'bg-lilac', 'bg-ramen/30']

export function HowItWorks() {
  return (
    <Section id="how" className="rounded-[40px] bg-brand text-white">
      <SectionHeading
        eyebrow={howItWorks.eyebrow}
        title={howItWorks.title}
        intro={howItWorks.intro}
        tone="light"
      />
      <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {howItWorks.steps.map((step, i) => {
          const Icon = icons[i]
          return (
            <li key={step.title} className="relative rounded-card bg-white p-7 text-ink">
              <span className="absolute top-5 right-6 font-display text-5xl text-brand/15">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span
                className={`mb-5 inline-flex size-14 items-center justify-center rounded-full ${accents[i]}`}
              >
                <Icon className="size-7 text-brand-dark" aria-hidden />
              </span>
              <h3 className="text-2xl">{step.title}</h3>
              <p className="mt-2 text-ink/75">{step.body}</p>
            </li>
          )
        })}
      </ol>
    </Section>
  )
}
