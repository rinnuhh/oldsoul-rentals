import { Link } from 'react-router-dom'
import { Users, CalendarCheck, Car } from 'lucide-react'

const container = {
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '0 40px',
}

const stats = [
  { Icon: Users,         value: '500+', label: 'Happy Owners' },
  { Icon: CalendarCheck, value: '80+',  label: 'Events Hosted' },
  { Icon: Car,           value: '250+', label: 'Vehicles Listed' },
]

export default function TrustBadges() {
  return (
    <section style={{
      background: '#111111',
      borderTop: '1px solid rgba(42,42,42,0.6)',
      padding: '56px 0',
    }}>
      <div style={container}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '32px',
        }}>

          {/* ── Stats row ── */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '48px',
            alignItems: 'center',
          }}>
            {stats.map(({ Icon, value, label }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {/* Icon tile */}
                <div style={{
                  width: '48px', height: '48px',
                  borderRadius: '6px',
                  border: '1px solid rgba(42,42,42,0.9)',
                  background: '#181818',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Icon size={20} style={{ color: '#C9A84C' }} />
                </div>
                {/* Text */}
                <div>
                  <p style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '1.7rem', fontWeight: 700,
                    lineHeight: 1, color: '#F5EDD6',
                  }}>
                    {value}
                  </p>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.67rem', fontWeight: 500,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: '#8A7A5F', marginTop: '5px',
                  }}>
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* ── CTA card ── */}
          <div style={{
            background: '#181818',
            border: '1px solid rgba(42,42,42,0.9)',
            borderRadius: '8px',
            padding: '28px 32px',
            minWidth: '270px',
            maxWidth: '340px',
            flexShrink: 0,
          }}>
            <p style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '1.05rem', fontWeight: 600,
              color: '#F5EDD6', marginBottom: '8px',
            }}>
              Be Part of the Legacy
            </p>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.78rem', lineHeight: 1.65,
              color: '#8A7A5F', marginBottom: '20px',
            }}>
              Join thousands of enthusiasts who trust OldSoul.
            </p>
            <Link
              to="/list-vehicle"
              style={{
                display: 'inline-flex', alignItems: 'center',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.72rem', fontWeight: 600,
                letterSpacing: '0.08em',
                padding: '10px 22px',
                background: '#C9A84C', color: '#0A0A0A',
                borderRadius: '4px', textDecoration: 'none',
                transition: 'background 0.2s ease',
              }}
            >
              List Your Vehicle
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
