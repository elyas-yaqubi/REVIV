import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { formatDateTime } from '../../utils/formatters'
import { useGlobeStore } from '../../stores/globeStore'

const PAGE_SIZE = 5

const EVENT_STATUS = {
  open:        { label: 'Open',        color: 'text-emerald-400' },
  in_progress: { label: 'In Progress', color: 'text-sky-400'     },
  full:        { label: 'Full',        color: 'text-amber-400'   },
  completed:   { label: 'Completed',   color: 'text-violet-400'  },
  resolved:    { label: 'Resolved',    color: 'text-gray-400'    },
}

const SEVERITY_COLOR = {
  low:    'text-yellow-400',
  medium: 'text-orange-400',
  high:   'text-red-400',
}

function MiniEventRow({ event, onCloseSidebar }) {
  const s = EVENT_STATUS[event.status] || EVENT_STATUS.open
  return (
    <Link
      to={`/events/${event.id}`}
      onClick={() => onCloseSidebar?.()}
      className="flex items-center justify-between py-2.5 px-3 hover:bg-white/5 transition-colors gap-2 border-b border-white/8 last:border-0"
    >
      <span className="text-white text-xs font-medium line-clamp-1 flex-1">{event.name}</span>
      <div className="flex items-center gap-2 shrink-0">
        <span className={`text-[10px] font-semibold ${s.color}`}>{s.label}</span>
        <span className="text-gray-600 text-[10px]">{formatDateTime(event.date_time)}</span>
      </div>
    </Link>
  )
}

function MiniReportRow({ report, onCloseSidebar }) {
  const { setSelectedMarker, openPanel } = useGlobeStore()
  const severityColor = SEVERITY_COLOR[report.severity] || 'text-gray-400'
  const category = (report.category || '').replace(/_/g, ' ')

  const handleClick = () => {
    onCloseSidebar?.()
    setSelectedMarker({ ...report, type: 'report' })
    openPanel()
  }

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center justify-between py-2.5 px-3 hover:bg-white/5 transition-colors gap-2 text-left border-b border-white/8 last:border-0"
    >
      <span className="text-white text-xs font-medium capitalize flex-1 line-clamp-1">{category}</span>
      <div className="flex items-center gap-2 shrink-0">
        <span className={`text-[10px] font-semibold capitalize ${severityColor}`}>{report.severity}</span>
        <span className={`text-[10px] ${report.status === 'resolved' ? 'text-emerald-400' : 'text-gray-500'}`}>
          {report.status}
        </span>
      </div>
    </button>
  )
}

function Pagination({ page, totalPages, total, onPrev, onNext }) {
  const start = page * PAGE_SIZE + 1
  const end = Math.min((page + 1) * PAGE_SIZE, total)

  return (
    <div className="flex items-center justify-between px-3 py-2 border-t border-white/8">
      <button
        onClick={onPrev}
        disabled={page === 0}
        className="flex items-center gap-1 text-[10px] font-medium text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Prev
      </button>

      <span className="text-[10px] text-gray-500">
        {start}–{end} of {total}
      </span>

      <button
        onClick={onNext}
        disabled={page >= totalPages - 1}
        className="flex items-center gap-1 text-[10px] font-medium text-gray-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
      >
        Next
        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}

export function ProfileHeader({ user, userEvents = [], userReports = [], onCloseSidebar }) {
  const [activeTab, setActiveTab] = useState(null) // null | 'events' | 'reports'
  const [eventsPage, setEventsPage] = useState(0)
  const [reportsPage, setReportsPage] = useState(0)
  const initials = (user?.display_name || 'U').slice(0, 2).toUpperCase()

  // Reset page to 0 when tab switches
  useEffect(() => {
    setEventsPage(0)
    setReportsPage(0)
  }, [activeTab])

  const toggle = (tab) => setActiveTab(prev => prev === tab ? null : tab)

  const eventsTotalPages = Math.ceil(userEvents.length / PAGE_SIZE)
  const reportsTotalPages = Math.ceil(userReports.length / PAGE_SIZE)

  const visibleEvents = userEvents.slice(eventsPage * PAGE_SIZE, (eventsPage + 1) * PAGE_SIZE)
  const visibleReports = userReports.slice(reportsPage * PAGE_SIZE, (reportsPage + 1) * PAGE_SIZE)

  return (
    <div className="px-5 pt-5 pb-4 border-b border-white/8">
      {/* Avatar + name + email */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-[60px] h-[60px] rounded-full bg-gradient-to-b from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-xl font-bold shadow-lg ring-2 ring-emerald-500/30 shrink-0">
          {initials}
        </div>
        <div>
          <p className="text-white font-bold text-base leading-tight">{user?.display_name || '—'}</p>
          <p className="text-gray-400 text-sm mt-0.5">{user?.email || '—'}</p>
        </div>
      </div>

      {/* Toggle buttons */}
      <div className="flex gap-2.5 mb-2">
        <button
          onClick={() => toggle('events')}
          className={`flex-1 flex items-center justify-center gap-1.5 border text-xs font-semibold py-2.5 rounded-xl transition-colors ${
            activeTab === 'events'
              ? 'bg-emerald-500/25 border-emerald-500/50 text-emerald-300'
              : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20'
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Events
          {userEvents.length > 0 && (
            <span className="bg-emerald-500/30 text-emerald-300 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {userEvents.length}
            </span>
          )}
        </button>

        <button
          onClick={() => toggle('reports')}
          className={`flex-1 flex items-center justify-center gap-1.5 border text-xs font-semibold py-2.5 rounded-xl transition-colors ${
            activeTab === 'reports'
              ? 'bg-red-500/25 border-red-500/50 text-red-300'
              : 'bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500/20'
          }`}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          Reports
          {userReports.length > 0 && (
            <span className="bg-red-500/30 text-red-300 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
              {userReports.length}
            </span>
          )}
        </button>
      </div>

      {/* Expandable paginated list */}
      <div
        style={{
          maxHeight: activeTab ? '240px' : '0px',
          opacity: activeTab ? 1 : 0,
          transition: 'max-height 0.3s ease, opacity 0.25s ease',
          overflow: 'hidden',
        }}
      >
        <div className="bg-white/3 border border-white/8 rounded-xl overflow-hidden mt-1">
          {/* Items */}
          <div>
            {activeTab === 'events' && (
              userEvents.length === 0
                ? <p className="text-gray-500 text-xs text-center py-4">No events yet</p>
                : visibleEvents.map(ev => <MiniEventRow key={ev.id} event={ev} onCloseSidebar={onCloseSidebar} />)
            )}
            {activeTab === 'reports' && (
              userReports.length === 0
                ? <p className="text-gray-500 text-xs text-center py-4">No reports yet</p>
                : visibleReports.map(r => <MiniReportRow key={r.id} report={r} onCloseSidebar={onCloseSidebar} />)
            )}
          </div>

          {/* Pagination — only shown when more than one page */}
          {activeTab === 'events' && eventsTotalPages > 1 && (
            <Pagination
              page={eventsPage}
              totalPages={eventsTotalPages}
              total={userEvents.length}
              onPrev={() => setEventsPage(p => p - 1)}
              onNext={() => setEventsPage(p => p + 1)}
            />
          )}
          {activeTab === 'reports' && reportsTotalPages > 1 && (
            <Pagination
              page={reportsPage}
              totalPages={reportsTotalPages}
              total={userReports.length}
              onPrev={() => setReportsPage(p => p - 1)}
              onNext={() => setReportsPage(p => p + 1)}
            />
          )}
        </div>
      </div>
    </div>
  )
}
