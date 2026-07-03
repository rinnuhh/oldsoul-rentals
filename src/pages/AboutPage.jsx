import { Shield, Sparkles, Users, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

const C = { maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }

const values = [
  { Icon: Shield,   title: 'Heritage Preservation', desc: 'Automobiles are living pieces of history. We connect passionate owners with events that celebrate their cultural and historical significance.' },
  { Icon: Sparkles, title: 'Exquisite Curation',     desc: 'Every vehicle on our platform is reviewed and hand-selected for authenticity, visual appeal, and mechanical reliability.' },
  { Icon: Users,    title: 'Community First',         desc: 'We are more than a rental service — a gathering point for collectors, event hosts, restoration artists, and next-generation enthusiasts.' },
  { Icon: Heart,    title: 'Passion Over Profits',    desc: 'Driven by enthusiasts, for enthusiasts. We ensure vehicle owners are rewarded fairly for sharing their pride with the community.' },
]

const team = [
  { name: 'Rohan Kurian',      role: 'Co-Founder & Chief Curator',     desc: "A restorer with 8 vintage British roadsters, Rohan has spent two decades in Kerala's classic car restoration scene.", img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80' },
  { name: 'Meera Nair',        role: 'Operations & Event Logistics',    desc: 'With a background in hosting major auto expos, Meera ensures smooth coordination between car owners and event organizers.', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80' },
  { name: 'Dr. Antony Joseph', role: 'Automotive Historian & Advisor',  desc: 'Retired professor and vintage motorcycle collector who verifies the provenance and historical accuracy of our elite listings.', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80' },
]

export default function AboutPage() {
  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', paddingTop: '96px', color: '#F5EDD6' }}>

      {/* ── Hero ── */}
      <section style={{ background: '#111111', borderBottom: '1px solid #2A2A2A', padding: '80px 0' }}>
        <div style={{ ...C, textAlign: 'center' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '14px' }}>
            Our Heritage
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 700, lineHeight: 1.1, color: '#F5EDD6', marginBottom: '20px' }}>
            Preserving the Soul of{' '}
            <span style={{ background: 'linear-gradient(135deg,#C9A84C,#E8C96A,#C9A84C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontStyle: 'italic', display: 'block' }}>
              Automobile Culture
            </span>
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.92rem', lineHeight: 1.7, color: '#8A7A5F', maxWidth: '580px', margin: '0 auto' }}>
            OldSoul was born from a simple belief: classic and custom vehicles are works of art that deserve to be seen, experienced, and celebrated.
          </p>
        </div>
      </section>

      {/* ── Brand Story ── */}
      <section style={{ padding: '96px 0' }}>
        <div style={C}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '64px', alignItems: 'center' }}>
            <div style={{ borderRadius: '6px', overflow: 'hidden', border: '1px solid #2A2A2A', position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1000&q=80"
                alt="Vintage dashboard"
                style={{ width: '100%', height: '420px', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,10,10,0.3) 0%, transparent 100%)' }} />
            </div>

            <div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '10px' }}>
                How We Started
              </p>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700, color: '#F5EDD6', marginBottom: '24px', lineHeight: 1.2 }}>
                Bridging the Gap Between{' '}
                <span style={{ background: 'linear-gradient(135deg,#C9A84C,#E8C96A,#C9A84C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontStyle: 'italic' }}>
                  Collectors & Creators
                </span>
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontFamily: 'Inter, sans-serif', fontSize: '0.84rem', lineHeight: 1.75, color: '#8A7A5F' }}>
                <p>Every automobile has a voice, a history, and a unique soul. But for too long, India's finest vintage models remained hidden in private garages, rarely sharing their legacy with the public.</p>
                <p>At the same time, college fests, heritage exhibitions, and productions struggled to source authentic, well-maintained vehicles. OldSoul was founded to solve this — a secure, high-trust marketplace where collectors can confidently showcase their treasures.</p>
                <p>Today, we support both luxury show rentals and daily commutes, maintaining a dual-identity platform that respects the prestige of classics while meeting everyday community needs.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section style={{ background: '#111111', borderTop: '1px solid #2A2A2A', borderBottom: '1px solid #2A2A2A', padding: '96px 0' }}>
        <div style={C}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '12px' }}>
              Our Principles
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.9rem, 3.5vw, 2.75rem)', fontWeight: 700, color: '#F5EDD6' }}>
              What We Stand{' '}
              <span style={{ background: 'linear-gradient(135deg,#C9A84C,#E8C96A,#C9A84C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontStyle: 'italic' }}>
                For
              </span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {values.map(({ Icon, title, desc }) => (
              <div key={title} style={{ display: 'flex', gap: '18px', padding: '24px', background: '#181818', border: '1px solid #2A2A2A', borderRadius: '6px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '4px', border: '1px solid #2A2A2A', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={18} style={{ color: '#C9A84C' }} />
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1rem', fontWeight: 600, color: '#F5EDD6', marginBottom: '8px' }}>{title}</h3>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', lineHeight: 1.7, color: '#8A7A5F' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section style={{ padding: '96px 0' }}>
        <div style={C}>
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '12px' }}>
              The Curators
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.9rem, 3.5vw, 2.75rem)', fontWeight: 700, color: '#F5EDD6' }}>
              Minds Behind{' '}
              <span style={{ background: 'linear-gradient(135deg,#C9A84C,#E8C96A,#C9A84C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontStyle: 'italic' }}>
                OldSoul
              </span>
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
            {team.map(({ name, role, desc, img }) => (
              <div key={name} style={{ background: '#111111', border: '1px solid #2A2A2A', borderRadius: '6px', overflow: 'hidden' }}>
                <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                  <img src={img} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(17,17,17,0.85) 0%, transparent 55%)' }} />
                </div>
                <div style={{ padding: '20px' }}>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.05rem', fontWeight: 700, color: '#F5EDD6', marginBottom: '4px' }}>{name}</h3>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '12px' }}>{role}</p>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', lineHeight: 1.68, color: '#8A7A5F' }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: '#111111', borderTop: '1px solid #2A2A2A', padding: '72px 0', textAlign: 'center' }}>
        <div style={{ ...C, maxWidth: '600px' }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700, color: '#F5EDD6', marginBottom: '12px' }}>
            Have a classic or modified ride?
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#8A7A5F', marginBottom: '32px' }}>
            List it with us and let it shine at exhibitions, weddings, and photoshoots.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            <Link to="/list-vehicle" style={{ display: 'inline-block', background: '#C9A84C', color: '#0A0A0A', padding: '11px 28px', borderRadius: '4px', fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', fontWeight: 700, textDecoration: 'none' }}>
              List Your Vehicle
            </Link>
            <Link to="/contact" style={{ display: 'inline-block', background: 'transparent', color: '#C9A84C', border: '1px solid #C9A84C', padding: '11px 28px', borderRadius: '4px', fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', fontWeight: 600, textDecoration: 'none' }}>
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
