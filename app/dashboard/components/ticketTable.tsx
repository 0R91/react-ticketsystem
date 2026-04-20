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
  timeEntries: TimeEntry[]
}

type TimeEntry = {
  id: number
  ticket_id: number
  date: string
  start_time: string
  end_time: string
  activity: string
  created_at: string
}

export default function TicketTable({
  tickets,
  timeEntries,
}: TicketTableProps) {
  const getTicketHours = (ticketId: number): string => {
    return formatHoursMinutes(getTicketHoursValue(ticketId))
  }

  const formatHoursMinutes = (value: number): string => {
    const totalMinutes = Math.round(value * 60)

    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    const paddedMinutes = minutes.toString().padStart(2, '0')

    return `${hours}:${paddedMinutes}`
  }

  const getTicketHoursValue = (ticketId: number): number => {
    return getEntriesForTicket(ticketId).reduce((sum, entry) => {
      return sum + getDurationInHours(entry.start_time, entry.end_time)
    }, 0)
  }

  const getEntriesForTicket = (ticketId: number): TimeEntry[] => {
    return timeEntries.filter((entry) => entry.ticket_id === ticketId)
  }

  const getDurationInHours = (startTime: string, endTime: string): number => {
    if (!startTime || !endTime) return 0

    const [startHour, startMinute] = startTime.split(':').map(Number)
    const [endHour, endMinute] = endTime.split(':').map(Number)

    if (
      Number.isNaN(startHour) ||
      Number.isNaN(startMinute) ||
      Number.isNaN(endHour) ||
      Number.isNaN(endMinute)
    ) {
      return 0
    }

    const startMinutes = startHour * 60 + startMinute
    const endMinutes = endHour * 60 + endMinute

    if (endMinutes <= startMinutes) return 0

    return (endMinutes - startMinutes) / 60
  }

  const formatDate = (isoString: string | null): string => {
    if (!isoString) return ''

    return new Date(isoString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'UTC',
    })
  }

  return (
    <div className={styles.wrapper}>
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
  )
}
