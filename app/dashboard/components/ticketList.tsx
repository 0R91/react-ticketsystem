import styles from './ticketList.module.css'
import { supabase } from '@/lib/supabase'
import { useEffect, useState } from 'react'

import TicketTable from './ticketTable'

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

type EditTicket = {
  title: string
  description: string
  deadline_at: string
}

export default function TicketList() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null)
  const [savingEntry, setSavingEntry] = useState(false)
  const [savingTicket, setSavingTicket] = useState(false)

  const [newEntry, setNewEntry] = useState<NewTimeEntry>({
    date: '',
    start_time: '',
    end_time: '',
    activity: '',
  })

  const [editTicket, setEditTicket] = useState<EditTicket>({
    title: '',
    description: '',
    deadline_at: '',
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

  const formatTime = (time: string | null): string => {
    if (!time) return ''

    const [hours, minutes] = time.split(':')
    if (!hours || !minutes) return time

    return `${hours}:${minutes}`
  }

  const formatHoursMinutes = (value: number): string => {
    const totalMinutes = Math.round(value * 60)

    const hours = Math.floor(totalMinutes / 60)
    const minutes = totalMinutes % 60

    const paddedMinutes = minutes.toString().padStart(2, '0')

    return `${hours}:${paddedMinutes}`
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
    return formatHoursMinutes(getTicketHoursValue(ticketId))
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

  const resetEditTicket = (): void => {
    setEditTicket({
      title: '',
      description: '',
      deadline_at: '',
    })
  }

  const openModal = (ticket: Ticket): void => {
    setSelectedTicket(ticket)
    setEditTicket({
      title: ticket.title ?? '',
      description: ticket.description ?? '',
      deadline_at: ticket.deadline_at ? ticket.deadline_at.slice(0, 10) : '',
    })
  }

  const closeModal = (): void => {
    setSelectedTicket(null)
    resetNewEntry()
    resetEditTicket()
  }

  const handleSaveTicket = async (): Promise<void> => {
    if (!selectedTicket) return

    if (!editTicket.title.trim()) {
      alert('Der Titel darf nicht leer sein.')
      return
    }

    setSavingTicket(true)

    const payload = {
      title: editTicket.title.trim(),
      description: editTicket.description.trim() || null,
      deadline_at: editTicket.deadline_at || null,
    }

    const { data, error } = await supabase
      .from('tickets')
      .update(payload)
      .eq('id', selectedTicket.id)
      .select()
      .single()

    if (error || !data) {
      console.log(error)
      alert('Ticket konnte nicht gespeichert werden.')
      setSavingTicket(false)
      return
    }

    setTickets((prev) =>
      prev.map((ticket) => (ticket.id === data.id ? data : ticket))
    )

    setSelectedTicket(data)
    setSavingTicket(false)
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
      <TicketTable tickets={tickets} />

      {selectedTicket && (
        <div className={styles.ticketModal} onClick={closeModal}>
          <div
            className={styles.ticketModalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.editFields}>
              <input
                type="text"
                value={editTicket.title}
                onChange={(e) =>
                  setEditTicket((prev) => ({
                    ...prev,
                    title: e.target.value,
                  }))
                }
                placeholder="Titel"
              />

              <textarea
                value={editTicket.description}
                onChange={(e) =>
                  setEditTicket((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Beschreibung"
                rows={4}
              />

              <input
                type="date"
                value={editTicket.deadline_at}
                onChange={(e) =>
                  setEditTicket((prev) => ({
                    ...prev,
                    deadline_at: e.target.value,
                  }))
                }
              />
            </div>

            <div className={styles.modalDate}>
              <p>Created: {formatDate(selectedTicket.created_at)}</p>
              <p>Deadline: {formatDate(selectedTicket.deadline_at)}</p>
              <p>Status: {selectedTicket.status}</p>
            </div>

            <button onClick={handleSaveTicket} disabled={savingTicket}>
              {savingTicket ? 'Speichert...' : 'Ticket speichern'}
            </button>

            <div className={styles.timeEntryContainer}>
              <h3>Time stamps</h3>

              {selectedTicketEntries.length === 0 ? (
                <p>No time stamps available yet</p>
              ) : (
                <ul>
                  {selectedTicketEntries.map((entry) => (
                    <li key={entry.id} className={styles.entryRow}>
                      <span className={styles.dateTime}>
                        <span>{formatDate(entry.date)}</span>
                        <span>
                          {formatTime(entry.start_time)} –{' '}
                          {formatTime(entry.end_time)}
                        </span>
                      </span>

                      <span>{entry.activity}</span>
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
