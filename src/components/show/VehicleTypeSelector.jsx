import { useState } from 'react'

const types = [
  {
    key: 'vintage',
    label: 'Vintage',
    sublabel: 'Classic beauty. Timeless charm.',
    icon: (
      <svg viewBox="0 0 48 24" fill="none" className="w-11 h-6" stroke="currentColor" strokeWidth="1.4">
        <ellipse cx="10" cy="19" rx="4" ry="4" />
        <ellipse cx="38" cy="19" rx="4" ry="4" />
        <path d="M6 19H2V13L8 7h20l6 6h6v6h-4" strokeLinecap="round" />
        <path d="M14 19h18" />
        <path d="M8 13h14v-5H10l-2 5Z" />
      </svg>
    ),
  },
  {
    key: 'modern',
    label: 'Modern',
    sublabel: 'Modified power. Modern pride.',
    icon: (
      <svg viewBox="0 0 48 24" fill="none" className="w-11 h-6" stroke="currentColor" strokeWidth="1.4">
        <ellipse cx="11" cy="19" rx="4" ry="4" />
        <ellipse cx="37" cy="19" rx="4" ry="4" />
        <path d="M7 19H2V14L10 8h18l8 6h8v5h-4" strokeLinecap="round" />
        <path d="M15 19h18" />
        <path d="M10 14l4-5h14l4 5H10Z" />
      </svg>
    ),
  },
]

export default function VehicleTypeSelector({ onTypeChange }) {
  const [active, setActive] = useState('vintage')

  const handleSelect = (key) => {
    setActive(key)
    onTypeChange?.(key)
  }

  return (
    <section
      className="py-10"
      style={{
        background: '#111111',
        borderTop: '1px solid rgba(42,42,42,0.6)',
        borderBottom: '1px solid rgba(42,42,42,0.6)',
      }}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <p className="text-center section-label mb-6">What are you looking for?</p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {types.map(({ key, label, sublabel, icon }) => (
            <button
              key={key}
              id={`type-selector-${key}`}
              onClick={() => handleSelect(key)}
              className={`flex items-center gap-4 border transition-all duration-300 w-full sm:w-auto ${
                active === key
                  ? 'bg-soul-gold/8 border-soul-gold/60 shadow-gold-sm'
                  : 'bg-soul-card border-soul-border hover:border-soul-muted/60'
              }`}
              style={{
                minWidth: '240px',
                padding: '18px 28px',
                borderRadius: '5px',
              }}
            >
              {/* Icon */}
              <span
                className={`transition-colors duration-300 flex-shrink-0 ${
                  active === key ? 'text-soul-gold' : 'text-soul-muted'
                }`}
              >
                {icon}
              </span>

              {/* Text */}
              <div className="text-left">
                <p
                  className={`transition-colors duration-200 ${
                    active === key ? 'text-soul-gold' : 'text-soul-cream'
                  }`}
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                  }}
                >
                  {label}
                </p>
                <p
                  className="text-soul-muted mt-0.5"
                  style={{
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontSize: '0.73rem',
                    letterSpacing: '0.01em',
                  }}
                >
                  {sublabel}
                </p>
              </div>

              {/* Active dot */}
              {active === key && (
                <div
                  className="ml-auto flex-shrink-0 bg-soul-gold"
                  style={{ width: '6px', height: '6px', borderRadius: '50%' }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
