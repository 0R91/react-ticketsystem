import styles from './ticketTable.module.css'

type Ticket = {
  id: number
  title: string
  description: string | null
  created_at: string
  deadline_at: string | null
  status: string
}

type TicketTableProps = {
  tickets: Ticket[]
}

export default function TicketTable({ tickets }: TicketTableProps) {
  ;<div className={styles.wrapper}>
    <table className={styles.ticketTable}>
      <thead>
        <tr>
          <th>Ticket ID</th>
          <th>Name</th>
          <th>Hours</th>
          <th>Created</th>
          <th>Deadline</th>
          <th>Status</th>
        </tr>
      </thead>

      <tbody>
        {tickets.map((ticket) => (
          <tr
            key={ticket.id}
            className={styles.ticketRow}
            onClick={() => openModal(ticket)}
          >
            <td>{ticket.id}</td>
            <td>{ticket.title}</td>
            <td>{getTicketHours(ticket.id)}</td>
            <td>{formatDate(ticket.created_at)}</td>
            <td>{formatDate(ticket.deadline_at)}</td>
            <td>{ticket.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
}
