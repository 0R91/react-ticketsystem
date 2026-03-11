'use client'

import styles from './dashboard.module.css'
import { useState } from 'react'

type Props = {
  tabs: string
}

export default function Dashboard({ tabs }: Props) {
  const tabsTopic = ['Ticket List', 'Create new Ticket', 'Tickets Done']

  const [tab, setTab] = useState('Ticket List')

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.tabContainer}>
        {tabsTopic.map((tabTopic) => (
          <button
            className={styles.button}
            key={tabTopic}
            onClick={() => setTab(tabTopic)}
          >
            {tabTopic}
          </button>
        ))}
      </div>
      <div
        className={`${styles.tabContent} ${tab === 'Ticket List' ? styles.active : styles.hidden}`}
      >
        Ticket List
      </div>
      <div
        className={`${styles.tabContent} ${tab === 'Create new Ticket' ? styles.active : styles.hidden}`}
      >
        Create new Ticket
      </div>
      <div
        className={`${styles.tabContent} ${tab === 'Tickets Done' ? styles.active : styles.hidden}`}
      >
        Tickets Done
      </div>
    </div>
  )
}
