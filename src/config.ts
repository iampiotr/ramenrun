// Replace with your GoFundMe, PayPal, or Stripe Payment Link when ready.
// While it starts with '#', donate buttons scroll to the on-page "coming soon" note.
export const DONATE_URL = '#donate'

export const isDonateLive = !DONATE_URL.startsWith('#')

export const COST_PER_PACKET_USD = 0.5

export const GIFT_AMOUNTS_USD = [10, 25, 50, 100]

export const IMPACT = {
  packetsDelivered: 2400,
  villagesReached: 6,
  kidsFed: 800,
  campaignYear: 2026,
}

export const CONTACT_EMAIL = 'team@ramenrun.org'

export const PLEDGE_EMAIL = 'pledge@ramenrun.org'

export const SOCIAL_LINKS = [{ label: 'YouTube', href: 'https://youtube.com/' }]

export function donateHref(amountUsd?: number) {
  if (!isDonateLive || amountUsd === undefined) return DONATE_URL
  const url = new URL(DONATE_URL)
  url.searchParams.set('amount', String(amountUsd))
  return url.toString()
}
