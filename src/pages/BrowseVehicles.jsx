import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, MapPin, Star, BadgeCheck, ChevronDown, ChevronUp, SlidersHorizontal } from 'lucide-react'
import { showVehicles, categoryFilters } from '../data/vehicles'
import BookingModal from '../components/layout/BookingModal'

export default function BrowseVehicles() {
  const [search,      setSearch]      = useState('')
  const [activeFilter,setActiveFilter]= useState('all')
  const [sortBy,      setSortBy]      = useState('featured')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [isBookingOpen, setIsBookingOpen] = useState(false)

  const handleBook = (vehicle) => {
    setSelectedVehicle(vehicle)
    setIsBookingOpen(true)
  }

  const filtered = showVehicles
    .filter(v => {
      const matchSearch = v.name.toLowerCase().includes(search.toLowerCase()) ||
                          v.location.toLowerCase().includes(search.toLowerCase())
      const matchCat    = activeFilter === 'all' || v.category === activeFilter
      return matchSearch && matchCat
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc')  return a.pricePerDay - b.pricePerDay
      if (sortBy === 'price-desc') return b.pricePerDay - a.pricePerDay
      if (sortBy === 'rating')     return b.rating - a.rating
      return 0
    })

  return (
    <div className="bg-soul-black min-h-screen pt-20 lg:pt-24">

      {/* Page header */}
      <div className="bg-soul-dark border-b border-soul-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <p className="section-label mb-3">Our Collection</p>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl lg:text-5xl text-soul-cream mb-4">
            Browse <span className="text-gold-gradient italic">Vehicles</span>
          </h1>
          <p className="text-soul-muted max-w-xl">
            Discover rare vintage classics and awe-inspiring modern builds available for your next show, exhibition, or event.
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="bg-soul-dark border-b border-soul-border sticky top-16 lg:top-20 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-soul-muted" />
              <input
                id="browse-search-input"
                type="text"
                placeholder="Search by name or city..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 bg-soul-card border border-soul-border rounded-sm
                           text-sm text-soul-cream placeholder-soul-muted focus:outline-none
                           focus:border-soul-gold transition-colors"
              />
            </div>

            {/* Sort */}
            <select
              id="browse-sort-select"
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="bg-soul-card border border-soul-border rounded-sm px-3 py-2.5
                         text-sm text-soul-cream focus:outline-none focus:border-soul-gold cursor-pointer"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            {/* Filter toggle */}
            <button
              id="browse-filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 border rounded-sm px-4 py-2.5 text-sm font-medium transition-colors
                ${showFilters ? 'border-soul-gold text-soul-gold' : 'border-soul-border text-soul-muted hover:border-soul-gold hover:text-soul-gold'}`}
            >
              <SlidersHorizontal size={14} />
              Filters
              {showFilters ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>
          </div>

          {/* Category filters */}
          {showFilters && (
            <div className="flex flex-wrap gap-2 pt-3 mt-3 border-t border-soul-border">
              {categoryFilters.map(({ key, label }) => (
                <button
                  key={key}
                  id={`browse-cat-${key}`}
                  onClick={() => setActiveFilter(key)}
                  className={`text-xs font-semibold tracking-wide px-4 py-2 rounded-sm border transition-all duration-200
                    ${activeFilter === key
                      ? 'bg-soul-gold text-soul-black border-soul-gold'
                      : 'border-soul-border text-soul-muted hover:border-soul-muted hover:text-soul-cream'
                    }`}
                >
                  {label.toUpperCase()}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Vehicle grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <p className="text-soul-muted text-sm mb-6">
          Showing <strong className="text-soul-cream">{filtered.length}</strong> vehicles
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-5xl mb-4">🚗</p>
            <p className="text-soul-muted">No vehicles match your search.</p>
            <button onClick={() => { setSearch(''); setActiveFilter('all') }}
              className="mt-4 text-soul-gold underline text-sm">Clear filters</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(vehicle => (
              <div key={vehicle.id}
                className="bg-soul-card border border-soul-border rounded-sm overflow-hidden group card-hover">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {vehicle.verified && (
                    <div className="absolute top-3 right-3 bg-soul-black/70 rounded-full p-1.5">
                      <BadgeCheck size={14} className="text-soul-gold" />
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-soul-card to-transparent" />
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-soul-cream font-semibold text-sm group-hover:text-soul-gold transition-colors">
                        {vehicle.name}
                      </h3>
                      <p className="text-soul-muted text-xs">{vehicle.year}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-soul-smoke rounded px-1.5 py-0.5">
                      <Star size={10} className="text-soul-gold fill-soul-gold" />
                      <span className="text-soul-cream text-xs font-medium">{vehicle.rating}</span>
                    </div>
                  </div>
                  <p className="flex items-center gap-1.5 text-soul-muted text-xs mb-4">
                    <MapPin size={11} /> {vehicle.location}
                  </p>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-soul-gold font-bold text-lg">₹{vehicle.pricePerDay.toLocaleString()}</span>
                      <span className="text-soul-muted text-xs"> /day</span>
                    </div>
                    <button
                      onClick={() => handleBook(vehicle)}
                      className="text-xs font-medium text-soul-gold border border-soul-gold/40 rounded-sm px-3 py-1.5
                                       hover:bg-soul-gold hover:text-soul-black transition-all duration-200"
                    >
                      Book for Show
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        vehicle={selectedVehicle}
        mode="show"
      />
    </div>
  )
}
