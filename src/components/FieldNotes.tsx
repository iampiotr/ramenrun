import { MapPin } from 'lucide-react'

import { Section, SectionHeading } from './Section'
import { fieldNotes } from '../content'

const cardColors = ['bg-sun', 'bg-sky', 'bg-lilac']

export function FieldNotes() {
  return (
    <Section id="stories" className="pt-0 md:pt-0">
      <SectionHeading eyebrow={fieldNotes.eyebrow} title={fieldNotes.title} />
      <div className="grid gap-6 md:grid-cols-3">
        {fieldNotes.notes.map((note, i) => (
          <article key={note.name} className={`flex flex-col rounded-card p-7 ${cardColors[i % cardColors.length]}`}>
            <div className="mb-5 flex items-center gap-3">
              <span className="flex size-12 items-center justify-center rounded-full bg-brand font-display text-xl text-white">
                {note.name.charAt(0)}
              </span>
              <div>
                <p className="font-bold">{note.name}</p>
                <p className="flex items-center gap-1 text-sm text-ink/70">
                  <MapPin className="size-3.5" aria-hidden />
                  {note.place}
                </p>
              </div>
            </div>
            <p className="text-lg font-medium">{note.text}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
