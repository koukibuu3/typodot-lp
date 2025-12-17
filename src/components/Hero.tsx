import { useState } from 'react'
import { motion } from 'framer-motion'
import { LogoAnimation } from './LogoAnimation'

export function Hero() {
  const [animationComplete, setAnimationComplete] = useState(false)

  return (
    <section className="hero">
      <div className="hero-content">
        <LogoAnimation onAnimationComplete={() => setAnimationComplete(true)} />

        <motion.p
          className="tagline"
          initial={{ opacity: 0, y: 8 }}
          animate={animationComplete ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          タイピングに、余白を。
        </motion.p>

        <motion.a
          href="https://github.com/koukibuu3/typodot/releases/download/v1.0.0/typo.dmg"
          className="cta-button"
          initial={{ opacity: 0, y: 8 }}
          animate={animationComplete ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        >
          Download
        </motion.a>
      </div>

      <motion.div
        className="scroll-hint"
        initial={{ opacity: 0 }}
        animate={animationComplete ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 1.0 }}
        aria-hidden="true"
      >
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          ↓
        </motion.span>
      </motion.div>
    </section>
  )
}
