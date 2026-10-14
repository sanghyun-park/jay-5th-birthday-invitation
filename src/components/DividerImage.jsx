import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import styles from './DividerImage.module.css'

const asset = (name) => `${import.meta.env.BASE_URL}images/${name}`

export default function DividerImage({ src, alt }) {
  const frameRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: frameRef,
    offset: ['start end', 'end start'],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], [-200, 200])

  return (
    <div ref={frameRef} className={styles.divider}>
      <motion.img
        className={styles.image}
        src={asset(src)}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{ y: reducedMotion ? 0 : imageY }}
      />
    </div>
  )
}
