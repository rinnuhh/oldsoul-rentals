import { Search, Calendar, CheckCircle2, Wallet, Car, Users, Award, MessageSquare } from 'lucide-react'
import { Link } from 'react-router-dom'

const ownerSteps = [
  { num: '01', Icon: Car,           title: 'List Your Vehicle',  desc: 'Add your vehicle details, photos, availability, and set your price per day.' },
  { num: '02', Icon: Calendar,      title: 'Get Booked',         desc: 'Verified organizers browse and send booking requests with event details.' },
  { num: '03', Icon: CheckCircle2,  title: 'Confirm & Prepare',  desc: 'Review the booking, confirm, and get your vehicle show-ready.' },
  { num: '04', Icon: Wallet,        title: 'Earn with Pride',    desc: 'Get paid securely after the event. Build your reputation on OldSoul.' },
]

const renterSteps = [
  { num: '01', Icon: Search,        title: 'Browse & Discover',  desc: 'Explore hundreds of verified vintage and modern vehicles in your city.' },
  { num: '02', Icon: Calendar,      title: 'Select & Book',      desc: 'Choose your event dates, add event details, and send a booking request.' },
  { num: '03', Icon: MessageSquare, title: 'Owner Confirms',     desc: 'The owner reviews your event and confirms within 24 hours.' },
  { num: '04', Icon: Award,         title: 'Show & Shine',       desc: 'Collect the vehicle, head to your event, and make it unforgettable.' },
]

const faqs = [
  { q: 'Is my vehicle insured during the event?', a: 'OldSoul offers basic coverage for all booked vehicles. Owners can also add their own comprehensive insurance.' },
  { q: 'How do I get paid as a vehicle owner?', a: 'Payments are processed securely via bank transfer within 2–3 business days after the event is completed.' },
  { q: 'Can I cancel a booking?', a: 'Cancellations made 72+ hours before the event are fully refunded. Late cancellations may attract a 20% fee.' },
  { q: 'What kind of events can I book for?', a: 'College fests, auto exhibitions, wedding processions, film shoots, brand events, and more.' },
]

export default function HowItWorksPage() {
  return (
    <div className="bg-soul-black pt-20 lg:pt-24">

      {/* Header */}
      <section className="bg-soul-dark border-b border-soul-border py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-label mb-4">The OldSoul Way</p>
          <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-soul-cream mb-6">
            How It <span className="text-gold-gradient italic">Works</span>
          </h1>
          <p className="text-soul-muted text-lg max-w-2xl mx-auto">
            Whether you own a classic vehicle or need one for your show — we make the process
            simple, secure, and rewarding.
          </p>
        </div>
      </section>

      {/* For Owners */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-10 h-10 rounded-full bg-soul-gold/10 border border-soul-gold/30 flex items-center justify-center">
              <Car size={18} className="text-soul-gold" />
            </div>
            <div>
              <p className="section-label">For Vehicle Owners</p>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-soul-cream">List. Earn. Repeat.</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ownerSteps.map(({ num, Icon, title, desc }) => (
              <div key={num} className="relative bg-soul-card border border-soul-border rounded-sm p-6 hover:border-soul-gold/40 transition-all group">
                <span className="absolute top-4 right-4 text-[10px] font-mono text-soul-gold/30 font-bold">{num}</span>
                <div className="w-12 h-12 rounded-full bg-soul-black border border-soul-border flex items-center justify-center mb-5 group-hover:border-soul-gold/50 transition-colors">
                  <Icon size={20} className="text-soul-gold" />
                </div>
                <h3 className="text-soul-cream font-semibold text-sm mb-2">{title}</h3>
                <p className="text-soul-muted text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For Renters */}
      <section className="py-20 lg:py-28 bg-soul-dark border-y border-soul-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-10 h-10 rounded-full bg-soul-gold/10 border border-soul-gold/30 flex items-center justify-center">
              <Users size={18} className="text-soul-gold" />
            </div>
            <div>
              <p className="section-label">For Event Organizers</p>
              <h2 className="font-serif font-bold text-2xl sm:text-3xl text-soul-cream">Browse. Book. Celebrate.</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {renterSteps.map(({ num, Icon, title, desc }) => (
              <div key={num} className="relative bg-soul-black border border-soul-border rounded-sm p-6 hover:border-soul-gold/40 transition-all group">
                <span className="absolute top-4 right-4 text-[10px] font-mono text-soul-gold/30 font-bold">{num}</span>
                <div className="w-12 h-12 rounded-full bg-soul-card border border-soul-border flex items-center justify-center mb-5 group-hover:border-soul-gold/50 transition-colors">
                  <Icon size={20} className="text-soul-gold" />
                </div>
                <h3 className="text-soul-cream font-semibold text-sm mb-2">{title}</h3>
                <p className="text-soul-muted text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="section-label mb-3">Common Questions</p>
            <h2 className="font-serif font-bold text-3xl text-soul-cream">
              Frequently Asked <span className="text-gold-gradient italic">Questions</span>
            </h2>
          </div>
          <div className="flex flex-col gap-4">
            {faqs.map(({ q, a }) => (
              <div key={q} className="bg-soul-card border border-soul-border rounded-sm p-6 hover:border-soul-gold/30 transition-colors">
                <h3 className="text-soul-cream font-semibold text-sm mb-2">{q}</h3>
                <p className="text-soul-muted text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-soul-dark border-t border-soul-border py-16 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="font-serif font-bold text-3xl text-soul-cream mb-4">
            Ready to get started?
          </h2>
          <p className="text-soul-muted mb-8">Join the OldSoul community today.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/list-vehicle" className="btn-gold">List Your Vehicle</Link>
            <Link to="/browse" className="btn-ghost-gold">Browse Vehicles</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
