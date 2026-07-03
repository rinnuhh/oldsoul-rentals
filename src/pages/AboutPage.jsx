import { Shield, Sparkles, Users, Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

const values = [
  {
    Icon: Shield,
    title: 'Heritage Preservation',
    desc: 'Automobiles are living pieces of history. We connect owners who meticulously preserve these legends with events that appreciate their cultural and historical value.',
  },
  {
    Icon: Sparkles,
    title: 'Exquisite Curation',
    desc: 'Every vehicle listed on our premium platform is reviewed and hand-selected to ensure authenticity, visual appeal, and mechanical reliability for shows.',
  },
  {
    Icon: Users,
    title: 'Community First',
    desc: 'We are more than a rental company. We are a gathering point for car collectors, event hosts, restoration artists, and the next generation of enthusiasts.',
  },
  {
    Icon: Heart,
    title: 'Passion Over Profits',
    desc: 'Driven by enthusiasts, for enthusiasts. We ensure vehicle owners are rewarded fairly for sharing their pride and joy with the community.',
  },
]

const teamMembers = [
  {
    name: 'Rohan Kurian',
    role: 'Co-Founder & Chief Curator',
    desc: 'A restorer with a collection of 8 vintage British roadsters, Rohan has spent two decades in the classic car restoration space in Kerala.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
  },
  {
    name: 'Meera Nair',
    role: 'Operations & Event Logistics',
    desc: 'With background in hosting major automobile expos in India, Meera ensures smooth coordination between car owners and event organizers.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80',
  },
  {
    name: 'Dr. Antony Joseph',
    role: 'Automotive Historian & Advisor',
    desc: 'A retired professor and collector of vintage Indian motorcycles, Antony verifies the provenance and historical accuracy of our elite listings.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
  },
]

export default function AboutPage() {
  return (
    <div className="bg-soul-black min-h-screen pt-20 lg:pt-24 text-soul-cream">
      
      {/* Editorial Header */}
      <section className="bg-soul-dark border-b border-soul-border py-16 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="section-label mb-4">Our Heritage</p>
          <h1 className="font-serif font-bold text-4xl sm:text-5xl lg:text-6xl text-soul-cream mb-6 leading-tight">
            Preserving the Soul of{' '}
            <br className="hidden sm:inline" />
            <span className="text-gold-gradient italic">Automobile Culture</span>
          </h1>
          <p className="text-soul-muted text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            OldSoul was born from a simple belief: classic and custom vehicles are works of art that deserve to be seen, experienced, and celebrated.
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Story Image */}
            <div className="relative rounded-sm overflow-hidden border border-soul-border group shadow-card-lg">
              <img
                src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1000&q=80"
                alt="Vintage dashboard dials details"
                className="w-full h-80 lg:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-soul-black/40 to-transparent" />
            </div>

            {/* Story Text */}
            <div className="space-y-6">
              <p className="section-label">How We Started</p>
              <h2 className="font-serif font-bold text-3xl text-soul-cream">
                Bridging the Gap Between{' '}
                <span className="text-gold-gradient italic">Collectors & Creators</span>
              </h2>
              <div className="text-soul-muted text-sm sm:text-base leading-relaxed space-y-4 font-sans">
                <p>
                  Every automobile has a voice, a history, and a unique soul. But for too long, India's finest vintage models and custom-modified builds remained hidden away in private garages, rarely sharing their legacy with the public.
                </p>
                <p>
                  At the same time, college fests, heritage exhibitions, and movie productions struggled to find authentic, well-maintained vehicles. OldSoul Rentals was founded to solve this — providing a secure, high-trust marketplace where collectors can confidently showcase their mechanical treasures, and event organizers can easily book them.
                </p>
                <p>
                  Today, we support both luxury show rentals and daily commutes, maintaining a dual-identity platform that respects the prestige of classics while meeting the everyday transport needs of our community.
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 lg:py-28 bg-soul-dark border-y border-soul-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="section-label mb-3">Our Principles</p>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-soul-cream">
              What We Stand <span className="text-gold-gradient italic">For</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {values.map(({ Icon, title, desc }) => (
              <div key={title} className="flex gap-4 p-6 bg-soul-card border border-soul-border rounded-sm hover:border-soul-gold/30 transition-colors">
                <div className="w-12 h-12 rounded-sm border border-soul-border bg-soul-black flex items-center justify-center flex-shrink-0">
                  <Icon size={20} className="text-soul-gold" />
                </div>
                <div>
                  <h3 className="text-soul-cream font-semibold text-base mb-2">{title}</h3>
                  <p className="text-soul-muted text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet the Curators */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="section-label mb-3">The Curators</p>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-soul-cream">
              The Minds Behind <span className="text-gold-gradient italic">OldSoul</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map(({ name, role, desc, image }) => (
              <div key={name} className="bg-soul-card border border-soul-border rounded-sm overflow-hidden group">
                <div className="h-64 overflow-hidden relative">
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-soul-card to-transparent opacity-85" />
                </div>
                <div className="p-6 relative -mt-6 bg-soul-card">
                  <h3 className="font-serif font-bold text-lg text-soul-cream group-hover:text-soul-gold transition-colors">
                    {name}
                  </h3>
                  <p className="text-soul-gold text-xs font-semibold tracking-wider mb-3 uppercase">
                    {role}
                  </p>
                  <p className="text-soul-muted text-xs sm:text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-soul-dark border-t border-soul-border py-16 text-center">
        <div className="max-w-xl mx-auto px-4">
          <h2 className="font-serif font-bold text-3xl text-soul-cream mb-4">
            Have a classic or modified ride?
          </h2>
          <p className="text-soul-muted mb-8">List it with us and let it shine at exhibitions, weddings, and photoshoots.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/list-vehicle" className="btn-gold text-sm font-semibold tracking-wide">
              List Your Vehicle
            </Link>
            <Link to="/contact" className="btn-ghost-gold text-sm font-semibold tracking-wide">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
      
    </div>
  )
}
