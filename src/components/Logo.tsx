import { RamenCartIcon } from './RamenCartIcon'
import { site } from '../content'

type LogoProps = {
  size?: 'md' | 'lg'
}

export function Logo({ size = 'md' }: LogoProps) {
  const lg = size === 'lg'
  return (
    <span className="flex items-center gap-2.5">
      <RamenCartIcon className={`${lg ? 'size-11' : 'size-10'} shrink-0 text-sun`} aria-hidden />
      <span
        className={`font-display tracking-wide whitespace-nowrap uppercase ${lg ? 'text-3xl' : 'text-2xl'}`}
      >
        {site.brand}
      </span>
    </span>
  )
}
