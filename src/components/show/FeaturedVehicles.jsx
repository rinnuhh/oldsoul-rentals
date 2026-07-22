import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react'
import { getShowVehicles } from '../../services/vehicleService'
import { categoryFilters } from '../../data/vehicles'
import BookingModal from '../layout/BookingModal'

/* ── Badge colours per category ──────────────────────────── */
const badgeStyle = {
  'vintage-car':  { background: 'rgba(20,14,0,0.82)',  color: '#C9A84C', border: '1px solid rgba(201,168,76,0.4)' },
  'vintage-bike': { background: 'rgba(20,14,0,0.82)',  color: '#C9A84C', border: '1px solid rgba(201,168,76,0.4)' },
  'modern-car':   { background: 'rgba(8,18,38,0.82)',  color: '#93C5FD', border: '1px solid rgba(147,197,253,0.35)' },
  'modified-car': { background: 'rgba(22,8,38,0.82)',  color: '#C084FC', border: '1px solid rgba(192,132,252,0.4)' },
}

/* ── Vehicle Card ─────────────────────────────────────────── */
function VehicleCard({ vehicle, onBook }) {
  const bs = badgeStyle[vehicle.category] || badgeStyle['vintage-car']
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={() => onBook(vehicle)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: '#181818',
        border: '1px solid #2A2A2A',
        borderRadius: '6px',
        overflow: 'hidden',
        cursor: 'pointer',
        transform: hovered ? 'translateY(-5px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 20px 50px rgba(0,0,0,0.65), 0 0 0 1px rgba(201,168,76,0.1)'
          : '0 4px 16px rgba(0,0,0,0.35)',
        transition: 'transform 0.32s ease, box-shadow 0.32s ease',
        flexShrink: 0,
        width: '282px',
        minWidth: '282px',
      }}
    >
      {/* ── Image ── */}
      <div style={{ position: 'relative', height: '185px', overflow: 'hidden' }}>
        <img
          src={vehicle.image || vehicle.image_url}
          alt={vehicle.name}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
            transition: 'transform 0.65s ease',
          }}
        />
        {/* bottom gradient */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '65px',
          background: 'linear-gradient(to top, rgba(10,10,10,0.92) 0%, transparent 100%)',
        }} />
        {/* Category badge */}
        <span style={{
          position: 'absolute', top: '12px', left: '12px',
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.57rem', fontWeight: 700,
          letterSpacing: '0.18em', textTransform: 'uppercase',
          padding: '3px 9px', borderRadius: '3px',
          backdropFilter: 'blur(8px)',
          ...bs,
        }}>
          {vehicle.categoryLabel || vehicle.category_label}
        </span>
      </div>

      {/* ── Body ── */}
      <div style={{ padding: '16px 18px 18px' }}>
        {/* Name */}
        <h3 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: '0.97rem', fontWeight: 600,
          lineHeight: 1.3,
          color: hovered ? '#C9A84C' : '#F5EDD6',
          transition: 'color 0.22s ease',
          marginBottom: '4px',
        }}>
          {vehicle.name}
        </h3>

        {/* Year */}
        <p style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.7rem', color: '#8A7A5F',
          marginBottom: '14px',
        }}>
          {vehicle.year}
        </p>

        {/* Divider */}
        <div style={{ height: '1px', background: 'rgba(42,42,42,0.9)', marginBottom: '14px' }} />

        {/* Location + Price */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', minWidth: 0 }}>
            <MapPin size={11} style={{ color: '#8A7A5F', flexShrink: 0 }} />
            <span style={{
              fontFamily: 'Inter, sans-serif', fontSize: '0.7rem',
              color: '#8A7A5F', whiteSpace: 'nowrap',
              overflow: 'hidden', textOverflow: 'ellipsis',
            }}>
              {vehicle.location}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px', flexShrink: 0 }}>
            <span style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '1rem', fontWeight: 700,
              color: '#C9A84C',
            }}>
              ₹{Number(vehicle.pricePerDay || vehicle.price_per_day).toLocaleString()}
            </span>
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.62rem', color: '#8A7A5F',
            }}>
              / day
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ── Skeleton Card ────────────────────────────────────────── */
function SkeletonCard() {
  return (
    <div style={{
      background: '#181818', border: '1px solid #2A2A2A', borderRadius: '6px',
      overflow: 'hidden', flexShrink: 0, width: '282px', minWidth: '282px',
    }}>
      <div style={{ height: '185px', background: '#222', animation: 'pulse 1.5s ease-in-out infinite' }} />
      <div style={{ padding: '16px 18px 18px' }}>
        <div style={{ height: '14px', background: '#2A2A2A', borderRadius: '4px', marginBottom: '8px', width: '70%', animation: 'pulse 1.5s ease-in-out infinite' }} />
        <div style={{ height: '10px', background: '#222', borderRadius: '4px', marginBottom: '16px', width: '40%', animation: 'pulse 1.5s ease-in-out infinite' }} />
        <div style={{ height: '1px', background: '#2A2A2A', marginBottom: '14px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div style={{ height: '10px', background: '#222', borderRadius: '4px', width: '45%', animation: 'pulse 1.5s ease-in-out infinite' }} />
          <div style={{ height: '10px', background: '#2A2A2A', borderRadius: '4px', width: '30%', animation: 'pulse 1.5s ease-in-out infinite' }} />
        </div>
      </div>
    </div>
  )
}

/* ── Featured Vehicles Section ────────────────────────────── */
export default function FeaturedVehicles() {
  const [activeFilter, setActiveFilter] = useState('all')
  const scrollRef = useRef(null)
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  // ── DB state
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  useEffect(() => {
    getShowVehicles()
      .then(data => { setVehicles(data); setLoading(false) })
      .catch(err  => { setError(err.message); setLoading(false) })
  }, [])

  const handleBook = (vehicle) => {
    setSelectedVehicle(vehicle)
    setIsBookingOpen(true)
  }

  const filtered = activeFilter === 'all'
    ? vehicles
    : vehicles.filter(v => v.category === activeFilter)

  const scroll = (dir) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -310 : 310, behavior: 'smooth' })
    }
  }

  return (
    <section
      id="featured-vehicles"
      style={{ background: '#0A0A0A', padding: '96px 0' }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>

        {/* ── Section header ── */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '28px',
          gap: '16px',
          flexWrap: 'wrap',
        }}>
          <div>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.6rem', fontWeight: 600,
              letterSpacing: '0.28em', textTransform: 'uppercase',
              color: '#C9A84C', marginBottom: '10px',
            }}>
              Our Collection
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
              fontWeight: 700, lineHeight: 1.15,
              color: '#F5EDD6', margin: 0,
            }}>
              Featured{' '}
              <span style={{
                background: 'linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #C9A84C 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontStyle: 'italic',
              }}>
                Vehicles
              </span>
            </h2>
          </div>

          <Link
            to="/browse"
            id="view-all-vehicles-btn"
            style={{
              display: 'inline-flex', alignItems: 'center',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.7rem', fontWeight: 600,
              letterSpacing: '0.1em', textTransform: 'uppercase',
              padding: '9px 20px',
              border: '1px solid #C9A84C', color: '#C9A84C',
              borderRadius: '4px', textDecoration: 'none',
              whiteSpace: 'nowrap',
              transition: 'background 0.2s ease, color 0.2s ease',
            }}
          >
            View All Vehicles
          </Link>
        </div>

        {/* ── Filter tabs ── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
          {categoryFilters.map(({ key, label }) => {
            const isActive = activeFilter === key
            return (
              <button
                key={key}
                id={`filter-${key}`}
                onClick={() => setActiveFilter(key)}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.67rem', fontWeight: 600,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  padding: '7px 18px', borderRadius: '3px',
                  cursor: 'pointer',
                  background: isActive ? '#C9A84C' : 'transparent',
                  color: isActive ? '#0A0A0A' : '#8A7A5F',
                  border: isActive ? '1px solid #C9A84C' : '1px solid #2A2A2A',
                  transition: 'all 0.2s ease',
                }}
              >
                {label}
              </button>
            )
          })}
        </div>

        {/* ── Error state ── */}
        {error && (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#EF4444', fontSize: '0.85rem' }}>
            ⚠ Failed to load vehicles: {error}
            <br /><span style={{ color: '#8A7A5F', fontSize: '0.72rem' }}>Make sure WAMP is running and the database is set up.</span>
          </div>
        )}

        {/* ── Cards ── */}
        {!error && (
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => scroll('left')}
              style={{
                position: 'absolute', left: '-18px',
                top: '50%', transform: 'translateY(-50%)',
                zIndex: 10,
                width: '36px', height: '36px', borderRadius: '50%',
                background: '#181818', border: '1px solid #2A2A2A',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#8A7A5F', cursor: 'pointer',
                transition: 'border-color 0.2s, color 0.2s',
              }}
            >
              <ChevronLeft size={17} />
            </button>

            <button
              onClick={() => scroll('right')}
              style={{
                position: 'absolute', right: '-18px',
                top: '50%', transform: 'translateY(-50%)',
                zIndex: 10,
                width: '36px', height: '36px', borderRadius: '50%',
                background: '#181818', border: '1px solid #2A2A2A',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#8A7A5F', cursor: 'pointer',
                transition: 'border-color 0.2s, color 0.2s',
              }}
            >
              <ChevronRight size={17} />
            </button>

            {/* Scrollable / Grid row */}
            <div
              ref={scrollRef}
              className="featured-cards-row"
              style={{
                display: 'flex',
                gap: '20px',
                overflowX: 'auto',
                paddingBottom: '6px',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {loading
                ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)
                : filtered.map(vehicle => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} onBook={handleBook} />
                  ))
              }
            </div>
          </div>
        )}
      </div>

      {/* ── Desktop: switch to 4-col grid ── */}
      <style>{`
        .featured-cards-row::-webkit-scrollbar { display: none; }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.4; }
        }

        @media (min-width: 1024px) {
          .featured-cards-row {
            display: grid !important;
            grid-template-columns: repeat(4, 1fr) !important;
            overflow-x: visible !important;
          }
          .featured-cards-row > div {
            width: auto !important;
            min-width: unset !important;
            flex-shrink: unset !important;
          }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .featured-cards-row {
            display: grid !important;
            grid-template-columns: repeat(2, 1fr) !important;
            overflow-x: visible !important;
          }
          .featured-cards-row > div {
            width: auto !important;
            min-width: unset !important;
          }
        }
      `}</style>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        vehicle={selectedVehicle}
        mode="show"
      />
    </section>
  )
}
