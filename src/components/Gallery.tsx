import { useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/styles.css'

import { Section, SectionHeading } from './Section'
import { gallery } from '../content'

const tiles = [
  { bg: 'bg-sun', box: 'col-span-1 row-span-2 lg:col-span-3' },
  { bg: 'bg-sky', box: 'col-span-1 row-span-2 lg:col-span-3' },
  { bg: 'bg-ramen', box: 'col-span-1 row-span-2 lg:col-span-2' },
  { bg: 'bg-sky-light', box: 'col-span-1 row-span-3 lg:col-span-2' },
  { bg: 'bg-sun', box: 'col-span-1 row-span-2 lg:col-span-2' },
  { bg: 'bg-sky', box: 'col-span-1 row-span-2 lg:col-span-2 lg:row-span-1' },
  { bg: 'bg-ramen', box: 'col-span-1 row-span-2 lg:col-span-2 lg:row-span-1' },
  { bg: 'bg-sky-light', box: 'col-span-1 row-span-2 lg:col-span-3' },
  { bg: 'bg-sun', box: 'col-span-1 row-span-2 lg:col-span-3' },
]

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

      <ul className="grid auto-rows-[140px] grid-cols-2 gap-2 lg:auto-rows-[150px] lg:grid-cols-6">
        {gallery.photos.map((photo, i) => (
          <li key={photo.src} className={tiles[i].box}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className={`group relative block h-full w-full overflow-hidden rounded-card p-3 focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-brand ${tiles[i].bg}`}
              aria-label={`Open photo: ${photo.caption}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading="lazy"
                className="h-full w-full object-contain grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0 group-focus-visible:grayscale-0"
              />
              <span className="absolute inset-x-3 bottom-3 hidden rounded-full bg-white/95 px-4 py-2 text-left text-sm font-bold text-ink shadow md:block">
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
