import { useState } from 'react'
import { Search, SlidersHorizontal, Fuel, Users, Star } from 'lucide-react'
import { normalVehicles, vehicleTypes } from '../../data/vehicles'
import BookingModal from '../layout/BookingModal'

const fuelBadge = {
  'Electric': { bg: '#DCFCE7', text: '#15803D' },
  'Hybrid':   { bg: '#CCFBF1', text: '#0F766E' },
  'Petrol':   { bg: '#FFEDD5', text: '#C2410C' },
  'Diesel':   { bg: '#DBEAFE', text: '#1D4ED8' },
}

function RentalCard({ vehicle, onBook }) {
  const fb = fuelBadge[vehicle.fuel] || { bg: '#F1F5F9', text: '#475569' }
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#FFFFFF',
        borderRadius: '6px',
        border: '1px solid #E2E8F0',
        overflow: 'hidden',
        boxShadow: hovered ? '0 12px 24px -8px rgba(0,0,0,0.06)' : 'none',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Photo */}
      <div style={{ position: 'relative', height: '170px', overflow: 'hidden', background: '#F8FAFC' }}>
        <img
          src={vehicle.image}
          alt={vehicle.name}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transform: hovered ? 'scale(1.04)' : 'scale(1)',
            transition: 'transform 0.5s ease',
          }}
        />
        {/* Available indicator */}
        <span style={{
          position: 'absolute', top: '12px', right: '12px',
          fontFamily: 'Inter, sans-serif', fontSize: '0.62rem',
          fontWeight: 700, letterSpacing: '0.04em',
          padding: '3px 8px', borderRadius: '3px',
          background: vehicle.available ? '#DCFCE7' : '#FEE2E2',
          color: vehicle.available ? '#16A34A' : '#EF4444',
          border: vehicle.available ? '1px solid #BBF7D0' : '1px solid #FCA5A5',
        }}>
          {vehicle.available ? '● Ready' : '● Booked'}
        </span>
        {/* Category Badge */}
        <span style={{
          position: 'absolute', top: '12px', left: '12px',
          fontFamily: 'Inter, sans-serif', fontSize: '0.58rem',
          fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
          padding: '3px 8px', borderRadius: '3px',
          background: '#0F172A', color: '#FFFFFF',
        }}>
          {vehicle.type}
        </span>
      </div>

      {/* Details */}
      <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.9rem', fontWeight: 700,
            color: hovered ? '#2563EB' : '#0F172A',
            transition: 'color 0.2s',
            margin: '0 0 10px 0',
          }}>
            {vehicle.name}
          </h3>

          {/* Attributes */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '4px',
              fontFamily: 'Inter, sans-serif', fontSize: '0.65rem',
              color: '#64748B', background: '#F8FAFC',
              border: '1px solid #E2E8F0', padding: '2px 6px', borderRadius: '4px',
            }}>
              <Users size={10} /> {vehicle.seats} seats
            </span>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: '4px',
              fontFamily: 'Inter, sans-serif', fontSize: '0.65rem',
              fontWeight: 600,
              color: fb.text, background: fb.bg,
              padding: '2px 6px', borderRadius: '4px',
            }}>
              <Fuel size={9} /> {vehicle.fuel}
            </span>
            <span style={{
              fontFamily: 'Inter, sans-serif', fontSize: '0.65rem',
              color: '#64748B', background: '#F8FAFC',
              border: '1px solid #E2E8F0', padding: '2px 6px', borderRadius: '4px',
            }}>
              {vehicle.transmission}
            </span>
          </div>

          {/* Feature Tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '16px' }}>
            {vehicle.features.slice(0, 3).map(f => (
              <span key={f} style={{
                fontFamily: 'Inter, sans-serif', fontSize: '0.6rem',
                color: '#64748B', border: '1px solid #E2E8F0',
                padding: '2px 6px', borderRadius: '3px',
              }}>
                {f}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing & Button */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          borderTop: '1px solid #E2E8F0', paddingTop: '14px', marginTop: '12px',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '1.05rem', fontWeight: 800, color: '#0F172A' }}>
                ₹{vehicle.pricePerDay.toLocaleString()}
              </span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', color: '#64748B' }}>/day</span>
            </div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.58rem', color: '#64748B', margin: '2px 0 0 0' }}>
              ₹{vehicle.priceKm} /km extra
            </p>
          </div>

          <button
            onClick={() => onBook(vehicle)}
            disabled={!vehicle.available}
            style={{
              fontFamily: 'Inter, sans-serif', fontSize: '0.72rem',
              fontWeight: 700, padding: '8px 16px', borderRadius: '4px',
              border: 'none', cursor: vehicle.available ? 'pointer' : 'not-allowed',
              background: vehicle.available ? '#2563EB' : '#F1F5F9',
              color: vehicle.available ? '#FFFFFF' : '#94A3B8',
              transition: 'background 0.2s',
            }}
            className="rental-card-btn"
          >
            {vehicle.available ? 'Book Car' : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function RentalGrid() {
  const [search, setSearch] = useState('')
  const [activeType, setActiveType] = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('price-asc')
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  const handleBook = (vehicle) => {
    setSelectedVehicle(vehicle)
    setIsBookingOpen(true)
  }

  const filtered = normalVehicles
    .filter(v => {
      const matchSearch = v.name.toLowerCase().includes(search.toLowerCase())
      const matchType   = activeType === 'all' || v.type === activeType
      return matchSearch && matchType
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc')  return a.pricePerDay - b.pricePerDay
      if (sortBy === 'price-desc') return b.pricePerDay - a.pricePerDay
      return 0
    })

  return (
    <div style={{ background: '#F8FAFC', paddingBottom: '72px' }}>
      
      {/* Search & Sort Panel */}
      <div style={{ background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', sticky: 'top', zIndex: 20 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '20px 40px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
            
            {/* Search Input */}
            <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
              <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#64748B' }} />
              <input
                id="rental-search-input"
                type="text"
                placeholder="Search rentals (e.g. Swift, Fortuner...)"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  width: '100%', padding: '10px 12px 10px 36px',
                  border: '1px solid #E2E8F0', borderRadius: '4px',
                  fontFamily: 'Inter, sans-serif', fontSize: '0.8rem',
                  color: '#0F172A', outline: 'none',
                }}
                className="input-focus"
              />
            </div>

            {/* Sort Dropdown */}
            <select
              id="rental-sort-select"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              style={{
                padding: '10px 16px', border: '1px solid #E2E8F0', borderRadius: '4px',
                fontFamily: 'Inter, sans-serif', fontSize: '0.8rem',
                color: '#475569', background: '#FFFFFF', cursor: 'pointer', outline: 'none',
              }}
              className="input-focus"
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>

            {/* Filter Toggle */}
            <button
              id="rental-filter-btn"
              onClick={() => setShowFilters(!showFilters)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '10px 16px', borderRadius: '4px',
                border: '1px solid #E2E8F0', cursor: 'pointer',
                background: showFilters ? '#EFF6FF' : '#FFFFFF',
                color: showFilters ? '#2563EB' : '#475569',
                fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 600,
              }}
            >
              <SlidersHorizontal size={14} /> Filters
            </button>
          </div>

          {/* Filter Sub-panel */}
          {showFilters && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #E2E8F0' }}>
              {vehicleTypes.map(({ key, label }) => {
                const isActive = activeType === key
                return (
                  <button
                    key={key}
                    id={`rental-type-${key}`}
                    onClick={() => setActiveType(key)}
                    style={{
                      fontFamily: 'Inter, sans-serif', fontSize: '0.72rem',
                      fontWeight: 600, padding: '6px 14px', borderRadius: '3px',
                      cursor: 'pointer',
                      background: isActive ? '#0F172A' : '#FFFFFF',
                      color: isActive ? '#FFFFFF' : '#64748B',
                      border: isActive ? '1px solid #0F172A' : '1px solid #E2E8F0',
                      transition: 'all 0.2s',
                    }}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Grid Content */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 40px' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: '#64748B', marginBottom: '20px' }}>
          Showing <strong style={{ color: '#0F172A' }}>{filtered.length}</strong> matching vehicles
        </p>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '64px 0' }}>
            <p style={{ fontSize: '1.8rem', margin: '0 0 10px 0' }}>🔍</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.88rem', color: '#64748B' }}>No vehicles match your current search.</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '24px',
          }}>
            {filtered.map(v => <RentalCard key={v.id} vehicle={v} onBook={handleBook} />)}
          </div>
        )}
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        vehicle={selectedVehicle}
        mode="normal"
      />

      <style>{`
        .input-focus:focus {
          border-color: #2563EB !important;
        }
        .rental-card-btn:hover {
          background-color: #1D4ED8 !important;
        }
      `}</style>

    </div>
  )
}
