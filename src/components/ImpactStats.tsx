import { IMPACT } from '../config'

const stats = [
  { value: IMPACT.packetsDelivered.toLocaleString(), label: 'Ramen packets delivered' },
  { value: IMPACT.villagesReached.toString(), label: 'Villages reached' },
  { value: `${IMPACT.kidsFed.toLocaleString()}+`, label: 'Kids fed' },
]

export function ImpactStats() {
  return (
    <section id="impact" className="px-5 py-16 md:py-20">
      <div className="mx-auto max-w-6xl rounded-card bg-sky px-6 py-12 md:px-12">
        <p className="mb-8 text-center text-sm font-bold tracking-[0.2em] text-brand uppercase">
          Our impact since {IMPACT.campaignYear}
        </p>
        <dl className="grid gap-10 text-center sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse">
              <dt className="mt-2 text-lg font-semibold">{s.label}</dt>
              <dd className="font-display text-6xl tracking-wide text-brand md:text-7xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
