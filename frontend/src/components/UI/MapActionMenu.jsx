import { useState, useEffect, useRef } from 'react'
import { EventsPanel } from './EventsPanel'

const ACTIONS = [
  {
    id: 'events',
    label: 'Nearby Events',
    color: '#10b981',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'report',
    label: 'Report Litter',
    color: '#ef4444',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
      </svg>
    ),
  },
  {
    id: 'create-event',
    label: 'Create Event',
    color: '#0d9488',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    ),
  },
  {
    id: 'profile',
    label: 'My Profile',
    color: '#8b5cf6',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
      </svg>
    ),
  },
]

export function MapActionMenu({ onReport, onCreateEvent, onProfile }) {
  const [open, setOpen] = useState(false)
  const [eventsOpen, setEventsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const menuRef = useRef(null)

  // Trigger stagger after open
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => setMounted(true))
    } else {
      setMounted(false)
      setEventsOpen(false)
    }
  }, [open])

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  const handleAction = (id) => {
    if (id === 'events') {
      setEventsOpen(v => !v)
      return
    }
    setOpen(false)
    if (id === 'report') onReport?.()
    if (id === 'create-event') onCreateEvent?.()
    if (id === 'profile') onProfile?.()
  }

  return (
    <div ref={menuRef} className="fixed left-4 bottom-24 z-40 flex flex-col items-center gap-3">
      {/* Action items — rendered bottom-to-top so first item is closest to trigger */}
      <div className="flex flex-col-reverse gap-3">
        {ACTIONS.map((action, i) => {
          const delay = mounted ? i * 65 : 0
          const show = mounted

          return (
            <div
              key={action.id}
              className="relative flex items-center gap-2"
              style={{
                opacity: show ? 1 : 0,
                transform: show ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.85)',
                transition: `opacity 0.3s ease ${delay}ms, transform 0.3s cubic-bezier(0.34,1.56,0.64,1) ${delay}ms`,
                pointerEvents: show ? 'auto' : 'none',
              }}
            >
              {/* Label */}
              <span
                className="text-xs font-medium text-white bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-lg whitespace-nowrap shadow select-none"
              >
                {action.label}
              </span>

              {/* Icon button */}
              <button
                onClick={() => handleAction(action.id)}
                title={action.label}
                style={{ background: action.id === 'events' && eventsOpen ? action.color : undefined }}
                className={`w-11 h-11 rounded-xl flex items-center justify-center text-white shadow-lg transition-transform active:scale-90 hover:scale-105 border border-white/10 backdrop-blur-md`}
              >
                {/* Ring glow on hover */}
                <span
                  className="absolute inset-0 rounded-xl opacity-0 hover:opacity-100 transition-opacity"
                  style={{ boxShadow: `0 0 14px 2px ${action.color}60` }}
                />
                <span
                  className="absolute inset-0 rounded-xl"
                  style={{ background: `${action.color}cc` }}
                />
                <span className="relative z-10">{action.icon}</span>
              </button>

              {/* Events sub-panel */}
              {action.id === 'events' && (
                <div className="absolute left-full ml-3 bottom-0">
                  <EventsPanel
                    open={eventsOpen}
                    onClose={() => setEventsOpen(false)}
                    leftSide
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Trigger button */}
      <button
        onClick={() => setOpen(v => !v)}
        className="w-13 h-13 w-[52px] h-[52px] rounded-2xl flex items-center justify-center text-white shadow-xl border border-white/15 backdrop-blur-md transition-all duration-300 active:scale-90"
        style={{
          background: open ? 'rgba(16,185,129,0.85)' : 'rgba(13,22,39,0.85)',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          boxShadow: open ? '0 0 20px 4px rgba(16,185,129,0.35)' : undefined,
        }}
        title="Actions"
      >
        {open ? (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <rect x="3" y="3" width="4" height="4" rx="1" />
            <rect x="10" y="3" width="4" height="4" rx="1" />
            <rect x="17" y="3" width="4" height="4" rx="1" />
            <rect x="3" y="10" width="4" height="4" rx="1" />
            <rect x="10" y="10" width="4" height="4" rx="1" />
            <rect x="17" y="10" width="4" height="4" rx="1" />
            <rect x="3" y="17" width="4" height="4" rx="1" />
            <rect x="10" y="17" width="4" height="4" rx="1" />
            <rect x="17" y="17" width="4" height="4" rx="1" />
          </svg>
        )}
      </button>
    </div>
  )
}
