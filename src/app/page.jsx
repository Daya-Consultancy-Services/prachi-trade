import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import HeroSection from "@/components/sections/hero-section"
import MissionSection from "@/components/sections/mission-section"
import BrandSection from "@/components/sections/brand-section"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <MissionSection/>
        <BrandSection/>
      </main>
      <Footer />
    </div>
  )
}
