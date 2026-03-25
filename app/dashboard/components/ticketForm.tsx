'use client'

import styles from './ticketForm.module.css'

import { useState } from 'react'

export default function TicketForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')

  const ticketId = []
  const ticketList = []

  const submitForm = () => {
    console.log('Form')
    console.log(formData)
    ticketList.push(formData)
    console.log(ticketList)
    setTitle('')
    setDescription('')
    setDate('')
  }

  const formData = {
    title: title,
    description: description,
    date: date,
  }

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault()
        console.log('YOYOYO')
      }}
    >
      <h2 className={styles.heading}>Ticket Form</h2>

      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <span className={styles.label}>Ticket-ID</span>

          <span>T-001</span>
        </div>

        <div className={styles.metaItem}>
          <span className={styles.label}>Erstelldatum</span>
          <span>01.03.2026</span>
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="title" className={styles.label}>
          Ticket-Title
        </label>
        <input
          className={styles.inputTitle}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Bitte gib den Ticket-Title ein"
        />
      </div>

      <div className={styles.field}>
        <span className={styles.label}>Description</span>
        <textarea
          placeholder="Beschreibung eingeben..."
          className={styles.textarea}
          onChange={(e) => {
            setDescription(e.target.value)
          }}
        />
      </div>

      <div className={`${styles.field} ${styles.lastField}`}>
        <label htmlFor="deadline" className={styles.label}>
          Deadline
        </label>
        <input
          className={styles.inputDate}
          type="date"
          onChange={(e) => {
            setDate(e.target.value)
          }}
        />
      </div>
      <button className={styles.submitBtn} onClick={submitForm}>
        Ticket erstellen
      </button>
    </form>
  )
}
