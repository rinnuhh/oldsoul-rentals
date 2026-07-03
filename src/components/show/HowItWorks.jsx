import { Search, Calendar, Trophy, Wallet } from 'lucide-react'

const container = {
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '0 40px',
}

const steps = [
  {
    num: '01',
    Icon: Search,
    title: 'List Your Vehicle',
    desc: 'Add your vehicle details, photos, price, availability and conditions.',
  },
  {
    num: '02',
    Icon: Calendar,
    title: 'Get Booked',
    desc: 'Organizers browse and book your vehicle for events & shows.',
  },
  {
    num: '03',
    Icon: Trophy,
    title: 'Show & Shine',
    desc: 'Your vehicle takes the spotlight. You create memories.',
  },
  {
    num: '04',
    Icon: Wallet,
    title: 'Earn with Pride',
    desc: 'Get paid, build your reputation and be part of the community.',
  },
]

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      style={{ background: '#F0E6CC', padding: '96px 0' }}
    >
      <div style={container}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.6rem',
            fontWeight: 600,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: '#8A7A5F',
            marginBottom: '14px',
          }}>
            How OldSoul Works
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(1.9rem, 3.8vw, 2.75rem)',
            fontWeight: 700,
            lineHeight: 1.2,
            color: '#1A1208',
          }}>
            Simple Steps.{' '}
            <span style={{
              background: 'linear-gradient(135deg, #C9A84C 0%, #E8C96A 55%, #C9A84C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontStyle: 'italic',
            }}>
              Seamless Experience.
            </span>
          </h2>
        </div>

        {/* Step cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
        }}>
          {steps.map(({ num, Icon, title, desc }) => (
            <div
              key={num}
              style={{
                position: 'relative',
                background: '#1A1208',
                border: '1px solid rgba(42,30,8,0.5)',
                borderRadius: '8px',
                padding: '32px 28px',
                textAlign: 'left',
              }}
            >
              {/* Step number watermark */}
              <span style={{
                position: 'absolute',
                top: '16px',
                right: '18px',
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                color: 'rgba(201,168,76,0.2)',
                userSelect: 'none',
              }}>
                {num}
              </span>

              {/* Icon circle */}
              <div style={{
                width: '52px', height: '52px',
                borderRadius: '50%',
                background: '#0A0A0A',
                border: '1px solid rgba(201,168,76,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px',
              }}>
                <Icon size={20} style={{ color: '#C9A84C' }} />
              </div>

              <h3 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: '1rem',
                fontWeight: 600,
                lineHeight: 1.3,
                color: '#F5EDD6',
                marginBottom: '10px',
              }}>
                {title}
              </h3>

              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.8rem',
                lineHeight: 1.72,
                color: '#8A7A5F',
              }}>
                {desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
