import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Shield, User, Building2, Lock, Mail, ArrowRight, Check } from 'lucide-react'
import { login } from '../services/authService'

export default function LoginPage() {
  const [roleTab, setRoleTab] = useState('user')
  const [email, setEmail] = useState('ananya.roy@gmail.com')
  const [password, setPassword] = useState('user123')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleRoleSelect = (role) => {
    setRoleTab(role)
    setError('')
    if (role === 'user') {
      setEmail('ananya.roy@gmail.com')
      setPassword('user123')
    } else if (role === 'host') {
      setEmail('rajan.nair@gmail.com')
      setPassword('owner123')
    } else if (role === 'admin') {
      setEmail('admin@oldsoul.in')
      setPassword('admin123')
    }
  }

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await login(email, password, roleTab)
      if (res.success) {
        if (roleTab === 'admin') {
          navigate('/admin')
        } else if (roleTab === 'host') {
          navigate('/list-vehicle')
        } else {
          navigate('/')
        }
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check credentials.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      paddingTop: '100px',
      paddingBottom: '60px',
      background: 'radial-gradient(circle at top center, #1A1810 0%, #0A0A0A 80%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '100px 20px 60px',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{
        width: '100%', maxWidth: '440px',
        background: '#0D0D0D',
        border: '1px solid rgba(201,168,76,0.35)',
        borderRadius: '16px',
        padding: '36px 30px',
        boxShadow: '0 25px 60px rgba(0,0,0,0.9), 0 0 35px rgba(201,168,76,0.12)',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #C9A84C, #E8C96A)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '14px', boxShadow: '0 0 20px rgba(201,168,76,0.3)'
          }}>
            <Shield size={24} color="#0A0A0A" />
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.6rem', fontWeight: 700, color: '#F5EDD6', margin: '0 0 4px 0' }}>
            Account Sign In
          </h1>
          <p style={{ fontSize: '0.78rem', color: '#8A7A5F', margin: 0 }}>
            Access your bookings, vehicle listings, or control panel
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', background: '#141414', padding: '4px', borderRadius: '10px', marginBottom: '20px', border: '1px solid #222' }}>
          {[
            { id: 'user', label: 'Renter', icon: User },
            { id: 'host', label: 'Host', icon: Building2 },
            { id: 'admin', label: 'Admin', icon: Shield },
          ].map(({ id, label, icon: Icon }) => {
            const isActive = roleTab === id
            return (
              <button
                key={id}
                type="button"
                onClick={() => handleRoleSelect(id)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
                  padding: '9px 10px', borderRadius: '7px', border: 'none',
                  fontSize: '0.76rem', fontWeight: 700, cursor: 'pointer',
                  background: isActive ? '#C9A84C' : 'transparent',
                  color: isActive ? '#0A0A0A' : '#8A7A5F',
                  transition: 'all 0.2s ease',
                }}
              >
                <Icon size={14} /> {label}
              </button>
            )
          })}
        </div>

        {/* Demo Credentials Notice */}
        <div style={{
          background: 'rgba(201,168,76,0.08)',
          border: '1px solid rgba(201,168,76,0.25)',
          borderRadius: '8px',
          padding: '10px 14px',
          marginBottom: '18px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <div style={{ fontSize: '0.6rem', fontWeight: 700, color: '#C9A84C', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              {roleTab.toUpperCase()} DEMO CREDENTIALS
            </div>
            <div style={{ fontSize: '0.75rem', color: '#F5EDD6' }}>
              {roleTab === 'user' && 'ananya.roy@gmail.com / user123'}
              {roleTab === 'host' && 'rajan.nair@gmail.com / owner123'}
              {roleTab === 'admin' && 'admin@oldsoul.in / admin123'}
            </div>
          </div>
          <span style={{ fontSize: '0.62rem', color: '#22C55E', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '2px' }}>
            <Check size={12} /> Auto-Loaded
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#8A7A5F', display: 'block', marginBottom: '6px' }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6B6B6B' }} />
              <input
                required
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  width: '100%', padding: '10px 12px 10px 38px',
                  background: '#141414', border: '1px solid #222', borderRadius: '8px',
                  color: '#F5EDD6', fontSize: '0.8rem', outline: 'none',
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#8A7A5F', display: 'block', marginBottom: '6px' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6B6B6B' }} />
              <input
                required
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{
                  width: '100%', padding: '10px 12px 10px 38px',
                  background: '#141414', border: '1px solid #222', borderRadius: '8px',
                  color: '#F5EDD6', fontSize: '0.8rem', outline: 'none',
                }}
              />
            </div>
          </div>

          {error && (
            <div style={{ fontSize: '0.72rem', color: '#EF4444', background: 'rgba(239,68,68,0.1)', padding: '8px 12px', borderRadius: '6px', border: '1px solid rgba(239,68,68,0.25)' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            style={{
              marginTop: '6px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              background: 'linear-gradient(135deg, #C9A84C 0%, #E8C96A 100%)',
              color: '#0A0A0A', border: 'none', borderRadius: '8px',
              padding: '12px', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem',
              fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s ease',
              boxShadow: '0 4px 15px rgba(201,168,76,0.2)'
            }}
          >
            Sign In as {roleTab === 'user' ? 'Customer' : roleTab === 'host' ? 'Host' : 'Admin'} <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.74rem', color: '#6B6B6B' }}>
          ← <Link to="/" style={{ color: '#C9A84C', textDecoration: 'none', fontWeight: 600 }}>Back to Home Page</Link>
        </div>
      </div>
    </div>
  )
}
