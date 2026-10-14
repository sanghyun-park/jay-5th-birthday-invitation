import { useState } from 'react'
import { PARTY } from '../data/party.js'
import styles from './Footer.module.css'

export default function Footer() {
  const [copied, setCopied] = useState(false)

  const shareLink = async () => {
    const url = window.location.href
    const data = {
      title: PARTY.title,
      text: `${PARTY.dateLabel} ${PARTY.timeLabel}, ${PARTY.place}`,
      url,
    }
    if (navigator.share) {
      try {
        await navigator.share(data)
      } catch {
        /* 사용자가 공유를 취소함 */
      }
      return
    }
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <footer className={styles.footer}>
      <p className={styles.thanks}>
        준규의 생일을 함께 축하해 주셔서 감사합니다 💕
      </p>
      <button className={styles.shareBtn} onClick={shareLink}>
        {copied ? '링크 복사됨 ✓' : '🔗 초대장 공유하기'}
      </button>
      <p className={styles.sign}>With love, {PARTY.name}</p>
    </footer>
  )
}
