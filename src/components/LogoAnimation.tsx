import { useState, useEffect } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface LogoAnimationProps {
  onAnimationComplete?: () => void
}

// タイムライン定義（ミリ秒）
const TIMELINE = {
  IDLE_DURATION: 800,
  TYPE_INTERVAL: 150,
  PAUSE_AFTER_TYPE: 400,
  DELETE_INTERVAL: 100,
  PAUSE_AFTER_DELETE: 300,
  TYPO_INTERVAL: 150,
  DOT_DELAY: 50,
} as const

export function LogoAnimation({ onAnimationComplete }: LogoAnimationProps) {
  const [displayText, setDisplayText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [cursorBounce, setCursorBounce] = useState(false)
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

      // Phase 3: 一時停止
      await delay(TIMELINE.PAUSE_AFTER_TYPE)

      // Phase 4: バックスペースで削除
      for (let i = 4; i >= 0; i--) {
        setDisplayText('type'.slice(0, i))
        await delay(TIMELINE.DELETE_INTERVAL)
      }

      // Phase 5: 一時停止
      await delay(TIMELINE.PAUSE_AFTER_DELETE)

      // Phase 6: "typo" を入力
      for (const char of ['t', 'y', 'p', 'o']) {
        setDisplayText((prev) => prev + char)
        await delay(TIMELINE.TYPO_INTERVAL)
      }

      // Phase 7: "." を入力（カーソル跳ね）
      await delay(TIMELINE.DOT_DELAY)
      setCursorBounce(true)
      setDisplayText((prev) => prev + '.')
      await delay(150)
      setCursorBounce(false)

      // Phase 8: 完了
      await delay(200)
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
          animate={
            cursorBounce
              ? { y: [0, -3, 0], opacity: 1 }
              : { opacity: [1, 1, 0, 0] }
          }
          transition={
            cursorBounce
              ? { duration: 0.15, ease: [0.34, 1.56, 0.64, 1] }
              : { duration: 1.06, repeat: Infinity, ease: 'linear' }
          }
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
