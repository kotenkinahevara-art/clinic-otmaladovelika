import { useEffect } from 'react'

const FOCUSABLE_SELECTOR = [
  'a[href]',
  'button:not([disabled])',
  'textarea:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

function useDialogA11y({ isOpen, onClose, containerRef, lockBodyClass = 'modal-open' }) {
  useEffect(() => {
    if (!isOpen) return undefined

    const container = containerRef.current
    if (!container) return undefined

    const previousFocus = document.activeElement
    const focusable = Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR))
    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    document.body.classList.add(lockBodyClass)
    container.setAttribute('tabindex', '-1')
    if (first) {
      first.focus()
    } else {
      container.focus()
    }

    const handleKeydown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab' || focusable.length === 0) return

      if (document.activeElement === container && !event.shiftKey && first) {
        event.preventDefault()
        first.focus()
      } else if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeydown)

    return () => {
      document.removeEventListener('keydown', handleKeydown)
      document.body.classList.remove(lockBodyClass)

      if (previousFocus instanceof HTMLElement) {
        previousFocus.focus()
      }
    }
  }, [containerRef, isOpen, lockBodyClass, onClose])
}

export default useDialogA11y
