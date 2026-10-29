import type { AnchorHTMLAttributes } from 'react'

type Variant = 'sun' | 'brand' | 'ghost' | 'ghost-dark'

const variants: Record<Variant, string> = {
  sun: 'bg-sun text-ink hover:bg-ramen',
  brand: 'bg-brand text-white hover:bg-brand-dark',
  ghost: 'border-2 border-white text-white hover:bg-white hover:text-brand',
  'ghost-dark': 'border-2 border-ink text-ink hover:bg-ink hover:text-white',
}

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: Variant
  size?: 'md' | 'lg'
}

export function buttonClass(variant: Variant = 'sun', size: 'md' | 'lg' = 'md', className = '') {
  const sizing = size === 'lg' ? 'px-8 py-4 text-lg' : 'px-6 py-3 text-base'
  return `inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-bold transition-colors focus-visible:outline-4 focus-visible:outline-offset-2 focus-visible:outline-sun ${sizing} ${variants[variant]} ${className}`
}

export function Button({ variant = 'sun', size = 'md', className = '', ...props }: ButtonProps) {
  return <a className={buttonClass(variant, size, className)} {...props} />
}
