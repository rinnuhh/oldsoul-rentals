import { Link } from 'react-router-dom'
import { ArrowRight, Car, Shield, Clock, MapPin, Navigation, Compass, Sparkles } from 'lucide-react'
import RentalGrid from '../components/normal/RentalGrid'

const highlights = [
  { Icon: Car,    label: 'Diverse Fleet',     desc: 'Sedans, SUVs, Premium Hatchbacks' },
  { Icon: Shield, label: 'Fully Insured',     desc: 'Zero liability option available' },
  { Icon: Clock,  label: 'Instant Booking',   desc: 'Flexible hours & direct pick-up' },
  { Icon: MapPin, label: 'City Coverage',    desc: 'Pick up points across key hubs' },
]

export default function NormalRentals() {
  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh', paddingTop: '80px' }}>
      
      {/* ── Animated Moving Side Car Track Banner ── */}
      <div style={{
        background: '#0F172A',
        color: '#F8FAFC',
        padding: '12px 0',
        overflow: 'hidden',
        position: 'relative',
        borderBottom: '1px solid #1E293B',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '24px',
          width: '200%',
          animation: 'movingIconSide 18s linear infinite',
          whiteSpace: 'nowrap',
        }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '30px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', fontWeight: 600, color: '#93C5FD' }}>
              <Car size={18} style={{ color: '#60A5FA', animation: 'driveBounce 1s ease-in-out infinite alternate' }} />
              ⚡ Instant Key Delivery Available in Kochi, Trivandrum & Calicut
            </span>
            <span style={{ color: '#475569' }}>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', fontWeight: 600, color: '#F1F5F9' }}>
              <Navigation size={16} style={{ color: '#38BDF8' }} />
              24/7 Roadside Assistance & GPS Live Tracking
            </span>
            <span style={{ color: '#475569' }}>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', fontWeight: 600, color: '#FDE047' }}>
              <Sparkles size={16} style={{ color: '#FACC15' }} />
              Special Weekend Daily Rate Reductions Active Now
            </span>
            <span style={{ color: '#475569' }}>•</span>
          </div>

          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '30px' }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', fontWeight: 600, color: '#93C5FD' }}>
              <Car size={18} style={{ color: '#60A5FA', animation: 'driveBounce 1s ease-in-out infinite alternate' }} />
              ⚡ Instant Key Delivery Available in Kochi, Trivandrum & Calicut
            </span>
            <span style={{ color: '#475569' }}>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', fontWeight: 600, color: '#F1F5F9' }}>
              <Navigation size={16} style={{ color: '#38BDF8' }} />
              24/7 Roadside Assistance & GPS Live Tracking
            </span>
            <span style={{ color: '#475569' }}>•</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '0.78rem', fontWeight: 600, color: '#FDE047' }}>
              <Sparkles size={16} style={{ color: '#FACC15' }} />
              Special Weekend Daily Rate Reductions Active Now
            </span>
            <span style={{ color: '#475569' }}>•</span>
          </div>
        </div>
      </div>

      {/* ── Hero Banner ── */}
      <section style={{ background: '#FFFFFF', borderBottom: '1px solid #E2E8F0', padding: '56px 0 0 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center',
            paddingBottom: '56px',
          }}>
            {/* Left Copy */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#16A34A', display: 'inline-block' }} />
                <span style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '0.65rem',
                  fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: '#64748B',
                }}>
                  Fleet Status: Ready to Rent
                </span>
              </div>
              
              <h1 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(2.2rem, 4vw, 3.2rem)',
                fontWeight: 700, lineHeight: 1.15,
                color: '#0F172A', marginBottom: '18px',
              }}>
                Drive Your Way.{' '}
                <br />
                <span style={{ color: '#2563EB' }}>Everyday Rentals.</span>
              </h1>
              
              <p style={{
                fontFamily: 'Inter, sans-serif', fontSize: '0.92rem',
                lineHeight: 1.68, color: '#475569',
                maxWidth: '460px', marginBottom: '32px',
              }}>
                Premium sedans, family SUVs, and city commuters at transparent pricing. Enjoy instant keys, full insurance, and zero hidden costs.
              </p>

              {/* Moving Car Track Animation Line */}
              <div style={{
                position: 'relative',
                background: '#F1F5F9',
                border: '1px solid #E2E8F0',
                borderRadius: '24px',
                padding: '8px 16px',
                marginBottom: '28px',
                maxWidth: '420px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
              }}>
                <div style={{ fontSize: '0.68rem', fontWeight: 600, color: '#64748B', marginRight: '10px', whiteSpace: 'nowrap' }}>
                  Live Fleet Movement:
                </div>
                <div style={{ position: 'relative', flex: 1, height: '24px', display: 'flex', alignItems: 'center' }}>
                  <div style={{ position: 'absolute', inset: '0 0', borderTop: '2px dashed #CBD5E1', top: '50%', transform: 'translateY(-50%)' }} />
                  <div style={{
                    position: 'absolute',
                    animation: 'carDriveTrack 6s ease-in-out infinite alternate',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    background: '#2563EB',
                    color: '#FFFFFF',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '0.62rem',
                    fontWeight: 700,
                    boxShadow: '0 2px 8px rgba(37,99,235,0.4)',
                  }}>
                    <Car size={12} /> Moving Fleet
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <a
                  href="#vehicle-listings"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '8px',
                    fontFamily: 'Inter, sans-serif', fontSize: '0.8rem',
                    fontWeight: 600, padding: '12px 24px',
                    background: '#2563EB', color: '#FFFFFF',
                    borderRadius: '6px', textDecoration: 'none',
                    transition: 'background 0.2s',
                  }}
                  className="rental-hero-btn"
                >
                  Browse Fleet <ArrowRight size={14} />
                </a>
                <Link
                  to="/"
                  style={{
                    display: 'inline-flex', alignItems: 'center',
                    fontFamily: 'Inter, sans-serif', fontSize: '0.8rem',
                    fontWeight: 500, padding: '12px 20px',
                    border: '1px solid #CBD5E1', color: '#475569',
                    borderRadius: '6px', textDecoration: 'none',
                    transition: 'border-color 0.2s',
                  }}
                  className="rental-sec-btn"
                >
                  ← Show Vehicles
                </Link>
              </div>
            </div>

            {/* Right Image Display */}
            <div style={{ position: 'relative', borderRadius: '8px', overflow: 'hidden', height: '320px', boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)' }}>
              <img
                src="https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1000&q=80"
                alt="Modern vehicle fleet"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to top, rgba(15,23,42,0.4) 0%, transparent 100%)',
              }} />
              {/* Floating Badge with moving side icon effect */}
              <div style={{
                position: 'absolute', bottom: '20px', left: '20px',
                background: '#FFFFFF', borderRadius: '6px',
                padding: '12px 18px', display: 'flex', alignItems: 'center', gap: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '4px',
                  background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Car size={16} style={{ color: '#2563EB', animation: 'driveBounce 1.5s ease-in-out infinite alternate' }} />
                </div>
                <div>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>250+ Autos Ready</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.67rem', color: '#64748B', margin: 0 }}>Clean & fully serviced</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Highlights strip */}
        <div style={{ borderTop: '1px solid #E2E8F0', background: '#F8FAFC' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 40px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
              {highlights.map(({ Icon, label, desc }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '6px',
                    background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={15} style={{ color: '#2563EB' }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', fontWeight: 600, color: '#0F172A', margin: 0 }}>{label}</p>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', color: '#64748B', margin: 0 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Vehicle listings ── */}
      <section id="vehicle-listings">
        <RentalGrid />
      </section>

      <style>{`
        @keyframes movingIconSide {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes carDriveTrack {
          0% { left: 0%; }
          100% { left: 75%; }
        }
        @keyframes driveBounce {
          0% { transform: translateX(0px); }
          100% { transform: translateX(4px); }
        }
        .rental-hero-btn:hover { background-color: #1D4ED8 !important; }
        .rental-sec-btn:hover { border-color: #94A3B8 !important; color: #0F172A !important; }
      `}</style>

    </div>
  )
}
