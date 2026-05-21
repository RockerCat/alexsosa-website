import { Navigation } from "@/components/Navigation"
import { Hero } from "@/components/Hero"
import { FeaturedWork } from "@/components/FeaturedWork"
import { CareerTimeline } from "@/components/CareerTimeline"
import { HowIBuild } from "@/components/HowIBuild"
import { CurrentExperiments } from "@/components/CurrentExperiments"
import { ContactCTA } from "@/components/ContactCTA"
import { NoiseOverlay } from "@/components/NoiseOverlay"

export default function HomePage() {
  return (
    <>
      <NoiseOverlay />
      <Navigation />
      <main>
        <Hero />
        <FeaturedWork />
        <CareerTimeline />
        <HowIBuild />
        <CurrentExperiments />
        <ContactCTA />
      </main>
    </>
  )
}
