import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import HomePage from './pages/HomePage'
import BrowseVehicles from './pages/BrowseVehicles'
import NormalRentals from './pages/NormalRentals'
import HowItWorksPage from './pages/HowItWorksPage'
import ListVehicle from './pages/ListVehicle'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import LoginPage from './pages/LoginPage'
import AdminPanel from './pages/AdminPanel'

export default function App() {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin/*" element={<AdminPanel />} />
      </Routes>
    )
  }

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
          <Route path="/login"          element={<LoginPage />} />
          <Route path="/admin"          element={<AdminPanel />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
