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
        <div className={styles.ticketStatus}>Status: In Progress</div>
        <div className={styles.ticketPriority}>Priority: Medium</div>
        <div className={styles.ticketDeadline}>Deadline: 25.03.2026</div>
      </div>

      <div className={styles.ticketDescription}>
        <div className={styles.ticketDescriptionText}>
          Die Rebellen-Agenten Miniaturen grundieren und anschließend mit
          Basisfarben bemalen. Fokus auf Gesichter und Ausrüstung.
        </div>
      </div>

      <div className={styles.ticketComments}>
        <div className={styles.ticketCommentsList}>
          <div>
            <strong>Max:</strong> Grundierung ist fertig.
          </div>
          <div>
            <strong>Anna:</strong> Hauttöne sehen gut aus, vielleicht noch ein
            Wash.
          </div>
        </div>

        <div className={styles.ticketCommentForm}>
          <input placeholder="Kommentar schreiben..." />
          <button>Kommentar hinzufügen</button>
        </div>
      </div>

      <div className={styles.ticketTimeEntries}>
        <div className={styles.ticketTimeEntryList}>
          <div>12.03.2026 — 09:00 - 10:30 — Grundierung</div>
          <div>12.03.2026 — 11:00 - 12:00 — Basisfarben</div>
        </div>

        <div className={styles.ticketTimeEntryForm}>
          <button>Zeit buchen</button>
        </div>
      </div>
    </div>
  )
}

export default TicketDetail
