import styles from './ticketList.module.css'

const tickets = [
  { id: '123', name: 'Fix Bug', hours: '5h', deadline: '20.03' },
  { id: '124', name: 'Build Feature', hours: '8h', deadline: '22.03' },
  { id: '125', name: 'Code Review', hours: '2h', deadline: '21.03' },
]

export default function TicketList() {
  return (
    <div className={styles.ticketList}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Ticket-Id</th>
            <th>Ticket-Name</th>
            <th>Booked Hours</th>
            <th>Deadline</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.id}</td>
              <td>{ticket.name}</td>
              <td>{ticket.hours}</td>
              <td>{ticket.deadline}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
