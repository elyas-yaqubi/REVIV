const LABELS = ['Profile & Events', 'Impact Stats']

export function SidebarIndicator({ page, onPageChange }) {
  return (
    <div className="flex items-center justify-between px-5 py-3 border-t border-white/10">
      {/* Left arrow */}
      <button
        onClick={() => onPageChange(0)}
        disabled={page === 0}
        className="flex items-center gap-1.5 text-xs font-medium text-white disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous page"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span className="hidden sm:inline">Profile</span>
      </button>

      {/* Dots */}
      <div className="flex items-center gap-2">
        {LABELS.map((label, i) => (
          <button
            key={i}
            onClick={() => onPageChange(i)}
            aria-label={label}
            title={label}
            style={{
              transition: 'all 0.3s ease',
              width: page === i ? '20px' : '8px',
              height: '8px',
              borderRadius: '9999px',
              background: page === i ? '#10b981' : 'rgba(255,255,255,0.2)',
            }}
          />
        ))}
      </div>

      {/* Right arrow */}
      <button
        onClick={() => onPageChange(1)}
        disabled={page === 1}
        className="flex items-center gap-1.5 text-xs font-medium text-white disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
        aria-label="Next page"
      >
        <span className="hidden sm:inline">Stats</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  )
}
