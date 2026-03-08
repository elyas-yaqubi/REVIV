import { useNavigate, Link } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import { useNotifications } from '../../hooks/useNotifications'

const HELVETICA = "'Helvetica Neue', Helvetica, Arial, sans-serif"

export function Nav({ onProfileClick, sidebarOpen, onCreateEvent, onReport, onMission }) {
  const { logout } = useAuthStore()
  const navigate = useNavigate()
  const { unreadCount } = useNotifications()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav
      style={{ fontFamily: HELVETICA }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-3 bg-[#111111]/90 backdrop-blur-md border-b border-white/10"
    >
      {/* Left: Logo */}
      <Link to="/" className="flex items-center" style={{ height: '32px', width: '120px', overflow: 'hidden' }}>
        <img src="/REVIV_wo_slo.svg" alt="REVIV" style={{ width: '100%', height: 'auto', display: 'block' }} />
      </Link>

      {/* Center group: Create Event — Our Mission — Create Report */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-5">
        <button
          onClick={onCreateEvent}
          className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
          style={{ fontFamily: HELVETICA }}
        >
          Create Event
        </button>

        <button
          onClick={onMission}
          className="relative text-white font-bold transition-all duration-200 hover:opacity-90 select-none"
          style={{
            fontFamily: "'Orbitron', monospace",
            fontSize: '1rem',
            letterSpacing: '0.04em',
            background: 'linear-gradient(135deg, #ffffff 0%, #d1d5db 50%, #9ca3af 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            textShadow: 'none',
          }}
        >
          Our Mission
        </button>

        <button
          onClick={onReport}
          className="text-red-400 hover:text-red-300 text-sm font-medium transition-colors"
          style={{ fontFamily: HELVETICA }}
        >
          Create Report
        </button>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-3">
        {/* Notifications */}
        <Link to="/notifications" className="relative text-gray-400 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Link>

        {/* Profile icon — opens sidebar */}
        <button
          onClick={onProfileClick}
          className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all border ${
            sidebarOpen
              ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400'
              : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
          }`}
          title="Profile"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955a1.126 1.126 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          {sidebarOpen && (
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-[#111]" />
          )}
        </button>

        <button
          onClick={handleLogout}
          className="text-gray-500 hover:text-red-400 text-sm transition-colors"
          style={{ fontFamily: HELVETICA }}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}
