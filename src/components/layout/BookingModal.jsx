import { useState, useEffect } from 'react'
import { X, Calendar, MapPin, User, Mail, Phone, ShieldCheck, CheckCircle2, Ticket } from 'lucide-react'

export default function BookingModal({ isOpen, onClose, vehicle, mode = 'show' }) {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    startDate: '',
    endDate: '',
    eventOrVenue: '',
    notes: '',
    insurance: 'standard',
  })
  const [bookingRef, setBookingRef] = useState('')
  const [days, setDays] = useState(1)

  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate)
      const end = new Date(formData.endDate)
      const diffTime = Math.abs(end - start)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1
      setDays(diffDays)
    } else {
      setDays(1)
    }
  }, [formData.startDate, formData.endDate])

  if (!isOpen || !vehicle) return null

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const rand = Math.floor(10000 + Math.random() * 90000)
    setBookingRef(`OS-${rand}`)
    setSubmitted(true)
  }

  const handleClose = () => {
    setSubmitted(false)
    setFormData({
      name: '',
      email: '',
      phone: '',
      startDate: '',
      endDate: '',
      eventOrVenue: '',
      notes: '',
      insurance: 'standard',
    })
    onClose()
  }

  const isShowMode = mode === 'show'

  const pricePerDay = vehicle.pricePerDay || 0
  const subtotal = pricePerDay * days
  const serviceFee = isShowMode ? Math.round(subtotal * 0.05) : Math.round(subtotal * 0.03)
  const insurancePrice = formData.insurance === 'premium' ? 500 * days : 0
  const total = subtotal + serviceFee + insurancePrice

  const darkInput = {
    width: '100%',
    background: '#0A0A0A',
    border: '1px solid #2A2A2A',
    borderRadius: '4px',
    padding: '10px 12px',
    fontSize: '0.8rem',
    fontFamily: 'Inter, sans-serif',
    color: '#F5EDD6',
    outline: 'none',
  }

  const lightInput = {
    width: '100%',
    background: '#FFFFFF',
    border: '1px solid #E2E8F0',
    borderRadius: '4px',
    padding: '10px 12px',
    fontSize: '0.8rem',
    fontFamily: 'Inter, sans-serif',
    color: '#0F172A',
    outline: 'none',
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.82)',
      backdropFilter: 'blur(4px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px',
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '780px',
        background: isShowMode ? '#111111' : '#FFFFFF',
        border: isShowMode ? '1px solid #2A2A2A' : '1px solid #E2E8F0',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 24px 64px -16px rgba(0,0,0,0.45)',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 24px',
          borderBottom: isShowMode ? '1px solid #2A2A2A' : '1px solid #E2E8F0',
          background: isShowMode ? '#0A0A0A' : '#F8FAFC',
        }}>
          <div>
            <h2 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '1.2rem', fontWeight: 700,
              color: isShowMode ? '#C9A84C' : '#0F172A',
              margin: 0,
            }}>
              {submitted ? 'Reservation Request Received' : 'Request Reservation'}
            </h2>
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '0.72rem',
              color: isShowMode ? '#8A7A5F' : '#64748B',
              margin: '3px 0 0 0',
            }}>
              {vehicle.name} • {vehicle.year}
            </p>
          </div>
          <button
            onClick={handleClose}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: isShowMode ? '#8A7A5F' : '#64748B', display: 'flex',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        {submitted ? (
          <div style={{ padding: '48px 32px', textAlign: 'center' }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '50%',
              background: isShowMode ? 'rgba(201,168,76,0.08)' : '#DCFCE7',
              border: isShowMode ? '1px solid rgba(201,168,76,0.2)' : '1px solid #BBF7D0',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 20px',
            }}>
              <CheckCircle2 size={24} style={{ color: isShowMode ? '#C9A84C' : '#16A34A' }} />
            </div>
            
            <h3 style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: '1.6rem', fontWeight: 700,
              color: isShowMode ? '#F5EDD6' : '#0F172A',
              marginBottom: '8px',
            }}>
              Booking Request Sent
            </h3>
            
            <p style={{
              fontFamily: 'Inter, sans-serif', fontSize: '0.85rem',
              lineHeight: 1.6, color: isShowMode ? '#8A7A5F' : '#475569',
              maxWidth: '420px', margin: '0 auto 32px',
            }}>
              Your reservation request has been logged. The host will confirm availability and secure your slot within 24 hours.
            </p>

            {/* Receipt Summary Card */}
            <div style={{
              maxWidth: '380px', margin: '0 auto 32px', textAlign: 'left',
              background: isShowMode ? '#0A0A0A' : '#F8FAFC',
              border: isShowMode ? '1px solid #2A2A2A' : '1px solid #E2E8F0',
              borderRadius: '6px', padding: '20px',
            }}>
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                paddingBottom: '12px', borderBottom: isShowMode ? '1px dashed #2A2A2A' : '1px dashed #E2E8F0',
                marginBottom: '16px',
              }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.08em', color: '#64748B' }}>
                  REFERENCE NUMBER
                </span>
                <span style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', fontWeight: 700,
                  color: isShowMode ? '#C9A84C' : '#2563EB', display: 'inline-flex', alignItems: 'center', gap: '4px',
                }}>
                  <Ticket size={12} /> {bookingRef}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'Inter, sans-serif', fontSize: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Full Name</span>
                  <span style={{ color: isShowMode ? '#F5EDD6' : '#0F172A', fontWeight: 500 }}>{formData.name}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Period</span>
                  <span style={{ color: isShowMode ? '#F5EDD6' : '#0F172A', fontWeight: 500 }}>{formData.startDate} to {formData.endDate}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Total Duration</span>
                  <span style={{ color: isShowMode ? '#F5EDD6' : '#0F172A', fontWeight: 500 }}>{days} {days === 1 ? 'Day' : 'Days'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px', borderTop: isShowMode ? '1px solid #2A2A2A' : '1px solid #E2E8F0', fontWeight: 700 }}>
                  <span style={{ color: isShowMode ? '#F5EDD6' : '#0F172A' }}>Estimated Bill</span>
                  <span style={{ color: isShowMode ? '#C9A84C' : '#2563EB' }}>₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleClose}
              style={{
                background: isShowMode ? '#C9A84C' : '#2563EB',
                color: isShowMode ? '#0A0A0A' : '#FFFFFF',
                border: 'none', borderRadius: '4px',
                padding: '12px 32px',
                fontFamily: 'Inter, sans-serif', fontSize: '0.8rem',
                fontWeight: 700, letterSpacing: '0.04em', cursor: 'pointer',
              }}
            >
              Close Window
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ margin: 0 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
              
              {/* Form columns */}
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <h3 style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', fontWeight: 700,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: isShowMode ? '#C9A84C' : '#2563EB', margin: '0 0 4px 0',
                }}>
                  Renter Information
                </h3>
                
                <div>
                  <label className="block text-slate-500 text-xs mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Rajan Nair"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={isShowMode ? darkInput : lightInput}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label className="block text-slate-500 text-xs mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="rajan@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      style={isShowMode ? darkInput : lightInput}
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 text-xs mb-1">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98765..."
                      value={formData.phone}
                      onChange={handleInputChange}
                      style={isShowMode ? darkInput : lightInput}
                    />
                  </div>
                </div>

                <h3 style={{
                  fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', fontWeight: 700,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: isShowMode ? '#C9A84C' : '#2563EB', margin: '8px 0 4px 0',
                }}>
                  Duration & Logistics
                </h3>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div>
                    <label className="block text-slate-500 text-xs mb-1">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      required
                      value={formData.startDate}
                      onChange={handleInputChange}
                      style={isShowMode ? darkInput : lightInput}
                    />
                  </div>
                  <div>
                    <label className="block text-slate-500 text-xs mb-1">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      required
                      value={formData.endDate}
                      onChange={handleInputChange}
                      style={isShowMode ? darkInput : lightInput}
                    />
                  </div>
                </div>

                {isShowMode ? (
                  <div>
                    <label className="block text-slate-500 text-xs mb-1">Show Location / Venue</label>
                    <input
                      type="text"
                      name="eventOrVenue"
                      required
                      placeholder="e.g. Grand Hyatt Exhibition Hall"
                      value={formData.eventOrVenue}
                      onChange={handleInputChange}
                      style={darkInput}
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-slate-500 text-xs mb-1">Insurance Cover</label>
                    <select
                      name="insurance"
                      value={formData.insurance}
                      onChange={handleInputChange}
                      style={{ ...lightInput, cursor: 'pointer' }}
                    >
                      <option value="standard">Standard Cover (Included)</option>
                      <option value="premium">Full Shield Cover (+₹500/day)</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-slate-500 text-xs mb-1">Logistics / Specific Requests</label>
                  <textarea
                    name="notes"
                    rows={2}
                    placeholder={isShowMode ? "Describe standard display timing, logistics..." : "Delivery requests..."}
                    value={formData.notes}
                    onChange={handleInputChange}
                    style={{ ...(isShowMode ? darkInput : lightInput), resize: 'none' }}
                  />
                </div>
              </div>

              {/* Pricing Column */}
              <div style={{
                padding: '24px',
                background: isShowMode ? '#0A0A0A' : '#F8FAFC',
                borderLeft: isShowMode ? '1px solid #2A2A2A' : '1px solid #E2E8F0',
                display: 'flex', flexDirection: 'column', justifySelf: 'stretch', justifyContent: 'space-between',
              }}>
                <div>
                  <h3 style={{
                    fontFamily: 'Inter, sans-serif', fontSize: '0.62rem', fontWeight: 700,
                    letterSpacing: '0.12em', textTransform: 'uppercase',
                    color: isShowMode ? '#C9A84C' : '#2563EB', margin: '0 0 16px 0',
                    borderBottom: isShowMode ? '1px solid #2A2A2A' : '1px solid #E2E8F0',
                    paddingBottom: '8px',
                  }}>
                    Order Overview
                  </h3>

                  <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      style={{ width: '80px', height: '56px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                    <div>
                      <h4 style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', fontWeight: 700, margin: 0, color: isShowMode ? '#F5EDD6' : '#0F172A' }}>
                        {vehicle.name}
                      </h4>
                      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.68rem', color: '#64748B', margin: '2px 0 0 0' }}>
                        ₹{pricePerDay.toLocaleString()} / day
                      </p>
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'Inter, sans-serif', fontSize: '0.72rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748B' }}>Daily Rent</span>
                      <span style={{ color: isShowMode ? '#F5EDD6' : '#0F172A' }}>₹{pricePerDay.toLocaleString()}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748B' }}>Days Selected</span>
                      <span style={{ color: isShowMode ? '#F5EDD6' : '#0F172A' }}>{days}</span>
                    </div>
                    {formData.insurance === 'premium' && (
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#16A34A', fontWeight: 500 }}>Zero-Dep Insurance</span>
                        <span style={{ color: '#16A34A', fontWeight: 500 }}>+₹{(500 * days).toLocaleString()}</span>
                      </div>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: '#64748B' }}>Platform Fee</span>
                      <span style={{ color: isShowMode ? '#F5EDD6' : '#0F172A' }}>₹{serviceFee.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div style={{ borderTop: isShowMode ? '1px solid #2A2A2A' : '1px solid #E2E8F0', paddingTop: '16px', marginTop: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px' }}>
                    <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.78rem', fontWeight: 700, color: isShowMode ? '#F5EDD6' : '#0F172A' }}>
                      Estimated Total
                    </span>
                    <span style={{
                      fontFamily: 'Inter, sans-serif', fontSize: '1.25rem', fontWeight: 800,
                      color: isShowMode ? '#C9A84C' : '#2563EB',
                    }}>
                      ₹{total.toLocaleString()}
                    </span>
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: '100%',
                      background: isShowMode ? '#C9A84C' : '#2563EB',
                      color: isShowMode ? '#0A0A0A' : '#FFFFFF',
                      border: 'none', borderRadius: '4px',
                      padding: '12px',
                      fontFamily: 'Inter, sans-serif', fontSize: '0.8rem',
                      fontWeight: 700, letterSpacing: '0.04em', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    }}
                  >
                    <ShieldCheck size={14} /> Request Reservation
                  </button>
                </div>
              </div>

            </div>
          </form>
        )}
      </div>
    </div>
  )
}
