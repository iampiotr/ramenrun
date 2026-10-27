import type { SVGProps } from 'react'

export function RamenCartIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M8 6.5c-.8-.9.8-1.6 0-2.5" />
      <path d="M12 6.5c-.8-.9.8-1.6 0-2.5" />
      <path d="M19 9.5 21.5 3" />
      <path d="M3 9.5h18a9 6.5 0 0 1-18 0Z" />
      <circle cx="8" cy="20.5" r="1.8" />
      <circle cx="16" cy="20.5" r="1.8" />
    </svg>
  )
}
