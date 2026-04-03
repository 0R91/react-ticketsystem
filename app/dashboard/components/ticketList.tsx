import styles from './ticketList.module.css'
import { supabase } from '@/lib/supabase'
import { useState, useEffect } from 'react'

type Ticket = {
  id: number
  title: string
  description: string | null
  hours: string | null
  created: string
  deadline: string
  status: string
}

export default function TicketList() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true)

      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .eq('status', 'done')
        .order('deadline_at', { ascending: true })
        .order('created_at', { ascending: false })

      if (error) {
        console.log(error)
        setLoading(false)
        return
      }

      setTickets(data ?? [])
      setLoading(false)
    }

    fetchTickets()
  }, [])

  const formatDate = (isoString: string | null): string => {
    if (!isoString) return ''

    return new Date(isoString).toLocaleDateString('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      timeZone: 'UTC',
    })
  }

  if (loading) return <p>Lade Tickets...</p>
  console.log(tickets)
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
          {tickets.map(
            (ticket) =>
              ticket.status === 'open' && (
                <tr key={ticket.id}>
                  <td>{ticket.id}</td>
                  <td>{ticket.title}</td>
                  <td>5h</td>
                  <td>{formatDate(ticket.created)}</td>
                  <td>{formatDate(ticket.deadline)}</td>
                  <td>{ticket.status}</td>
                </tr>
              )
          )}
        </tbody>
      </table>
    </div>
  )
}
