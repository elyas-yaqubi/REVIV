import { useState, useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchAllEvents } from '../../api/events'
import { useGeoLocation } from '../../hooks/useGeoLocation'
import { haversineDistance, geoJSONToCoords } from '../../utils/geo'
import { SidebarEventCard } from './SidebarEventCard'
import { Spinner } from '../UI/Spinner'

const KM_PER_MILE = 1.60934

export function NearbyEventsList({ onCreateEvent }) {
  const { location } = useGeoLocation()
  const [radiusMiles, setRadiusMiles] = useState(25)

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['events-all'],
    queryFn: fetchAllEvents,
    staleTime: 60000,
  })

  const sorted = useMemo(() => {
    return events
      .map(ev => {
        if (!location || !ev.location) return { ev, dist: null }
        const { lat, lng } = geoJSONToCoords(ev.location)
        return { ev, dist: haversineDistance(location.lat, location.lng, lat, lng) }
      })
      .filter(({ dist }) => dist === null || dist <= radiusMiles * KM_PER_MILE)
      .sort((a, b) => (a.dist ?? Infinity) - (b.dist ?? Infinity))
      .slice(0, 12)
  }, [events, location, radiusMiles])

  return (
    <div className="flex flex-col flex-1 overflow-hidden px-5 pt-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-white font-bold text-sm tracking-wide">Nearby Events</h3>
        {!isLoading && (
          <span className="text-gray-500 text-xs">{sorted.length} found</span>
        )}
      </div>

      {/* Radius slider */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-gray-500 text-[10px] uppercase tracking-wider">Radius</span>
          <span className="text-emerald-400 text-xs font-semibold">{radiusMiles} mi</span>
        </div>
        <input
          type="range"
          min={5}
          max={100}
          step={5}
          value={radiusMiles}
          onChange={e => setRadiusMiles(Number(e.target.value))}
          className="w-full h-1 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #10b981 0%, #10b981 ${(radiusMiles - 5) / 95 * 100}%, rgba(255,255,255,0.15) ${(radiusMiles - 5) / 95 * 100}%, rgba(255,255,255,0.15) 100%)`,
          }}
        />
        <div className="flex justify-between text-gray-600 text-[9px] mt-0.5">
          <span>5 mi</span>
          <span>100 mi</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {isLoading && (
          <div className="flex justify-center py-10">
            <Spinner />
          </div>
        )}

        {!isLoading && sorted.length === 0 && (
          <div className="flex flex-col items-center justify-center py-10 gap-3">
            <span className="text-4xl">🌿</span>
            <p className="text-gray-400 text-sm text-center">No events within {radiusMiles} mi</p>
            <button
              onClick={onCreateEvent}
              className="text-xs text-emerald-400 hover:text-emerald-300 border border-emerald-500/30 hover:border-emerald-400/50 px-4 py-2 rounded-xl transition-colors"
            >
              Create the first event
            </button>
          </div>
        )}

        {!isLoading && sorted.length > 0 && (
          <div className="space-y-2 pb-4">
            {sorted.map(({ ev, dist }) => (
              <SidebarEventCard key={ev.id} event={ev} distanceKm={dist} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
