import { motion } from 'framer-motion'
import { PARTY } from '../data/party.js'
import styles from './Greeting.module.css'

export default function Greeting() {
  return (
    <section className={`section ${styles.greeting}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7 }}
      >
        <p className={styles.heart}>♥</p>
        <h2 className="section-title">초대합니다</h2>
        <p className={styles.message}>{PARTY.greeting}</p>
      </motion.div>
    </section>
  )
}
