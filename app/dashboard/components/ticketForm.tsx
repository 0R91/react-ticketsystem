'use client'

import styles from './ticketForm.module.css'
import { useState } from 'react'

export default function TicketForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [ticketList, setTicketList] = useState([])

  const today = new Date()
  const dateToday =
    String(today.getDate()).padStart(2, '0') +
    '-' +
    String(today.getMonth() + 1).padStart(2, '0') +
    '-' +
    today.getFullYear()

  function getNextId(list) {
    if (list.length === 0) return 1
    const maxId = Math.max(...list.map((t) => t.id))
    return maxId + 1
  }

  const nextId = getNextId(ticketList)

  const submitForm = (e) => {
    e.preventDefault()

    const formData = {
      id: nextId,
      title,
      description,
      date,
      createdAt: dateToday,
    }

    console.log(formData)

    setTicketList((prev) => [...prev, formData])
    setTitle('')
    setDescription('')
    setDate('')
  }

  return (
    <form className={styles.form} onSubmit={submitForm}>
      <h2 className={styles.heading}>Ticket Form</h2>

      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <span className={styles.label}>Ticket-ID</span>
          <span>T-{String(nextId).padStart(3, '0')}</span>
        </div>

        <div className={styles.metaItem}>
          <span className={styles.label}>Erstelldatum</span>
          <span>{dateToday}</span>
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="title" className={styles.label}>
          Ticket-Title
        </label>
        <input
          id="title"
          className={styles.inputTitle}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Bitte gib den Ticket-Title ein"
        />
      </div>

      <div className={styles.field}>
        <span className={styles.label}>Description</span>
        <textarea
          value={description}
          placeholder="Beschreibung eingeben..."
          className={styles.textarea}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className={`${styles.field} ${styles.lastField}`}>
        <label htmlFor="deadline" className={styles.label}>
          Deadline
        </label>
        <input
          id="deadline"
          className={styles.inputDate}
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <button type="submit" className={styles.submitBtn}>
        Ticket erstellen
      </button>
    </form>
  )
}
