import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Play, ArrowRight, ChevronDown } from 'lucide-react'

const HERO_IMG = 'https://res.cloudinary.com/vpctcldo/image/upload/f_auto,q_auto/ChatGPT_Image_Jul_3_2026_06_39_08_PM_f0wcim'

/* ─── Shared container style ─────────────────────────────── */
const container = {
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '0 40px',
}

/* ── Video Modal ─────────────────────────────────────────── */
function VideoModal({ onClose }) {
  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.88)',
        backdropFilter: 'blur(8px)',
        padding: '0 20px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '800px',
          background: '#111111',
          border: '1px solid #2A2A2A',
          borderRadius: '8px',
          overflow: 'hidden',
        }}
      >
        <div style={{
          aspectRatio: '16/9',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: '#0A0A0A',
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              width: '72px', height: '72px', borderRadius: '50%',
              border: '1px solid rgba(201,168,76,0.5)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <Play size={24} style={{ color: '#C9A84C', marginLeft: '3px' }} />
            </div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', color: '#8A7A5F' }}>
              Video coming soon
            </p>
          </div>
        </div>
        <button
          id="video-modal-close"
          onClick={onClose}
          style={{
            position: 'absolute', top: '16px', right: '16px',
            color: '#8A7A5F', background: 'none', border: 'none',
            cursor: 'pointer', fontSize: '20px', lineHeight: 1,
          }}
        >
          ✕
        </button>
      </div>
    </div>
  )
}

/* ── Hero Section ─────────────────────────────────────────── */
export default function HeroSection() {
  const [showVideo, setShowVideo] = useState(false)

  return (
    <section
      id="hero"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: '#0A0A0A',
      }}
    >
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src={HERO_IMG}
          alt="Premium vintage automobile"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', opacity: 0.65 }}
        />
        {/* Left overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(105deg, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.85) 40%, rgba(10,10,10,0.4) 70%, rgba(10,10,10,0.15) 100%)',
        }} />
        {/* Bottom fade */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(10,10,10,0.9) 0%, transparent 45%)',
        }} />
        {/* Top vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,10,10,0.4) 0%, transparent 25%)',
        }} />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', paddingTop: '160px', paddingBottom: '100px' }}>
        <div style={container}>
          <div style={{ maxWidth: '600px' }}>

            {/* Eyebrow */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
              <div style={{ height: '1px', width: '32px', background: '#C9A84C', opacity: 0.8 }} />
              <span style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.62rem',
                fontWeight: 600,
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                color: '#C9A84C',
              }}>
                Vintage Legends. Modern Icons.
              </span>
            </div>

            {/* Headline */}
            <h1 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2.8rem, 5.5vw, 4.5rem)',
              fontWeight: 700,
              lineHeight: 1.08,
              letterSpacing: '-0.01em',
              color: '#F5EDD6',
              marginBottom: '24px',
            }}>
              Timeless{' '}
              <span style={{
                background: 'linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #C9A84C 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontStyle: 'italic',
              }}>
                Machines.
              </span>
              <br />
              Unforgettable{' '}
              <span style={{
                background: 'linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #C9A84C 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                fontStyle: 'italic',
              }}>
                Shows.
              </span>
            </h1>

            {/* Subtext */}
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1rem',
              lineHeight: 1.75,
              color: '#8A7A5F',
              maxWidth: '440px',
              marginBottom: '40px',
            }}>
              OldSoul connects vehicle owners with auto shows, events, and
              exhibitions. List your ride. Get booked. Be remembered.
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '56px' }}>
              <Link
                id="hero-browse-btn"
                to="/browse"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  fontFamily: 'Inter, sans-serif', fontSize: '0.82rem',
                  fontWeight: 600, letterSpacing: '0.06em',
                  padding: '12px 28px',
                  background: '#C9A84C', color: '#0A0A0A',
                  border: 'none', borderRadius: '4px',
                  textDecoration: 'none', cursor: 'pointer',
                  transition: 'background 0.2s ease',
                }}
              >
                Browse Vehicles
                <ArrowRight size={15} />
              </Link>

              <button
                id="hero-video-btn"
                onClick={() => setShowVideo(true)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '12px',
                  fontFamily: 'Inter, sans-serif', fontSize: '0.82rem',
                  fontWeight: 500, letterSpacing: '0.04em',
                  padding: '12px 24px',
                  background: 'transparent', color: 'rgba(245,237,214,0.8)',
                  border: '1px solid rgba(42,42,42,0.8)', borderRadius: '4px',
                  cursor: 'pointer',
                  transition: 'border-color 0.2s ease, color 0.2s ease',
                }}
              >
                <span style={{
                  width: '32px', height: '32px', borderRadius: '50%',
                  border: '1px solid rgba(201,168,76,0.5)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <Play size={11} style={{ color: '#C9A84C', marginLeft: '2px' }} />
                </span>
                Watch Video
              </button>
            </div>

            {/* Stats */}
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: '40px',
              paddingTop: '32px',
              borderTop: '1px solid rgba(42,42,42,0.6)',
            }}>
              {[
                { value: '500+', label: 'Vehicles Listed' },
                { value: '80+',  label: 'Events Hosted' },
                { value: '12+',  label: 'Cities Covered' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '1.7rem', fontWeight: 700,
                    lineHeight: 1, color: '#C9A84C',
                  }}>
                    {value}
                  </p>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.68rem', fontWeight: 500,
                    letterSpacing: '0.14em', textTransform: 'uppercase',
                    color: '#8A7A5F', marginTop: '6px',
                  }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '32px',
        left: '50%', transform: 'translateX(-50%)',
        zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
      }}>
        <div className="scroll-indicator-line" />
        <ChevronDown size={16} style={{ color: 'rgba(138,122,95,0.5)' }} />
      </div>

      {showVideo && <VideoModal onClose={() => setShowVideo(false)} />}
    </section>
  )
}
