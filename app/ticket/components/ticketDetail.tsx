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
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2>Ticket Details</h2>

        <div className={styles.headerRow}>
          <div className={styles.titleBlock}>
            <p>Ticketname</p>
            <p>{ticket.name}</p>
          </div>

          <div className={styles.idBlock}>
            <p>Ticket-ID</p>
            <span>{ticket.id}</span>
          </div>
        </div>
      </div>

      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <p>Status</p>
          <p>{ticket.status}</p>
        </div>

        <div className={styles.metaItem}>
          <p>Priority</p>
          <p>{ticket.priority}</p>
        </div>

        <div className={styles.metaItem}>
          <p>Deadline</p>
          <p>{ticket.deadline}</p>
        </div>
      </div>

      <div className={styles.desc}>
        <div className={styles.descText}>
          <p>Beschreibung</p>
          <p>{ticket.description}</p>
        </div>
      </div>

      <div className={styles.time}>
        <div className={styles.timeList}>
          <p>Zeitbuchungen</p>

          <div className={styles.grid}>
            <p className={styles.gridHead}>Datum</p>
            <p className={styles.gridHead}>Zeit</p>
            <p className={styles.gridHead}>Tätigkeit</p>

            {ticket.timeEntries.map((timeEntry) => (
              <Fragment key={timeEntry.id}>
                <p>{timeEntry.date}</p>
                <p>
                  {timeEntry.startTime} - {timeEntry.endTime}
                </p>
                <p className={styles.gridText}>{timeEntry.activity}</p>
              </Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button className={styles.primaryBtn}>Zeit buchen</button>
      </div>

      <button className={styles.closeBtn}>X</button>
    </div>
  )
}
export default TicketDetail
