import { useState } from 'react'
import { Save, Shield, Bell, Lock, Key, Server, Check } from 'lucide-react'

export default function AdminSettings() {
  const [saved, setSaved] = useState(false)
  const [settings, setSettings] = useState({
    siteName: 'OldSoul Rentals',
    commissionRate: 15,
    supportEmail: 'support@oldsoul.in',
    autoApproveBookings: false,
    emailNotifications: true,
    smsAlerts: true,
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '640px' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#F5EDD6', margin: '0 0 4px 0' }}>System & Admin Settings</h2>
        <p style={{ fontSize: '0.78rem', color: '#8A7A5F', margin: 0 }}>Configure platform rules, commission rates, and notification preferences.</p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
        
        {/* Platform Settings */}
        <div style={{ background: '#0D0D0D', border: '1px solid #1E1E1E', borderRadius: '10px', padding: '20px' }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#F5EDD6', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Server size={16} color="#C9A84C" /> Platform Parameters
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.7rem', color: '#8A7A5F', display: 'block', marginBottom: '4px' }}>Platform Commission Rate (%)</label>
              <input
                type="number"
                value={settings.commissionRate}
                onChange={e => setSettings({ ...settings, commissionRate: Number(e.target.value) })}
                style={{ width: '100%', padding: '9px 12px', background: '#141414', border: '1px solid #222', borderRadius: '6px', color: '#F5EDD6', fontSize: '0.8rem', outline: 'none' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.7rem', color: '#8A7A5F', display: 'block', marginBottom: '4px' }}>Support Contact Email</label>
              <input
                type="email"
                value={settings.supportEmail}
                onChange={e => setSettings({ ...settings, supportEmail: e.target.value })}
                style={{ width: '100%', padding: '9px 12px', background: '#141414', border: '1px solid #222', borderRadius: '6px', color: '#F5EDD6', fontSize: '0.8rem', outline: 'none' }}
              />
            </div>
          </div>
        </div>

        {/* Credentials Info & Security */}
        <div style={{ background: '#0D0D0D', border: '1px solid #1E1E1E', borderRadius: '10px', padding: '20px' }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#F5EDD6', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Lock size={16} color="#C9A84C" /> Default Admin Login Account
          </h3>

          <div style={{ background: '#141414', border: '1px solid rgba(201,168,76,0.3)', borderRadius: '8px', padding: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '0.75rem', color: '#8A7A5F' }}>Admin Email:</span>
              <span style={{ fontSize: '0.75rem', color: '#C9A84C', fontWeight: 700 }}>admin@oldsoul.in</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.75rem', color: '#8A7A5F' }}>Password:</span>
              <span style={{ fontSize: '0.75rem', color: '#F5EDD6', fontWeight: 700 }}>admin123</span>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div style={{ background: '#0D0D0D', border: '1px solid #1E1E1E', borderRadius: '10px', padding: '20px' }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#F5EDD6', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Bell size={16} color="#C9A84C" /> Admin Alerts & Notifications
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.78rem', color: '#F5EDD6' }}>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={e => setSettings({ ...settings, emailNotifications: e.target.checked })}
              />
              Email alerts on new booking requests
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', fontSize: '0.78rem', color: '#F5EDD6' }}>
              <input
                type="checkbox"
                checked={settings.smsAlerts}
                onChange={e => setSettings({ ...settings, smsAlerts: e.target.checked })}
              />
              SMS notifications for urgent host registrations
            </label>
          </div>
        </div>

        <button
          type="submit"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            background: saved ? '#22C55E' : '#C9A84C', color: '#0A0A0A',
            border: 'none', borderRadius: '8px', padding: '12px',
            fontFamily: 'Inter, sans-serif', fontSize: '0.85rem', fontWeight: 700,
            cursor: 'pointer', transition: 'all 0.2s ease',
          }}
        >
          {saved ? <Check size={16} /> : <Save size={16} />}
          {saved ? 'Settings Saved Successfully' : 'Save Changes'}
        </button>

      </form>

    </div>
  )
}
