import { useState } from 'react'
import { Shield, Lock, Mail, ArrowRight, KeyRound, Sparkles } from 'lucide-react'
import { login } from '../../services/authService'

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleFillCredentials = () => {
    setEmail('admin@oldsoul.in')
    setPassword('admin123')
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const res = await login(email, password, 'admin')
      if (res.success) {
        onLogin(res.user)
      }
    } catch (err) {
      setError(err.message || 'Invalid admin credentials.')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(circle at top center, #1A1810 0%, #0A0A0A 80%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '420px',
        background: '#0D0D0D',
        border: '1px solid rgba(201,168,76,0.3)',
        borderRadius: '16px',
        padding: '36px 32px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(201,168,76,0.1)',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '12px',
            background: 'linear-gradient(135deg, #C9A84C 0%, #E8C96A 100%)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '16px', boxShadow: '0 0 20px rgba(201,168,76,0.3)'
          }}>
            <Shield size={24} color="#0A0A0A" />
          </div>

          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.6rem', fontWeight: 700, color: '#F5EDD6', margin: '0 0 4px 0' }}>
            OLDSOUL Admin
          </h1>
          <p style={{ fontSize: '0.78rem', color: '#8A7A5F', margin: 0 }}>
            Sign in to access control panel & management
          </p>
        </div>

        {/* Credentials Notice Box */}
        <div style={{
          background: 'rgba(201,168,76,0.08)',
          border: '1px solid rgba(201,168,76,0.25)',
          borderRadius: '10px',
          padding: '14px 16px',
          marginBottom: '24px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#C9A84C', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <KeyRound size={12} /> Sign-in Credentials
            </span>
            <button
              onClick={handleFillCredentials}
              type="button"
              style={{
                background: '#C9A84C', color: '#0A0A0A', border: 'none',
                borderRadius: '4px', padding: '2px 8px', fontSize: '0.62rem',
                fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px'
              }}
            >
              <Sparkles size={10} /> Auto-Fill
            </button>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#F5EDD6', display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div>Email: <strong style={{ color: '#E8C96A' }}>admin@oldsoul.in</strong></div>
            <div>Password: <strong style={{ color: '#E8C96A' }}>admin123</strong></div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.72rem', fontWeight: 600, color: '#8A7A5F', display: 'block', marginBottom: '6px' }}>
              Admin Email
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={15} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#6B6B6B' }} />
              <input
                required
                type="email"
                placeholder="admin@oldsoul.in"
                value={email}
                onChange={e => setEmail(e.target.value)}
                style={{
                  width: '100%', padding: '11px 12px 11px 38px',
                  background: '#141414', border: '1px solid #222', borderRadius: '8px',
                  color: '#F5EDD6', fontSize: '0.82rem', outline: 'none',
                  fontFamily: 'Inter, sans-serif',
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
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{
                  width: '100%', padding: '11px 12px 11px 38px',
                  background: '#141414', border: '1px solid #222', borderRadius: '8px',
                  color: '#F5EDD6', fontSize: '0.82rem', outline: 'none',
                  fontFamily: 'Inter, sans-serif',
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
              marginTop: '8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              background: 'linear-gradient(135deg, #C9A84C 0%, #E8C96A 100%)',
              color: '#0A0A0A', border: 'none', borderRadius: '8px',
              padding: '12px', fontFamily: 'Inter, sans-serif', fontSize: '0.85rem',
              fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s ease',
              boxShadow: '0 4px 15px rgba(201,168,76,0.2)'
            }}
          >
            Sign In to Dashboard <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <a href="/" style={{ fontSize: '0.72rem', color: '#6B6B6B', textDecoration: 'none' }}>
            ← Back to OldSoul Main Site
          </a>
        </div>
      </div>
    </div>
  )
}
