import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronRight, User, LogIn, Shield, LogOut } from 'lucide-react'
import LoginModal from './LoginModal'

const navLinks = [
  { to: '/',               label: 'Home' },
  { to: '/browse',         label: 'Browse Vehicles' },
  { to: '/how-it-works',   label: 'How It Works' },
  { to: '/about',          label: 'About Us' },
  { to: '/contact',        label: 'Contact' },
]

export default function Navbar() {
  const [menuOpen,   setMenuOpen]   = useState(false)
  const [scrolled,   setScrolled]   = useState(false)
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)
  const [userDropdown, setUserDropdown] = useState(false)
  const { pathname } = useLocation()

  const isNormalRentals = pathname.startsWith('/normal-rentals')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [pathname])

  const handleLogout = () => {
    setCurrentUser(null)
    setUserDropdown(false)
  }

  const handleLoginClick = () => {
    setIsLoginOpen(true)
  }

  /* ── NORMAL RENTALS NAV (Light) ──────────────────────── */
  if (isNormalRentals) {
    return (
      <>
        <nav className="sticky top-0 z-50 bg-white border-b border-rental-border shadow-sm">
          <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
            <div className="flex items-center justify-between h-16 lg:h-20">
              {/* Logo */}
              <Link to="/" className="flex flex-col leading-none group">
                <span
                  className="text-rental-navy group-hover:text-rental-blue transition-colors"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 'clamp(1.15rem, 2.5vw, 1.4rem)',
                    fontWeight: 700,
                    letterSpacing: '0.22em',
                  }}
                >
                  OLDSOUL
                </span>
                <span
                  className="text-rental-muted uppercase"
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '0.55rem',
                    letterSpacing: '0.22em',
                    marginTop: '2px',
                  }}
                >
                  Normal Rentals
                </span>
              </Link>

              {/* Desktop links */}
              <div className="hidden md:flex items-center gap-6">
                <Link to="/" className="text-sm text-rental-muted hover:text-rental-navy transition-colors">Show Rentals</Link>
                <Link to="/browse" className="text-sm text-rental-muted hover:text-rental-navy transition-colors">Browse All</Link>
                <Link to="/how-it-works" className="text-sm text-rental-muted hover:text-rental-navy transition-colors">How It Works</Link>
                <Link to="/about" className="text-sm text-rental-muted hover:text-rental-navy transition-colors">About Us</Link>
                <Link to="/contact" className="text-sm text-rental-muted hover:text-rental-navy transition-colors">Contact</Link>
                
                {/* Sign In / Profile */}
                {currentUser ? (
                  <div className="relative">
                    <button
                      onClick={() => setUserDropdown(!userDropdown)}
                      className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-md bg-rental-blue-light text-rental-navy border border-blue-200"
                    >
                      <User size={14} /> {currentUser.name}
                    </button>
                    {userDropdown && (
                      <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg py-1 text-xs">
                        {currentUser.role === 'admin' && (
                          <Link to="/admin" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">Admin Panel</Link>
                        )}
                        <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2">
                          <LogOut size={12} /> Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={handleLoginClick}
                    className="flex items-center gap-1.5 text-xs font-semibold text-rental-navy border border-rental-border px-3.5 py-1.5 rounded-md hover:bg-rental-bg transition-colors"
                  >
                    <LogIn size={13} /> Sign In
                  </button>
                )}

                <Link to="/list-vehicle" className="btn-primary-rental text-sm py-2 px-5">List Your Vehicle</Link>
              </div>

              {/* Mobile toggle */}
              <button
                id="nav-mobile-toggle-rental"
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-lg text-rental-navy hover:bg-rental-bg transition-colors"
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile drawer */}
          {menuOpen && (
            <div className="md:hidden bg-white border-t border-rental-border px-6 py-4 flex flex-col gap-4">
              <Link to="/"               className="text-sm text-rental-muted hover:text-rental-navy">Show Rentals</Link>
              <Link to="/browse"         className="text-sm text-rental-muted hover:text-rental-navy">Browse All</Link>
              <Link to="/how-it-works"   className="text-sm text-rental-muted hover:text-rental-navy">How It Works</Link>
              <Link to="/about"          className="text-sm text-rental-muted hover:text-rental-navy">About Us</Link>
              <Link to="/contact"        className="text-sm text-rental-muted hover:text-rental-navy">Contact</Link>
              
              <button
                onClick={() => { setMenuOpen(false); handleLoginClick() }}
                className="text-sm font-semibold text-rental-navy text-left flex items-center gap-2 py-1"
              >
                <LogIn size={15} /> Sign In / Account
              </button>

              <Link to="/list-vehicle"   className="btn-primary-rental text-sm text-center">List Your Vehicle</Link>
            </div>
          )}
        </nav>

        <LoginModal
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          onLoginSuccess={(user) => setCurrentUser(user)}
        />
      </>
    )
  }

  /* ── SHOW RENTALS NAV (Dark / Gold) ──────────────────── */
  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400
          ${scrolled ? 'bg-glass-dark border-b border-soul-border shadow-card' : 'bg-transparent'}`}
      >
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 40px' }}>
          <div className="flex items-center justify-between h-16 lg:h-20">

            {/* Logo */}
            <Link to="/" className="flex flex-col leading-none group">
              <span
                className="text-soul-gold group-hover:text-soul-gold-light transition-colors"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  fontSize: 'clamp(1.15rem, 2.5vw, 1.4rem)',
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                }}
              >
                OLDSOUL
              </span>
              <span
                className="text-soul-muted uppercase"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '0.55rem',
                  letterSpacing: '0.22em',
                  marginTop: '2px',
                }}
              >
                Rent. Display. Inspire.
              </span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden lg:flex items-center gap-6">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === '/'}
                  className={({ isActive }) =>
                    `relative pb-1 transition-colors duration-200
                     after:absolute after:bottom-0 after:left-0 after:h-[1px] after:bg-soul-gold
                     after:transition-all after:duration-300
                     ${isActive
                       ? 'text-soul-gold after:w-full'
                       : 'text-soul-cream/75 hover:text-soul-gold after:w-0 hover:after:w-full'
                     }`
                  }
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '0.82rem',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                  }}
                >
                  {label}
                </NavLink>
              ))}

              {/* Normal Rentals button */}
              <Link
                to="/normal-rentals"
                className="flex items-center gap-1.5 text-soul-cream/65 border border-soul-border hover:border-soul-gold hover:text-soul-gold transition-all duration-200"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '0.78rem',
                  fontWeight: 500,
                  letterSpacing: '0.03em',
                  padding: '6px 14px',
                  borderRadius: '3px',
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Normal Rentals
              </Link>
            </div>

            {/* CTA & Sign In */}
            <div className="hidden lg:flex items-center gap-4">
              {currentUser ? (
                <div className="relative">
                  <button
                    onClick={() => setUserDropdown(!userDropdown)}
                    className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-sm bg-soul-card text-soul-gold border border-soul-gold-dim"
                  >
                    <User size={13} /> {currentUser.name}
                  </button>
                  {userDropdown && (
                    <div className="absolute right-0 mt-2 w-44 bg-soul-card border border-soul-border rounded-md shadow-xl py-1 text-xs z-50">
                      {currentUser.role === 'admin' && (
                        <Link to="/admin" className="block px-4 py-2 text-soul-cream hover:text-soul-gold hover:bg-soul-dark">Admin Panel</Link>
                      )}
                      <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-red-400 hover:bg-soul-dark flex items-center gap-2">
                        <LogOut size={12} /> Sign Out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={handleLoginClick}
                  className="flex items-center gap-1.5 text-soul-cream/80 hover:text-soul-gold border border-soul-border hover:border-soul-gold transition-all duration-200"
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '0.78rem',
                    fontWeight: 500,
                    padding: '8px 16px',
                    borderRadius: '3px',
                    cursor: 'pointer',
                  }}
                >
                  <LogIn size={13} /> Sign In
                </button>
              )}

              <Link
                to="/list-vehicle"
                className="btn-gold"
                style={{
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '0.78rem',
                  letterSpacing: '0.08em',
                  padding: '9px 22px',
                }}
              >
                List Your Vehicle
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              id="nav-mobile-toggle-show"
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-soul-cream hover:text-soul-gold transition-colors"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div className="lg:hidden bg-soul-dark/95 backdrop-blur-lg border-t border-soul-border px-6 py-6 flex flex-col gap-5">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide flex items-center justify-between
                   ${isActive ? 'text-soul-gold' : 'text-soul-cream/80'}`
                }
              >
                {label}
                <ChevronRight size={14} className="text-soul-muted" />
              </NavLink>
            ))}
            <Link
              to="/normal-rentals"
              className="text-sm font-medium text-soul-cream/70 flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Normal Rentals
            </Link>

            <button
              onClick={() => { setMenuOpen(false); handleLoginClick() }}
              className="text-sm font-medium text-soul-gold text-left flex items-center gap-2"
            >
              <LogIn size={15} /> Sign In / Account
            </button>

            <div className="pt-2 border-t border-soul-border">
              <Link to="/list-vehicle" className="btn-gold text-sm w-full block text-center">
                List Your Vehicle
              </Link>
            </div>
          </div>
        )}
      </nav>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(user) => setCurrentUser(user)}
      />
    </>
  )
}
