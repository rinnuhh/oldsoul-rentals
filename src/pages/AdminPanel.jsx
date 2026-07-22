import { useState } from 'react'
import {
  LayoutDashboard, Users, Building2, CalendarCheck, Car,
  BarChart3, Settings, LogOut, Menu, X, Bell, Search,
  ChevronRight, Shield, User
} from 'lucide-react'

import AdminDashboard from './admin/AdminDashboard'
import AdminOwners from './admin/AdminOwners'
import AdminUsers from './admin/AdminUsers'
import AdminBookings from './admin/AdminBookings'
import AdminVehicles from './admin/AdminVehicles'
import AdminReports from './admin/AdminReports'
import AdminSettings from './admin/AdminSettings'
import AdminLogin from './admin/AdminLogin'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard',  icon: LayoutDashboard },
  { id: 'owners',    label: 'Owners',     icon: Building2 },
  { id: 'users',     label: 'Users',      icon: Users },
  { id: 'bookings',  label: 'Bookings',   icon: CalendarCheck },
  { id: 'vehicles',  label: 'Vehicles',   icon: Car },
  { id: 'reports',   label: 'Reports',    icon: BarChart3 },
  { id: 'settings',  label: 'Settings',   icon: Settings },
]

export default function AdminPanel() {
  const [adminUser, setAdminUser] = useState(null)
  const [activeSection, setActiveSection] = useState('dashboard')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [notifications] = useState(6)

  // Handle Login / Logout
  if (!adminUser) {
    return <AdminLogin onLogin={(user) => setAdminUser(user)} />
  }

  const currentNav = NAV_ITEMS.find(n => n.id === activeSection)

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard': return <AdminDashboard onNavigate={setActiveSection} />
      case 'owners':    return <AdminOwners />
      case 'users':     return <AdminUsers />
      case 'bookings':  return <AdminBookings />
      case 'vehicles':  return <AdminVehicles />
      case 'reports':   return <AdminReports />
      case 'settings':  return <AdminSettings />
      default:          return <AdminDashboard onNavigate={setActiveSection} />
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif', background: '#0A0A0A' }}>

      {/* ── Sidebar ── */}
      <aside style={{
        width: '240px',
        background: '#0D0D0D',
        borderRight: '1px solid #1E1E1E',
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 50,
        transform: sidebarOpen ? 'translateX(0)' : 'translateX(-240px)',
        transition: 'transform 0.3s ease',
      }}>
        {/* Logo */}
        <div style={{ padding: '20px 22px 16px', borderBottom: '1px solid #1E1E1E' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '6px',
              background: 'linear-gradient(135deg, #C9A84C, #E8C96A)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <Shield size={16} color="#0A0A0A" />
            </div>
            <div>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#F5EDD6', letterSpacing: '0.04em' }}>
                OldSoul Admin
              </div>
              <div style={{ fontSize: '0.58rem', color: '#8A7A5F', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
                Control Panel
              </div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 10px', overflowY: 'auto' }}>
          <div style={{ fontSize: '0.55rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#3A3A3A', padding: '8px 12px 6px' }}>
            Navigation
          </div>
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
            const isActive = activeSection === id
            return (
              <button
                key={id}
                onClick={() => setActiveSection(id)}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '9px 12px', borderRadius: '6px', border: 'none',
                  cursor: 'pointer', marginBottom: '2px', textAlign: 'left',
                  background: isActive ? 'rgba(201,168,76,0.1)' : 'transparent',
                  color: isActive ? '#C9A84C' : '#6B6B6B',
                  transition: 'all 0.18s ease',
                  fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: isActive ? 600 : 400,
                }}
                onMouseEnter={e => { if (!isActive) { e.currentTarget.style.background = '#1A1A1A'; e.currentTarget.style.color = '#F5EDD6' } }}
                onMouseLeave={e => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#6B6B6B' } }}
              >
                <Icon size={15} />
                {label}
                {isActive && <ChevronRight size={13} style={{ marginLeft: 'auto', opacity: 0.6 }} />}
              </button>
            )
          })}
        </nav>

        {/* Admin Profile */}
        <div style={{ padding: '14px', borderTop: '1px solid #1E1E1E' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', borderRadius: '8px', background: '#141414' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #C9A84C, #8A6E2F)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.72rem', fontWeight: 700, color: '#0A0A0A', flexShrink: 0,
            }}>
              SA
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#F5EDD6', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Super Admin
              </div>
              <div style={{ fontSize: '0.62rem', color: '#8A7A5F' }}>{adminUser.email}</div>
            </div>
            <button
              onClick={() => setAdminUser(null)}
              title="Sign Out"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B6B6B', display: 'flex', padding: '2px' }}
              onMouseEnter={e => e.currentTarget.style.color = '#EF4444'}
              onMouseLeave={e => e.currentTarget.style.color = '#6B6B6B'}
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main Area ── */}
      <div style={{
        marginLeft: sidebarOpen ? '240px' : '0',
        minHeight: '100vh',
        background: '#0A0A0A',
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        transition: 'margin-left 0.3s ease',
      }}>

        {/* Topbar */}
        <header style={{
          height: '60px',
          background: '#0D0D0D',
          borderBottom: '1px solid #1E1E1E',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 28px',
          position: 'sticky',
          top: 0,
          zIndex: 40,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8A7A5F', display: 'flex', padding: '4px' }}
            >
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.65rem', color: '#3A3A3A' }}>Admin</span>
              <ChevronRight size={12} color="#3A3A3A" />
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#F5EDD6' }}>{currentNav?.label}</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Search */}
            <div style={{ position: 'relative' }}>
              <Search size={13} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#3A3A3A' }} />
              <input
                placeholder="Quick search…"
                style={{
                  background: '#141414', border: '1px solid #1E1E1E', borderRadius: '6px',
                  padding: '7px 12px 7px 30px', fontFamily: 'Inter, sans-serif',
                  fontSize: '0.75rem', color: '#F5EDD6', outline: 'none', width: '200px',
                }}
                onFocus={e => e.currentTarget.style.borderColor = 'rgba(201,168,76,0.4)'}
                onBlur={e => e.currentTarget.style.borderColor = '#1E1E1E'}
              />
            </div>

            {/* Notifications */}
            <button style={{ position: 'relative', background: '#141414', border: '1px solid #1E1E1E', borderRadius: '6px', padding: '7px 9px', cursor: 'pointer', display: 'flex', color: '#8A7A5F' }}>
              <Bell size={15} />
              {notifications > 0 && (
                <span style={{
                  position: 'absolute', top: '-5px', right: '-5px',
                  width: '16px', height: '16px', borderRadius: '50%',
                  background: '#C9A84C', color: '#0A0A0A',
                  fontSize: '0.55rem', fontWeight: 700,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  {notifications}
                </span>
              )}
            </button>

            {/* View Main Site */}
            <a
              href="/"
              style={{
                fontSize: '0.72rem', color: '#C9A84C', textDecoration: 'none',
                background: 'rgba(201,168,76,0.1)', padding: '6px 12px', borderRadius: '6px',
                border: '1px solid rgba(201,168,76,0.2)', fontWeight: 600
              }}
            >
              Main Site ↗
            </a>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, padding: '28px', overflowY: 'auto' }}>
          {renderSection()}
        </main>
      </div>

      <style>{`
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0A0A0A; }
        ::-webkit-scrollbar-thumb { background: #2A2A2A; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #C9A84C; }
      `}</style>
    </div>
  )
}
