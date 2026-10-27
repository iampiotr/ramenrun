import type { ReactNode } from 'react'

type SectionProps = {
  id?: string
  className?: string
  children: ReactNode
}

export function Section({ id, className = '', children }: SectionProps) {
  return (
    <section id={id} className={`px-5 py-20 md:py-28 ${className}`}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  )
}

type SectionHeadingProps = {
  eyebrow?: string
  title: ReactNode
  intro?: ReactNode
  align?: 'left' | 'center'
  tone?: 'dark' | 'light'
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'left',
  tone = 'dark',
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'mx-auto text-center' : ''
  const eyebrowColor = tone === 'light' ? 'text-sun' : 'text-brand'
  const introColor = tone === 'light' ? 'text-white/85' : 'text-ink/75'
  return (
    <div className={`mb-12 max-w-3xl ${alignment}`}>
      {eyebrow && (
        <p className={`mb-3 text-sm font-bold tracking-[0.2em] uppercase ${eyebrowColor}`}>
          {eyebrow}
        </p>
      )}
      <h2 className="text-4xl leading-none md:text-6xl">{title}</h2>
      {intro && <p className={`mt-5 text-lg md:text-xl ${introColor}`}>{intro}</p>}
    </div>
  )
}
