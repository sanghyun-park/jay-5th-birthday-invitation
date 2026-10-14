import { useState } from 'react'
import { motion } from 'framer-motion'
import { PARTY } from '../data/party.js'
import styles from './MapSection.module.css'

export default function MapSection() {
  const [copied, setCopied] = useState(false)

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(PARTY.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  const q = encodeURIComponent(`${PARTY.place} ${PARTY.address}`)
  const mapEmbed = `https://maps.google.com/maps?q=${q}&z=16&output=embed`
  const kakaoNavi = `https://map.kakao.com/link/search/${encodeURIComponent(PARTY.place)}`
  const tmap = `https://apis.openapi.sk.com/tmap/app/routes?name=${encodeURIComponent(PARTY.place)}&lon=${PARTY.lng}&lat=${PARTY.lat}`
  const googleMap = `https://www.google.com/maps/search/?api=1&query=${q}`

  return (
    <section className={`section ${styles.map}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
      >
        <h2 className="section-title">오시는 길</h2>

        <div className={styles.mapWrap}>
          <iframe
            title="파티 장소 지도"
            src={mapEmbed}
            loading="lazy"
            allowFullScreen
          />
        </div>

        <p className={styles.place}>{PARTY.place}</p>
        <p className={styles.addr}>{PARTY.address}</p>

        <button className={styles.copyBtn} onClick={copyAddress}>
          {copied ? '복사됨 ✓' : '📋 주소 복사'}
        </button>

        <div className={styles.navs}>
          <a href={kakaoNavi} target="_blank" rel="noreferrer">카카오맵</a>
          <a href={tmap} target="_blank" rel="noreferrer">티맵</a>
          <a href={googleMap} target="_blank" rel="noreferrer">구글맵</a>
        </div>

        <p className={styles.parking}>🚗 {PARTY.parking}</p>
      </motion.div>
    </section>
  )
}
