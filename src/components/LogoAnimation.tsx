import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface LogoAnimationProps {
  onAnimationComplete?: () => void
}

// タイムライン定義（ミリ秒）
const TIMELINE = {
  IDLE_DURATION: 500,
  TYPE_INTERVAL: 120,
  NOTICE_PAUSE: 300,
  DELETE_INTERVAL: 80,
  FIX_INTERVAL: 120,
} as const

export function LogoAnimation({ onAnimationComplete }: LogoAnimationProps) {
  const [displayText, setDisplayText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const shouldReduceMotion = useReducedMotion()

  // Reduced motion: 即座に完成状態を表示
  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayText('typo.')
      setShowCursor(false)
      onAnimationComplete?.()
    }
  }, [shouldReduceMotion, onAnimationComplete])

  // メインアニメーションシーケンス
  useEffect(() => {
    if (shouldReduceMotion) return

    const sequence = async () => {
      // Phase 1: アイドル（カーソル点滅）
      await delay(TIMELINE.IDLE_DURATION)

      // Phase 2: "type" を入力
      for (const char of ['t', 'y', 'p', 'e']) {
        setDisplayText((prev) => prev + char)
        await delay(TIMELINE.TYPE_INTERVAL)
      }

      // Phase 3: 誤字に気づく
      await delay(TIMELINE.NOTICE_PAUSE)

      // Phase 4: "e" を削除
      setDisplayText('typ')
      await delay(TIMELINE.DELETE_INTERVAL)

      // Phase 5: "o." を入力して修正完了
      setDisplayText('typo')
      await delay(TIMELINE.FIX_INTERVAL)
      setDisplayText('typo.')

      // Phase 6: 完了
      await delay(300)
      setShowCursor(false)
      onAnimationComplete?.()
    }

    sequence()
  }, [shouldReduceMotion, onAnimationComplete])

  return (
    <h1
      className="logo-animation"
      aria-label="typo. タイピングに、余白を。"
      role="img"
    >
      <span className="logo-text">{displayText}</span>
      {showCursor && (
        <motion.span
          className="logo-cursor"
          animate={{ opacity: [1, 1, 0, 0] }}
          transition={{ duration: 1.06, repeat: Infinity, ease: 'linear' }}
          aria-hidden="true"
        >
          |
        </motion.span>
      )}
    </h1>
  )
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
