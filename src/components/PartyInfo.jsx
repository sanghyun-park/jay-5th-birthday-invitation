import { motion } from 'framer-motion'
import { PARTY } from '../data/party.js'
import styles from './PartyInfo.module.css'

export default function PartyInfo() {
  return (
    <section className={`section ${styles.info}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="section-title">파티 안내</h2>

        <div className={styles.card}>
          <div className={styles.row}>
            <span className={styles.label}>📅 날짜</span>
            <span className={styles.value}>{PARTY.dateLabel}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>⏰ 시간</span>
            <span className={styles.value}>{PARTY.timeLabel}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>📍 장소</span>
            <span className={styles.value}>{PARTY.place}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>🚗 주차</span>
            <span className={styles.value}>{PARTY.parking}</span>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
