import { supabase } from '@/lib/supabase'
import { useState, useEffect } from 'react'

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

  if (loading) return <p>Lade Tickets...</p>

  return (
    <>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.id}>
            <strong>{ticket.title}</strong>
            <div>Status: {ticket.status}</div>
            <div>Erstellt: {ticket.created_at}</div>
            <div>Deadline: {ticket.deadline_at ?? 'Keine Deadline'}</div>
          </li>
        ))}
      </ul>
    </>
  )
}
