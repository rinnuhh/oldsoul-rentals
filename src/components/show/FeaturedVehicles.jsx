import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Star, ChevronRight, ChevronLeft, BadgeCheck } from 'lucide-react'
import { showVehicles, categoryFilters } from '../../data/vehicles'
import BookingModal from '../layout/BookingModal'

/* ── Vehicle Card ─────────────────────────────────────── */
function VehicleCard({ vehicle, onBook }) {
  const categoryColors = {
    'vintage-car':  'bg-amber-900/40 text-amber-300/90 border-amber-700/30',
    'vintage-bike': 'bg-orange-900/40 text-orange-300/90 border-orange-700/30',
    'modern-car':   'bg-blue-900/40 text-blue-300/90 border-blue-700/30',
    'modified-car': 'bg-purple-900/40 text-purple-300/90 border-purple-700/30',
  }

  return (
    <div
      className="vehicle-card bg-soul-card border border-soul-border overflow-hidden card-hover group flex-shrink-0"
      style={{ borderRadius: '6px', width: '280px', minWidth: '280px' }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: '172px' }}>
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-[1.04]"
        />
        {/* Subtle bottom gradient */}
        <div
          className="absolute inset-x-0 bottom-0"
          style={{
            height: '60px',
            background: 'linear-gradient(to top, rgba(24,24,24,0.85) 0%, transparent 100%)',
          }}
        />
        {/* Category badge */}
        <span
          className={`absolute top-3 left-3 border ${categoryColors[vehicle.category] || 'bg-soul-smoke/60 text-soul-cream border-soul-border'}`}
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '0.62rem',
            fontWeight: 600,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            padding: '3px 8px',
            borderRadius: '3px',
            backdropFilter: 'blur(6px)',
          }}
        >
          {vehicle.categoryLabel}
        </span>
        {/* Verified */}
        {vehicle.verified && (
          <span
            className="absolute top-3 right-3 flex items-center justify-center"
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '50%',
              background: 'rgba(10,10,10,0.65)',
              backdropFilter: 'blur(4px)',
            }}
          >
            <BadgeCheck size={14} className="text-soul-gold" />
          </span>
        )}
      </div>

      {/* Body */}
      <div className="p-4">
        {/* Title row */}
        <div className="flex items-start justify-between mb-2">
          <div className="pr-2">
            <h3
              className="text-soul-cream group-hover:text-soul-gold transition-colors duration-200 leading-snug"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '0.95rem',
                fontWeight: 600,
              }}
            >
              {vehicle.name}
            </h3>
            <p
              className="text-soul-muted mt-0.5"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '0.72rem',
                letterSpacing: '0.04em',
              }}
            >
              {vehicle.year}
            </p>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0 pt-0.5">
            <Star size={11} className="text-soul-gold fill-soul-gold" />
            <span
              className="text-soul-muted"
              style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.72rem' }}
            >
              {vehicle.rating}
            </span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 mb-4">
          <MapPin size={11} className="text-soul-muted flex-shrink-0" />
          <span
            className="text-soul-muted"
            style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.72rem' }}
          >
            {vehicle.location}
          </span>
        </div>

        {/* Footer */}
        <div
          className="flex items-center justify-between pt-3"
          style={{ borderTop: '1px solid rgba(42,42,42,0.8)' }}
        >
          <div>
            <span
              className="text-soul-gold font-bold"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '1.05rem',
              }}
            >
              ₹{vehicle.pricePerDay.toLocaleString()}
            </span>
            <span
              className="text-soul-muted ml-1"
              style={{ fontFamily: 'Inter, system-ui, sans-serif', fontSize: '0.7rem' }}
            >
              / day
            </span>
          </div>
          <button
            onClick={() => onBook(vehicle)}
            className="text-soul-gold border border-soul-gold/35 hover:bg-soul-gold hover:text-soul-black transition-all duration-200"
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              padding: '6px 14px',
              borderRadius: '3px',
              textTransform: 'uppercase',
            }}
          >
            Book
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Featured Vehicles ────────────────────────────────── */
export default function FeaturedVehicles() {
  const [activeFilter, setActiveFilter] = useState('all')
  const scrollRef = useRef(null)
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  const handleBook = (vehicle) => {
    setSelectedVehicle(vehicle)
    setIsBookingOpen(true)
  }

  const filtered = activeFilter === 'all'
    ? showVehicles
    : showVehicles.filter(v => v.category === activeFilter)

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -304 : 304, behavior: 'smooth' })
    }
  }

  return (
    <section id="featured-vehicles" className="bg-soul-black py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">
          <div>
            <p className="section-label mb-3">Our Collection</p>
            <h2
              className="font-serif text-soul-cream"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(1.7rem, 3.5vw, 2.5rem)',
                fontWeight: 700,
                lineHeight: 1.15,
              }}
            >
              Featured{' '}
              <span className="text-gold-gradient italic">Vehicles</span>
            </h2>
          </div>
          <Link
            to="/browse"
            id="view-all-vehicles-btn"
            className="btn-ghost-gold self-start sm:self-auto"
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '0.78rem',
              letterSpacing: '0.08em',
              padding: '8px 20px',
            }}
          >
            View All Vehicles
          </Link>
        </div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categoryFilters.map(({ key, label }) => (
            <button
              key={key}
              id={`filter-${key}`}
              onClick={() => setActiveFilter(key)}
              className={`border transition-all duration-200 ${
                activeFilter === key
                  ? 'bg-soul-gold text-soul-black border-soul-gold'
                  : 'border-soul-border text-soul-muted hover:border-soul-muted hover:text-soul-cream'
              }`}
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '0.68rem',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                padding: '7px 16px',
                borderRadius: '3px',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Cards — horizontal scroll on mobile, grid on desktop */}
        <div className="relative">
          {/* Scroll arrows (mobile/tablet) */}
          <button
            onClick={() => scroll('left')}
            className="lg:hidden absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10
                       w-8 h-8 bg-soul-dark border border-soul-border rounded-full flex items-center justify-center
                       text-soul-muted hover:text-soul-gold hover:border-soul-gold transition-all"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="lg:hidden absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10
                       w-8 h-8 bg-soul-dark border border-soul-border rounded-full flex items-center justify-center
                       text-soul-muted hover:text-soul-gold hover:border-soul-gold transition-all"
          >
            <ChevronRight size={16} />
          </button>

          {/* Card container */}
          <div
            ref={scrollRef}
            className="flex lg:grid lg:grid-cols-4 gap-5 overflow-x-auto lg:overflow-visible
                       pb-4 lg:pb-0 scrollbar-hide scroll-smooth"
          >
            {filtered.map(vehicle => (
              <div
                key={vehicle.id}
                className="lg:w-auto"
                style={{ flexShrink: 0 }}
              >
                <VehicleCard vehicle={vehicle} onBook={handleBook} />
              </div>
            ))}
          </div>

          {/* Desktop cards fill naturally — override mobile fixed width */}
          <style>{`
            @media (min-width: 1024px) {
              .vehicle-card { width: 100% !important; min-width: unset !important; }
            }
          `}</style>
        </div>
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        vehicle={selectedVehicle}
        mode="show"
      />
    </section>
  )
}
