import styles from './timeEntry.module.css'

type TimeEntryListProps = {
  selectedTicketEntries: TimeEntry[]
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

export default function TimeEntryList({
  selectedTicketEntries,
}: TimeEntryListProps) {
  return (
    <div className={styles.timeEntryContainer}>
      <h3>Time stamps</h3>d
      {selectedTicketEntries.length === 0 ? (
        <p>No time stamps available yet</p>
      ) : (
        <ul>
          {selectedTicketEntries.map((entry) => (
            <li key={entry.id} className={styles.entryRow}>
              <span className={styles.dateTime}>
                <span>{formatDate(entry.date)}</span>
                <span>
                  {formatTime(entry.start_time)} – {formatTime(entry.end_time)}
                </span>
              </span>

              <span>{entry.activity}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
