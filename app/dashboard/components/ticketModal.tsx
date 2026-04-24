import styles from './ticketModal.module.css'

type TicketModalProps = {
  closeModal: () => void
  editTicket: EditTicket
  setEditTicket: React.Dispatch<React.SetStateAction<EditTicket>>
}

type EditTicket = {
  title: string
  description: string
  deadline_at: string
}

export default function TicketModal({
  closeModal,
  editTicket,
  setEditTicket,
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

        <div className={styles.timeEntryContainer}>
          <h3>Time stamps</h3>

          {selectedTicketEntries.length === 0 ? (
            <p>No time stamps available yet</p>
          ) : (
            <ul>
              {selectedTicketEntries.map((entry) => (
                <li key={entry.id} className={styles.entryRow}>
                  <span className={styles.dateTime}>
                    <span>{formatDate(entry.date)}</span>
                    <span>
                      {formatTime(entry.start_time)} –{' '}
                      {formatTime(entry.end_time)}
                    </span>
                  </span>

                  <span>{entry.activity}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

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
