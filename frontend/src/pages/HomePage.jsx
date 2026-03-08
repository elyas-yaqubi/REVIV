import { useState } from 'react'
import { GlobeView } from '../components/Globe/GlobeView'
import { DetailPanel } from '../components/Globe/DetailPanel'
import { Modal } from '../components/UI/Modal'
import { ReportForm } from '../components/Reports/ReportForm'
import { EventForm } from '../components/Events/EventForm'
import { Nav } from '../components/UI/Nav'
import { Sidebar } from '../components/Sidebar/Sidebar'
import { MissionOverlay } from '../components/UI/MissionOverlay'
import { geoJSONToCoords } from '../utils/geo'

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [reportModalOpen, setReportModalOpen] = useState(false)
  const [eventModalOpen, setEventModalOpen] = useState(false)
  const [missionOpen, setMissionOpen] = useState(false)
  const [linkedReport, setLinkedReport] = useState(null)

  const handleCreateEventFromReport = (report) => {
    setLinkedReport(report)
    setEventModalOpen(true)
  }

  const reportCoords = linkedReport ? geoJSONToCoords(linkedReport.location) : null

  return (
    <div className="w-screen h-screen bg-black overflow-hidden relative">
      <Nav
        onProfileClick={() => setSidebarOpen(v => !v)}
        sidebarOpen={sidebarOpen}
        onCreateEvent={() => setEventModalOpen(true)}
        onReport={() => setReportModalOpen(true)}
        onMission={() => setMissionOpen(true)}
      />

      <div className="w-full h-full">
        <GlobeView onCreateEvent={handleCreateEventFromReport} />
      </div>

      <DetailPanel onCreateEvent={handleCreateEventFromReport} />

      <MissionOverlay open={missionOpen} onClose={() => setMissionOpen(false)} />

      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onReport={() => setReportModalOpen(true)}
        onCreateEvent={() => setEventModalOpen(true)}
      />

      <Modal open={reportModalOpen} onClose={() => setReportModalOpen(false)} title="Submit Litter Report">
        <ReportForm onSuccess={() => setReportModalOpen(false)} />
      </Modal>

      <Modal
        open={eventModalOpen}
        onClose={() => { setEventModalOpen(false); setLinkedReport(null) }}
        title="Create Cleanup Event"
      >
        <EventForm
          defaultLat={reportCoords?.lat}
          defaultLng={reportCoords?.lng}
          defaultLocationLabel={linkedReport?.location_label}
          linkedReportId={linkedReport?.id}
          onSuccess={() => { setEventModalOpen(false); setLinkedReport(null) }}
        />
      </Modal>
    </div>
  )
}
