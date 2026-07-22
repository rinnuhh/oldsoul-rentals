import { useState, useEffect } from 'react'
import { Search, CheckCircle, XCircle, Clock, Calendar, AlertCircle, Eye, CreditCard, ShieldCheck } from 'lucide-react'
import { getAllBookings } from '../../services/bookingService'

export default function AdminBookings() {
  const [bookingList, setBookingList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAllBookings()
      .then(data => {
        const normalized = data.map(b => ({
          ...b,
          bookingCode: b.booking_code,
          userName: b.user_name,
          ownerName: b.host_name,
          vehicle: b.vehicle_name,
          vehicleType: b.vehicle_type,
          startDate: b.start_date,
          endDate: b.end_date,
          paymentStatus: b.payment_status,
          createdAt: b.created_at,
          amount: Number(b.amount)
        }))
        setBookingList(normalized)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedBooking, setSelectedBooking] = useState(null)

  const updateBookingStatus = (id, newStatus, newPaymentStatus) => {
    setBookingList(prev => prev.map(b => {
      if (b.id === id) {
        return {
          ...b,
          status: newStatus,
          paymentStatus: newPaymentStatus || b.paymentStatus
        }
      }
      return b
    }))
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking(prev => ({
        ...prev,
        status: newStatus,
        paymentStatus: newPaymentStatus || prev.paymentStatus
      }))
    }
  }

  const filtered = bookingList.filter(b => {
    const matchSearch = b.id.toLowerCase().includes(search.toLowerCase()) ||
                        b.userName.toLowerCase().includes(search.toLowerCase()) ||
                        b.vehicle.toLowerCase().includes(search.toLowerCase()) ||
                        b.ownerName.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || b.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#F5EDD6', margin: '0 0 4px 0' }}>Bookings & Reservations Control</h2>
        <p style={{ fontSize: '0.78rem', color: '#8A7A5F', margin: 0 }}>Review rental reservations, approve pending bookings, inspect payments, and issue refunds.</p>
      </div>

      {/* Filter controls */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', background: '#0D0D0D', padding: '14px 18px', border: '1px solid #1E1E1E', borderRadius: '8px', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#6B6B6B' }} />
          <input
            placeholder="Search booking ID, customer, vehicle or host..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width: '100%', padding: '8px 10px 8px 32px',
              background: '#141414', border: '1px solid #222', borderRadius: '6px',
              color: '#F5EDD6', fontSize: '0.78rem', outline: 'none',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          {['all', 'pending', 'confirmed', 'completed', 'cancelled'].map(st => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              style={{
                textTransform: 'capitalize', fontSize: '0.72rem', fontWeight: 600,
                padding: '6px 14px', borderRadius: '4px', cursor: 'pointer',
                background: statusFilter === st ? 'rgba(201,168,76,0.15)' : '#141414',
                color: statusFilter === st ? '#C9A84C' : '#8A7A5F',
                border: statusFilter === st ? '1px solid #C9A84C' : '1px solid #222',
              }}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings Table */}
      <div style={{ background: '#0D0D0D', border: '1px solid #1E1E1E', borderRadius: '10px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.78rem' }}>
          <thead>
            <tr style={{ background: '#141414', borderBottom: '1px solid #1E1E1E', color: '#8A7A5F', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              <th style={{ padding: '14px 18px' }}>Booking Ref</th>
              <th style={{ padding: '14px 18px' }}>Vehicle</th>
              <th style={{ padding: '14px 18px' }}>Customer & Host</th>
              <th style={{ padding: '14px 18px' }}>Dates & Purpose</th>
              <th style={{ padding: '14px 18px' }}>Total Amount</th>
              <th style={{ padding: '14px 18px' }}>Status</th>
              <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(b => (
              <tr key={b.id} style={{ borderBottom: '1px solid #141414' }}>
                <td style={{ padding: '14px 18px' }}>
                  <div style={{ fontWeight: 700, color: '#C9A84C' }}>{b.id}</div>
                  <div style={{ fontSize: '0.65rem', color: '#6B6B6B' }}>Created {b.createdAt}</div>
                </td>

                <td style={{ padding: '14px 18px' }}>
                  <div style={{ fontWeight: 600, color: '#F5EDD6' }}>{b.vehicle}</div>
                  <span style={{ fontSize: '0.62rem', padding: '2px 6px', borderRadius: '3px', background: b.vehicleType === 'show' ? 'rgba(201,168,76,0.15)' : 'rgba(37,99,235,0.15)', color: b.vehicleType === 'show' ? '#C9A84C' : '#3B82F6', textTransform: 'uppercase', fontWeight: 700 }}>
                    {b.vehicleType}
                  </span>
                </td>

                <td style={{ padding: '14px 18px' }}>
                  <div style={{ color: '#F5EDD6' }}>👤 {b.userName}</div>
                  <div style={{ fontSize: '0.68rem', color: '#8A7A5F' }}>Host: {b.ownerName}</div>
                </td>

                <td style={{ padding: '14px 18px' }}>
                  <div style={{ color: '#F5EDD6' }}>{b.startDate} to {b.endDate}</div>
                  <div style={{ fontSize: '0.68rem', color: '#6B6B6B' }}>{b.purpose} ({b.days} days)</div>
                </td>

                <td style={{ padding: '14px 18px' }}>
                  <div style={{ fontWeight: 700, color: '#F5EDD6' }}>₹{b.amount.toLocaleString()}</div>
                  <div style={{ fontSize: '0.64rem', color: b.paymentStatus === 'paid' ? '#22C55E' : b.paymentStatus === 'pending' ? '#EAB308' : '#EF4444', textTransform: 'uppercase', fontWeight: 600 }}>
                    ● {b.paymentStatus}
                  </div>
                </td>

                <td style={{ padding: '14px 18px' }}>
                  <span style={{
                    display: 'inline-block', padding: '3px 8px', borderRadius: '4px',
                    fontSize: '0.64rem', fontWeight: 700, textTransform: 'uppercase',
                    background: b.status === 'confirmed' ? 'rgba(34,197,94,0.12)' : b.status === 'pending' ? 'rgba(234,179,8,0.12)' : b.status === 'completed' ? 'rgba(59,130,246,0.12)' : 'rgba(239,68,68,0.12)',
                    color: b.status === 'confirmed' ? '#22C55E' : b.status === 'pending' ? '#EAB308' : b.status === 'completed' ? '#3B82F6' : '#EF4444',
                    border: b.status === 'confirmed' ? '1px solid rgba(34,197,94,0.3)' : b.status === 'pending' ? '1px solid rgba(234,179,8,0.3)' : b.status === 'completed' ? '1px solid rgba(59,130,246,0.3)' : '1px solid rgba(239,68,68,0.3)',
                  }}>
                    {b.status}
                  </span>
                </td>

                <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                    {b.status === 'pending' && (
                      <>
                        <button
                          onClick={() => updateBookingStatus(b.id, 'confirmed', 'paid')}
                          style={{ background: '#22C55E', color: '#0A0A0A', border: 'none', borderRadius: '4px', padding: '5px 10px', fontSize: '0.68rem', fontWeight: 700, cursor: 'pointer' }}
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => updateBookingStatus(b.id, 'cancelled', 'refunded')}
                          style={{ background: 'rgba(239,68,68,0.15)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '4px', padding: '5px 10px', fontSize: '0.68rem', cursor: 'pointer' }}
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {b.status === 'confirmed' && (
                      <button
                        onClick={() => updateBookingStatus(b.id, 'completed', 'paid')}
                        style={{ background: 'rgba(59,130,246,0.15)', color: '#3B82F6', border: '1px solid rgba(59,130,246,0.3)', borderRadius: '4px', padding: '5px 10px', fontSize: '0.68rem', cursor: 'pointer' }}
                      >
                        Mark Complete
                      </button>
                    )}

                    <button
                      onClick={() => setSelectedBooking(b)}
                      style={{ background: '#1A1A1A', color: '#8A7A5F', border: '1px solid #2A2A2A', borderRadius: '4px', padding: '5px 8px', cursor: 'pointer' }}
                      title="View Details"
                    >
                      <Eye size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#0D0D0D', border: '1px solid #1E1E1E', borderRadius: '12px', width: '90%', maxWidth: '520px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #1E1E1E', paddingBottom: '12px' }}>
              <div>
                <span style={{ fontSize: '0.68rem', color: '#C9A84C', fontWeight: 700, letterSpacing: '0.08em' }}>BOOKING INSPECTION</span>
                <h3 style={{ fontSize: '1.2rem', color: '#F5EDD6', margin: 0 }}>{selectedBooking.id}</h3>
              </div>
              <button onClick={() => setSelectedBooking(null)} style={{ background: 'none', border: 'none', color: '#6B6B6B', fontSize: '1.2rem', cursor: 'pointer' }}>✕</button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.8rem' }}>
              <div style={{ background: '#141414', padding: '12px', borderRadius: '8px', border: '1px solid #222' }}>
                <div style={{ fontSize: '0.7rem', color: '#8A7A5F', marginBottom: '2px' }}>Vehicle Requested</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#F5EDD6' }}>{selectedBooking.vehicle} ({selectedBooking.vehicleType})</div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div style={{ background: '#141414', padding: '12px', borderRadius: '8px', border: '1px solid #222' }}>
                  <div style={{ fontSize: '0.7rem', color: '#8A7A5F' }}>Renter Customer</div>
                  <div style={{ fontWeight: 600, color: '#F5EDD6' }}>{selectedBooking.userName}</div>
                </div>
                <div style={{ background: '#141414', padding: '12px', borderRadius: '8px', border: '1px solid #222' }}>
                  <div style={{ fontSize: '0.7rem', color: '#8A7A5F' }}>Host Partner</div>
                  <div style={{ fontWeight: 600, color: '#F5EDD6' }}>{selectedBooking.ownerName}</div>
                </div>
              </div>

              <div style={{ background: '#141414', padding: '12px', borderRadius: '8px', border: '1px solid #222' }}>
                <div style={{ fontSize: '0.7rem', color: '#8A7A5F' }}>Rental Period & Purpose</div>
                <div style={{ fontWeight: 600, color: '#F5EDD6' }}>{selectedBooking.startDate} — {selectedBooking.endDate} ({selectedBooking.days} Days)</div>
                <div style={{ fontSize: '0.72rem', color: '#C9A84C', marginTop: '4px' }}>Event/Purpose: {selectedBooking.purpose}</div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(201,168,76,0.1)', padding: '14px', borderRadius: '8px', border: '1px solid rgba(201,168,76,0.2)' }}>
                <div>
                  <div style={{ fontSize: '0.7rem', color: '#8A7A5F' }}>Total Amount</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#F5EDD6' }}>₹{selectedBooking.amount.toLocaleString()}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '0.7rem', color: '#8A7A5F' }}>Payment Status</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: selectedBooking.paymentStatus === 'paid' ? '#22C55E' : '#EAB308', textTransform: 'uppercase' }}>{selectedBooking.paymentStatus}</div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
              {selectedBooking.status === 'pending' && (
                <button
                  onClick={() => updateBookingStatus(selectedBooking.id, 'confirmed', 'paid')}
                  style={{ flex: 1, padding: '10px', background: '#22C55E', color: '#0A0A0A', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 700 }}
                >
                  Approve Reservation
                </button>
              )}
              <button
                onClick={() => setSelectedBooking(null)}
                style={{ flex: 1, padding: '10px', background: '#1A1A1A', color: '#8A7A5F', border: '1px solid #2A2A2A', borderRadius: '6px', cursor: 'pointer' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
