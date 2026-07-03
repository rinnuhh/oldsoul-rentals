import { useState } from 'react'

const container = {
  maxWidth: '1280px',
  margin: '0 auto',
  padding: '0 40px',
}

const types = [
  {
    key: 'vintage',
    label: 'VINTAGE',
    sublabel: 'Classic beauty. Timeless charm.',
    icon: (
      <svg viewBox="0 0 56 28" fill="none" width="56" height="28" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="11" cy="22" rx="5" ry="5" />
        <ellipse cx="45" cy="22" rx="5" ry="5" />
        <path d="M6 22H2V15L10 8h24l7 7h8v7h-5" strokeLinecap="round" />
        <path d="M16 22h22" />
        <path d="M10 15h16v-6H12l-2 6Z" />
      </svg>
    ),
  },
  {
    key: 'modern',
    label: 'MODERN',
    sublabel: 'Modified power. Modern pride.',
    icon: (
      <svg viewBox="0 0 56 28" fill="none" width="56" height="28" stroke="currentColor" strokeWidth="1.5">
        <ellipse cx="12" cy="22" rx="5" ry="5" />
        <ellipse cx="44" cy="22" rx="5" ry="5" />
        <path d="M7 22H2V16L12 9h21l10 7h9v6h-5" strokeLinecap="round" />
        <path d="M17 22h20" />
        <path d="M12 16l5-6h16l5 6H12Z" />
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
    <section style={{
      background: '#111111',
      borderTop: '1px solid rgba(42,42,42,0.6)',
      borderBottom: '1px solid rgba(42,42,42,0.6)',
      padding: '40px 0',
    }}>
      <div style={container}>
        {/* Label */}
        <p style={{
          textAlign: 'center',
          fontFamily: 'Inter, sans-serif',
          fontSize: '0.6rem',
          fontWeight: 600,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color: '#8A7A5F',
          marginBottom: '24px',
        }}>
          What are you looking for?
        </p>

        {/* Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '16px',
          flexWrap: 'wrap',
        }}>
          {types.map(({ key, label, sublabel, icon }) => {
            const isActive = active === key
            return (
              <button
                key={key}
                id={`type-selector-${key}`}
                onClick={() => handleSelect(key)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  padding: '20px 36px',
                  minWidth: '270px',
                  borderRadius: '6px',
                  background: isActive ? 'rgba(201,168,76,0.07)' : '#181818',
                  border: isActive ? '1px solid rgba(201,168,76,0.5)' : '1px solid rgba(42,42,42,0.9)',
                  boxShadow: isActive ? '0 0 20px rgba(201,168,76,0.1)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
              >
                {/* Icon */}
                <span style={{ color: isActive ? '#C9A84C' : '#8A7A5F', flexShrink: 0, display: 'flex', transition: 'color 0.25s ease' }}>
                  {icon}
                </span>

                {/* Text */}
                <div style={{ textAlign: 'left' }}>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    letterSpacing: '0.16em',
                    color: isActive ? '#C9A84C' : '#F5EDD6',
                    transition: 'color 0.25s ease',
                    marginBottom: '4px',
                  }}>
                    {label}
                  </p>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.72rem',
                    color: '#8A7A5F',
                  }}>
                    {sublabel}
                  </p>
                </div>

                {/* Active dot */}
                {isActive && (
                  <div style={{
                    marginLeft: 'auto',
                    width: '6px', height: '6px',
                    borderRadius: '50%',
                    background: '#C9A84C',
                    flexShrink: 0,
                  }} />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
