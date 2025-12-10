import { motion } from 'framer-motion'

const values = [
  {
    title: '集中',
    description: '余計なUIを排除。文章とあなたの指だけ。',
  },
  {
    title: '分析',
    description: '精度・速度・苦手キーをシンプルに可視化。',
  },
  {
    title: '継続',
    description: '軽量設計で毎日開きたくなる。',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
}

export function ValueProposition() {
  return (
    <section className="value-proposition">
      <motion.div
        className="value-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {values.map((value) => (
          <motion.div
            key={value.title}
            className="value-item"
            variants={itemVariants}
          >
            <h3 className="value-title">{value.title}</h3>
            <p className="value-description">{value.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
