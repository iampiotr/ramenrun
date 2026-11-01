import { useEffect, useRef, useState } from 'react'
import Lightbox from 'yet-another-react-lightbox'
import Captions from 'yet-another-react-lightbox/plugins/captions'
import 'yet-another-react-lightbox/plugins/captions.css'
import 'yet-another-react-lightbox/styles.css'

import { Section, SectionHeading } from './Section'
import { gallery } from '../content'

const ROW = 10
const GAP = 20

function rowSpan(width: number, height: number, columnWidth: number) {
  const contentHeight = columnWidth * (height / width)
  return Math.max(1, Math.ceil((contentHeight + GAP) / (ROW + GAP)))
}

export function Gallery() {
  const [index, setIndex] = useState(-1)
  const listRef = useRef<HTMLUListElement>(null)
  const [columnWidth, setColumnWidth] = useState(280)

  useEffect(() => {
    const list = listRef.current
    if (!list) return

    const measure = () => {
      const item = list.querySelector('li')
      if (!item) return
      const next = item.getBoundingClientRect().width
      if (next > 0) setColumnWidth(next)
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(list)
    return () => observer.disconnect()
  }, [])

  return (
    <Section id="gallery">
      <SectionHeading
        eyebrow={gallery.eyebrow}
        title={gallery.title}
        intro={gallery.intro}
        align="center"
      />

      <ul
        ref={listRef}
        className="grid grid-cols-2 gap-5 lg:grid-cols-3"
        style={{ gridAutoRows: ROW }}
      >
        {gallery.photos.map((photo, i) => (
          <li key={photo.src} style={{ gridRowEnd: `span ${rowSpan(photo.width, photo.height, columnWidth)}` }}>
            <button
              type="button"
              onClick={() => setIndex(i)}
              className="group relative block h-full w-full overflow-hidden rounded-card focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-brand"
              aria-label={`Open photo: ${photo.caption}`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
                loading="lazy"
                className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0 group-focus-visible:grayscale-0"
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
