import styles from './ticketDetail.module.css'

function TicketDetail() {
  return (
    <div className={styles.ticketDetailContainer}>
      <div className={styles.ticketHeader}>
        <h2>Ticket Details</h2>
        <div className={styles.ticketHeaderContent}>
          <div className={styles.ticketTitle}>
            <p>Ticketname</p>
            <p>Painting Rebel agent</p>
          </div>
          <div className={styles.ticketId}>
            <p>Ticket-ID</p>
            <span>#t-001</span>
          </div>
        </div>
      </div>

      <div className={styles.ticketMeta}>
        <div className={styles.ticketStatus}>
          <p>Status</p>
          <p>In Progress</p>
        </div>
        <div className={styles.ticketPriority}>
          <p>Priority</p>
          <p>Medium</p>
        </div>
        <div className={styles.ticketDeadline}>
          <p>Deadline</p>
          <p>25.03.2026</p>
        </div>
      </div>

      <div className={styles.ticketDescription}>
        <div className={styles.ticketDescriptionText}>
          <p>Beschreibung</p>
          <p>
            Die Rebellen-Agenten Miniaturen grundieren und anschließend mit
            Basisfarben bemalen. Fokus auf Gesichter und Ausrüstung.
          </p>
        </div>
      </div>

      <div className={styles.ticketTimeEntries}>
        <div className={styles.ticketTimeEntryList}>
          <p>Zeitbuchungen</p>
          <div className={styles.ticketTimeEntryListContent}>
            <p>12.03.2026</p>
            <p>9:00 - 10:30</p>
            <p>Grundierung</p>
          </div>
          <div className={styles.ticketTimeEntryListContent}>
            <p>12.03.2026</p>
            <p>9:00 - 10:30</p>
            <p>Grundierung</p>
          </div>
          <div className={styles.ticketTimeEntryListContent}>
            <p>12.03.2026</p>
            <p>9:00 - 10:30</p>
            <p>Grundierung</p>
          </div>
          <div className={styles.ticketTimeEntryListContent}>
            <p>12.03.2026</p>
            <p>9:00 - 10:30</p>
            <p>Grundierung</p>
          </div>
        </div>
        <div className={styles.ticketTimeEntryForm}>
          <button>Zeit buchen</button>
        </div>
      </div>
    </div>
  )
}

export default TicketDetail
