'use client'

import { supabase } from '@/lib/supabase'
import styles from './ticketForm.module.css'
import { useState } from 'react'

export default function TicketForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [deadline, setDeadline] = useState('')
  const [loading, setLoading] = useState(false)

  const today = new Date()
  const dateToday =
    String(today.getDate()).padStart(2, '0') +
    '-' +
    String(today.getMonth() + 1).padStart(2, '0') +
    '-' +
    today.getFullYear()

  const submitForm = async (e) => {
    e.preventDefault()
    setLoading(true)

    const { data, error } = await supabase
      .from('tickets')
      .insert([
        {
          title,
          description,
          deadline_at: deadline || null,
          status: 'open',
        },
      ])
      .select()

    setLoading(false)

    if (error) {
      console.log('error:', error)
      return
    }

    console.log('inserted:', data)

    setTitle('')
    setDescription('')
    setDeadline('')
  }

  return (
    <form className={styles.form} onSubmit={submitForm}>
      <h2 className={styles.heading}>Ticket Form</h2>

      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <span className={styles.label}>Erstelldatum</span>
          <span>{dateToday}</span>
        </div>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Ticket-Title</label>
        <input
          className={styles.inputTitle}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Bitte gib den Ticket-Title ein"
          required
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
        <label className={styles.label}>Deadline</label>
        <input
          className={styles.inputDeadline}
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
      </div>

      <button type="submit" className={styles.submitBtn} disabled={loading}>
        {loading ? 'Speichert...' : 'Ticket erstellen'}
      </button>
    </form>
  )
}
