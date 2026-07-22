import { useState, useEffect } from 'react'
import { Search, Plus, CheckCircle, XCircle, ShieldAlert, Star, Phone, Mail, MapPin } from 'lucide-react'
import { getHosts } from '../../services/adminService'

export default function AdminOwners() {
  const [ownersList, setOwnersList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getHosts()
      .then(data => {
        // Normalize DB fields to match component expectations
        const normalized = data.map(h => ({
          ...h,
          vehicles: h.vehicles_count,
          totalEarnings: Number(h.total_earnings),
          joinedDate: h.joined_date,
          avatar: h.avatar_initials,
        }))
        setOwnersList(normalized)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedOwner, setSelectedOwner] = useState(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  // New Owner Form state
  const [newOwner, setNewOwner] = useState({
    name: '', email: '', phone: '', location: '', vehicles: 1
  })

  const toggleVerify = (id) => {
    setOwnersList(prev => prev.map(o => {
      if (o.id === id) {
        const nextVerified = !o.verified
        return { ...o, verified: nextVerified, status: nextVerified ? 'active' : 'pending' }
      }
      return o
    }))
  }

  const toggleSuspend = (id) => {
    setOwnersList(prev => prev.map(o => {
      if (o.id === id) {
        return { ...o, status: o.status === 'suspended' ? 'active' : 'suspended' }
      }
      return o
    }))
  }

  const handleAddOwner = (e) => {
    e.preventDefault()
    if (!newOwner.name || !newOwner.email) return

    const created = {
      id: `OWN00${ownersList.length + 1}`,
      name: newOwner.name,
      email: newOwner.email,
      phone: newOwner.phone || '+91 98000 00000',
      location: newOwner.location || 'Kochi, Kerala',
      vehicles: Number(newOwner.vehicles) || 1,
      totalEarnings: 0,
      joinedDate: new Date().toISOString().split('T')[0],
      status: 'active',
      avatar: newOwner.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2),
      rating: 5.0,
      verified: true
    }

    setOwnersList([created, ...ownersList])
    setIsAddModalOpen(false)
    setNewOwner({ name: '', email: '', phone: '', location: '', vehicles: 1 })
  }

  const filtered = ownersList.filter(o => {
    const matchSearch = o.name.toLowerCase().includes(search.toLowerCase()) ||
                        o.email.toLowerCase().includes(search.toLowerCase()) ||
                        o.location.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || o.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#F5EDD6', margin: '0 0 4px 0' }}>Vehicle Owners Management</h2>
          <p style={{ fontSize: '0.78rem', color: '#8A7A5F', margin: 0 }}>Manage registered vehicle hosts, verify identity and monitor earnings.</p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: '#C9A84C', color: '#0A0A0A', border: 'none',
            borderRadius: '6px', padding: '10px 18px',
            fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          <Plus size={16} /> Register New Owner
        </button>
      </div>

      {/* Filter Bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', background: '#0D0D0D', padding: '14px 18px', border: '1px solid #1E1E1E', borderRadius: '8px', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#6B6B6B' }} />
          <input
            placeholder="Search owners by name, email, or city..."
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
          {['all', 'active', 'pending', 'suspended'].map(st => (
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

      {/* Owners Table */}
      <div style={{ background: '#0D0D0D', border: '1px solid #1E1E1E', borderRadius: '10px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.78rem' }}>
          <thead>
            <tr style={{ background: '#141414', borderBottom: '1px solid #1E1E1E', color: '#8A7A5F', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              <th style={{ padding: '14px 18px' }}>Owner</th>
              <th style={{ padding: '14px 18px' }}>Contact</th>
              <th style={{ padding: '14px 18px' }}>Location</th>
              <th style={{ padding: '14px 18px' }}>Vehicles</th>
              <th style={{ padding: '14px 18px' }}>Earnings</th>
              <th style={{ padding: '14px 18px' }}>Status</th>
              <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(owner => (
              <tr key={owner.id} style={{ borderBottom: '1px solid #141414', transition: 'background 0.15s' }}>
                <td style={{ padding: '14px 18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #C9A84C, #8A6E2F)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#0A0A0A', fontSize: '0.72rem' }}>
                      {owner.avatar}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: '#F5EDD6', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        {owner.name}
                        {owner.verified && <span title="Verified Host" style={{ color: '#22C55E', fontSize: '0.65rem' }}>✓</span>}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: '#6B6B6B' }}>ID: {owner.id}</div>
                    </div>
                  </div>
                </td>

                <td style={{ padding: '14px 18px' }}>
                  <div style={{ color: '#F5EDD6' }}>{owner.email}</div>
                  <div style={{ fontSize: '0.68rem', color: '#6B6B6B' }}>{owner.phone}</div>
                </td>

                <td style={{ padding: '14px 18px', color: '#8A7A5F' }}>{owner.location}</td>
                <td style={{ padding: '14px 18px', color: '#F5EDD6', fontWeight: 600 }}>{owner.vehicles} cars</td>
                <td style={{ padding: '14px 18px', color: '#C9A84C', fontWeight: 700 }}>₹{owner.totalEarnings.toLocaleString()}</td>

                <td style={{ padding: '14px 18px' }}>
                  <span style={{
                    display: 'inline-block', padding: '3px 8px', borderRadius: '4px',
                    fontSize: '0.64rem', fontWeight: 700, textTransform: 'uppercase',
                    background: owner.status === 'active' ? 'rgba(34,197,94,0.12)' : owner.status === 'pending' ? 'rgba(234,179,8,0.12)' : 'rgba(239,68,68,0.12)',
                    color: owner.status === 'active' ? '#22C55E' : owner.status === 'pending' ? '#EAB308' : '#EF4444',
                    border: owner.status === 'active' ? '1px solid rgba(34,197,94,0.3)' : owner.status === 'pending' ? '1px solid rgba(234,179,8,0.3)' : '1px solid rgba(239,68,68,0.3)',
                  }}>
                    {owner.status}
                  </span>
                </td>

                <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                    <button
                      onClick={() => toggleVerify(owner.id)}
                      title={owner.verified ? 'Unverify Owner' : 'Verify Owner'}
                      style={{ background: '#1A1A1A', border: '1px solid #2A2A2A', color: owner.verified ? '#22C55E' : '#8A7A5F', borderRadius: '4px', padding: '5px 10px', fontSize: '0.68rem', cursor: 'pointer' }}
                    >
                      {owner.verified ? 'Verified' : 'Verify'}
                    </button>
                    <button
                      onClick={() => toggleSuspend(owner.id)}
                      style={{ background: owner.status === 'suspended' ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)', border: 'none', color: owner.status === 'suspended' ? '#22C55E' : '#EF4444', borderRadius: '4px', padding: '5px 10px', fontSize: '0.68rem', cursor: 'pointer' }}
                    >
                      {owner.status === 'suspended' ? 'Activate' : 'Suspend'}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Register New Owner Modal */}
      {isAddModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#0D0D0D', border: '1px solid #1E1E1E', borderRadius: '12px', width: '90%', maxWidth: '440px', padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#F5EDD6', marginBottom: '16px' }}>Register New Owner</h3>
            <form onSubmit={handleAddOwner} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.7rem', color: '#8A7A5F', display: 'block', marginBottom: '4px' }}>Full Name</label>
                <input
                  required
                  placeholder="e.g. Ramesh Kumar"
                  value={newOwner.name}
                  onChange={e => setNewOwner({ ...newOwner, name: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', background: '#141414', border: '1px solid #222', borderRadius: '6px', color: '#F5EDD6', fontSize: '0.8rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.7rem', color: '#8A7A5F', display: 'block', marginBottom: '4px' }}>Email Address</label>
                <input
                  required
                  type="email"
                  placeholder="ramesh@gmail.com"
                  value={newOwner.email}
                  onChange={e => setNewOwner({ ...newOwner, email: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', background: '#141414', border: '1px solid #222', borderRadius: '6px', color: '#F5EDD6', fontSize: '0.8rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.7rem', color: '#8A7A5F', display: 'block', marginBottom: '4px' }}>Phone</label>
                <input
                  placeholder="+91 98470 12345"
                  value={newOwner.phone}
                  onChange={e => setNewOwner({ ...newOwner, phone: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', background: '#141414', border: '1px solid #222', borderRadius: '6px', color: '#F5EDD6', fontSize: '0.8rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.7rem', color: '#8A7A5F', display: 'block', marginBottom: '4px' }}>Location / City</label>
                <input
                  placeholder="Kochi, Kerala"
                  value={newOwner.location}
                  onChange={e => setNewOwner({ ...newOwner, location: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', background: '#141414', border: '1px solid #222', borderRadius: '6px', color: '#F5EDD6', fontSize: '0.8rem', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  style={{ flex: 1, padding: '10px', background: '#1A1A1A', color: '#8A7A5F', border: '1px solid #2A2A2A', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ flex: 1, padding: '10px', background: '#C9A84C', color: '#0A0A0A', border: 'none', borderRadius: '6px', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 700 }}
                >
                  Save Owner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
