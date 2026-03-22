import styles from './ticketList.module.css'

const tickets = [
  { id: '123', name: 'Fix Bug', hours: 5, deadline: '20.03' },
  { id: '124', name: 'Build Feature', hours: 8, deadline: '22.03' },
  { id: '125', name: 'Code Review', hours: 2, deadline: '21.03' },
]

export default function TicketList() {
  return (
    <div className={styles.wrapper}>
      <table className={styles.ticketTable}>
        <thead>
          <tr>
            <th>Ticket ID</th>
            <th>Name</th>
            <th>Stunden</th>
            <th>Deadline</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.id}</td>
              <td>{ticket.name}</td>
              <td>{ticket.hours}h</td>
              <td>{ticket.deadline}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
