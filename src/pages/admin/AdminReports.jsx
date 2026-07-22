import { useState } from 'react'
import { BarChart3, TrendingUp, Download, PieChart, DollarSign, Car, Users, Calendar } from 'lucide-react'
import { adminStats, revenueData } from '../../data/adminData'

export default function AdminReports() {
  const [downloadSuccess, setDownloadSuccess] = useState(false)

  const handleExport = () => {
    setDownloadSuccess(true)
    setTimeout(() => setDownloadSuccess(false), 3000)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#F5EDD6', margin: '0 0 4px 0' }}>Financial & Platform Analytics</h2>
          <p style={{ fontSize: '0.78rem', color: '#8A7A5F', margin: 0 }}>Comprehensive performance metrics, revenue growth, and rental category breakdowns.</p>
        </div>

        <button
          onClick={handleExport}
          style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: '#C9A84C', color: '#0A0A0A', border: 'none',
            borderRadius: '6px', padding: '10px 18px',
            fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', fontWeight: 700,
            cursor: 'pointer',
          }}
        >
          <Download size={15} /> {downloadSuccess ? 'Exported CSV ✓' : 'Export Financial Report'}
        </button>
      </div>

      {/* Summary Analytics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div style={{ background: '#0D0D0D', border: '1px solid #1E1E1E', borderRadius: '10px', padding: '20px' }}>
          <div style={{ fontSize: '0.7rem', color: '#8A7A5F', textTransform: 'uppercase', marginBottom: '6px' }}>Gross Revenue (YTD)</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#C9A84C' }}>₹18,47,500</div>
          <div style={{ fontSize: '0.7rem', color: '#22C55E', marginTop: '4px' }}>↑ 12.4% vs last year</div>
        </div>

        <div style={{ background: '#0D0D0D', border: '1px solid #1E1E1E', borderRadius: '10px', padding: '20px' }}>
          <div style={{ fontSize: '0.7rem', color: '#8A7A5F', textTransform: 'uppercase', marginBottom: '6px' }}>Platform Commission (15%)</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#F5EDD6' }}>₹2,77,125</div>
          <div style={{ fontSize: '0.7rem', color: '#22C55E', marginTop: '4px' }}>Net admin earnings</div>
        </div>

        <div style={{ background: '#0D0D0D', border: '1px solid #1E1E1E', borderRadius: '10px', padding: '20px' }}>
          <div style={{ fontSize: '0.7rem', color: '#8A7A5F', textTransform: 'uppercase', marginBottom: '6px' }}>Owner Payouts (85%)</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#F5EDD6' }}>₹15,70,375</div>
          <div style={{ fontSize: '0.7rem', color: '#8A7A5F', marginTop: '4px' }}>Distributed to 47 hosts</div>
        </div>

        <div style={{ background: '#0D0D0D', border: '1px solid #1E1E1E', borderRadius: '10px', padding: '20px' }}>
          <div style={{ fontSize: '0.7rem', color: '#8A7A5F', textTransform: 'uppercase', marginBottom: '6px' }}>Average Order Value</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#3B82F6' }}>₹5,402</div>
          <div style={{ fontSize: '0.7rem', color: '#3B82F6', marginTop: '4px' }}>Per booking transaction</div>
        </div>
      </div>

      {/* Category Breakdown & Performance Chart */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
        
        {/* Category Share */}
        <div style={{ background: '#0D0D0D', border: '1px solid #1E1E1E', borderRadius: '10px', padding: '24px' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#F5EDD6', marginBottom: '16px' }}>Revenue Share by Category</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '6px' }}>
                <span style={{ color: '#C9A84C', fontWeight: 600 }}>Show Rentals (Supercars & Vintage)</span>
                <span style={{ color: '#F5EDD6', fontWeight: 700 }}>68% (₹12,56,300)</span>
              </div>
              <div style={{ height: '8px', background: '#1C1C1C', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '68%', height: '100%', background: 'linear-gradient(90deg, #C9A84C, #E8C96A)' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginBottom: '6px' }}>
                <span style={{ color: '#3B82F6', fontWeight: 600 }}>Normal Rentals (Daily Commuters)</span>
                <span style={{ color: '#F5EDD6', fontWeight: 700 }}>32% (₹5,91,200)</span>
              </div>
              <div style={{ height: '8px', background: '#1C1C1C', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{ width: '32%', height: '100%', background: '#3B82F6' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Monthly Performance Trend */}
        <div style={{ background: '#0D0D0D', border: '1px solid #1E1E1E', borderRadius: '10px', padding: '24px' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#F5EDD6', marginBottom: '16px' }}>Peak Rental Months</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.78rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#141414', borderRadius: '6px', border: '1px solid #222' }}>
              <span style={{ color: '#F5EDD6' }}>🥇 December (Festive & Weddings)</span>
              <span style={{ color: '#C9A84C', fontWeight: 700 }}>₹2,86,500</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#141414', borderRadius: '6px', border: '1px solid #222' }}>
              <span style={{ color: '#F5EDD6' }}>🥈 July (Shoots & Expos)</span>
              <span style={{ color: '#C9A84C', fontWeight: 700 }}>₹2,48,000</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#141414', borderRadius: '6px', border: '1px solid #222' }}>
              <span style={{ color: '#F5EDD6' }}>🥉 October (Cultural Events)</span>
              <span style={{ color: '#C9A84C', fontWeight: 700 }}>₹2,28,000</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}
