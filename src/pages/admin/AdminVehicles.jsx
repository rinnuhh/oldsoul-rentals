import { useState } from 'react'
import { Search, Plus, Car, Star, CheckCircle, Fuel, Users, Eye, Trash2, Edit3 } from 'lucide-react'
import { showVehicles as initialShowVehicles, normalVehicles } from '../../data/vehicles'

export default function AdminVehicles() {
  const [activeCategory, setActiveCategory] = useState('all') // all, show, normal
  const [showVehicles, setShowVehicles] = useState([...initialShowVehicles])
  const [rentalVehicles, setRentalVehicles] = useState([...normalVehicles])
  const [search, setSearch] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  // New vehicle state
  const [newVehicle, setNewVehicle] = useState({
    name: '', type: 'show', category: 'Vintage', price: '', location: 'Kochi', fuel: 'Petrol', image: ''
  })

  const toggleAvailability = (id, isShow) => {
    if (isShow) {
      setShowVehicles(prev => prev.map(v => v.id === id ? { ...v, available: !v.available } : v))
    } else {
      setRentalVehicles(prev => prev.map(v => v.id === id ? { ...v, available: !v.available } : v))
    }
  }

  const handleDelete = (id, isShow) => {
    if (isShow) {
      setShowVehicles(prev => prev.filter(v => v.id !== id))
    } else {
      setRentalVehicles(prev => prev.filter(v => v.id !== id))
    }
  }

  const handleAddVehicle = (e) => {
    e.preventDefault()
    if (!newVehicle.name || !newVehicle.price) return

    const priceNum = Number(newVehicle.price)
    const imgUrl = newVehicle.image || 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80'

    if (newVehicle.type === 'show') {
      const created = {
        id: `show-${Date.now()}`,
        name: newVehicle.name,
        category: newVehicle.category,
        year: 2024,
        pricePerDay: priceNum,
        location: newVehicle.location,
        image: imgUrl,
        rating: 5.0,
        reviewsCount: 1,
        featured: true,
        available: true,
      }
      setShowVehicles([created, ...showVehicles])
    } else {
      const created = {
        id: `norm-${Date.now()}`,
        name: newVehicle.name,
        type: 'Sedan',
        seats: 5,
        fuel: newVehicle.fuel,
        transmission: 'Automatic',
        pricePerDay: priceNum,
        priceKm: 12,
        image: imgUrl,
        available: true,
        features: ['Aircon', 'GPS', 'Bluetooth']
      }
      setRentalVehicles([created, ...rentalVehicles])
    }

    setIsAddModalOpen(false)
    setNewVehicle({ name: '', type: 'show', category: 'Vintage', price: '', location: 'Kochi', fuel: 'Petrol', image: '' })
  }

  const combinedList = [
    ...showVehicles.map(v => ({ ...v, isShow: true })),
    ...rentalVehicles.map(v => ({ ...v, isShow: false }))
  ]

  const filtered = combinedList.filter(v => {
    const matchCat = activeCategory === 'all' || (activeCategory === 'show' && v.isShow) || (activeCategory === 'normal' && !v.isShow)
    const matchSearch = v.name.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#F5EDD6', margin: '0 0 4px 0' }}>Fleet Inventory & Vehicles</h2>
          <p style={{ fontSize: '0.78rem', color: '#8A7A5F', margin: 0 }}>Manage luxury show vehicles and everyday rental fleet status, rates, and availability.</p>
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
          <Plus size={16} /> Add New Vehicle
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', background: '#0D0D0D', padding: '14px 18px', border: '1px solid #1E1E1E', borderRadius: '8px', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
          <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#6B6B6B' }} />
          <input
            placeholder="Search vehicle model or name..."
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
          {[
            { id: 'all', label: 'All Fleet' },
            { id: 'show', label: 'Show Rentals' },
            { id: 'normal', label: 'Normal Rentals' },
          ].map(c => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              style={{
                fontSize: '0.72rem', fontWeight: 600,
                padding: '6px 14px', borderRadius: '4px', cursor: 'pointer',
                background: activeCategory === c.id ? 'rgba(201,168,76,0.15)' : '#141414',
                color: activeCategory === c.id ? '#C9A84C' : '#8A7A5F',
                border: activeCategory === c.id ? '1px solid #C9A84C' : '1px solid #222',
              }}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Vehicles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '18px' }}>
        {filtered.map(v => (
          <div key={v.id} style={{ background: '#0D0D0D', border: '1px solid #1E1E1E', borderRadius: '10px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ position: 'relative', height: '140px', background: '#141414' }}>
              <img src={v.image} alt={v.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <span style={{
                position: 'absolute', top: '10px', left: '10px',
                fontSize: '0.58rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.08em',
                padding: '3px 8px', borderRadius: '4px',
                background: v.isShow ? '#C9A84C' : '#2563EB', color: '#0A0A0A'
              }}>
                {v.isShow ? 'Show Rental' : 'Normal Rental'}
              </span>

              <span style={{
                position: 'absolute', top: '10px', right: '10px',
                fontSize: '0.6rem', fontWeight: 700, padding: '3px 8px', borderRadius: '4px',
                background: v.available !== false ? 'rgba(34,197,94,0.9)' : 'rgba(239,68,68,0.9)', color: '#FFFFFF'
              }}>
                {v.available !== false ? 'Available' : 'Booked'}
              </span>
            </div>

            <div style={{ padding: '16px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#F5EDD6', margin: '0 0 6px 0' }}>{v.name}</h4>
                <div style={{ fontSize: '0.72rem', color: '#8A7A5F', marginBottom: '12px' }}>
                  {v.isShow ? `Category: ${v.category} • ${v.location}` : `Fuel: ${v.fuel} • ${v.seats || 5} Seats`}
                </div>
              </div>

              <div style={{ borderTop: '1px solid #1E1E1E', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontSize: '1rem', fontWeight: 800, color: '#C9A84C' }}>₹{v.pricePerDay.toLocaleString()}</span>
                  <span style={{ fontSize: '0.62rem', color: '#6B6B6B' }}> / day</span>
                </div>

                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={() => toggleAvailability(v.id, v.isShow)}
                    style={{ background: '#141414', border: '1px solid #2A2A2A', color: '#F5EDD6', padding: '6px 10px', borderRadius: '4px', fontSize: '0.68rem', cursor: 'pointer' }}
                  >
                    Toggle Status
                  </button>
                  <button
                    onClick={() => handleDelete(v.id, v.isShow)}
                    style={{ background: 'rgba(239,68,68,0.15)', border: 'none', color: '#EF4444', padding: '6px 8px', borderRadius: '4px', cursor: 'pointer' }}
                    title="Delete Vehicle"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Vehicle Modal */}
      {isAddModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: '#0D0D0D', border: '1px solid #1E1E1E', borderRadius: '12px', width: '90%', maxWidth: '460px', padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#F5EDD6', marginBottom: '16px' }}>Add Vehicle to Inventory</h3>
            <form onSubmit={handleAddVehicle} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '0.7rem', color: '#8A7A5F', display: 'block', marginBottom: '4px' }}>Listing Mode</label>
                <select
                  value={newVehicle.type}
                  onChange={e => setNewVehicle({ ...newVehicle, type: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', background: '#141414', border: '1px solid #222', borderRadius: '6px', color: '#F5EDD6', fontSize: '0.8rem', outline: 'none' }}
                >
                  <option value="show">Show Rentals (Luxury / Vintage / Supercars)</option>
                  <option value="normal">Normal Rentals (Everyday Commuters)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.7rem', color: '#8A7A5F', display: 'block', marginBottom: '4px' }}>Vehicle Model & Name</label>
                <input
                  required
                  placeholder="e.g. BMW M4 Competition"
                  value={newVehicle.name}
                  onChange={e => setNewVehicle({ ...newVehicle, name: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', background: '#141414', border: '1px solid #222', borderRadius: '6px', color: '#F5EDD6', fontSize: '0.8rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.7rem', color: '#8A7A5F', display: 'block', marginBottom: '4px' }}>Price Per Day (₹)</label>
                <input
                  required
                  type="number"
                  placeholder="15000"
                  value={newVehicle.price}
                  onChange={e => setNewVehicle({ ...newVehicle, price: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', background: '#141414', border: '1px solid #222', borderRadius: '6px', color: '#F5EDD6', fontSize: '0.8rem', outline: 'none' }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.7rem', color: '#8A7A5F', display: 'block', marginBottom: '4px' }}>Image URL</label>
                <input
                  placeholder="https://images.unsplash.com/..."
                  value={newVehicle.image}
                  onChange={e => setNewVehicle({ ...newVehicle, image: e.target.value })}
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
                  Add Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  )
}
