import { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock } from 'lucide-react'

const C = { maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }

const inputStyle = {
  width: '100%',
  background: '#0A0A0A',
  border: '1px solid #2A2A2A',
  borderRadius: '4px',
  padding: '11px 14px',
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.83rem',
  color: '#F5EDD6',
  outline: 'none',
  transition: 'border-color 0.2s',
}

const contactInfo = [
  {
    Icon: MapPin,
    title: 'Location',
    value: 'Building 14, Old Port Road, Fort Kochi, Kerala — 682001',
    href: 'https://maps.google.com',
  },
  {
    Icon: Phone,
    title: 'Phone',
    value: '+91 98765 43210',
    href: 'tel:+919876543210',
  },
  {
    Icon: Mail,
    title: 'Email',
    value: 'hello@oldsoul.in',
    href: 'mailto:hello@oldsoul.in',
  },
  {
    Icon: Clock,
    title: 'Hours',
    value: 'Mon – Sat: 9:00 AM – 6:00 PM IST',
    href: null,
  },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', role: 'renter', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  const handleSubmit = e => { e.preventDefault(); setSubmitted(true) }

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', paddingTop: '96px', paddingBottom: '96px', color: '#F5EDD6' }}>

      {/* ── Hero Header ── */}
      <div style={{ background: '#111111', borderBottom: '1px solid #2A2A2A', padding: '64px 0' }}>
        <div style={{ ...C, textAlign: 'center' }}>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.28em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '12px' }}>
            Get In Touch
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 'clamp(2.4rem, 4.5vw, 3.5rem)', fontWeight: 700, lineHeight: 1.1, color: '#F5EDD6', marginBottom: '16px' }}>
            Connect With{' '}
            <span style={{ background: 'linear-gradient(135deg,#C9A84C,#E8C96A,#C9A84C)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontStyle: 'italic' }}>
              OldSoul
            </span>
          </h1>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.88rem', lineHeight: 1.65, color: '#8A7A5F', maxWidth: '520px', margin: '0 auto' }}>
            Whether you want to list a rare automobile, book a show-stopper for your fest, or simply talk shop — we'd love to hear from you.
          </p>
        </div>
      </div>

      {/* ── Main Grid ── */}
      <div style={{ ...C, marginTop: '72px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px' }}>

          {/* Left — Contact Details */}
          <div>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.24em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '8px' }}>
              Our Garage
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.6rem', fontWeight: 700, color: '#F5EDD6', marginBottom: '14px' }}>
              Headquarters & Garage
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', lineHeight: 1.7, color: '#8A7A5F', marginBottom: '32px' }}>
              Located in the heart of Kochi, our garage handles archive verification, vehicle inspections, and community meetups.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {contactInfo.map(({ Icon, title, value, href }) => (
                <div key={title} style={{ display: 'flex', gap: '16px', padding: '18px', background: '#111111', border: '1px solid #2A2A2A', borderRadius: '6px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '4px', border: '1px solid #2A2A2A', background: '#0A0A0A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={15} style={{ color: '#C9A84C' }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#C9A84C', marginBottom: '4px' }}>{title}</p>
                    {href ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: '#F5EDD6', textDecoration: 'none' }}>{value}</a>
                    ) : (
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', color: '#F5EDD6' }}>{value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Form */}
          <div style={{ background: '#111111', border: '1px solid #2A2A2A', borderRadius: '6px', padding: '36px' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '32px 0' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <CheckCircle2 size={24} style={{ color: '#C9A84C' }} />
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.5rem', fontWeight: 700, color: '#F5EDD6', marginBottom: '10px' }}>Message Sent</h3>
                <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', lineHeight: 1.65, color: '#8A7A5F', maxWidth: '340px', margin: '0 auto 28px' }}>
                  Thank you, <strong style={{ color: '#F5EDD6' }}>{form.name}</strong>. Our curators will respond within 24 hours.
                </p>
                <button onClick={() => { setSubmitted(false); setForm({ name:'',email:'',subject:'',role:'renter',message:'' }) }}
                  style={{ background: '#C9A84C', color: '#0A0A0A', border: 'none', borderRadius: '4px', padding: '10px 24px', fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}>
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <h3 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.2rem', fontWeight: 600, color: '#F5EDD6', margin: '0 0 4px 0' }}>Send a Message</h3>
                  <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: '#8A7A5F' }}>Fill in your details and we'll reach out promptly.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8A7A5F', display: 'block', marginBottom: '6px' }}>Full Name</label>
                    <input id="contact-name" name="name" type="text" required placeholder="Rajan Nair" value={form.name} onChange={handleChange} style={inputStyle} className="gold-focus" />
                  </div>
                  <div>
                    <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8A7A5F', display: 'block', marginBottom: '6px' }}>Email</label>
                    <input id="contact-email" name="email" type="email" required placeholder="rajan@example.com" value={form.email} onChange={handleChange} style={inputStyle} className="gold-focus" />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <div>
                    <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8A7A5F', display: 'block', marginBottom: '6px' }}>Subject</label>
                    <input id="contact-subject" name="subject" type="text" required placeholder="Booking enquiry..." value={form.subject} onChange={handleChange} style={inputStyle} className="gold-focus" />
                  </div>
                  <div>
                    <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8A7A5F', display: 'block', marginBottom: '6px' }}>I Am A…</label>
                    <select id="contact-role" name="role" value={form.role} onChange={handleChange} style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }} className="gold-focus">
                      <option value="renter" style={{ background: '#111' }}>Event Organizer / Renter</option>
                      <option value="owner" style={{ background: '#111' }}>Vehicle Owner / Collector</option>
                      <option value="enthusiast" style={{ background: '#111' }}>Automobile Enthusiast</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8A7A5F', display: 'block', marginBottom: '6px' }}>Message</label>
                  <textarea id="contact-message" name="message" required rows={5} placeholder="Tell us about your event, listing, or enquiry..." value={form.message} onChange={handleChange} style={{ ...inputStyle, resize: 'none' }} className="gold-focus" />
                </div>

                <button type="submit" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: '#C9A84C', color: '#0A0A0A', border: 'none', borderRadius: '4px', padding: '13px', fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.06em', cursor: 'pointer', transition: 'background 0.2s' }}>
                  <Send size={14} /> Send Message
                </button>
              </form>
            )}
          </div>

        </div>
      </div>

      <style>{`.gold-focus:focus { border-color: rgba(201,168,76,0.6) !important; box-shadow: 0 0 0 3px rgba(201,168,76,0.08) !important; }`}</style>
    </div>
  )
}
