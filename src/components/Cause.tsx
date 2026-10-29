import { useState } from 'react'
import { Play } from 'lucide-react'

import { Section, SectionHeading } from './Section'
import { cause } from '../content'

function CauseVideo() {
  const [playing, setPlaying] = useState(false)

  if (playing) {
    return (
      <iframe
        className="absolute bottom-0 left-1/2 h-[calc(100%+5rem)] w-[calc(100%+8.889rem)] max-w-none -translate-x-1/2"
        src={`https://www.youtube-nocookie.com/embed/${cause.videoId}?autoplay=1&controls=1&modestbranding=1&rel=0&iv_load_policy=3&playsinline=1`}
        title={cause.videoTitle}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    )
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group relative h-full w-full cursor-pointer"
    >
      <img
        src={`https://i.ytimg.com/vi/${cause.videoId}/maxresdefault.jpg`}
        alt=""
        className="h-full w-full object-cover"
      />
      <span className="absolute inset-0 flex items-center justify-center bg-ink/20 transition-colors group-hover:bg-ink/30">
        <span className="flex size-16 items-center justify-center rounded-full bg-white text-brand shadow-lg">
          <Play className="size-7 translate-x-0.5" aria-hidden />
        </span>
        <span className="sr-only">Play video</span>
      </span>
    </button>
  )
}

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

        <div className="relative aspect-video w-full overflow-hidden rounded-card shadow-xl">
          <CauseVideo />
        </div>
      </div>
    </Section>
  )
}
