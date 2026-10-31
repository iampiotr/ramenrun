import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/styles.css'

import { Section, SectionHeading } from './Section'
import { gallery } from '../content'

export function Gallery() {
  const [index, setIndex] = useState(-1)

  return (
    <Section id="gallery">
      <SectionHeading
        eyebrow={gallery.eyebrow}
        title={gallery.title}
        intro={gallery.intro}
        align="center"
      />

      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {gallery.photos.map((photo, i) => (
          <li key={photo.src}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group relative block w-full overflow-hidden rounded-card focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-brand"
              aria-label={`Open photo: ${photo.caption}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading="lazy"
                className="h-auto w-full transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-x-3 bottom-3 rounded-full bg-white/95 px-4 py-2 text-left text-sm font-bold text-ink shadow">
                {photo.caption}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        plugins={[Captions]}
        slides={gallery.photos.map((p) => ({
          src: p.src,
          alt: p.alt,
          width: p.width,
          height: p.height,
          title: p.caption,
          description: p.alt,
        }))}
      />
    </Section>
  )
}
