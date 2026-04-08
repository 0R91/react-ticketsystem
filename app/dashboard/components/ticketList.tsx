import styles from './ticketList.module.css'
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'

type Ticket = {
  id: number
  title: string
  description: string | null
  created_at: string
  deadline_at: string | null
  status: string
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

type NewTimeEntry = {
  date: string
  start_time: string
  end_time: string
  activity: string
}

export default function TicketList() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [savingEntry, setSavingEntry] = useState(false)

  const [newEntry, setNewEntry] = useState<NewTimeEntry>({
    date: '',
    start_time: '',
    end_time: '',
    activity: '',
  })

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)

      const { data: ticketData, error: ticketError } = await supabase
        .from('tickets')
        .select('*')
        .eq('status', 'open')
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

  const selectedTicketEntries: TimeEntry[] = selectedTicket
    ? getEntriesForTicket(selectedTicket.id)
    : []

  const selectedTicketHours: string = selectedTicket
    ? getTicketHours(selectedTicket.id)
    : '0.00h'

  const resetNewEntry = (): void => {
    setNewEntry({
      date: '',
      start_time: '',
      end_time: '',
      activity: '',
    })
  }

  const closeModal = (): void => {
    setSelectedTicket(null)
    resetNewEntry()
  }

  const handleAddTimeEntry = async (): Promise<void> => {
    if (!selectedTicket) return

    const { date, start_time, end_time, activity } = newEntry

    if (!date || !start_time || !end_time || !activity.trim()) {
      alert('Bitte Datum, Startzeit, Endzeit und Tätigkeit ausfüllen.')
      return
    }

    if (end_time <= start_time) {
      alert('Die Endzeit muss später als die Startzeit sein.')
      return
    }

    setSavingEntry(true)

    const { data, error } = await supabase
      .from('time_entries')
      .insert([
        {
          ticket_id: selectedTicket.id,
          date,
          start_time,
          end_time,
          activity: activity.trim(),
        },
      ])
      .select()
      .single()

    if (error || !data) {
      console.log(error)
      alert('Zeitbuchung konnte nicht gespeichert werden.')
      setSavingEntry(false)
      return
    }

    setTimeEntries((prev) => [data, ...prev])
    resetNewEntry()
    setSavingEntry(false)
  }

  if (loading) return <p>Lade Tickets...</p>

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
            {tickets.map((ticket) => (
              <tr
                key={ticket.id}
                className={styles.ticketRow}
                onClick={() => setSelectedTicket(ticket)}
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

      {selectedTicket && (
        <div className={styles.ticketModal} onClick={closeModal}>
          <div
            className={styles.ticketModalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>{selectedTicket.title}</h2>

            <p>
              {selectedTicket.description ?? 'Keine Beschreibung vorhanden.'}
            </p>
            <div className={styles.modalDate}>
              <p>Erstellt: {formatDate(selectedTicket.created_at)}</p>
              <p>Deadline: {formatDate(selectedTicket.deadline_at)}</p>
              <p>Status: {selectedTicket.status}</p>
            </div>
            <div>
              <h3>Zeitbuchungen</h3>

              {selectedTicketEntries.length === 0 ? (
                <p>Noch keine Zeitbuchungen vorhanden.</p>
              ) : (
                <ul>
                  {selectedTicketEntries.map((entry) => (
                    <li key={entry.id}>
                      {formatDate(entry.date)} | {entry.start_time} -{' '}
                      {entry.end_time} | {entry.activity} |{' '}
                      {formatHours(
                        getDurationInHours(entry.start_time, entry.end_time)
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <p>Gesamtstunden: {selectedTicketHours}</p>

            <div className={styles.timeEntryInput}>
              <input
                type="date"
                value={newEntry.date}
                onChange={(e) =>
                  setNewEntry((prev) => ({ ...prev, date: e.target.value }))
                }
              />

              <input
                type="time"
                value={newEntry.start_time}
                onChange={(e) =>
                  setNewEntry((prev) => ({
                    ...prev,
                    start_time: e.target.value,
                  }))
                }
              />

              <input
                type="time"
                value={newEntry.end_time}
                onChange={(e) =>
                  setNewEntry((prev) => ({
                    ...prev,
                    end_time: e.target.value,
                  }))
                }
              />

              <input
                type="text"
                placeholder="Tätigkeit"
                value={newEntry.activity}
                onChange={(e) =>
                  setNewEntry((prev) => ({
                    ...prev,
                    activity: e.target.value,
                  }))
                }
              />
            </div>

            <button onClick={handleAddTimeEntry} disabled={savingEntry}>
              {savingEntry ? 'Speichert...' : 'Zeit buchen'}
            </button>
          </div>
        </div>
      )}
    </>
  )
}
