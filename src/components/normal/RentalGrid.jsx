import { useState } from 'react'
import { Search, MapPin, Calendar, SlidersHorizontal, Fuel, Users, Wifi, Star, CheckCircle } from 'lucide-react'
import { normalVehicles, vehicleTypes } from '../../data/vehicles'
import BookingModal from '../layout/BookingModal'

function RentalCard({ vehicle, onBook }) {
  const fuelColors = {
    'Electric': 'text-green-600 bg-green-50 border-green-200',
    'Hybrid':   'text-teal-600 bg-teal-50 border-teal-200',
    'Petrol':   'text-orange-600 bg-orange-50 border-orange-200',
    'Diesel':   'text-blue-600 bg-blue-50 border-blue-200',
  }

  return (
    <div className="bg-white rounded-xl border border-rental-border shadow-sm overflow-hidden
                    hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden bg-rental-bg">
        <img
          src={vehicle.image}
          alt={vehicle.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Availability pill */}
        <span className={`absolute top-3 right-3 text-xs font-semibold px-2.5 py-1 rounded-full border
          ${vehicle.available
            ? 'bg-green-50 text-green-700 border-green-200'
            : 'bg-red-50 text-red-600 border-red-200'
          }`}
        >
          {vehicle.available ? '● Available' : '● Booked'}
        </span>
        {/* Type badge */}
        <span className="absolute top-3 left-3 bg-rental-navy text-white text-[10px] font-semibold tracking-wide px-2 py-1 rounded-md">
          {vehicle.type}
        </span>
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="font-semibold text-rental-text text-base mb-3 group-hover:text-rental-blue transition-colors">
          {vehicle.name}
        </h3>

        {/* Specs row */}
        <div className="flex items-center gap-4 mb-4">
          <span className="flex items-center gap-1.5 text-rental-muted text-xs">
            <Users size={12} /> {vehicle.seats} seats
          </span>
          <span className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border
            ${fuelColors[vehicle.fuel] || 'text-rental-muted bg-rental-bg border-rental-border'}`}
          >
            <Fuel size={10} /> {vehicle.fuel}
          </span>
          <span className="text-rental-muted text-xs">{vehicle.transmission}</span>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {vehicle.features.slice(0, 3).map(f => (
            <span key={f} className="text-[10px] text-rental-muted bg-rental-bg border border-rental-border rounded-md px-2 py-0.5">
              {f}
            </span>
          ))}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-rental-border">
          <div>
            <span className="text-rental-navy font-bold text-lg">₹{vehicle.pricePerDay.toLocaleString()}</span>
            <span className="text-rental-muted text-xs"> /day</span>
            <p className="text-rental-muted text-[10px]">₹{vehicle.pricePerKm}/km extra</p>
          </div>
          <button
            onClick={() => onBook(vehicle)}
            disabled={!vehicle.available}
            className={`text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200
              ${vehicle.available
                ? 'bg-rental-blue text-white hover:bg-blue-700 active:scale-95'
                : 'bg-rental-bg text-rental-muted cursor-not-allowed border border-rental-border'
              }`}
          >
            {vehicle.available ? 'Book Now' : 'Unavailable'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function RentalGrid() {
  const [search,      setSearch]      = useState('')
  const [activeType,  setActiveType]  = useState('all')
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy,      setSortBy]      = useState('price-asc')
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  const handleBook = (vehicle) => {
    setSelectedVehicle(vehicle)
    setIsBookingOpen(true)
  }

  const filtered = normalVehicles
    .filter(v => {
      const matchSearch = v.name.toLowerCase().includes(search.toLowerCase())
      const matchType   = activeType === 'all' || v.type === activeType
      return matchSearch && matchType
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc')  return a.pricePerDay - b.pricePerDay
      if (sortBy === 'price-desc') return b.pricePerDay - a.pricePerDay
      return 0
    })

  return (
    <div>
      {/* Search & filter bar */}
      <div className="bg-white border-b border-rental-border sticky top-16 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-rental-muted" />
              <input
                id="rental-search-input"
                type="text"
                placeholder="Search vehicles..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 border border-rental-border rounded-lg text-sm
                           text-rental-text placeholder-rental-muted focus:outline-none focus:border-rental-blue
                           transition-colors"
              />
            </div>

            {/* Sort */}
            <select
              id="rental-sort-select"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="border border-rental-border rounded-lg px-3 py-2.5 text-sm text-rental-text
                         focus:outline-none focus:border-rental-blue cursor-pointer"
            >
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>

            {/* Filter toggle */}
            <button
              id="rental-filter-btn"
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 border rounded-lg px-4 py-2.5 text-sm font-medium transition-colors
                ${showFilters ? 'border-rental-blue text-rental-blue bg-rental-blue-light' : 'border-rental-border text-rental-muted hover:border-rental-blue hover:text-rental-blue'}`}
            >
              <SlidersHorizontal size={15} />
              Filters
            </button>
          </div>

          {/* Type filter (expandable) */}
          {showFilters && (
            <div className="flex flex-wrap gap-2 pt-3 mt-3 border-t border-rental-border">
              {vehicleTypes.map(({ key, label }) => (
                <button
                  key={key}
                  id={`rental-type-${key}`}
                  onClick={() => setActiveType(key)}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full border transition-all duration-200
                    ${activeType === key
                      ? 'bg-rental-navy text-white border-rental-navy'
                      : 'border-rental-border text-rental-muted hover:border-rental-navy hover:text-rental-navy'
                    }`}
                >
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <p className="text-rental-muted text-sm mb-6">
          Showing <strong className="text-rental-text">{filtered.length}</strong> vehicles
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-rental-muted">No vehicles match your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map(v => <RentalCard key={v.id} vehicle={v} onBook={handleBook} />)}
          </div>
        )}
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        vehicle={selectedVehicle}
        mode="normal"
      />
    </div>
  )
}
