import { useState, useEffect } from 'react'
import { X, Calendar, MapPin, User, Mail, Phone, ShieldCheck, CheckCircle2, Ticket } from 'lucide-react'

export default function BookingModal({ isOpen, onClose, vehicle, mode = 'show' }) {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    startDate: '',
    endDate: '',
    eventOrVenue: '',
    notes: '',
    insurance: 'standard',
  })
  const [bookingRef, setBookingRef] = useState('')
  const [days, setDays] = useState(1)

  useEffect(() => {
    if (formData.startDate && formData.endDate) {
      const start = new Date(formData.startDate)
      const end = new Date(formData.endDate)
      const diffTime = Math.abs(end - start)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1
      setDays(diffDays)
    } else {
      setDays(1)
    }
  }, [formData.startDate, formData.endDate])

  if (!isOpen || !vehicle) return null

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Generate simple mock booking reference
    const rand = Math.floor(10000 + Math.random() * 90000)
    setBookingRef(`OS-${rand}`)
    setSubmitted(true)
  }

  const handleClose = () => {
    setSubmitted(false)
    setFormData({
      name: '',
      email: '',
      phone: '',
      startDate: '',
      endDate: '',
      eventOrVenue: '',
      notes: '',
      insurance: 'standard',
    })
    onClose()
  }

  const isShowMode = mode === 'show'

  // Pricing calculations
  const pricePerDay = vehicle.pricePerDay || 0
  const subtotal = pricePerDay * days
  const serviceFee = isShowMode ? Math.round(subtotal * 0.05) : Math.round(subtotal * 0.03)
  const insurancePrice = formData.insurance === 'premium' ? 500 * days : 0
  const total = subtotal + serviceFee + insurancePrice

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-sm px-4 py-6 overflow-y-auto">
      {/* Modal Container */}
      <div
        className={`relative w-full max-w-2xl rounded-lg shadow-card-lg overflow-hidden border transition-all duration-300 my-auto
          ${isShowMode
            ? 'bg-soul-dark border-soul-border text-soul-cream'
            : 'bg-white border-rental-border text-rental-text'
          }`}
      >
        {/* Header */}
        <div
          className={`flex items-center justify-between px-6 py-4 border-b
            ${isShowMode ? 'border-soul-border bg-soul-black' : 'border-rental-border bg-rental-bg'}`}
        >
          <div>
            <h2 className={`font-serif font-bold text-lg leading-tight ${isShowMode ? 'text-soul-gold' : 'text-rental-navy'}`}>
              {submitted ? 'Booking Confirmed' : `Request Booking`}
            </h2>
            <p className={`text-xs mt-0.5 ${isShowMode ? 'text-soul-muted' : 'text-rental-muted'}`}>
              {vehicle.name} • {vehicle.year || vehicle.type}
            </p>
          </div>
          <button
            onClick={handleClose}
            className={`p-1.5 rounded-full transition-colors
              ${isShowMode ? 'text-soul-muted hover:text-soul-cream hover:bg-soul-card' : 'text-rental-muted hover:text-rental-navy hover:bg-rental-border'}`}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        {submitted ? (
          /* SUCCESS STATE */
          <div className="p-8 text-center flex flex-col items-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-5 animate-bounce
              ${isShowMode ? 'bg-soul-gold/10 border border-soul-gold/40 text-soul-gold' : 'bg-green-50 border border-green-200 text-green-600'}`}>
              <CheckCircle2 size={32} />
            </div>

            <h3 className={`font-serif font-bold text-2xl mb-2 ${isShowMode ? 'text-soul-cream' : 'text-rental-navy'}`}>
              Reservation Requested!
            </h3>
            <p className={`text-sm max-w-md mb-6 leading-relaxed ${isShowMode ? 'text-soul-muted' : 'text-rental-muted'}`}>
              Your request for the <strong>{vehicle.name}</strong> has been sent to the owner. They will review and confirm within 24 hours.
            </p>

            {/* Receipt Details */}
            <div className={`w-full max-w-sm rounded-lg p-5 border text-left mb-8
              ${isShowMode ? 'bg-soul-black border-soul-border' : 'bg-rental-bg border-rental-border'}`}>
              <div className="flex justify-between items-center pb-3 border-b border-dashed mb-4 border-slate-700">
                <span className={`text-xs font-mono tracking-wider ${isShowMode ? 'text-soul-muted' : 'text-rental-muted'}`}>
                  BOOKING REFERENCE
                </span>
                <span className={`font-mono font-bold text-sm flex items-center gap-1.5 ${isShowMode ? 'text-soul-gold' : 'text-rental-navy'}`}>
                  <Ticket size={14} /> {bookingRef}
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between">
                  <span className={isShowMode ? 'text-soul-muted' : 'text-rental-muted'}>Renter Name</span>
                  <span className="font-medium">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className={isShowMode ? 'text-soul-muted' : 'text-rental-muted'}>Dates</span>
                  <span className="font-medium">{formData.startDate} to {formData.endDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className={isShowMode ? 'text-soul-muted' : 'text-rental-muted'}>Duration</span>
                  <span className="font-medium">{days} {days === 1 ? 'Day' : 'Days'}</span>
                </div>
                {isShowMode && formData.eventOrVenue && (
                  <div className="flex justify-between">
                    <span className="text-soul-muted">Event Venue</span>
                    <span className="font-medium truncate max-w-[200px]">{formData.eventOrVenue}</span>
                  </div>
                )}
                <div className="flex justify-between pt-3 border-t border-slate-700/50 font-semibold text-sm">
                  <span className={isShowMode ? 'text-soul-cream' : 'text-rental-navy'}>Estimated Total</span>
                  <span className={isShowMode ? 'text-soul-gold' : 'text-rental-blue'}>₹{total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleClose}
              className={`w-full max-w-sm py-3 text-sm font-semibold rounded-sm tracking-wide
                ${isShowMode ? 'btn-gold' : 'bg-rental-navy text-white hover:bg-opacity-95'}`}
            >
              Back to Fleet
            </button>
          </div>
        ) : (
          /* FORM STATE */
          <form onSubmit={handleSubmit}>
            <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 max-h-[70vh] overflow-y-auto">
              
              {/* Left Column - Contact Details */}
              <div className="md:col-span-7 space-y-4">
                <h3 className={`text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-1.5
                  ${isShowMode ? 'text-soul-gold' : 'text-rental-navy'}`}>
                  <User size={13} /> Personal Information
                </h3>
                
                <div>
                  <label className={`block text-xs font-medium mb-1.5 ${isShowMode ? 'text-soul-muted' : 'text-rental-muted'}`}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="e.g. Rajan Nair"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full text-sm px-3.5 py-2.5 rounded border focus:outline-none transition-all
                      ${isShowMode
                        ? 'bg-soul-black border-soul-border text-soul-cream focus:border-soul-gold'
                        : 'bg-white border-rental-border text-rental-text focus:border-rental-blue'}`}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs font-medium mb-1.5 ${isShowMode ? 'text-soul-muted' : 'text-rental-muted'}`}>
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="rajan@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full text-sm px-3.5 py-2.5 rounded border focus:outline-none transition-all
                        ${isShowMode
                          ? 'bg-soul-black border-soul-border text-soul-cream focus:border-soul-gold'
                          : 'bg-white border-rental-border text-rental-text focus:border-rental-blue'}`}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-medium mb-1.5 ${isShowMode ? 'text-soul-muted' : 'text-rental-muted'}`}>
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full text-sm px-3.5 py-2.5 rounded border focus:outline-none transition-all
                        ${isShowMode
                          ? 'bg-soul-black border-soul-border text-soul-cream focus:border-soul-gold'
                          : 'bg-white border-rental-border text-rental-text focus:border-rental-blue'}`}
                    />
                  </div>
                </div>

                <h3 className={`text-xs font-bold uppercase tracking-wider pt-3 mb-2 flex items-center gap-1.5
                  ${isShowMode ? 'text-soul-gold' : 'text-rental-navy'}`}>
                  <Calendar size={13} /> Rental Schedule
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`block text-xs font-medium mb-1.5 ${isShowMode ? 'text-soul-muted' : 'text-rental-muted'}`}>
                      Start Date
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      required
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className={`w-full text-sm px-3.5 py-2.5 rounded border focus:outline-none transition-all cursor-pointer
                        ${isShowMode
                          ? 'bg-soul-black border-soul-border text-soul-cream focus:border-soul-gold'
                          : 'bg-white border-rental-border text-rental-text focus:border-rental-blue'}`}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs font-medium mb-1.5 ${isShowMode ? 'text-soul-muted' : 'text-rental-muted'}`}>
                      End Date
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      required
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className={`w-full text-sm px-3.5 py-2.5 rounded border focus:outline-none transition-all cursor-pointer
                        ${isShowMode
                          ? 'bg-soul-black border-soul-border text-soul-cream focus:border-soul-gold'
                          : 'bg-white border-rental-border text-rental-text focus:border-rental-blue'}`}
                    />
                  </div>
                </div>

                {isShowMode ? (
                  <div>
                    <label className="block text-xs font-medium mb-1.5 text-soul-muted">
                      Event / Exhibition Venue
                    </label>
                    <div className="relative">
                      <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-soul-muted" />
                      <input
                        type="text"
                        name="eventOrVenue"
                        required
                        placeholder="e.g. Grand Hyatt Convention Center"
                        value={formData.eventOrVenue}
                        onChange={handleInputChange}
                        className="w-full text-sm pl-9 pr-4 py-2.5 bg-soul-black border border-soul-border text-soul-cream rounded focus:outline-none focus:border-soul-gold"
                      />
                    </div>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-medium mb-1.5 text-rental-muted">
                      Coverage Insurance Package
                    </label>
                    <select
                      name="insurance"
                      value={formData.insurance}
                      onChange={handleInputChange}
                      className="w-full text-sm px-3.5 py-2.5 bg-white border border-rental-border text-rental-text rounded focus:outline-none focus:border-rental-blue cursor-pointer"
                    >
                      <option value="standard">Standard Cover (Included)</option>
                      <option value="premium">Full Zero-Depreciation Protection (+₹500/day)</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className={`block text-xs font-medium mb-1.5 ${isShowMode ? 'text-soul-muted' : 'text-rental-muted'}`}>
                    Additional Notes or Requirements
                  </label>
                  <textarea
                    name="notes"
                    rows={2}
                    placeholder={isShowMode ? "Describe the show setup, logistics, static vs. dynamic, etc." : "Delivery requests, child seat, gps, etc."}
                    value={formData.notes}
                    onChange={handleInputChange}
                    className={`w-full text-sm px-3.5 py-2.5 rounded border focus:outline-none transition-all resize-none
                      ${isShowMode
                        ? 'bg-soul-black border-soul-border text-soul-cream focus:border-soul-gold'
                        : 'bg-white border-rental-border text-rental-text focus:border-rental-blue'}`}
                  />
                </div>
              </div>

              {/* Right Column - Booking Summary */}
              <div className="md:col-span-5 space-y-4">
                <div className={`rounded-lg p-5 border h-full flex flex-col justify-between
                  ${isShowMode ? 'bg-soul-black border-soul-border' : 'bg-rental-bg border-rental-border'}`}>
                  
                  <div>
                    <h3 className={`text-xs font-bold uppercase tracking-wider mb-4 border-b pb-2
                      ${isShowMode ? 'text-soul-gold border-soul-border/50' : 'text-rental-navy border-rental-border'}`}>
                      Summary
                    </h3>
                    
                    {/* Vehicle Miniature Card */}
                    <div className="flex gap-3 mb-4">
                      <img
                        src={vehicle.image}
                        alt={vehicle.name}
                        className="w-20 h-14 object-cover rounded bg-black/25"
                      />
                      <div>
                        <h4 className="font-semibold text-sm leading-tight">{vehicle.name}</h4>
                        <p className={`text-[10px] mt-0.5 ${isShowMode ? 'text-soul-muted' : 'text-rental-muted'}`}>
                          {vehicle.location || (isShowMode ? 'Kochi' : 'City-wide')}
                        </p>
                        <p className="text-xs font-semibold mt-1">₹{pricePerDay.toLocaleString()}<span className="text-[10px] font-normal text-muted-foreground">/day</span></p>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className={isShowMode ? 'text-soul-muted' : 'text-rental-muted'}>Daily Rate</span>
                        <span>₹{pricePerDay.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className={isShowMode ? 'text-soul-muted' : 'text-rental-muted'}>Rental Period</span>
                        <span>{days} {days === 1 ? 'Day' : 'Days'}</span>
                      </div>
                      
                      {formData.insurance === 'premium' && (
                        <div className="flex justify-between text-green-600 font-medium">
                          <span>Zero-Dep Insurance</span>
                          <span>+₹{(500 * days).toLocaleString()}</span>
                        </div>
                      )}

                      <div className="flex justify-between pt-2">
                        <span className={isShowMode ? 'text-soul-muted' : 'text-rental-muted'}>Service Fee</span>
                        <span>₹{serviceFee.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-dashed mt-4 border-slate-700/50">
                    <div className="flex justify-between items-end mb-5">
                      <div>
                        <p className={`text-[10px] uppercase font-bold tracking-wider ${isShowMode ? 'text-soul-muted' : 'text-rental-muted'}`}>
                          Total Estimate
                        </p>
                        <span className="text-[9px] text-muted-foreground">(All Taxes Included)</span>
                      </div>
                      <span className={`text-xl font-bold leading-none ${isShowMode ? 'text-soul-gold' : 'text-rental-navy'}`}>
                        ₹{total.toLocaleString()}
                      </span>
                    </div>

                    <button
                      type="submit"
                      className={`w-full py-3.5 text-sm font-semibold rounded-sm tracking-wide transition-all active:scale-95 shadow-md flex items-center justify-center gap-2
                        ${isShowMode ? 'btn-gold' : 'bg-rental-blue hover:bg-blue-700 text-white'}`}
                    >
                      <ShieldCheck size={16} />
                      Request Booking
                    </button>
                  </div>

                </div>
              </div>

            </div>
          </form>
        )}
      </div>
    </div>
  )
}
