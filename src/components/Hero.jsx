import { motion } from 'framer-motion'
import { PARTY } from '../data/party.js'
import styles from './Hero.module.css'

const asset = (name) => `${import.meta.env.BASE_URL}images/${name}`

export default function Hero() {
  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(${asset('hero.jpg')})` }}
    >
      <div className={styles.overlay} />
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <p className={styles.badge}>HAPPY BIRTHDAY</p>
        <motion.span
          className={styles.bigFive}
          initial={{ scale: 0.6, rotate: -8, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 160 }}
        >
          5
        </motion.span>
        <h1 className={styles.title}>
          {PARTY.name}의 다섯 번째 생일파티에<br />초대합니다 🎉
        </h1>
        <p className={styles.sub}>{PARTY.age}살이 되었어요!</p>
      </motion.div>

      <motion.div
        className={styles.scroll}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.4 }}
        aria-hidden="true"
      >
        ↓
      </motion.div>
    </section>
  )
}
