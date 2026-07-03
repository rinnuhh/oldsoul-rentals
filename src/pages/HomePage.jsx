import HeroSection from '../components/show/HeroSection'
import VehicleTypeSelector from '../components/show/VehicleTypeSelector'
import HowItWorks from '../components/show/HowItWorks'
import FeaturedVehicles from '../components/show/FeaturedVehicles'
import TrustBadges from '../components/show/TrustBadges'

export default function HomePage() {
  return (
    <div className="bg-soul-black">
      <HeroSection />
      <VehicleTypeSelector />
      <HowItWorks />
      <FeaturedVehicles />
      <TrustBadges />
    </div>
  )
}
