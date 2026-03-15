import styles from './ticketDetail.module.css'

import { ticketMock } from '../../../mock/ticketMock'

interface TimeEntry {
  id: string
  date: string
  startTime: string
  endTime: string
  activity: string
}

type Data = {
  id: string
  name: string
  status: string
  priority: string
  deadline: string
  description: string
  timeEntries: TimeEntry[]
}

interface TicketDetailProps {
  ticket: Data
}

function TicketDetail({ ticket }: TicketDetailProps) {
  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h2>Ticket Details</h2>

        <div className={styles.headerContent}>
          <div className={styles.title}>
            <p>Ticketname</p>
            <p>Painting Rebel agent</p>
          </div>

          <div className={styles.id}>
            <p>Ticket-ID</p>
            <span>#t-001</span>
          </div>
        </div>
      </div>

      <div className={styles.meta}>
        <div className={styles.status}>
          <p>Status</p>
          <p>In Progress</p>
        </div>

        <div className={styles.priority}>
          <p>Priority</p>
          <p>Medium</p>
        </div>

        <div className={styles.deadline}>
          <p>Deadline</p>
          <p>25.03.2026</p>
        </div>
      </div>

      <div className={styles.description}>
        <div className={styles.descriptionText}>
          <p>Beschreibung</p>
          <p>
            Die Rebellen-Agenten Miniaturen grundieren und anschließend mit
            Basisfarben bemalen. Fokus auf Gesichter und Ausrüstung.
          </p>
        </div>
      </div>

      <div className={styles.timeEntries}>
        <div className={styles.timeList}>
          <p>Zeitbuchungen</p>

          <div className={styles.timeGrid}>
            <p className={styles.gridHeader}>Datum</p>
            <p className={styles.gridHeader}>Zeit</p>
            <p className={styles.gridHeader}>Tätigkeit</p>

            <p>12.03.2026</p>
            <p>9:00 - 10:30</p>
            <p className={styles.gridDescription}>Grundierung</p>

            <p>12.03.2026</p>
            <p>9:00 - 10:30</p>
            <p className={styles.gridDescription}>
              In diesem Ticket werden die Arbeitsschritte zur Bemalung der
              Rebellen-Agenten dokumentiert. Zuerst erfolgt die Grundierung der
              Miniaturen, anschließend werden die Basisfarben aufgetragen. Der
              Fokus liegt dabei besonders auf den Gesichtern sowie der
              Ausrüstung der Figuren.
            </p>

            <p>12.03.2026</p>
            <p>9:00 - 10:30</p>
            <p className={styles.gridDescription}>Grundierung</p>
          </div>
        </div>
      </div>
      <div className={styles.timeEntryButtonContainer}>
        <button className={styles.timeEntryButton}>Zeit buchen</button>
      </div>
      <button className={styles.closeButton}>X</button>
    </div>
  )
}
export default TicketDetail
