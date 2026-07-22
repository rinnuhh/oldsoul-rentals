import { useState, useEffect } from 'react'
import { Search, UserCheck, UserX, Calendar, ShoppingBag, DollarSign } from 'lucide-react'
import { getUsers } from '../../services/adminService'

export default function AdminUsers() {
  const [usersList, setUsersList] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUsers()
      .then(data => {
        const normalized = data.map(u => ({
          ...u,
          userCode: u.user_code,
          avatar: u.avatar_initials,
          bookings: u.total_bookings,
          spent: Number(u.total_spent),
          lastActive: u.last_active,
          joinedDate: u.joined_date
        }))
        setUsersList(normalized)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const toggleStatus = (id) => {
    setUsersList(prev => prev.map(u => {
      if (u.id === id) {
        const nextStatus = u.status === 'active' ? 'suspended' : 'active'
        return { ...u, status: nextStatus }
      }
      return u
    }))
  }

  const filtered = usersList.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
                        u.email.toLowerCase().includes(search.toLowerCase()) ||
                        u.phone.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'all' || u.status === statusFilter
    return matchSearch && matchStatus
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#F5EDD6', margin: '0 0 4px 0' }}>Customer / Renter Accounts</h2>
        <p style={{ fontSize: '0.78rem', color: '#8A7A5F', margin: 0 }}>Monitor customer activity, rental count, total expenditure, and account standing.</p>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', background: '#0D0D0D', padding: '14px 18px', border: '1px solid #1E1E1E', borderRadius: '8px', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#6B6B6B' }} />
          <input
            placeholder="Search users by name, email or phone..."
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
          {['all', 'active', 'suspended', 'inactive'].map(st => (
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

      {/* Users Table */}
      <div style={{ background: '#0D0D0D', border: '1px solid #1E1E1E', borderRadius: '10px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.78rem' }}>
          <thead>
            <tr style={{ background: '#141414', borderBottom: '1px solid #1E1E1E', color: '#8A7A5F', fontSize: '0.68rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              <th style={{ padding: '14px 18px' }}>User Details</th>
              <th style={{ padding: '14px 18px' }}>Contact Phone</th>
              <th style={{ padding: '14px 18px' }}>Bookings</th>
              <th style={{ padding: '14px 18px' }}>Total Spent</th>
              <th style={{ padding: '14px 18px' }}>Last Active</th>
              <th style={{ padding: '14px 18px' }}>Status</th>
              <th style={{ padding: '14px 18px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(user => (
              <tr key={user.id} style={{ borderBottom: '1px solid #141414' }}>
                <td style={{ padding: '14px 18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#222', border: '1px solid #333', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#C9A84C', fontSize: '0.72rem' }}>
                      {user.avatar}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: '#F5EDD6' }}>{user.name}</div>
                      <div style={{ fontSize: '0.68rem', color: '#6B6B6B' }}>{user.email}</div>
                    </div>
                  </div>
                </td>

                <td style={{ padding: '14px 18px', color: '#8A7A5F' }}>{user.phone}</td>
                <td style={{ padding: '14px 18px', color: '#F5EDD6', fontWeight: 600 }}>{user.bookings} trips</td>
                <td style={{ padding: '14px 18px', color: '#C9A84C', fontWeight: 700 }}>₹{user.spent.toLocaleString()}</td>
                <td style={{ padding: '14px 18px', color: '#6B6B6B' }}>{user.lastActive}</td>

                <td style={{ padding: '14px 18px' }}>
                  <span style={{
                    display: 'inline-block', padding: '3px 8px', borderRadius: '4px',
                    fontSize: '0.64rem', fontWeight: 700, textTransform: 'uppercase',
                    background: user.status === 'active' ? 'rgba(34,197,94,0.12)' : user.status === 'suspended' ? 'rgba(239,68,68,0.12)' : 'rgba(156,163,175,0.12)',
                    color: user.status === 'active' ? '#22C55E' : user.status === 'suspended' ? '#EF4444' : '#9CA3AF',
                    border: user.status === 'active' ? '1px solid rgba(34,197,94,0.3)' : user.status === 'suspended' ? '1px solid rgba(239,68,68,0.3)' : '1px solid rgba(156,163,175,0.3)',
                  }}>
                    {user.status}
                  </span>
                </td>

                <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                  <button
                    onClick={() => toggleStatus(user.id)}
                    style={{
                      background: user.status === 'suspended' ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.15)',
                      color: user.status === 'suspended' ? '#22C55E' : '#EF4444',
                      border: 'none', borderRadius: '4px', padding: '5px 12px',
                      fontSize: '0.68rem', fontWeight: 600, cursor: 'pointer',
                    }}
                  >
                    {user.status === 'suspended' ? 'Re-activate' : 'Suspend'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
