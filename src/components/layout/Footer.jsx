import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'

const InstagramIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
)

const FacebookIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
)

const YoutubeIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
  </svg>
)

const quickLinks = [
  { to: '/browse',         label: 'Browse Vehicles' },
  { to: '/list-vehicle',   label: 'List Your Vehicle' },
  { to: '/how-it-works',   label: 'How It Works' },
  { to: '/normal-rentals', label: 'Normal Rentals' },
  { to: '/about',          label: 'About Us' },
  { to: '/contact',        label: 'Contact' },
]

const supportLinks = [
  { to: '/', label: 'Help Center' },
  { to: '/', label: 'Terms & Conditions' },
  { to: '/', label: 'Privacy Policy' },
  { to: '/', label: 'Community' },
]

export default function Footer() {
  return (
    <footer className="bg-soul-black border-t border-soul-border">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <p
                className="text-soul-gold"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  lineHeight: 1,
                }}
              >
                OLDSOUL
              </p>
              <p
                className="text-soul-muted uppercase mt-1.5"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '0.55rem',
                  letterSpacing: '0.22em',
                }}
              >
                Rent. Display. Inspire.
              </p>
            </div>
            <p
              className="text-soul-muted mb-6"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '0.82rem',
                lineHeight: 1.7,
              }}
            >
              A platform for vintage and modern vehicle owners to connect with events
              that celebrate automobiles and the culture around them.
            </p>
            <div className="flex flex-col gap-2.5">
              <a href="mailto:hello@oldsoul.in" className="flex items-center gap-2 text-soul-muted text-xs hover:text-soul-gold transition-colors">
                <Mail size={13} />
                hello@oldsoul.in
              </a>
              <a href="tel:+919876543210" className="flex items-center gap-2 text-soul-muted text-xs hover:text-soul-gold transition-colors">
                <Phone size={13} />
                +91 98765 43210
              </a>
              <span className="flex items-center gap-2 text-soul-muted text-xs">
                <MapPin size={13} />
                Kochi, Kerala, India
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-soul-cream uppercase mb-5"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.22em',
              }}
            >
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map(({ to, label }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-soul-muted text-sm hover:text-soul-gold transition-colors hover:pl-1 duration-200 block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4
              className="text-soul-cream uppercase mb-5"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.22em',
              }}
            >
              Support
            </h4>
            <ul className="flex flex-col gap-3">
              {supportLinks.map(({ to, label }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-soul-muted text-sm hover:text-soul-gold transition-colors hover:pl-1 duration-200 block"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4
              className="text-soul-cream uppercase mb-5"
              style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: '0.65rem',
                fontWeight: 600,
                letterSpacing: '0.22em',
              }}
            >
              Follow Us
            </h4>
            <div className="flex gap-4 mb-6">
              {[
                { Icon: InstagramIcon, href: '#', id: 'footer-instagram' },
                { Icon: FacebookIcon,  href: '#', id: 'footer-facebook' },
                { Icon: YoutubeIcon,   href: '#', id: 'footer-youtube' },
                { Icon: Mail,          href: '#', id: 'footer-email' },
              ].map(({ Icon, href, id }) => (
                <a
                  key={id}
                  id={id}
                  href={href}
                  className="w-9 h-9 rounded-sm border border-soul-border flex items-center justify-center
                             text-soul-muted hover:border-soul-gold hover:text-soul-gold transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
            <div className="bg-soul-dark border border-soul-border rounded-sm p-4">
              <p className="text-soul-cream text-sm font-medium mb-1">Own a special vehicle?</p>
              <p className="text-soul-muted text-xs mb-3">List it and earn every weekend.</p>
              <Link to="/list-vehicle" className="btn-gold text-xs py-2 px-4 block text-center">
                List Your Vehicle
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-soul-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-soul-muted text-xs">© {new Date().getFullYear()} OldSoul. All rights reserved.</p>
          <p className="text-soul-muted text-xs">Made with passion for automobile culture 🇮🇳</p>
        </div>
      </div>
    </footer>
  )
}
