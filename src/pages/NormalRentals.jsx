import { Link } from 'react-router-dom'
import { ArrowRight, Car, Shield, Clock, MapPin } from 'lucide-react'
import RentalGrid from '../components/normal/RentalGrid'

const highlights = [
  { Icon: Car,    label: 'Wide Selection',    desc: 'Cars, Bikes, SUVs & Vans' },
  { Icon: Shield, label: 'Insured Vehicles',  desc: 'Drive with full peace of mind' },
  { Icon: Clock,  label: 'Flexible Booking',  desc: 'Hourly, daily, or weekly plans' },
  { Icon: MapPin, label: 'City-wide Coverage',desc: 'Available across major cities' },
]

export default function NormalRentals() {
  return (
    <div className="bg-rental-bg min-h-screen">

      {/* Hero */}
      <section className="bg-white border-b border-rental-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left copy */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-semibold tracking-widest text-rental-muted uppercase">
                  Vehicles Available Now
                </span>
              </div>
              <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-rental-text leading-tight mb-4">
                Rent Any Vehicle,
                <br />
                <span className="text-rental-blue">Anytime. Anywhere.</span>
              </h1>
              <p className="text-rental-muted text-base leading-relaxed mb-8 max-w-lg">
                From daily commutes to weekend getaways — find the perfect vehicle
                with transparent pricing, instant confirmation, and zero hassle.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#vehicle-listings" className="btn-primary-rental text-sm flex items-center justify-center gap-2">
                  Browse Vehicles <ArrowRight size={15} />
                </a>
                <Link to="/" className="border border-rental-border text-rental-muted text-sm font-medium
                                         px-5 py-3 rounded-lg hover:border-rental-navy hover:text-rental-navy
                                         transition-colors text-center">
                  ← Show Rentals
                </Link>
              </div>
            </div>

            {/* Right image */}
            <div className="relative rounded-2xl overflow-hidden h-64 lg:h-80 shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1000&q=80"
                alt="Vehicle rental fleet"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-rental-navy/30 to-transparent" />
              {/* Floating stat card */}
              <div className="absolute bottom-4 left-4 bg-white rounded-xl px-4 py-3 shadow-md flex items-center gap-3">
                <div className="w-10 h-10 bg-rental-blue-light rounded-lg flex items-center justify-center">
                  <Car size={18} className="text-rental-blue" />
                </div>
                <div>
                  <p className="font-bold text-rental-text text-sm">250+ Vehicles</p>
                  <p className="text-rental-muted text-xs">Ready to book</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Highlights strip */}
        <div className="border-t border-rental-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {highlights.map(({ Icon, label, desc }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-rental-blue-light rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-rental-blue" />
                  </div>
                  <div>
                    <p className="text-rental-text text-xs font-semibold">{label}</p>
                    <p className="text-rental-muted text-[11px]">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vehicle grid */}
      <section id="vehicle-listings">
        <RentalGrid />
      </section>
    </div>
  )
}
