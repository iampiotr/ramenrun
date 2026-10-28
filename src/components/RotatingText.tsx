import { useEffect, useState } from 'react'

type RotatingTextProps = {
  // Wrap a word in *asterisks* to emphasize it; that phrase also stays on screen longer.
  phrases: string[]
  intervalMs?: number
  emphasisMs?: number
  className?: string
}

const plain = (phrase: string) => phrase.replaceAll('*', '')
const isEmphasized = (phrase: string) => phrase.includes('*')

function Phrase({ text, active }: { text: string; active: boolean }) {
  return text.split(/(\*[^*]+\*)/).map((part, i) => {
    if (!part.startsWith('*')) return part
    return (
      <span key={i} className="relative inline-block">
        <span
          key={String(active)}
          className={`inline-block origin-bottom-left ${active ? 'animate-pop motion-reduce:animate-none' : ''}`}
        >
          <span className={active ? 'animate-glow motion-reduce:animate-none' : ''}>
            {part.slice(1, -1)}
          </span>
        </span>
        <span
          className={`absolute inset-x-0 -bottom-1 h-2 origin-left rounded-full bg-[#ff2d2d] ${
            active
              ? 'animate-underline motion-reduce:animate-none motion-reduce:scale-x-100'
              : 'scale-x-0'
          }`}
        />
      </span>
    )
  })
}

export function RotatingText({
  phrases,
  intervalMs = 2800,
  emphasisMs = 5500,
  className = '',
}: RotatingTextProps) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const hold = isEmphasized(phrases[index]) ? emphasisMs : intervalMs
    const id = setTimeout(() => setIndex((i) => (i + 1) % phrases.length), hold)
    return () => clearTimeout(id)
  }, [index, phrases, intervalMs, emphasisMs])

  return (
    <span className={`grid ${className}`}>
      <span className="sr-only">{phrases.map(plain).join(' ')}</span>
      {phrases.map((phrase, i) => {
        const state =
          i === index
            ? 'translate-y-0 opacity-100'
            : i === (index - 1 + phrases.length) % phrases.length
              ? '-translate-y-6 opacity-0'
              : 'translate-y-6 opacity-0'
        return (
          <span
            key={phrase}
            aria-hidden
            className={`col-start-1 row-start-1 transition-all duration-700 ease-out motion-reduce:transition-none ${state}`}
          >
            <Phrase text={phrase} active={i === index} />
          </span>
        )
      })}
    </span>
  )
}
