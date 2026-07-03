import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import BrowseVehicles from './pages/BrowseVehicles'
import NormalRentals from './pages/NormalRentals'
import HowItWorksPage from './pages/HowItWorksPage'
import ListVehicle from './pages/ListVehicle'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/"               element={<HomePage />} />
          <Route path="/browse"         element={<BrowseVehicles />} />
          <Route path="/normal-rentals" element={<NormalRentals />} />
          <Route path="/how-it-works"   element={<HowItWorksPage />} />
          <Route path="/list-vehicle"   element={<ListVehicle />} />
          <Route path="/about"          element={<AboutPage />} />
          <Route path="/contact"        element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
