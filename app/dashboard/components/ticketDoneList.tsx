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

type TimeEntry = {
  id: number
  ticket_id: number
  date: string
  start_time: string
  end_time: string
  activity: string
  created_at: string
}

export default function TicketDoneList() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      const { data: ticketData, error: ticketError } = await supabase
        .from('tickets')
        .select('*')
        .eq('status', 'done')
        .order('deadline_at', { ascending: true })
        .order('created_at', { ascending: false })

      const { data: entryData, error: entryError } = await supabase
        .from('time_entries')
        .select('*')
        .order('date', { ascending: false })
        .order('start_time', { ascending: false })

      if (ticketError || entryError) {
        console.log(ticketError || entryError)
        setLoading(false)
        return
      }

      setTickets(ticketData ?? [])
      setTimeEntries(entryData ?? [])
      setLoading(false)
    }

    fetchData()
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

  const formatHours = (value: number): string => {
    return `${value.toFixed(2)}h`
  }

  const getDurationInHours = (startTime: string, endTime: string): number => {
    if (!startTime || !endTime) return 0

    const [startHour, startMinute] = startTime.split(':').map(Number)
    const [endHour, endMinute] = endTime.split(':').map(Number)

    const startMinutes = startHour * 60 + startMinute
    const endMinutes = endHour * 60 + endMinute

    if (endMinutes <= startMinutes) return 0

    return (endMinutes - startMinutes) / 60
  }

  const getEntriesForTicket = (ticketId: number): TimeEntry[] => {
    return timeEntries.filter((entry) => entry.ticket_id === ticketId)
  }

  const getTicketHoursValue = (ticketId: number): number => {
    return getEntriesForTicket(ticketId).reduce((sum, entry) => {
      return sum + getDurationInHours(entry.start_time, entry.end_time)
    }, 0)
  }

  const getTicketHours = (ticketId: number): string => {
    return formatHours(getTicketHoursValue(ticketId))
  }

  if (loading) return <p>Lade Tickets...</p>

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
