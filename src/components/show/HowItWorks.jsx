import { Search, Calendar, CheckCircle2, Wallet } from 'lucide-react'

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
    Icon: CheckCircle2,
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
      className="py-20 lg:py-28"
      style={{
        background: 'linear-gradient(180deg, #0f0f0f 0%, #111111 100%)',
        borderTop: '1px solid rgba(42,42,42,0.6)',
        borderBottom: '1px solid rgba(42,42,42,0.6)',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label mb-4">How OldSoul Works</p>
          <h2
            className="font-serif text-soul-cream"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 'clamp(1.7rem, 4vw, 2.75rem)',
              fontWeight: 700,
              lineHeight: 1.2,
            }}
          >
            Simple Steps.{' '}
            <span className="text-gold-gradient italic">Seamless Experience.</span>
          </h2>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 relative">
          {/* Connecting line (desktop) */}
          <div
            className="hidden lg:block absolute z-0"
            style={{
              top: '44px',
              left: '12.5%',
              right: '12.5%',
              height: '1px',
              background: 'linear-gradient(90deg, transparent, rgba(201,168,76,0.2), transparent)',
            }}
          />

          {steps.map(({ num, Icon, title, desc }, i) => (
            <div
              key={num}
              className="relative z-10 group bg-soul-card border border-soul-border p-6 hover:border-soul-gold/30 transition-all duration-300"
              style={{ borderRadius: '6px' }}
            >
              {/* Step number — top-right watermark */}
              <span
                className="absolute top-4 right-4 text-soul-gold/20 font-mono select-none"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                }}
              >
                {num}
              </span>

              {/* Icon circle */}
              <div
                className="mb-5 flex items-center justify-center bg-soul-black border border-soul-border group-hover:border-soul-gold/40 group-hover:shadow-gold-sm transition-all duration-300"
                style={{ width: '52px', height: '52px', borderRadius: '50%' }}
              >
                <Icon size={20} className="text-soul-gold" />
              </div>

              <h3
                className="text-soul-cream group-hover:text-soul-gold transition-colors duration-200 mb-2"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '1rem',
                  fontWeight: 600,
                  lineHeight: 1.3,
                }}
              >
                {title}
              </h3>
              <p
                className="text-soul-muted leading-relaxed"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '0.82rem',
                  lineHeight: 1.7,
                }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
