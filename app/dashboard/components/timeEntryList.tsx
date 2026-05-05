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

export default function TimeEntryList({
  selectedTicketEntries,
}: TimeEntryListProps) {
  return (
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
