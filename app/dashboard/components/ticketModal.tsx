import styles from './ticketModal.module.css'

import TimeEntryList from './timeEntryList'

type TicketModalProps = {
  closeModal: () => void
  editTicket: EditTicket
  setEditTicket: React.Dispatch<React.SetStateAction<EditTicket>>
  selectedTicket: Ticket
  handleSaveTicket: () => Promise<void>
  savingTicket: boolean
  selectedTicketEntries: TimeEntry[]
  selectedTicketHours: string
  newEntry: NewTimeEntry
  setNewEntry: React.Dispatch<React.SetStateAction<NewTimeEntry>>
  handleAddTimeEntry: () => Promise<void>
  savingEntry: boolean
}

type EditTicket = {
  title: string
  description: string
  deadline_at: string
}

type Ticket = {
  id: number
  title: string
  description: string | null
  created_at: string
  deadline_at: string | null
  status: string
}

type TimeEntry = {
  id: number
  ticket_id: number
  date: string
  start_time: string
  end_time: string
  activity: string
  created_at: string
}

type NewTimeEntry = {
  date: string
  start_time: string
  end_time: string
  activity: string
}

const formatDate = (isoString: string | null): string => {
  if (!isoString) return ''

  return new Date(isoString).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
  })
}

const formatTime = (time: string | null): string => {
  if (!time) return ''

  const [hours, minutes] = time.split(':')
  if (!hours || !minutes) return time

  return `${hours}:${minutes}`
}

export default function TicketModal({
  closeModal,
  editTicket,
  setEditTicket,
  selectedTicket,
  handleSaveTicket,
  savingTicket,
  selectedTicketEntries,
  selectedTicketHours,
  newEntry,
  setNewEntry,
  handleAddTimeEntry,
  savingEntry,
}: TicketModalProps) {
  return (
    <div className={styles.ticketModal} onClick={closeModal}>
      <div
        className={styles.ticketModalContent}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.editFields}>
          <input
            type="text"
            value={editTicket.title}
            onChange={(e) =>
              setEditTicket((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            placeholder="Titel"
          />

          <textarea
            value={editTicket.description}
            onChange={(e) =>
              setEditTicket((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            placeholder="Beschreibung"
            rows={4}
          />

          <input
            type="date"
            value={editTicket.deadline_at}
            onChange={(e) =>
              setEditTicket((prev) => ({
                ...prev,
                deadline_at: e.target.value,
              }))
            }
          />
        </div>

        <div className={styles.modalDate}>
          <p>Created: {formatDate(selectedTicket.created_at)}</p>
          <p>Deadline: {formatDate(selectedTicket.deadline_at)}</p>
          <p>Status: {selectedTicket.status}</p>
        </div>

        <button onClick={handleSaveTicket} disabled={savingTicket}>
          {savingTicket ? 'Speichert...' : 'Ticket speichern'}
        </button>

        <TimeEntryList selectedTicketEntries={selectedTicketEntries} />

        <p>Gesamtstunden: {selectedTicketHours}</p>

        <div className={styles.timeEntryInput}>
          <input
            type="date"
            value={newEntry.date}
            onChange={(e) =>
              setNewEntry((prev) => ({ ...prev, date: e.target.value }))
            }
          />

          <input
            type="time"
            value={newEntry.start_time}
            onChange={(e) =>
              setNewEntry((prev) => ({
                ...prev,
                start_time: e.target.value,
              }))
            }
          />

          <input
            type="time"
            value={newEntry.end_time}
            onChange={(e) =>
              setNewEntry((prev) => ({
                ...prev,
                end_time: e.target.value,
              }))
            }
          />

          <input
            type="text"
            placeholder="Tätigkeit"
            value={newEntry.activity}
            onChange={(e) =>
              setNewEntry((prev) => ({
                ...prev,
                activity: e.target.value,
              }))
            }
          />
        </div>

        <button onClick={handleAddTimeEntry} disabled={savingEntry}>
          {savingEntry ? 'Speichert...' : 'Zeit buchen'}
        </button>
      </div>
    </div>
  )
}
