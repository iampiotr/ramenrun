import { Heart, Send } from 'lucide-react'
import { useEffect, useRef, useState, type FormEvent } from 'react'

import { buttonClass, Button } from './Button'
import { Section, SectionHeading } from './Section'
import { usePledge } from './pledge'
import {
  COST_PER_PACKET_USD,
  GIFT_AMOUNTS_USD,
  PLEDGE_EMAIL,
  donateHref,
  isDonateLive,
} from '../config'

function pledgeMailto(email: string, amount: number, packets: number) {
  const subject = `Donation pledge — $${amount}`
  const body = [
    `I want to pledge $${amount} (${packets} packets of ramen).`,
    '',
    `My email: ${email}`,
  ].join('\n')
  return `mailto:${PLEDGE_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

export function GiftCalculator() {
  const { open, openPledge } = usePledge()
  const [amount, setAmount] = useState(GIFT_AMOUNTS_USD[1])
  const [email, setEmail] = useState('')
  const emailRef = useRef<HTMLInputElement>(null)
  const packets = Math.floor(amount / COST_PER_PACKET_USD)

  useEffect(() => {
    if (open) emailRef.current?.focus()
  }, [open])

  function sendPledge(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const address = email.trim()
    if (!emailRef.current?.checkValidity()) {
      emailRef.current?.reportValidity()
      return
    }
    window.location.href = pledgeMailto(address, amount, packets)
  }

  return (
    <Section id="donate">
      <div className="grid items-center gap-12 rounded-card bg-lilac p-8 md:grid-cols-2 md:p-14">
        <SectionHeading
          eyebrow="What your gift buys"
          title={
            <>
              Pick an amount. <span className="text-brand">See the meals.</span>
            </>
          }
          intro={`Ramen costs about ${COST_PER_PACKET_USD * 100}¢ a packet in Siem Reap, so a little goes a long way.`}
        />

        <div className="rounded-card bg-white p-7 shadow-xl shadow-brand/10">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4" role="radiogroup" aria-label="Gift amount">
            {GIFT_AMOUNTS_USD.map((value) => {
              const selected = value === amount
              return (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  onClick={() => setAmount(value)}
                  className={`rounded-full border-2 py-3 text-lg font-bold transition-colors ${
                    selected
                      ? 'border-brand bg-brand text-white'
                      : 'border-ink/15 hover:border-brand hover:text-brand'
                  }`}
                >
                  ${value}
                </button>
              )
            })}
          </div>

          <p className="mt-8 text-center" aria-live="polite">
            <span className="block font-display text-7xl tracking-wide text-ramen">{packets}</span>
            <span className="text-lg font-semibold">packets of ramen for kids in Cambodia</span>
          </p>

          {isDonateLive ? (
            <Button href={donateHref(amount)} variant="sun" size="lg" className="mt-8 w-full">
              <Heart className="size-5" aria-hidden />
              Donate ${amount}
            </Button>
          ) : (
            <button
              type="button"
              className={buttonClass('sun', 'lg', 'mt-8 w-full')}
              aria-expanded={open}
              aria-controls="pledge-form"
              onClick={openPledge}
            >
              <Heart className="size-5" aria-hidden />
              Donate ${amount}
            </button>
          )}

          {!isDonateLive && (
            <div
              className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden" inert={!open}>
                <form id="pledge-form" className="space-y-4 pt-6" onSubmit={sendPledge}>
                  <p className="text-sm text-ink/70">
                    To <span className="font-semibold text-ink">{PLEDGE_EMAIL}</span>
                  </p>
                  <div>
                    <label htmlFor="pledge-email" className="mb-2 block text-sm font-semibold">
                      Your email
                    </label>
                    <input
                      ref={emailRef}
                      id="pledge-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-full border-2 border-ink/15 px-5 py-3 outline-none focus:border-brand"
                    />
                  </div>
                  <p className="text-sm font-semibold">
                    Pledge: ${amount} · {packets} packets
                  </p>
                  <button type="submit" className={buttonClass('brand', 'lg', 'w-full')}>
                    <Send className="size-5" aria-hidden />
                    Send pledge
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}
