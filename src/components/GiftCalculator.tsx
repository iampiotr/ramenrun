import { Heart, Info } from 'lucide-react'
import { useState } from 'react'

import { Button } from './Button'
import { Section, SectionHeading } from './Section'
import { COST_PER_PACKET_USD, GIFT_AMOUNTS_USD, donateHref, isDonateLive } from '../config'

export function GiftCalculator() {
  const [amount, setAmount] = useState(GIFT_AMOUNTS_USD[1])
  const packets = Math.floor(amount / COST_PER_PACKET_USD)

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

          <Button href={donateHref(amount)} variant="sun" size="lg" className="mt-8 w-full">
            <Heart className="size-5" aria-hidden />
            Donate ${amount}
          </Button>

          {!isDonateLive && (
            <p className="mt-4 flex items-start gap-2 rounded-xl bg-sky-light p-3 text-sm text-ink/70">
              <Info className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden />
              Online donations are coming soon. In the meantime, reach out by email to give.
            </p>
          )}
        </div>
      </div>
    </Section>
  )
}
