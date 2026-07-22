import { useState, useEffect } from 'react'
import {
  TrendingUp, Users, Building2, CalendarCheck, Car,
  CheckCircle2, Clock, AlertTriangle, ArrowUpRight,
  Plus, ShieldCheck, DollarSign
} from 'lucide-react'
import { getAdminStats, getRevenueData } from '../../services/adminService'
import { getAllBookings } from '../../services/bookingService'

export default function AdminDashboard({ onNavigate }) {
  const [filterPeriod, setFilterPeriod] = useState('year')

  const [stats, setStats]           = useState(null)
  const [revenueData, setRevenue]   = useState([])
  const [pendingList, setPending]   = useState([])
  const [loading, setLoading]       = useState(true)

  useEffect(() => {
    Promise.all([
      getAdminStats(),
      getRevenueData(2026),
      getAllBookings('pending'),
    ]).then(([s, r, p]) => {
      setStats(s)
      setRevenue(r)
      setPending(p)
      setLoading(false)
    }).catch(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '40px', height: '40px', border: '3px solid #2A2A2A', borderTop: '3px solid #C9A84C', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
          <p style={{ color: '#8A7A5F', fontSize: '0.82rem', fontFamily: 'Inter, sans-serif' }}>Loading dashboard from database…</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  // Fallback if stats is null (DB error)
  const s = stats || {
    totalRevenue: 0, revenueGrowth: 0, totalBookings: 0, bookingsGrowth: 0,
    totalOwners: 0, ownersGrowth: 0, totalUsers: 0, usersGrowth: 0,
    activeVehicles: 0, pendingApprovals: 0, cancelledBookings: 0, completedBookings: 0,
    recentActivities: [],
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      {/* Welcome & Overview Header */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between',
        background: 'linear-gradient(135deg, rgba(201,168,76,0.12) 0%, rgba(13,13,13,0.9) 100%)',
        border: '1px solid rgba(201,168,76,0.25)', borderRadius: '12px', padding: '24px 28px',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22C55E' }} />
            <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9A84C' }}>
              Live Database — System Operational
            </span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: '1.75rem', fontWeight: 700, color: '#F5EDD6', margin: '0 0 6px 0' }}>
            Welcome back, Super Admin
          </h1>
          <p style={{ fontSize: '0.82rem', color: '#8A7A5F', margin: 0 }}>
            Real-time data from your OldSoul MySQL database.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
          <button
            onClick={() => onNavigate('bookings')}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '10px 18px', borderRadius: '8px',
              background: '#C9A84C', color: '#0A0A0A', border: 'none',
              fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            <Clock size={15} /> Review Pending ({s.pendingApprovals})
          </button>
          <button
            onClick={() => onNavigate('vehicles')}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '10px 18px', borderRadius: '8px',
              background: '#1A1A1A', color: '#F5EDD6', border: '1px solid #2A2A2A',
              fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            <Plus size={15} /> Add Vehicle
          </button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>

        {/* Total Revenue */}
        <div style={{ background: '#0D0D0D', border: '1px solid #1E1E1E', borderRadius: '10px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#8A7A5F', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Total Revenue</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(201,168,76,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DollarSign size={16} color="#C9A84C" />
            </div>
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F5EDD6', marginBottom: '4px' }}>
            ₹{Number(s.totalRevenue).toLocaleString()}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: '#22C55E' }}>
            <TrendingUp size={12} /> +{s.revenueGrowth}% this month
          </div>
        </div>

        {/* Total Bookings */}
        <div style={{ background: '#0D0D0D', border: '1px solid #1E1E1E', borderRadius: '10px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#8A7A5F', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Total Bookings</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(37,99,235,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <CalendarCheck size={16} color="#3B82F6" />
            </div>
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F5EDD6', marginBottom: '4px' }}>
            {s.totalBookings}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: '#3B82F6' }}>
            <TrendingUp size={12} /> +{s.bookingsGrowth}% overall
          </div>
        </div>

        {/* Total Owners */}
        <div style={{ background: '#0D0D0D', border: '1px solid #1E1E1E', borderRadius: '10px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#8A7A5F', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Active Owners</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(168,85,247,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Building2 size={16} color="#A855F7" />
            </div>
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F5EDD6', marginBottom: '4px' }}>
            {s.totalOwners}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: '#A855F7' }}>
            <ShieldCheck size={12} /> Verified vehicle partners
          </div>
        </div>

        {/* Registered Users */}
        <div style={{ background: '#0D0D0D', border: '1px solid #1E1E1E', borderRadius: '10px', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 600, color: '#8A7A5F', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Registered Users</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(16,185,129,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={16} color="#10B981" />
            </div>
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#F5EDD6', marginBottom: '4px' }}>
            {Number(s.totalUsers).toLocaleString()}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: '#10B981' }}>
            <TrendingUp size={12} /> +{s.usersGrowth}% new users
          </div>
        </div>

      </div>

      {/* Middle Grid: Revenue Bar Visualizer & Pending Approvals */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>

        {/* Revenue Visualization */}
        <div style={{ background: '#0D0D0D', border: '1px solid #1E1E1E', borderRadius: '10px', padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#F5EDD6', margin: '0 0 4px 0' }}>Revenue Overview</h3>
              <p style={{ fontSize: '0.72rem', color: '#8A7A5F', margin: 0 }}>Monthly income trajectory in ₹ (from DB)</p>
            </div>
            <select
              value={filterPeriod}
              onChange={e => setFilterPeriod(e.target.value)}
              style={{ background: '#141414', border: '1px solid #2A2A2A', borderRadius: '6px', color: '#F5EDD6', fontSize: '0.75rem', padding: '4px 10px', outline: 'none' }}
            >
              <option value="year">2026 Monthly</option>
            </select>
          </div>

          {/* Bar Chart Visualizer */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '180px', paddingTop: '20px', borderBottom: '1px solid #1E1E1E' }}>
            {revenueData.map((d) => {
              const maxRev = Math.max(...revenueData.map(r => r.revenue), 1)
              const heightPct = Math.round((d.revenue / maxRev) * 100)
              const isHighlight = d.month === 'Dec' || d.month === 'Jul'
              return (
                <div key={d.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', height: '100%', justifyContent: 'flex-end' }}>
                  <div
                    title={`₹${Number(d.revenue).toLocaleString()} (${d.bookings} bookings)`}
                    style={{
                      width: '100%',
                      height: `${heightPct}%`,
                      background: isHighlight ? 'linear-gradient(180deg, #E8C96A, #C9A84C)' : '#262626',
                      borderRadius: '4px 4px 0 0',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#C9A84C'}
                    onMouseLeave={e => e.currentTarget.style.background = isHighlight ? 'linear-gradient(180deg, #E8C96A, #C9A84C)' : '#262626'}
                  />
                  <span style={{ fontSize: '0.6rem', color: '#6B6B6B' }}>{d.month}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Pending Bookings Quick Action List */}
        <div style={{ background: '#0D0D0D', border: '1px solid #1E1E1E', borderRadius: '10px', padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#F5EDD6', margin: 0 }}>Pending Approvals</h3>
              <span style={{ background: 'rgba(234,179,8,0.15)', color: '#EAB308', border: '1px solid rgba(234,179,8,0.3)', fontSize: '0.62rem', fontWeight: 700, padding: '2px 8px', borderRadius: '12px' }}>
                {pendingList.length} Urgent
              </span>
            </div>
            <button
              onClick={() => onNavigate('bookings')}
              style={{ background: 'none', border: 'none', color: '#C9A84C', fontSize: '0.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '2px' }}
            >
              View All <ArrowUpRight size={13} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {pendingList.length === 0 && (
              <p style={{ color: '#6B6B6B', fontSize: '0.78rem', textAlign: 'center', padding: '20px 0' }}>No pending bookings 🎉</p>
            )}
            {pendingList.map(b => (
              <div key={b.id} style={{ background: '#141414', border: '1px solid #222', borderRadius: '8px', padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#F5EDD6' }}>{b.vehicle_name}</div>
                  <div style={{ fontSize: '0.68rem', color: '#8A7A5F' }}>
                    User: {b.user_name} • ₹{Number(b.amount).toLocaleString()} ({b.days} days)
                  </div>
                </div>
                <button
                  onClick={() => onNavigate('bookings')}
                  style={{ background: 'rgba(201,168,76,0.15)', color: '#C9A84C', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '6px', padding: '5px 10px', fontSize: '0.68rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  Review
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Section: Recent Activity Timeline */}
      <div style={{ background: '#0D0D0D', border: '1px solid #1E1E1E', borderRadius: '10px', padding: '24px' }}>
        <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#F5EDD6', marginBottom: '16px' }}>Recent System Activities</h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          {s.recentActivities.map((act, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px', background: '#141414', borderRadius: '8px', border: '1px solid #1A1A1A' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', color: '#C9A84C', flexShrink: 0 }}>
                ●
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.78rem', color: '#F5EDD6', lineHeight: 1.4 }}>{act.message}</div>
                <div style={{ fontSize: '0.64rem', color: '#6B6B6B', marginTop: '4px' }}>{act.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
