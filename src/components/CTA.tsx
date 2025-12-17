import { motion } from 'framer-motion'

export function CTA() {
  return (
    <section className="cta-section">
      <motion.div
        className="cta-content"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] as const }}
      >
        <h2 className="cta-heading">タイピングを、はじめよう。</h2>

        <a href="https://github.com/koukibuu3/typodot/releases/download/v1.0.0/typo.dmg" className="cta-button cta-button-large">
          Download
        </a>

        <a
          href="https://github.com"
          className="cta-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          または GitHub でソースを見る →
        </a>
      </motion.div>
    </section>
  )
}
