import { Search, Calendar, CheckCircle2, Wallet, Car, Users, Award, MessageSquare, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const C = { maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }

const ownerSteps = [
  { num: '01', Icon: Car,           title: 'List Your Vehicle',  desc: 'Add vehicle details, high-res photos, availability, and your preferred price per day.' },
  { num: '02', Icon: Calendar,      title: 'Get Booked',         desc: 'Verified organizers browse your listing and send a booking request with event details.' },
  { num: '03', Icon: CheckCircle2,  title: 'Confirm & Prepare',  desc: 'Review the request, confirm it, and get your vehicle show-ready for the big day.' },
  { num: '04', Icon: Wallet,        title: 'Earn with Pride',    desc: 'Receive secure payment after the event and build your trusted reputation on OldSoul.' },
]

const renterSteps = [
  { num: '01', Icon: Search,        title: 'Browse & Discover',  desc: 'Explore hundreds of verified vintage and modified vehicles available near your city.' },
  { num: '02', Icon: Calendar,      title: 'Select & Book',      desc: 'Choose your event dates, add show details, and send your booking request.' },
  { num: '03', Icon: MessageSquare, title: 'Owner Confirms',     desc: 'The vehicle owner reviews your event details and confirms within 24 hours.' },
  { num: '04', Icon: Award,         title: 'Show & Shine',       desc: 'Collect the automobile, head to your event, and create an unforgettable moment.' },
]

const faqs = [
  { q: 'Is my vehicle insured during the event?',  a: 'OldSoul provides basic coverage for all booked vehicles. Owners can also add their own comprehensive insurance on top.' },
  { q: 'How do I get paid as an owner?',           a: 'Payments are processed securely via bank transfer within 2–3 business days after the event is successfully completed.' },
  { q: 'Can I cancel a booking?',                  a: 'Cancellations made 72+ hours before the event are fully refunded. Late cancellations may attract a 20% processing fee.' },
  { q: 'What kind of events can I book for?',      a: 'College fests, auto exhibitions, wedding processions, film shoots, brand activations, photoshoots, and more.' },
]

function FAQ({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ background: '#111111', border: '1px solid #2A2A2A', borderRadius: '6px', overflow: 'hidden', transition: 'border-color 0.2s' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: '16px' }}
      >
        <span style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '0.95rem', fontWeight: 600, color: '#F5EDD6' }}>{q}</span>
        <ChevronDown size={16} style={{ color: '#8A7A5F', transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.25s', flexShrink: 0 }} />
      </button>
      {open && (
        <div style={{ padding: '0 24px 20px', fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', lineHeight: 1.72, color: '#8A7A5F', borderTop: '1px solid #1E1E1E' }}>
          <p style={{ marginTop: '14px' }}>{a}</p>
        </div>
      )}
    </div>
  )
}

function StepCard({ num, Icon, title, desc, dark }) {
  return (
    <div style={{ position: 'relative', background: dark ? '#111111' : '#181818', border: '1px solid #2A2A2A', borderRadius: '6px', padding: '28px 24px' }}>
      <span style={{ position: 'absolute', top: '16px', right: '18px', fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.06em', color: 'rgba(201,168,76,0.2)', userSelect: 'none' }}>{num}</span>
      <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#0A0A0A', border: '1px solid #2A2A2A', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
        <Icon size={19} style={{ color: '#C9A84C' }} />
      </div>
      <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '0.97rem', fontWeight: 600, color: '#F5EDD6', marginBottom: '8px' }}>{title}</h3>
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', lineHeight: 1.7, color: '#8A7A5F' }}>{desc}</p>
    </div>
  )
}

export default function HowItWorksPage() {
  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', paddingTop: '96px', color: '#F5EDD6' }}>

      {/* ── Hero ── */}
      <section style={{ background: '#111111', borderBottom: '1px solid #2A2A2A', padding: '80px 0' }}>
        <div style={{ ...C, textAlign: 'center' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '12px' }}>
            The OldSoul Way
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 700, lineHeight: 1.1, color: '#F5EDD6', marginBottom: '18px' }}>
            How It{' '}
            <span style={{ background: 'linear-gradient(135deg,#C9A84C,#E8C96A,#C9A84C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontStyle: 'italic' }}>
              Works
            </span>
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.92rem', lineHeight: 1.7, color: '#8A7A5F', maxWidth: '540px', margin: '0 auto' }}>
            Whether you own a classic vehicle or need one for your show — we make the process simple, secure, and rewarding for everyone.
          </p>
        </div>
      </section>

      {/* ── For Owners ── */}
      <section style={{ padding: '88px 0' }}>
        <div style={C}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Car size={17} style={{ color: '#C9A84C' }} />
            </div>
            <div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', margin: 0 }}>For Vehicle Owners</p>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.6rem, 2.8vw, 2.1rem)', fontWeight: 700, color: '#F5EDD6', margin: 0 }}>List. Earn. Repeat.</h2>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px' }}>
            {ownerSteps.map(s => <StepCard key={s.num} {...s} dark={false} />)}
          </div>
        </div>
      </section>

      {/* ── For Renters ── */}
      <section style={{ background: '#111111', borderTop: '1px solid #2A2A2A', borderBottom: '1px solid #2A2A2A', padding: '88px 0' }}>
        <div style={C}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '40px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Users size={17} style={{ color: '#C9A84C' }} />
            </div>
            <div>
              <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A84C', margin: 0 }}>For Event Organizers</p>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.6rem, 2.8vw, 2.1rem)', fontWeight: 700, color: '#F5EDD6', margin: 0 }}>Browse. Book. Celebrate.</h2>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px' }}>
            {renterSteps.map(s => <StepCard key={s.num} {...s} dark={true} />)}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: '88px 0' }}>
        <div style={{ ...C, maxWidth: '760px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '12px' }}>
              Common Questions
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.9rem, 3.5vw, 2.6rem)', fontWeight: 700, color: '#F5EDD6' }}>
              Frequently Asked{' '}
              <span style={{ background: 'linear-gradient(135deg,#C9A84C,#E8C96A,#C9A84C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontStyle: 'italic' }}>
                Questions
              </span>
            </h2>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {faqs.map(f => <FAQ key={f.q} {...f} />)}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: '#111111', borderTop: '1px solid #2A2A2A', padding: '72px 0', textAlign: 'center' }}>
        <div style={{ ...C, maxWidth: '560px' }}>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700, color: '#F5EDD6', marginBottom: '12px' }}>
            Ready to get started?
          </h2>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', color: '#8A7A5F', marginBottom: '32px' }}>
            Join thousands of collectors and event organisers on OldSoul.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            <Link to="/list-vehicle" style={{ display: 'inline-block', background: '#C9A84C', color: '#0A0A0A', padding: '11px 28px', borderRadius: '4px', fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', fontWeight: 700, textDecoration: 'none' }}>
              List Your Vehicle
            </Link>
            <Link to="/browse" style={{ display: 'inline-block', background: 'transparent', color: '#C9A84C', border: '1px solid #C9A84C', padding: '11px 28px', borderRadius: '4px', fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', fontWeight: 600, textDecoration: 'none' }}>
              Browse Vehicles
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
