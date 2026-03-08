import { useEffect } from 'react'

const HELVETICA = "'Helvetica Neue', Helvetica, Arial, sans-serif"

const PILLARS = [
  {
    icon: '📍',
    title: 'See the Problem',
    body: 'Real-time reports pinpoint litter, illegal dumps, and neglected areas on a living 3D globe — making invisible issues impossible to ignore.',
  },
  {
    icon: '🤝',
    title: 'Organize Action',
    body: 'Create or join a cleanup event in seconds. Invite neighbors, set a time, and coordinate who brings what.',
  },
  {
    icon: '✅',
    title: 'Confirm the Win',
    body: 'Attendees mark the area clean. The report resolves. The marker changes. Progress is real, visible, and permanent.',
  },
]

export function MissionOverlay({ open, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    if (open) document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open, onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center transition-all duration-300"
      style={{
        background: open ? 'rgba(2,6,23,0.75)' : 'rgba(2,6,23,0)',
        backdropFilter: open ? 'blur(6px)' : 'blur(0px)',
        pointerEvents: open ? 'auto' : 'none',
        fontFamily: HELVETICA,
      }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl mx-4 rounded-2xl overflow-hidden transition-all duration-300"
        style={{
          background: 'linear-gradient(180deg, #0f172a 0%, #0b1120 100%)',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
          maxHeight: '88vh',
          overflowY: 'auto',
          opacity: open ? 1 : 0,
          transform: open ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.98)',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
          onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.10)'}
          onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
        >
          ×
        </button>

        <div className="px-8 pt-10 pb-10 space-y-8">

          {/* Header */}
          <div className="space-y-2">
            <p className="text-xs text-emerald-400 uppercase tracking-widest font-medium">
              Our Mission
            </p>
            <h2
              className="text-4xl font-semibold tracking-tight text-white"
              style={{ fontFamily: "'Orbitron', monospace" }}
            >
              REVIV
            </h2>
            <p className="text-sm text-gray-400 uppercase tracking-widest">
              Real-Time Environmental Visualization &amp; Impact Volunteering
            </p>
          </div>

          {/* Intro */}
          <p className="text-gray-300 text-sm leading-relaxed">
            REVIV is a community-driven platform that helps people{' '}
            <span className="text-emerald-400">discover</span>,{' '}
            <span className="text-emerald-400">organize</span>, and{' '}
            <span className="text-emerald-400">complete</span>{' '}
            environmental cleanup efforts through an interactive 3D map of the Earth. By visualizing
            real locations affected by litter and environmental neglect, REVIV connects individuals
            who want to help with the exact places that need attention.
          </p>

          {/* Three pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {PILLARS.map(p => (
              <div
                key={p.title}
                className="rounded-xl p-5 flex flex-col gap-3 border border-white/10 bg-white/5 transition-all duration-200 cursor-default"
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(52,211,153,0.3)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.05)'
                }}
              >
                <span className="text-lg opacity-75">{p.icon}</span>
                <span className="text-white font-medium text-sm">{p.title}</span>
                <span className="text-gray-400 text-xs leading-relaxed">{p.body}</span>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="h-px bg-white/8" />

          {/* Goal section */}
          <div className="space-y-4">
            <h3 className="text-base font-semibold text-white tracking-tight">
              Our Goal
            </h3>

            <p className="text-gray-300 text-sm leading-relaxed">
              REVIV exists to transform local concern into global impact. Environmental problems like
              litter and illegal dumping are often invisible — or disconnected from the people who
              want to solve them. REVIV makes these issues visible on a global scale while empowering
              communities to take action locally.
            </p>

            {/* Community quote */}
            <div className="rounded-lg bg-white/5 p-4 border-l-4 border-emerald-500">
              <p className="text-gray-300 text-sm italic leading-relaxed">
                "At its core, REVIV is about community. Real environmental change happens when people
                rely on one another, organize together, and take responsibility for the places they live."
              </p>
            </div>

            <p className="text-sm text-emerald-400 text-center font-medium">
              Because protecting the planet starts with restoring the corner of Earth closest to you.
            </p>
          </div>

          {/* Divider */}
          <div className="h-px bg-white/8" />

          {/* Created by */}
          <div className="text-center space-y-3">
            <p className="text-xs text-gray-500 uppercase tracking-widest">Created By</p>
            <div className="flex justify-center gap-2 flex-wrap">
              {['Guillermo R.', 'Elyas Y.', 'Maxwell L.'].map(name => (
                <span
                  key={name}
                  className="px-4 py-1.5 rounded-full text-xs text-gray-300 font-medium bg-white/5 border border-white/10"
                >
                  {name}
                </span>
              ))}
            </div>
            <p className="text-xs text-gray-600 uppercase tracking-widest">
              DonsHack '26
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}
