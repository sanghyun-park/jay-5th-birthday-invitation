import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { PARTY } from '../data/party.js'
import styles from './Countdown.module.css'

function getRemaining(target) {
  const diff = Math.max(0, target - Date.now())
  const days = Math.floor(diff / 86400000)
  const hours = Math.floor((diff % 86400000) / 3600000)
  const minutes = Math.floor((diff % 3600000) / 60000)
  const seconds = Math.floor((diff % 60000) / 1000)
  return { days, hours, minutes, seconds }
}

export default function Countdown() {
  const target = new Date(PARTY.date).getTime()
  const [time, setTime] = useState(() => getRemaining(target))

  useEffect(() => {
    const id = setInterval(() => setTime(getRemaining(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  const units = [
    { label: 'DAYS', value: time.days },
    { label: 'HOURS', value: time.hours },
    { label: 'MIN', value: time.minutes },
    { label: 'SEC', value: time.seconds },
  ]

  return (
    <section className={`section ${styles.countdown}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">D-DAY</h2>
        <p className={styles.caption}>준규의 생일파티까지 남은 시간</p>
        <div className={styles.grid}>
          {units.map((u) => (
            <div className={styles.box} key={u.label}>
              <span className={styles.num}>
                {String(u.value).padStart(2, '0')}
              </span>
              <span className={styles.unit}>{u.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
