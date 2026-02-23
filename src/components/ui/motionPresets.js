export const EASE_OUT = [0.22, 1, 0.36, 1]

export const sectionReveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.55, ease: EASE_OUT },
}

export const itemReveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45, ease: EASE_OUT },
}

export const listStagger = {
  initial: { opacity: 1 },
  whileInView: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
  viewport: { once: true, amount: 0.12 },
}
