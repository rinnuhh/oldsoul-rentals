import { Link } from 'react-router-dom'
import { Users, CalendarCheck, Car, ShieldCheck, Lock, CreditCard, PhoneCall } from 'lucide-react'

const stats = [
  { Icon: Users,         value: '500+', label: 'Happy Owners' },
  { Icon: CalendarCheck, value: '80+',  label: 'Events Hosted' },
  { Icon: Car,           value: '250+', label: 'Vehicles Listed' },
]

const badges = [
  {
    Icon: Lock,
    title: 'Verified Owners',
    desc: 'Every owner is identity-verified before listing.',
  },
  {
    Icon: CreditCard,
    title: 'Secure Booking',
    desc: 'Payments are held securely until the event is complete.',
  },
  {
    Icon: ShieldCheck,
    title: 'Vehicle Insurance',
    desc: 'Basic coverage available for every booked vehicle.',
  },
  {
    Icon: PhoneCall,
    title: '24/7 Support',
    desc: 'Our team is on-call before, during, and after your show.',
  },
]

export default function TrustBadges() {
  return (
    <>
      {/* ── Stats bar ──────────────────────────────────── */}
      <section
        className="py-14"
        style={{
          background: '#111111',
          borderTop: '1px solid rgba(42,42,42,0.6)',
          borderBottom: '1px solid rgba(42,42,42,0.6)',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-0">
            {/* Stat cells */}
            {stats.map(({ Icon, value, label }, i) => (
              <div
                key={label}
                className={`flex items-center gap-4 py-4 sm:py-0 ${
                  i < stats.length - 1
                    ? 'sm:border-r border-soul-border sm:pr-8 sm:mr-8'
                    : ''
                }`}
              >
                <div
                  className="border border-soul-border flex items-center justify-center flex-shrink-0"
                  style={{ width: '46px', height: '46px', borderRadius: '4px' }}
                >
                  <Icon size={18} className="text-soul-gold" />
                </div>
                <div>
                  <p
                    className="text-soul-cream"
                    style={{
                      fontFamily: "'Playfair Display', Georgia, serif",
                      fontSize: '1.5rem',
                      fontWeight: 700,
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
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {label}
                  </p>
                </div>
              </div>
            ))}

            {/* CTA cell */}
            <div className="sm:pl-8 flex flex-col justify-center">
              <p
                className="text-soul-cream mb-1"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '1rem',
                  fontWeight: 600,
                }}
              >
                Be Part of the Legacy
              </p>
              <p
                className="text-soul-muted mb-4"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '0.78rem',
                  lineHeight: 1.6,
                }}
              >
                Join thousands of enthusiasts who trust OldSoul.
              </p>
              <Link
                to="/list-vehicle"
                className="btn-gold w-fit"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '0.75rem',
                  letterSpacing: '0.08em',
                  padding: '8px 18px',
                }}
              >
                List Your Vehicle
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust badges ───────────────────────────────── */}
      <section className="bg-soul-black py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
          <div className="text-center mb-14">
            <p className="section-label mb-3">Why Choose OldSoul</p>
            <h2
              className="font-serif text-soul-cream"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(1.7rem, 3.5vw, 2.4rem)',
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              Built on{' '}
              <span className="text-gold-gradient italic">Trust</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {badges.map(({ Icon, title, desc }) => (
              <div
                key={title}
                className="bg-soul-card border border-soul-border p-6 text-center hover:border-soul-gold/30 hover:shadow-gold-sm transition-all duration-300 group"
                style={{ borderRadius: '6px' }}
              >
                <div
                  className="mx-auto mb-4 flex items-center justify-center border border-soul-border/70 group-hover:border-soul-gold/40 transition-colors duration-300"
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'rgba(10,10,10,0.5)',
                  }}
                >
                  <Icon size={18} className="text-soul-gold" />
                </div>
                <h3
                  className="text-soul-cream group-hover:text-soul-gold transition-colors duration-200 mb-2"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: '0.95rem',
                    fontWeight: 600,
                  }}
                >
                  {title}
                </h3>
                <p
                  className="text-soul-muted leading-relaxed"
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '0.78rem',
                    lineHeight: 1.65,
                  }}
                >
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
