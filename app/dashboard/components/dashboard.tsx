'use client'

import styles from './dashboard.module.css'
import TicketList from './ticketList'
import TicketForm from './ticketForm'

import { useState } from 'react'

type Props = {
  tabs: string
}

export default function Dashboard({ tabs }: Props) {
  const tabsTopic = ['Ticket List', 'Create new Ticket', 'Tickets Done']

  const [tab, setTab] = useState('Ticket List')

  return (
    <div className={styles.wrapper}>
      <div className={styles.tabBar}>
        {tabsTopic.map((tabTopic) => (
          <button
            className={styles.tabButton}
            key={tabTopic}
            onClick={() => setTab(tabTopic)}
          >
            {tabTopic}
          </button>
        ))}
      </div>

      <div className={styles.content}>
        <div className={tab !== 'Ticket List' ? styles.hidden : ''}>
          <TicketList />
        </div>

        <div className={tab !== 'Create new Ticket' ? styles.hidden : ''}>
          <TicketForm />
        </div>

        <div className={tab !== 'Tickets Done' ? styles.hidden : ''}>
          Tickets Done
        </div>
      </div>
    </div>
  )
}
