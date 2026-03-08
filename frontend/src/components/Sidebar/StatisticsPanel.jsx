export function StatisticsPanel({ stats = {} }) {
  const items = [
    { label: 'Events Attended', value: stats.events_attended ?? 0 },
    { label: 'Reports Submitted', value: stats.reports_submitted ?? 0 },
    { label: 'Events Organized', value: stats.events_organized ?? 0 },
    {
      label: 'Volunteer Hours',
      value: `${((stats.total_volunteer_hours ?? 0) / 60).toFixed(1)}h`,
    },
  ]

  return (
    <div className="flex-1 overflow-y-auto px-5 pt-4 pb-4">
      <h3 className="text-white font-bold text-sm tracking-wide mb-4">Statistics</h3>
      <div className="grid grid-cols-2 gap-3">
        {items.map(({ label, value }) => (
          <div
            key={label}
            className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center"
          >
            <p className="text-2xl font-bold text-emerald-400">{value}</p>
            <p className="text-gray-400 text-xs mt-1.5 leading-snug">{label}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
