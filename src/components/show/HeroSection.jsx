import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Play, ArrowRight, ChevronDown } from 'lucide-react'

const HERO_IMG = 'https://res.cloudinary.com/vpctcldo/image/upload/f_auto,q_auto/ChatGPT_Image_Jul_3_2026_06_39_08_PM_f0wcim'

/* ── Video Modal ─────────────────────────────────────── */
function VideoModal({ onClose }) {
  return (
    <div
      className="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-soul-dark border border-soul-border rounded overflow-hidden shadow-card-lg"
        onClick={e => e.stopPropagation()}
      >
        <div className="aspect-video flex items-center justify-center bg-soul-black">
          <div className="text-center">
            <div className="w-20 h-20 rounded-full border border-soul-gold/60 flex items-center justify-center mx-auto mb-4">
              <Play size={26} className="text-soul-gold ml-1" />
            </div>
            <p className="text-soul-muted text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              Video coming soon
            </p>
          </div>
        </div>
        <button
          id="video-modal-close"
          onClick={onClose}
          className="absolute top-4 right-4 text-soul-muted hover:text-soul-cream transition-colors text-xl font-light leading-none"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

/* ── Hero Section ─────────────────────────────────────── */
export default function HeroSection() {
  const [showVideo, setShowVideo] = useState(false)

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-soul-black"
    >
      {/* ── Background image ── */}
      <div className="absolute inset-0 z-0">
        <img
          src={HERO_IMG}
          alt="Premium vintage automobile"
          className="w-full h-full object-cover object-center"
          style={{ opacity: 0.7 }}
        />

        {/* Cinematic dark overlay — stronger left, fades right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(100deg, rgba(10,10,10,0.97) 0%, rgba(10,10,10,0.82) 45%, rgba(10,10,10,0.45) 75%, rgba(10,10,10,0.25) 100%)',
          }}
        />
        {/* Bottom-to-top fade for grounding */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 50%)',
          }}
        />
        {/* Top vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(10,10,10,0.35) 0%, transparent 30%)',
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-28 pb-20 lg:pt-40 lg:pb-28">
        <div className="max-w-[620px]">

          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-7">
            <div className="h-px w-8 bg-soul-gold opacity-80" />
            <span className="section-label">Vintage Legends. Modern Icons.</span>
          </div>

          {/* Headline — Playfair Display */}
          <h1
            className="font-serif font-bold leading-[1.08] text-soul-cream mb-6"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(2.6rem, 6vw, 4.5rem)',
              letterSpacing: '-0.01em',
            }}
          >
            Timeless{' '}
            <span className="text-gold-gradient italic">Machines.</span>
            <br />
            Unforgettable{' '}
            <span className="text-gold-gradient italic">Shows.</span>
          </h1>

          {/* Subtext — Inter */}
          <p
            className="text-soul-muted leading-relaxed mb-10"
            style={{
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
              maxWidth: '480px',
              lineHeight: '1.75',
            }}
          >
            OldSoul connects vehicle owners with auto shows, events, and
            exhibitions. List your ride. Get booked. Be remembered.
          </p>

          {/* CTA row */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              id="hero-browse-btn"
              to="/browse"
              className="btn-gold inline-flex items-center justify-center gap-2"
              style={{ fontSize: '0.85rem', letterSpacing: '0.06em' }}
            >
              Browse Vehicles
              <ArrowRight size={15} />
            </Link>

            <button
              id="hero-video-btn"
              onClick={() => setShowVideo(true)}
              className="inline-flex items-center justify-center gap-3 px-6 py-3 rounded-sm border border-soul-border/70 text-soul-cream/80 hover:border-soul-gold hover:text-soul-gold transition-all duration-300"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '0.85rem',
                fontWeight: 500,
                letterSpacing: '0.04em',
              }}
            >
              <span className="w-8 h-8 rounded-full border border-soul-gold/50 flex items-center justify-center flex-shrink-0">
                <Play size={11} className="text-soul-gold ml-0.5" />
              </span>
              Watch Video
            </button>
          </div>

          {/* Stats row */}
          <div
            className="flex flex-wrap gap-10 mt-14 pt-8"
            style={{ borderTop: '1px solid rgba(42,42,42,0.6)' }}
          >
            {[
              { value: '500+', label: 'Vehicles Listed' },
              { value: '80+',  label: 'Events Hosted' },
              { value: '12+',  label: 'Cities Covered' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p
                  className="font-serif font-bold text-soul-gold"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '1.6rem',
                    lineHeight: 1,
                  }}
                >
                  {value}
                </p>
                <p
                  className="text-soul-muted mt-1"
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '0.72rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5">
        <div className="scroll-indicator-line" />
        <ChevronDown size={16} className="text-soul-muted/50" />
      </div>

      {showVideo && <VideoModal onClose={() => setShowVideo(false)} />}
    </section>
  )
}
