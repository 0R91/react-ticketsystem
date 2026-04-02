import { supabase } from '@/lib/supabase'
import { useState, useEffect } from 'react'

import styles from './ticketDoneList.module.css'

type Ticket = {
  id: number
  title: string
  description: string | null
  created_at: string
  deadline_at: string | null
  status: string | null
}

export default function TicketDoneList() {
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

  const formatDate = (isoString) => {
    if (!isoString) return ''

    return new Date(isoString)
      .toLocaleDateString('de-DE', {
        timeZone: 'UTC',
      })
      .replaceAll('-', '.')
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
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td>{ticket.id}</td>
              <td>{ticket.title}</td>
              <td>5h</td>
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
