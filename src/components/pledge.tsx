import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

type PledgeContextValue = {
  open: boolean
  openPledge: () => void
}

const PledgeContext = createContext<PledgeContextValue | null>(null)

export function PledgeProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function onHash() {
      if (window.location.hash === '#donate') setOpen(true)
    }
    onHash()
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  function openPledge() {
    setOpen(true)
    document.getElementById('donate')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return <PledgeContext.Provider value={{ open, openPledge }}>{children}</PledgeContext.Provider>
}

export function usePledge() {
  const value = useContext(PledgeContext)
  if (!value) throw new Error('usePledge must be used within PledgeProvider')
  return value
}
