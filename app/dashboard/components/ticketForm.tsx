'use client'

import styles from './ticketForm.module.css'

import { useState } from 'react'

export default function TicketForm() {
  const [title, setTitle] = useState('')

  const ticketId = [1, 2, 3, 4, 5]

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
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="deadline" className={styles.label}>
          Deadline
        </label>
        <input id="deadline" type="date" />
      </div>
      <button className={styles.submitBtn}>Ticket erstellen</button>
    </form>
  )
}
