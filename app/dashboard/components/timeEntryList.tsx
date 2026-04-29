export default function TimeEntryList() {
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
