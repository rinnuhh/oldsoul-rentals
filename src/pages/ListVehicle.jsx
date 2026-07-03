import { useState } from 'react'
import { Car, Upload, MapPin, Phone, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const vehicleCategories = ['Vintage Car', 'Vintage Bike', 'Modern Car', 'Modified Car', 'Classic Truck', 'Other']

export default function ListVehicle() {
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    vehicleName: '', year: '', category: '', location: '',
    pricePerDay: '', description: '', terms: false,
  })

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="bg-soul-black min-h-screen pt-24 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 rounded-full bg-soul-gold/10 border-2 border-soul-gold flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={36} className="text-soul-gold" />
          </div>
          <h2 className="font-serif font-bold text-3xl text-soul-cream mb-4">Listing Submitted!</h2>
          <p className="text-soul-muted mb-8">
            Our team will review your vehicle and get back to you within 24 hours.
            Welcome to the OldSoul family! 🏆
          </p>
          <Link to="/" className="btn-gold">Back to Home</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-soul-black min-h-screen pt-20 lg:pt-24 pb-16">

      {/* Header */}
      <div className="bg-soul-dark border-b border-soul-border py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-label mb-3">Join the Community</p>
          <h1 className="font-serif font-bold text-3xl sm:text-4xl text-soul-cream mb-3">
            List Your <span className="text-gold-gradient italic">Vehicle</span>
          </h1>
          <p className="text-soul-muted">
            Fill in the details below and our team will verify your listing within 24 hours.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">

          {/* Owner Info */}
          <div className="bg-soul-card border border-soul-border rounded-sm p-6">
            <h2 className="text-soul-cream font-semibold text-sm mb-5 flex items-center gap-2">
              <Phone size={15} className="text-soul-gold" /> Owner Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: 'form-owner-name',  name: 'name',  label: 'Full Name',     type: 'text',  placeholder: 'Rajan Nair' },
                { id: 'form-owner-phone', name: 'phone', label: 'Phone Number',  type: 'tel',   placeholder: '+91 98765 43210' },
                { id: 'form-owner-email', name: 'email', label: 'Email Address', type: 'email', placeholder: 'rajan@example.com', full: true },
              ].map(({ id, name, label, type, placeholder, full }) => (
                <div key={id} className={full ? 'sm:col-span-2' : ''}>
                  <label htmlFor={id} className="block text-soul-muted text-xs mb-1.5">{label}</label>
                  <input
                    id={id}
                    name={name}
                    type={type}
                    required
                    placeholder={placeholder}
                    value={form[name]}
                    onChange={handleChange}
                    className="w-full bg-soul-black border border-soul-border rounded-sm px-3 py-2.5
                               text-sm text-soul-cream placeholder-soul-smoke focus:outline-none
                               focus:border-soul-gold transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="bg-soul-card border border-soul-border rounded-sm p-6">
            <h2 className="text-soul-cream font-semibold text-sm mb-5 flex items-center gap-2">
              <Car size={15} className="text-soul-gold" /> Vehicle Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="form-vehicle-name" className="block text-soul-muted text-xs mb-1.5">Vehicle Name / Model</label>
                <input
                  id="form-vehicle-name"
                  name="vehicleName"
                  type="text"
                  required
                  placeholder="e.g. Mercedes-Benz 220S"
                  value={form.vehicleName}
                  onChange={handleChange}
                  className="w-full bg-soul-black border border-soul-border rounded-sm px-3 py-2.5
                             text-sm text-soul-cream placeholder-soul-smoke focus:outline-none focus:border-soul-gold transition-colors"
                />
              </div>
              <div>
                <label htmlFor="form-vehicle-year" className="block text-soul-muted text-xs mb-1.5">Year of Manufacture</label>
                <input
                  id="form-vehicle-year"
                  name="year"
                  type="number"
                  required
                  min="1900"
                  max="2025"
                  placeholder="e.g. 1967"
                  value={form.year}
                  onChange={handleChange}
                  className="w-full bg-soul-black border border-soul-border rounded-sm px-3 py-2.5
                             text-sm text-soul-cream placeholder-soul-smoke focus:outline-none focus:border-soul-gold transition-colors"
                />
              </div>
              <div>
                <label htmlFor="form-vehicle-category" className="block text-soul-muted text-xs mb-1.5">Category</label>
                <select
                  id="form-vehicle-category"
                  name="category"
                  required
                  value={form.category}
                  onChange={handleChange}
                  className="w-full bg-soul-black border border-soul-border rounded-sm px-3 py-2.5
                             text-sm text-soul-cream focus:outline-none focus:border-soul-gold transition-colors cursor-pointer"
                >
                  <option value="">Select category</option>
                  {vehicleCategories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="form-vehicle-price" className="block text-soul-muted text-xs mb-1.5">Price per Day (₹)</label>
                <input
                  id="form-vehicle-price"
                  name="pricePerDay"
                  type="number"
                  required
                  placeholder="e.g. 8000"
                  value={form.pricePerDay}
                  onChange={handleChange}
                  className="w-full bg-soul-black border border-soul-border rounded-sm px-3 py-2.5
                             text-sm text-soul-cream placeholder-soul-smoke focus:outline-none focus:border-soul-gold transition-colors"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="form-vehicle-location" className="block text-soul-muted text-xs mb-1.5">Location (City, State)</label>
                <div className="relative">
                  <MapPin size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-soul-muted" />
                  <input
                    id="form-vehicle-location"
                    name="location"
                    type="text"
                    required
                    placeholder="e.g. Kochi, Kerala"
                    value={form.location}
                    onChange={handleChange}
                    className="w-full pl-8 bg-soul-black border border-soul-border rounded-sm px-3 py-2.5
                               text-sm text-soul-cream placeholder-soul-smoke focus:outline-none focus:border-soul-gold transition-colors"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="form-vehicle-desc" className="block text-soul-muted text-xs mb-1.5">Description & Conditions</label>
                <textarea
                  id="form-vehicle-desc"
                  name="description"
                  rows={4}
                  placeholder="Describe your vehicle, its history, special features, and any conditions for booking..."
                  value={form.description}
                  onChange={handleChange}
                  className="w-full bg-soul-black border border-soul-border rounded-sm px-3 py-2.5
                             text-sm text-soul-cream placeholder-soul-smoke focus:outline-none
                             focus:border-soul-gold transition-colors resize-none"
                />
              </div>
            </div>
          </div>

          {/* Photo upload placeholder */}
          <div className="bg-soul-card border border-dashed border-soul-border rounded-sm p-8 text-center hover:border-soul-gold/50 transition-colors cursor-pointer">
            <Upload size={24} className="text-soul-muted mx-auto mb-3" />
            <p className="text-soul-cream text-sm font-medium mb-1">Upload Vehicle Photos</p>
            <p className="text-soul-muted text-xs">Drag & drop or click to upload (JPG, PNG — max 10 MB each)</p>
          </div>

          {/* Terms */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              id="form-terms-checkbox"
              name="terms"
              type="checkbox"
              required
              checked={form.terms}
              onChange={handleChange}
              className="mt-0.5 accent-soul-gold"
            />
            <span className="text-soul-muted text-sm leading-relaxed">
              I agree to OldSoul's{' '}
              <Link to="/" className="text-soul-gold underline hover:text-soul-gold-light">Terms & Conditions</Link>
              {' '}and confirm that I own or have legal authority to list this vehicle.
            </span>
          </label>

          {/* Submit */}
          <button
            id="form-submit-btn"
            type="submit"
            className="btn-gold w-full py-3.5 text-sm font-semibold tracking-wide"
          >
            Submit Listing for Review
          </button>
        </form>
      </div>
    </div>
  )
}
