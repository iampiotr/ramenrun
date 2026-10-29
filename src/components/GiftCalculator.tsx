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

type PledgeStatus = 'idle' | 'sending' | 'sent' | 'error'

type PledgeResponse = {
  ok?: boolean
  error?: { message?: string }
}

async function sendPledgeEmail(email: string, amount: number, packets: number) {
  const response = await fetch(`https://sendm8.com/f/${encodeURIComponent(PLEDGE_EMAIL)}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      _subject: `Donation pledge — $${amount}`,
      _replyto: email,
      email,
      pledge: `$${amount}`,
      packets: String(packets),
      message: `I want to pledge $${amount} (${packets} packs of ramen).\n\nMy email: ${email}`,
    }),
  })
  const result = (await response.json()) as PledgeResponse
  if (!response.ok || !result.ok) {
    throw new Error(result.error?.message || 'Could not send the pledge. Please try again.')
  }
}

export function GiftCalculator() {
  const { open, openPledge } = usePledge()
  const [amount, setAmount] = useState(GIFT_AMOUNTS_USD[1])
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<PledgeStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const emailRef = useRef<HTMLInputElement>(null)
  const packets = Math.floor(amount / COST_PER_PACKET_USD)

  useEffect(() => {
    if (open && status !== 'sent') emailRef.current?.focus()
  }, [open, status])

  async function sendPledge(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const address = email.trim()
    if (!emailRef.current?.checkValidity()) {
      emailRef.current?.reportValidity()
      return
    }
    setStatus('sending')
    setErrorMessage('')
    try {
      await sendPledgeEmail(address, amount, packets)
      setStatus('sent')
    } catch (error) {
      const message = error instanceof Error ? error.message : ''
      setStatus('error')
      setErrorMessage(
        message && !/fetch|network/i.test(message)
          ? message
          : 'Could not send the pledge. Please try again.',
      )
    }
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
            <span className="flex items-baseline justify-center gap-3">
              <span className="font-display text-7xl tracking-wide text-ramen">{packets}</span>
              <span className="font-display text-7xl tracking-wide text-ramen">Packs</span>
            </span>
            <span className="text-lg font-semibold">of ramen for kids</span>
          </p>

          {isDonateLive ? (
            <Button href={donateHref(amount)} variant="sun" size="lg" className="mt-8 w-full">
              <Heart className="size-5" aria-hidden />
              Donate ${amount}
            </Button>
          ) : (
            <>
              <div
                className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                  open ? 'grid-rows-[0fr]' : 'grid-rows-[1fr]'
                }`}
              >
                <div className="overflow-hidden" inert={open}>
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
                </div>
              </div>

              <div
                id="pledge-form"
                className={`grid transition-[grid-template-rows] duration-500 ease-out ${
                  open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden" inert={!open}>
                  {status === 'sent' ? (
                    <p className="pt-8 text-center text-lg font-semibold" role="status">
                      Pledge sent. We'll reply at {email.trim()}.
                    </p>
                  ) : (
                    <form className="space-y-4 pt-8" onSubmit={sendPledge}>
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
                        Pledge: ${amount} · {packets} packs
                      </p>
                      {status === 'error' && (
                        <p className="text-sm font-semibold text-coral" role="alert">
                          {errorMessage}
                        </p>
                      )}
                      <button
                        type="submit"
                        disabled={status === 'sending'}
                        className={buttonClass('brand', 'lg', 'w-full disabled:opacity-60')}
                      >
                        <Send className="size-5" aria-hidden />
                        {status === 'sending' ? 'Sending…' : 'Send pledge'}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Section>
  )
}
