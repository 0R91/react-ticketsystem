import styles from './dashboard.module.css'

type Props = {
  tab: string
}

export default function Dashboard({}: Props) {
  return <div className={styles.container}></div>
}
