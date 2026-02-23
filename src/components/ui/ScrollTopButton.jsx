import { useEffect, useState } from 'react'

const SHOW_OFFSET = 320

function ScrollTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > SHOW_OFFSET)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      className={`scroll-top ${isVisible ? 'is-visible' : ''}`.trim()}
      aria-label="Вернуться наверх"
      onClick={handleScrollTop}
    >
      <span aria-hidden="true" className="scroll-top__icon" />
    </button>
  )
}

export default ScrollTopButton
