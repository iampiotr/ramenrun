import { useEffect, useRef, useState } from 'react'
import { Pause, Play, SkipBack, SkipForward } from 'lucide-react'

import { Section, SectionHeading } from './Section'
import { cause } from '../content'

type YtPlayer = {
  destroy: () => void
  getCurrentTime: () => number
  getDuration: () => number
  getPlayerState: () => number
  pauseVideo: () => void
  playVideo: () => void
  seekTo: (seconds: number, allowSeekAhead: boolean) => void
}

type YtPlayerEvent = { data: number; target: YtPlayer }

declare global {
  interface Window {
    YT?: { Player: new (id: string, options: object) => YtPlayer }
    onYouTubeIframeAPIReady?: () => void
  }
}

const PLAYER_ID = 'cause-youtube'
const ENDED = 0

function useNativeControls() {
  const [native, setNative] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(hover: none), (pointer: coarse)')
    const update = () => setNative(query.matches)
    update()
    query.addEventListener('change', update)
    return () => query.removeEventListener('change', update)
  }, [])

  return native
}

function loadYouTubeApi() {
  if (window.YT?.Player) return Promise.resolve()
  return new Promise<void>((resolve) => {
    const previous = window.onYouTubeIframeAPIReady
    window.onYouTubeIframeAPIReady = () => {
      previous?.()
      resolve()
    }
    if (!document.querySelector('script[src="https://www.youtube.com/iframe_api"]')) {
      const script = document.createElement('script')
      script.src = 'https://www.youtube.com/iframe_api'
      document.head.appendChild(script)
    }
  })
}

function formatTime(seconds: number) {
  const total = Math.max(0, Math.floor(seconds))
  const minutes = Math.floor(total / 60)
  const remain = total % 60
  return `${minutes}:${remain.toString().padStart(2, '0')}`
}

function SeekBar({ player }: { player: YtPlayer }) {
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [paused, setPaused] = useState(false)
  const scrubbing = useRef(false)

  useEffect(() => {
    const id = window.setInterval(() => {
      const nextDuration = player.getDuration() || 0
      const nextTime = player.getCurrentTime() || 0
      setDuration(nextDuration)
      setPaused(player.getPlayerState() === 2)
      if (!scrubbing.current) setTime(nextTime)
    }, 250)
    return () => window.clearInterval(id)
  }, [player])

  function seekBy(delta: number) {
    const next = Math.min(Math.max(0, player.getCurrentTime() + delta), player.getDuration() || 0)
    player.seekTo(next, true)
    setTime(next)
  }

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        aria-label={paused ? 'Play' : 'Pause'}
        onClick={() => {
          if (paused) player.playVideo()
          else player.pauseVideo()
          setPaused(!paused)
        }}
        className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-lilac text-brand"
      >
        {paused ? <Play className="size-4 translate-x-0.5" /> : <Pause className="size-4" />}
      </button>
      <button
        type="button"
        aria-label="Back 10 seconds"
        onClick={() => seekBy(-10)}
        className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-lilac text-brand"
      >
        <SkipBack className="size-4" />
      </button>
      <input
        type="range"
        min={0}
        max={duration || 0}
        step={0.1}
        value={Math.min(time, duration || 0)}
        aria-label="Video position"
        onPointerDown={() => {
          scrubbing.current = true
        }}
        onPointerUp={() => {
          scrubbing.current = false
        }}
        onChange={(event) => {
          const next = Number(event.target.value)
          setTime(next)
          player.seekTo(next, true)
        }}
        className="h-1.5 w-full min-w-0 cursor-pointer accent-brand"
      />
      <button
        type="button"
        aria-label="Forward 10 seconds"
        onClick={() => seekBy(10)}
        className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full bg-lilac text-brand"
      >
        <SkipForward className="size-4" />
      </button>
      <span className="w-20 shrink-0 text-right text-sm font-medium tabular-nums text-ink/70">
        {formatTime(time)} / {formatTime(duration)}
      </span>
    </div>
  )
}

function CauseVideo() {
  const [started, setStarted] = useState(false)
  const [player, setPlayer] = useState<YtPlayer | null>(null)
  const nativeControls = useNativeControls()

  useEffect(() => {
    if (!started) return
    let active = true
    let created: YtPlayer | null = null

    loadYouTubeApi().then(() => {
      if (!active || !window.YT) return
      created = new window.YT.Player(PLAYER_ID, {
        events: {
          onReady: (event: YtPlayerEvent) => {
            if (active) setPlayer(event.target)
          },
          onStateChange: (event: YtPlayerEvent) => {
            if (event.data === ENDED) {
              event.target.seekTo(0, true)
              event.target.pauseVideo()
            }
          },
        },
      })
    })

    return () => {
      active = false
      created?.destroy()
    }
  }, [started])

  const src = `https://www.youtube-nocookie.com/embed/${cause.videoId}?autoplay=1&controls=${nativeControls ? 1 : 0}&modestbranding=1&rel=0&iv_load_policy=3&playsinline=1&fs=${nativeControls ? 1 : 0}&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}`

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-video w-full overflow-hidden rounded-card shadow-xl">
        {started ? (
          <iframe
            id={PLAYER_ID}
            className={`absolute inset-0 h-full w-full ${nativeControls ? '' : 'pointer-events-none'}`}
            src={src}
            title={cause.videoTitle}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        ) : (
          <button
            type="button"
            onClick={() => setStarted(true)}
            className="group relative h-full w-full cursor-pointer"
          >
            <img
              src={`https://i.ytimg.com/vi/${cause.videoId}/sddefault.jpg`}
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
        )}
      </div>
      {player && !nativeControls && <SeekBar player={player} />}
    </div>
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

        <CauseVideo />
      </div>
    </Section>
  )
}
