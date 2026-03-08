import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '../../stores/authStore'
import { getUser, getUserEvents, getUserReports } from '../../api/users'
import { ProfileHeader } from './ProfileHeader'
import { NearbyEventsList } from './NearbyEventsList'
import { StatisticsPanel } from './StatisticsPanel'
import { SidebarIndicator } from './SidebarIndicator'

export function Sidebar({ open, onClose, onReport, onCreateEvent }) {
  const [page, setPage] = useState(0)
  const { user } = useAuthStore()

  const { data: profile } = useQuery({
    queryKey: ['user', user?.id],
    queryFn: () => getUser(user.id),
    enabled: !!user?.id && open,
  })

  const { data: userEvents = [] } = useQuery({
    queryKey: ['user-events', user?.id],
    queryFn: () => getUserEvents(user.id),
    enabled: !!user?.id && open,
  })

  const { data: userReports = [] } = useQuery({
    queryKey: ['user-reports', user?.id],
    queryFn: () => getUserReports(user.id),
    enabled: !!user?.id && open,
  })

  const displayUser = profile || user
  const stats = profile?.stats || {}

  return (
    <div>
      {/* Sidebar panel — sits below the nav bar, no backdrop so globe stays interactive */}
      <div
        className={`fixed top-[57px] right-0 z-40 w-[340px] flex flex-col border-l border-white/10 shadow-2xl transition-transform duration-300 ease-in-out ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          height: 'calc(100vh - 57px)',
          background: 'rgba(0, 0, 0, 0.03)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}
      >
        {/* Header */}
        <div className="flex items-center px-5 pt-4 pb-3">
          <span className="text-gray-500 text-[10px] uppercase tracking-[0.15em] font-medium">
            {page === 0 ? 'Profile & Events' : `${displayUser?.display_name || 'Your'}'s Statistics`}
          </span>
        </div>

        {/* Pages — slide vertically */}
        <div className="flex-1 overflow-hidden relative">
          {/* Page 0: Profile + Nearby Events */}
          <div
            className="absolute inset-0 flex flex-col overflow-hidden"
            style={{
              transform: `translateY(${page === 0 ? '0%' : '-105%'})`,
              transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
            }}
          >
            <ProfileHeader
              user={displayUser}
              userEvents={userEvents}
              userReports={userReports}
              onCloseSidebar={onClose}
            />
            <NearbyEventsList onCreateEvent={() => { onCreateEvent(); onClose() }} />
          </div>

          {/* Page 1: Statistics */}
          <div
            className="absolute inset-0 flex flex-col overflow-hidden"
            style={{
              transform: `translateY(${page === 1 ? '0%' : '105%'})`,
              transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1)',
            }}
          >
            {/* Compact profile row on stats page */}
            <div className="px-5 pt-4 pb-3 border-b border-white/8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-b from-emerald-400 to-emerald-600 flex items-center justify-center text-white text-sm font-bold shrink-0 ring-2 ring-emerald-500/20">
                  {(displayUser?.display_name || 'U').slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-white font-bold text-sm leading-tight">{displayUser?.display_name}</p>
                  <p className="text-gray-400 text-xs mt-0.5">{displayUser?.email}</p>
                </div>
              </div>
            </div>
            <StatisticsPanel stats={stats} />
          </div>
        </div>

        <SidebarIndicator page={page} onPageChange={setPage} />
      </div>
    </div>
  )
}
