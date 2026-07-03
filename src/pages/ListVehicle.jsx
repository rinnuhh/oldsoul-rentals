import { useState } from 'react'
import { Car, Upload, MapPin, Phone, CheckCircle2, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const vehicleCategories = ['Vintage Car', 'Vintage Bike', 'Modern Car', 'Modified Car', 'Classic Truck', 'Other']

const container = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '0 40px',
}

const inputStyle = {
  width: '100%',
  background: '#0A0A0A',
  border: '1px solid #2A2A2A',
  borderRadius: '4px',
  padding: '12px 14px',
  fontSize: '0.85rem',
  fontFamily: 'Inter, sans-serif',
  color: '#F5EDD6',
  outline: 'none',
  transition: 'border-color 0.25s, box-shadow 0.25s',
}

export default function ListVehicle() {
  const [submitted, setSubmitted] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    vehicleName: '', year: '', category: '', location: '',
    pricePerDay: '', description: '', terms: false,
  })

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-soul-black min-h-screen pt-32 pb-20 flex items-center justify-center px-4">
        <div style={{
          background: '#111111',
          border: '1px solid #2A2A2A',
          borderRadius: '8px',
          padding: '48px 32px',
          maxWidth: '440px',
          width: '100%',
          textAlign: 'center',
        }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%',
            background: 'rgba(201,168,76,0.08)',
            border: '1px solid rgba(201,168,76,0.3)',
            display: 'flex', alignItems: 'center', justifySelf: 'center', justifyContent: 'center',
            margin: '0 auto 24px',
          }}>
            <CheckCircle2 size={28} style={{ color: '#C9A84C' }} />
          </div>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: '1.8rem', fontWeight: 700,
            color: '#F5EDD6', marginBottom: '14px',
          }}>
            Listing Submitted
          </h2>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.85rem', lineHeight: 1.65,
            color: '#8A7A5F', marginBottom: '32px',
          }}>
            Our curators will review your submission and contact you within 24 hours. Welcome to the OldSoul circle.
          </p>
          <Link
            to="/"
            style={{
              display: 'inline-block',
              fontFamily: 'Inter, sans-serif', fontSize: '0.78rem',
              fontWeight: 600, letterSpacing: '0.08em',
              textTransform: 'uppercase', textDecoration: 'none',
              padding: '12px 32px', background: '#C9A84C', color: '#0A0A0A',
              borderRadius: '4px',
            }}
          >
            Return Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-soul-black min-h-screen pt-28 lg:pt-32 pb-24">
      {/* Header */}
      <div style={{ marginBottom: '48px' }}>
        <div style={container}>
          <Link
            to="/"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              fontFamily: 'Inter, sans-serif', fontSize: '0.78rem',
              color: '#8A7A5F', textDecoration: 'none', marginBottom: '24px',
            }}
          >
            <ArrowLeft size={14} /> Back to Showcase
          </Link>
          
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.62rem', fontWeight: 600,
            letterSpacing: '0.26em', textTransform: 'uppercase',
            color: '#C9A84C', marginBottom: '10px',
          }}>
            Join the Circle
          </p>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(2.2rem, 4vw, 3rem)',
            fontWeight: 700, color: '#F5EDD6', margin: 0,
          }}>
            List Your{' '}
            <span style={{
              background: 'linear-gradient(135deg, #C9A84C 0%, #E8C96A 50%, #C9A84C 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              fontStyle: 'italic',
            }}>
              Automobile
            </span>
          </h1>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: '0.88rem', color: '#8A7A5F',
            marginTop: '10px', maxWidth: '480px', lineHeight: 1.6,
          }}>
            Connect with premium auto shows, production houses, and enthusiasts. Share your passion, represent the culture.
          </p>
        </div>
      </div>

      {/* Form Area */}
      <div style={container}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Card 1: Owner */}
          <div style={{
            background: '#111111',
            border: '1px solid #2A2A2A',
            borderRadius: '6px',
            padding: '32px',
          }}>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '1.1rem', fontWeight: 600,
              color: '#F5EDD6', marginBottom: '24px',
              display: 'flex', alignItems: 'center', gap: '10px',
            }}>
              <Phone size={16} style={{ color: '#C9A84C' }} /> Contact Details
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              <div>
                <label className="block text-soul-muted text-xs mb-1.5 font-medium tracking-wide uppercase">Full Name</label>
                <input
                  id="form-owner-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Rajan Nair"
                  value={form.name}
                  onChange={handleChange}
                  style={inputStyle}
                  className="focus-ring"
                />
              </div>
              <div>
                <label className="block text-soul-muted text-xs mb-1.5 font-medium tracking-wide uppercase">Phone Number</label>
                <input
                  id="form-owner-phone"
                  name="phone"
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={handleChange}
                  style={inputStyle}
                  className="focus-ring"
                />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label className="block text-soul-muted text-xs mb-1.5 font-medium tracking-wide uppercase">Email Address</label>
                <input
                  id="form-owner-email"
                  name="email"
                  type="email"
                  required
                  placeholder="rajan@example.com"
                  value={form.email}
                  onChange={handleChange}
                  style={inputStyle}
                  className="focus-ring"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Vehicle */}
          <div style={{
            background: '#111111',
            border: '1px solid #2A2A2A',
            borderRadius: '6px',
            padding: '32px',
          }}>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '1.1rem', fontWeight: 600,
              color: '#F5EDD6', marginBottom: '24px',
              display: 'flex', alignItems: 'center', gap: '10px',
            }}>
              <Car size={16} style={{ color: '#C9A84C' }} /> Vehicle Details
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
              <div>
                <label className="block text-soul-muted text-xs mb-1.5 font-medium tracking-wide uppercase">Vehicle Model Name</label>
                <input
                  id="form-vehicle-name"
                  name="vehicleName"
                  type="text"
                  required
                  placeholder="e.g. Mercedes-Benz 220S"
                  value={form.vehicleName}
                  onChange={handleChange}
                  style={inputStyle}
                  className="focus-ring"
                />
              </div>
              <div>
                <label className="block text-soul-muted text-xs mb-1.5 font-medium tracking-wide uppercase">Year of Manufacture</label>
                <input
                  id="form-vehicle-year"
                  name="year"
                  type="number"
                  required
                  min="1900"
                  max="2026"
                  placeholder="e.g. 1967"
                  value={form.year}
                  onChange={handleChange}
                  style={inputStyle}
                  className="focus-ring"
                />
              </div>
              <div>
                <label className="block text-soul-muted text-xs mb-1.5 font-medium tracking-wide uppercase">Classification</label>
                <select
                  id="form-vehicle-category"
                  name="category"
                  required
                  value={form.category}
                  onChange={handleChange}
                  style={{ ...inputStyle, cursor: 'pointer', appearance: 'none' }}
                  className="focus-ring"
                >
                  <option value="" style={{ background: '#111' }}>Select category</option>
                  {vehicleCategories.map(c => <option key={c} value={c} style={{ background: '#111' }}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-soul-muted text-xs mb-1.5 font-medium tracking-wide uppercase">Desired Price per Day (₹)</label>
                <input
                  id="form-vehicle-price"
                  name="pricePerDay"
                  type="number"
                  required
                  placeholder="e.g. 8000"
                  value={form.pricePerDay}
                  onChange={handleChange}
                  style={inputStyle}
                  className="focus-ring"
                />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label className="block text-soul-muted text-xs mb-1.5 font-medium tracking-wide uppercase">City / Location</label>
                <div style={{ position: 'relative' }}>
                  <MapPin size={14} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#8A7A5F' }} />
                  <input
                    id="form-vehicle-location"
                    name="location"
                    type="text"
                    required
                    placeholder="e.g. Kochi, Kerala"
                    value={form.location}
                    onChange={handleChange}
                    style={{ ...inputStyle, paddingLeft: '36px' }}
                    className="focus-ring"
                  />
                </div>
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label className="block text-soul-muted text-xs mb-1.5 font-medium tracking-wide uppercase">History & Special Specs</label>
                <textarea
                  id="form-vehicle-desc"
                  name="description"
                  rows={4}
                  placeholder="Tell us about the vehicle's heritage, custom modifications, display history..."
                  value={form.description}
                  onChange={handleChange}
                  style={{ ...inputStyle, resize: 'none' }}
                  className="focus-ring"
                />
              </div>
            </div>
          </div>

          {/* Card 3: Photo Upload */}
          <div
            onDragOver={e => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={e => { e.preventDefault(); setDragActive(false); }}
            style={{
              background: dragActive ? 'rgba(201,168,76,0.04)' : '#111111',
              border: dragActive ? '1px dashed #C9A84C' : '1px dashed #2A2A2A',
              borderRadius: '6px',
              padding: '48px 32px',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'border-color 0.25s, background 0.25s',
            }}
          >
            <Upload size={24} style={{ color: '#8A7A5F', margin: '0 auto 16px' }} />
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '0.85rem',
              fontWeight: 600, color: '#F5EDD6', marginBottom: '6px',
            }}>
              Upload High Resolution Photos
            </p>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '0.72rem',
              color: '#8A7A5F',
            }}>
              Drag and drop files, or click to browse. Max 10MB per file.
            </p>
          </div>

          {/* Verification terms */}
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer', margin: '8px 0' }}>
            <input
              id="form-terms-checkbox"
              name="terms"
              type="checkbox"
              required
              checked={form.terms}
              onChange={handleChange}
              style={{ accentColor: '#C9A84C', marginTop: '3px' }}
            />
            <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', lineHeight: 1.5, color: '#8A7A5F' }}>
              I certify that I am the owner or authorized representative of this automobile and agree to OldSoul's{' '}
              <Link to="/" style={{ color: '#C9A84C', textDecoration: 'none' }}>Community Standards</Link>.
            </span>
          </label>

          {/* Submit Button */}
          <button
            id="form-submit-btn"
            type="submit"
            style={{
              width: '100%',
              background: '#C9A84C',
              color: '#0A0A0A',
              border: 'none',
              borderRadius: '4px',
              padding: '16px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.82rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            className="submit-btn"
          >
            Submit Listing for Verification
          </button>

        </form>
      </div>

      <style>{`
        .focus-ring:focus {
          border-color: rgba(201, 168, 76, 0.6) !important;
          box-shadow: 0 0 0 3px rgba(201, 168, 76, 0.1) !important;
        }
        .submit-btn:hover {
          background-color: #E8C96A !important;
        }
      `}</style>
    </div>
  )
}
