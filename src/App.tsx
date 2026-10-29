import { Bio } from './components/Bio'
import { Cause } from './components/Cause'
import { Drops } from './components/Drops'
import { Faq } from './components/Faq'
import { FinalCta } from './components/FinalCta'
import { Footer } from './components/Footer'
import { Gallery } from './components/Gallery'
import { GiftCalculator } from './components/GiftCalculator'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { ImpactStats } from './components/ImpactStats'
import { Nav } from './components/Nav'
import { PledgeProvider } from './components/pledge'

export default function App() {
  return (
    <PledgeProvider>
      <a
        href="#main"
        className="sr-only z-50 rounded-full bg-sun px-4 py-2 font-bold focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Nav />
      <main id="main">
        <Hero />
        <ImpactStats />
        <Cause />
        <HowItWorks />
        <Drops />
        <GiftCalculator />
        <Bio />
        <Gallery />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </PledgeProvider>
  )
}
