import { useState } from 'react'
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock } from 'lucide-react'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    role: 'renter',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  const handleReset = () => {
    setSubmitted(false)
    setFormData({
      name: '',
      email: '',
      subject: '',
      role: 'renter',
      message: '',
    })
  }

  return (
    <div className="bg-soul-black min-h-screen pt-20 lg:pt-24 text-soul-cream">
      
      {/* Header */}
      <section className="bg-soul-dark border-b border-soul-border py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-label mb-3">Get In Touch</p>
          <h1 className="font-serif font-bold text-4xl sm:text-5xl text-soul-cream mb-4">
            Connect With <span className="text-gold-gradient italic">OldSoul</span>
          </h1>
          <p className="text-soul-muted text-sm sm:text-base max-w-xl mx-auto">
            Whether you want to list your car, book a show-stopper for your fest, or just talk shop, we would love to hear from you.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Contact details */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="section-label mb-2">Our Office</p>
              <h2 className="font-serif font-bold text-2xl text-soul-cream mb-5">
                Headquarters & Garage
              </h2>
              <p className="text-soul-muted text-sm leading-relaxed mb-6 font-sans">
                Located in the heart of Kochi, Kerala, our garage handles historical archive verification, vehicle inspections, and community meetups.
              </p>
            </div>

            <div className="space-y-5">
              {[
                {
                  Icon: MapPin,
                  title: 'Location',
                  content: 'Building 14, Old Port Road, Fort Kochi, Kerala - 682001',
                  link: 'https://maps.google.com',
                },
                {
                  Icon: Phone,
                  title: 'Phone Number',
                  content: '+91 98765 43210',
                  link: 'tel:+919876543210',
                },
                {
                  Icon: Mail,
                  title: 'Email Address',
                  content: 'hello@oldsoul.in',
                  link: 'mailto:hello@oldsoul.in',
                },
                {
                  Icon: Clock,
                  title: 'Working Hours',
                  content: 'Mon - Sat: 9:00 AM - 6:00 PM IST',
                  link: null,
                },
              ].map(({ Icon, title, content, link }) => (
                <div key={title} className="flex gap-4 p-4 bg-soul-card border border-soul-border rounded-sm hover:border-soul-gold/25 transition-colors">
                  <div className="w-10 h-10 rounded-sm border border-soul-border bg-soul-black flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-soul-gold" />
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-soul-gold uppercase tracking-wider mb-1">
                      {title}
                    </h4>
                    {link ? (
                      <a href={link} target="_blank" rel="noopener noreferrer" className="text-soul-cream hover:underline text-sm font-sans">
                        {content}
                      </a>
                    ) : (
                      <span className="text-soul-cream text-sm font-sans">{content}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7 bg-soul-card border border-soul-border rounded-sm p-6 sm:p-10 shadow-card">
            {submitted ? (
              <div className="text-center py-12 flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-soul-gold/10 border border-soul-gold/40 text-soul-gold flex items-center justify-center mb-6">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="font-serif font-bold text-2xl text-soul-cream mb-3">
                  Message Sent Successfully!
                </h3>
                <p className="text-soul-muted text-sm max-w-md mb-8 leading-relaxed">
                  Thank you for reaching out, <strong>{formData.name}</strong>. Our curators have received your inquiry regarding <strong>"{formData.subject || 'General Inquiry'}"</strong> and will get back to you within 24 hours.
                </p>
                <button
                  onClick={handleReset}
                  className="btn-gold text-sm font-semibold tracking-wide"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-serif font-bold text-xl text-soul-cream mb-1">Send a Message</h3>
                  <p className="text-soul-muted text-xs">Fill in your details below and we will contact you shortly.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-name" className="block text-soul-muted text-xs mb-1.5 font-medium">
                      Your Full Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      placeholder="e.g. Rajan Nair"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-soul-black border border-soul-border rounded-sm px-3.5 py-2.5 text-sm text-soul-cream focus:outline-none focus:border-soul-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-soul-muted text-xs mb-1.5 font-medium">
                      Email Address
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="rajan@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-soul-black border border-soul-border rounded-sm px-3.5 py-2.5 text-sm text-soul-cream focus:outline-none focus:border-soul-gold transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contact-subject" className="block text-soul-muted text-xs mb-1.5 font-medium">
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      required
                      placeholder="e.g. Booking vintage Mustang"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full bg-soul-black border border-soul-border rounded-sm px-3.5 py-2.5 text-sm text-soul-cream focus:outline-none focus:border-soul-gold transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-role" className="block text-soul-muted text-xs mb-1.5 font-medium">
                      I am a / an...
                    </label>
                    <select
                      id="contact-role"
                      name="role"
                      value={formData.role}
                      onChange={handleInputChange}
                      className="w-full bg-soul-black border border-soul-border rounded-sm px-3.5 py-2.5 text-sm text-soul-cream focus:outline-none focus:border-soul-gold transition-colors cursor-pointer"
                    >
                      <option value="renter">Event Organizer / Renter</option>
                      <option value="owner">Vehicle Owner / Collector</option>
                      <option value="enthusiast">Automobile Enthusiast</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-soul-muted text-xs mb-1.5 font-medium">
                    Your Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Enter your inquiry details here. If inquiring about a specific event or listing, please include as much detail as possible..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full bg-soul-black border border-soul-border rounded-sm px-3.5 py-2.5 text-sm text-soul-cream focus:outline-none focus:border-soul-gold transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-gold w-full py-3.5 text-sm font-semibold tracking-wide flex items-center justify-center gap-2 active:scale-95 shadow-md"
                >
                  <Send size={15} /> Send Message
                </button>
              </form>
            )}
          </div>
          
        </div>
      </section>
      
    </div>
  )
}
