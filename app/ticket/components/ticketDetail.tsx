import styles from './ticketDetail.module.css'
import { Fragment } from 'react/jsx-runtime'

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
            <p>{ticket.name}</p>
          </div>

          <div className={styles.id}>
            <p>Ticket-ID</p>
            <span>{ticket.id}</span>
          </div>
        </div>
      </div>

      <div className={styles.meta}>
        <div className={styles.status}>
          <p>Status</p>
          <p>{ticket.status}</p>
        </div>

        <div className={styles.priority}>
          <p>Priority</p>
          <p>{ticket.priority}</p>
        </div>

        <div className={styles.deadline}>
          <p>Deadline</p>
          <p>{ticket.deadline}</p>
        </div>
      </div>

      <div className={styles.description}>
        <div className={styles.descriptionText}>
          <p>Beschreibung</p>
          <p>{ticket.description}</p>
        </div>
      </div>
      {}
      <div className={styles.timeEntries}>
        <div className={styles.timeList}>
          <p>Zeitbuchungen</p>

          <div className={styles.timeGrid}>
            <p className={styles.gridHeader}>Datum</p>
            <p className={styles.gridHeader}>Zeit</p>
            <p className={styles.gridHeader}>Tätigkeit</p>

            {ticket.timeEntries.map((timeEntry) => (
              <Fragment key={timeEntry.id}>
                <p>{timeEntry.date}</p>
                <p>
                  {timeEntry.startTime} - {timeEntry.endTime}
                </p>
                <p className={styles.gridDescription}>{timeEntry.activity}</p>
              </Fragment>
            ))}
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
