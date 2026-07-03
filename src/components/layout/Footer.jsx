import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'

const container = {
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '0 40px',
}

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
)

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
)

const YoutubeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
)

const quickLinks = [
  { to: '/browse',         label: 'Browse Vehicles' },
  { to: '/list-vehicle',   label: 'List Your Vehicle' },
  { to: '/how-it-works',   label: 'How It Works' },
  { to: '/about',          label: 'About Us' },
  { to: '/contact',        label: 'Contact' },
]

const supportLinks = [
  { to: '/', label: 'Help Center' },
  { to: '/', label: 'Terms & Conditions' },
  { to: '/', label: 'Privacy Policy' },
  { to: '/', label: 'Community' },
]

const socialIcons = [
  { Icon: InstagramIcon, href: '#', id: 'footer-instagram' },
  { Icon: FacebookIcon,  href: '#', id: 'footer-facebook' },
  { Icon: YoutubeIcon,   href: '#', id: 'footer-youtube' },
  { Icon: Mail,          href: '#', id: 'footer-email' },
]

const linkStyle = {
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.82rem',
  color: '#8A7A5F',
  textDecoration: 'none',
  display: 'block',
  transition: 'color 0.2s ease',
  lineHeight: 1,
}

const colHeadingStyle = {
  fontFamily: 'Inter, sans-serif',
  fontSize: '0.6rem',
  fontWeight: 600,
  letterSpacing: '0.24em',
  textTransform: 'uppercase',
  color: '#F5EDD6',
  marginBottom: '20px',
}

export default function Footer() {
  return (
    <footer style={{ background: '#0A0A0A', borderTop: '1px solid rgba(42,42,42,0.7)' }}>

      {/* ── Main grid ── */}
      <div style={{ ...container, padding: '56px 40px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1fr 1fr 1fr',
          gap: '48px',
        }}>

          {/* ── Brand ── */}
          <div>
            {/* Logo */}
            <p style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '1.4rem', fontWeight: 700,
              letterSpacing: '0.22em', lineHeight: 1,
              color: '#C9A84C',
              marginBottom: '4px',
            }}>
              OLDSOUL
            </p>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.5rem', letterSpacing: '0.22em',
              textTransform: 'uppercase', color: '#8A7A5F',
              marginBottom: '20px',
            }}>
              Rent. Display. Inspire.
            </p>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.8rem', lineHeight: 1.75,
              color: '#8A7A5F',
              maxWidth: '280px',
            }}>
              A platform for vintage and modern vehicle owners to connect with
              events that celebrate automobiles.
            </p>
          </div>

          {/* ── Quick Links ── */}
          <div>
            <p style={colHeadingStyle}>Quick Links</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {quickLinks.map(({ to, label }) => (
                <Link key={label} to={to} style={linkStyle}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* ── Support ── */}
          <div>
            <p style={colHeadingStyle}>Support</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {supportLinks.map(({ to, label }) => (
                <Link key={label} to={to} style={linkStyle}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* ── Follow Us ── */}
          <div>
            <p style={colHeadingStyle}>Follow Us</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              {socialIcons.map(({ Icon, href, id }) => (
                <a
                  key={id}
                  id={id}
                  href={href}
                  style={{
                    width: '36px', height: '36px',
                    borderRadius: '4px',
                    border: '1px solid rgba(42,42,42,0.9)',
                    color: '#8A7A5F',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    textDecoration: 'none',
                    transition: 'border-color 0.2s ease, color 0.2s ease',
                  }}
                >
                  <Icon width={15} height={15} />
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div style={{ borderTop: '1px solid rgba(42,42,42,0.5)' }}>
        <div style={{ ...container, padding: '20px 40px', textAlign: 'center' }}>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.72rem', color: '#8A7A5F',
          }}>
            © {new Date().getFullYear()} OldSoul. All rights reserved.
          </p>
        </div>
      </div>

    </footer>
  )
}
