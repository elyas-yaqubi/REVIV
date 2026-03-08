import { Link } from 'react-router-dom'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { joinEvent, leaveEvent } from '../../api/events'
import { useAuthStore } from '../../stores/authStore'
import { formatDateTime } from '../../utils/formatters'

const STATUS_DOT = {
  open:        'bg-emerald-400',
  in_progress: 'bg-sky-400',
  full:        'bg-amber-400',
  completed:   'bg-violet-400',
  resolved:    'bg-gray-400',
}

function formatDistance(km) {
  if (km == null) return null
  return km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`
}

export function SidebarEventCard({ event, distanceKm }) {
  const { user } = useAuthStore()
  const queryClient = useQueryClient()

  const isAttending = event.attendee_ids?.includes(user?.id)
  const isOrganizer = event.organizer_id === user?.id
  const canJoin = ['open', 'in_progress'].includes(event.status)

  const joinMutation = useMutation({
    mutationFn: () => joinEvent(event.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events-all'] })
      queryClient.invalidateQueries({ queryKey: ['event', event.id] })
      toast.success('Joined!')
    },
    onError: (err) => toast.error(err.response?.data?.detail || 'Could not join'),
  })

  const leaveMutation = useMutation({
    mutationFn: () => leaveEvent(event.id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events-all'] })
      queryClient.invalidateQueries({ queryKey: ['event', event.id] })
      toast.success('Left event')
    },
    onError: (err) => toast.error(err.response?.data?.detail || 'Could not leave'),
  })

  const isBusy = joinMutation.isPending || leaveMutation.isPending

  return (
    <div className="bg-white/5 hover:bg-white/8 border border-white/8 rounded-xl p-3.5 transition-colors">
      {/* Top row: name + distance */}
      <div className="flex items-start justify-between gap-2 mb-1">
        <Link
          to={`/events/${event.id}`}
          className="text-white text-sm font-semibold leading-snug line-clamp-1 hover:text-emerald-400 transition-colors flex-1"
        >
          {event.name}
        </Link>
        {distanceKm != null && (
          <span className="shrink-0 text-xs text-violet-400 font-medium">{formatDistance(distanceKm)}</span>
        )}
      </div>

      {/* Location */}
      {event.location_label && (
        <p className="text-gray-400 text-xs mb-1 line-clamp-1">{event.location_label}</p>
      )}

      {/* Description */}
      {event.description && (
        <p className="text-gray-500 text-xs mb-2 line-clamp-2 leading-relaxed">{event.description}</p>
      )}

      {/* Footer: status dot + date + join button */}
      <div className="flex items-center justify-between gap-2 mt-2">
        <div className="flex items-center gap-2 text-xs text-gray-500 min-w-0">
          <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[event.status] || 'bg-gray-400'} inline-block shrink-0`} />
          <span className="truncate">{formatDateTime(event.date_time)}</span>
          <span className="shrink-0">· {event.attendee_count ?? 0}</span>
        </div>

        {!isOrganizer && canJoin && (
          isAttending ? (
            <button
              onClick={() => leaveMutation.mutate()}
              disabled={isBusy}
              className="shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 hover:bg-red-500/15 hover:border-red-500/25 hover:text-red-400 transition-colors disabled:opacity-50"
            >
              {leaveMutation.isPending ? '…' : '✓ Joined'}
            </button>
          ) : (
            <button
              onClick={() => joinMutation.mutate()}
              disabled={isBusy || event.status === 'full'}
              className="shrink-0 text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 hover:bg-emerald-500/25 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {joinMutation.isPending ? '…' : event.status === 'full' ? 'Full' : 'Join'}
            </button>
          )
        )}

        {isOrganizer && (
          <span className="shrink-0 text-[10px] text-emerald-500 font-medium">Organiser</span>
        )}
      </div>
    </div>
  )
}
