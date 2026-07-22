import { useState, useEffect } from 'react'
import { Search, MapPin, Star, BadgeCheck, SlidersHorizontal, ChevronDown, ChevronUp, X } from 'lucide-react'
import { categoryFilters } from '../data/vehicles'
import { getShowVehicles } from '../services/vehicleService'
import BookingModal from '../components/layout/BookingModal'

const C = { maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }

const badgeStyle = {
  'vintage-car':  { bg: 'rgba(20,14,0,0.82)',  color: '#C9A84C', border: '1px solid rgba(201,168,76,0.4)' },
  'vintage-bike': { bg: 'rgba(20,14,0,0.82)',  color: '#C9A84C', border: '1px solid rgba(201,168,76,0.4)' },
  'modern-car':   { bg: 'rgba(8,18,38,0.82)',  color: '#93C5FD', border: '1px solid rgba(147,197,253,0.35)' },
  'modified-car': { bg: 'rgba(22,8,38,0.82)',  color: '#C084FC', border: '1px solid rgba(192,132,252,0.4)' },
}

function VehicleCard({ vehicle, onBook }) {
  const bs = badgeStyle[vehicle.category] || badgeStyle['vintage-car']
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#111111',
        border: '1px solid #2A2A2A',
        borderRadius: '6px',
        overflow: 'hidden',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        boxShadow: hovered ? '0 16px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.08)' : 'none',
        transition: 'transform 0.28s ease, box-shadow 0.28s ease',
        display: 'flex', flexDirection: 'column',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: '185px', overflow: 'hidden' }}>
        <img
          src={vehicle.image}
          alt={vehicle.name}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.55s ease',
          }}
        />
        <div style={{ position: 'absolute', inset: 'auto 0 0 0', height: '60px', background: 'linear-gradient(to top, rgba(17,17,17,0.9) 0%, transparent 100%)' }} />
        
        {/* Category badge */}
        <span style={{
          position: 'absolute', top: '12px', left: '12px',
          fontFamily: 'Inter, sans-serif', fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase',
          padding: '3px 8px', borderRadius: '3px', backdropFilter: 'blur(8px)',
          background: bs.bg, color: bs.color, border: bs.border,
        }}>
          {vehicle.categoryLabel}
        </span>

        {/* Verified check */}
        {vehicle.verified && (
          <div style={{
            position: 'absolute', top: '10px', right: '10px',
            width: '26px', height: '26px', borderRadius: '50%',
            background: 'rgba(10,10,10,0.7)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <BadgeCheck size={14} style={{ color: '#C9A84C' }} />
          </div>
        )}

        {/* Rating overlay */}
        <div style={{
          position: 'absolute', bottom: '10px', right: '10px',
          display: 'flex', alignItems: 'center', gap: '3px',
          background: 'rgba(10,10,10,0.7)', backdropFilter: 'blur(4px)',
          padding: '3px 7px', borderRadius: '3px',
        }}>
          <Star size={10} style={{ color: '#C9A84C', fill: '#C9A84C' }} />
          <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.67rem', fontWeight: 700, color: '#F5EDD6' }}>{vehicle.rating}</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ padding: '16px 18px 18px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: '0.97rem', fontWeight: 600, lineHeight: 1.3,
            color: hovered ? '#C9A84C' : '#F5EDD6',
            transition: 'color 0.2s',
            marginBottom: '4px',
          }}>
            {vehicle.name}
          </h3>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', color: '#8A7A5F', marginBottom: '10px' }}>
            {vehicle.year}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '16px' }}>
            <MapPin size={11} style={{ color: '#8A7A5F', flexShrink: 0 }} />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.7rem', color: '#8A7A5F', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {vehicle.location}
            </span>
          </div>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1px solid #1E1E1E' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
            <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.05rem', fontWeight: 700, color: '#C9A84C' }}>
              ₹{vehicle.pricePerDay.toLocaleString()}
            </span>
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', color: '#8A7A5F' }}>/day</span>
          </div>
          <button
            onClick={() => onBook(vehicle)}
            style={{
              fontFamily: 'Inter, sans-serif', fontSize: '0.67rem', fontWeight: 700,
              letterSpacing: '0.06em',
              padding: '7px 14px', borderRadius: '3px',
              border: '1px solid rgba(201,168,76,0.4)',
              background: hovered ? '#C9A84C' : 'transparent',
              color: hovered ? '#0A0A0A' : '#C9A84C',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            Book for Show
          </button>
        </div>
      </div>
    </div>
  )
}

export default function BrowseVehicles() {
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  useEffect(() => {
    getShowVehicles()
      .then(data => {
        setVehicles(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleBook = (vehicle) => { setSelectedVehicle(vehicle); setIsBookingOpen(true) }

  const filtered = vehicles
    .filter(v => {
      const ms = v.name.toLowerCase().includes(search.toLowerCase()) || v.location.toLowerCase().includes(search.toLowerCase())
      const mc = activeFilter === 'all' || v.category === activeFilter
      return ms && mc
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc')  return a.pricePerDay - b.pricePerDay
      if (sortBy === 'price-desc') return b.pricePerDay - a.pricePerDay
      if (sortBy === 'rating')     return b.rating - a.rating
      return 0
    })

  const clearFilters = () => { setSearch(''); setActiveFilter('all') }

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', paddingTop: '96px', color: '#F5EDD6' }}>

      {/* ── Hero Header ── */}
      <div style={{ background: '#111111', borderBottom: '1px solid #2A2A2A', padding: '56px 0 40px' }}>
        <div style={C}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '10px' }}>
            Our Collection
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#F5EDD6', marginBottom: '10px', lineHeight: 1.15 }}>
            Browse{' '}
            <span style={{ background: 'linear-gradient(135deg,#C9A84C,#E8C96A,#C9A84C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontStyle: 'italic' }}>
              Vehicles
            </span>
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#8A7A5F', maxWidth: '520px', lineHeight: 1.65 }}>
            Discover rare vintage classics and awe-inspiring modern builds available for your next show, exhibition, or event.
          </p>
        </div>
      </div>

      {/* ── Sticky Filter Bar ── */}
      <div style={{ background: '#111111', borderBottom: '1px solid #2A2A2A', position: 'sticky', top: '76px', zIndex: 30 }}>
        <div style={C}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'center', padding: '16px 0' }}>
            
            {/* Search */}
            <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
              <Search size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#8A7A5F' }} />
              <input
                id="browse-search-input"
                type="text"
                placeholder="Search by name or city..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  width: '100%', background: '#0A0A0A', border: '1px solid #2A2A2A', borderRadius: '4px',
                  padding: '9px 12px 9px 36px',
                  fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: '#F5EDD6', outline: 'none',
                }}
                className="browse-focus"
              />
              {search && (
                <button onClick={() => setSearch('')} style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#8A7A5F', display: 'flex' }}>
                  <X size={13} />
                </button>
              )}
            </div>

            {/* Sort */}
            <select
              id="browse-sort-select"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              style={{ background: '#0A0A0A', border: '1px solid #2A2A2A', borderRadius: '4px', padding: '9px 14px', fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', color: '#F5EDD6', cursor: 'pointer', outline: 'none' }}
              className="browse-focus"
            >
              <option value="featured" style={{ background: '#111' }}>Featured</option>
              <option value="price-asc" style={{ background: '#111' }}>Price: Low to High</option>
              <option value="price-desc" style={{ background: '#111' }}>Price: High to Low</option>
              <option value="rating" style={{ background: '#111' }}>Highest Rated</option>
            </select>

            {/* Filters toggle */}
            <button
              id="browse-filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '7px',
                background: showFilters ? 'rgba(201,168,76,0.08)' : 'transparent',
                border: showFilters ? '1px solid rgba(201,168,76,0.4)' : '1px solid #2A2A2A',
                borderRadius: '4px', padding: '9px 16px', cursor: 'pointer',
                fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', fontWeight: 600,
                color: showFilters ? '#C9A84C' : '#8A7A5F',
              }}
            >
              <SlidersHorizontal size={13} />
              Filters
              {showFilters ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>
          </div>

          {/* Category filter chips */}
          {showFilters && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', paddingBottom: '16px', borderTop: '1px solid #1E1E1E', paddingTop: '12px' }}>
              {categoryFilters.map(({ key, label }) => {
                const isActive = activeFilter === key
                return (
                  <button
                    key={key}
                    id={`browse-cat-${key}`}
                    onClick={() => setActiveFilter(key)}
                    style={{
                      fontFamily: 'Inter, sans-serif', fontSize: '0.67rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase',
                      padding: '6px 16px', borderRadius: '3px', cursor: 'pointer',
                      background: isActive ? '#C9A84C' : 'transparent',
                      color: isActive ? '#0A0A0A' : '#8A7A5F',
                      border: isActive ? '1px solid #C9A84C' : '1px solid #2A2A2A',
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

      {/* ── Grid ── */}
      <div style={{ ...C, padding: '40px 40px 80px' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.75rem', color: '#8A7A5F', marginBottom: '24px' }}>
          Showing <strong style={{ color: '#F5EDD6' }}>{filtered.length}</strong> vehicles
        </p>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ fontSize: '2rem', marginBottom: '12px' }}>🔍</p>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.88rem', color: '#8A7A5F', marginBottom: '20px' }}>No vehicles match your search.</p>
            <button
              onClick={clearFilters}
              style={{ background: 'transparent', border: '1px solid #C9A84C', color: '#C9A84C', borderRadius: '4px', padding: '9px 20px', fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '22px' }}>
            {filtered.map(vehicle => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} onBook={handleBook} />
            ))}
          </div>
        )}
      </div>

      <BookingModal isOpen={isBookingOpen} onClose={() => setIsBookingOpen(false)} vehicle={selectedVehicle} mode="show" />

      <style>{`
        .browse-focus:focus { border-color: rgba(201,168,76,0.5) !important; }
      `}</style>
    </div>
  )
}
