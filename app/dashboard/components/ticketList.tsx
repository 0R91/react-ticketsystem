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
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)

  useEffect(() => {
    const fetchTickets = async () => {
      setLoading(true)

      const { data, error } = await supabase
        .from('tickets')
        .select('*')
        .eq('status', 'open')
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
    <>
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
                  <tr
                    key={ticket.id}
                    className={styles.ticketRow}
                    onClick={() => setSelectedTicket(ticket)}
                  >
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

      {selectedTicket && (
        <div
          className={styles.ticketModal}
          onClick={() => setSelectedTicket(null)}
        >
          <div
            className={styles.ticketModalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selectedTicket.title}</h2>
            <p>
              {selectedTicket.description ?? 'Keine Beschreibung vorhanden.'}
            </p>
            <p>Stunden: {selectedTicket.hours ?? '-'}</p>
            <p>Erstellt: {formatDate(selectedTicket.created)}</p>
            <p>Deadline: {formatDate(selectedTicket.deadline)}</p>
            <p>Status: {selectedTicket.status}</p>

            <button onClick={() => setSelectedTicket(null)}>Schließen</button>
          </div>
        </div>
      )}
    </>
  )
}
