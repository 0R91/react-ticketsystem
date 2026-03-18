import styles from './ticketList.module.css'

export default function TicketList() {
  return (
    <div className={styles.ticketList}>
      {/* Header */}
      <div className={styles.header}>Ticket-Id</div>
      <div className={styles.header}>Ticket-Name</div>
      <div className={styles.header}>Booked Hours</div>
      <div className={styles.header}>Deadline</div>

      {/* Row */}
      <div>123</div>
      <div>Fix Bug</div>
      <div>5h</div>
      <div>20.03</div>
    </div>
  )
}
