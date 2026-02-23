import { useRef } from 'react'
import PrimaryButton from './PrimaryButton'
import useDialogA11y from './useDialogA11y'
import scrollToSection from '../../utils/scrollToSection.js'

function ServiceModal({ service, onClose }) {
  const dialogRef = useRef(null)
  const contentRef = useRef(null)
  useDialogA11y({ isOpen: Boolean(service), onClose, containerRef: dialogRef })

  if (!service) return null

  const handleAppointmentClick = () => {
    onClose()
    requestAnimationFrame(() => {
      requestAnimationFrame(() => scrollToSection('reception'))
    })
  }

  return (
    <div
      ref={dialogRef}
      className="service-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="service-modal-title"
      aria-describedby="service-modal-content"
    >
      <button className="service-modal__backdrop" type="button" aria-label="Закрыть" onClick={onClose} />

      <div className={`service-modal__window service-modal__window--${service.variant}`}>
        <button className="service-modal__close" type="button" aria-label="Закрыть" onClick={onClose}>
          <span aria-hidden="true">×</span>
        </button>

        <h2 id="service-modal-title" className="service-modal__title">
          {service.title}
        </h2>

        <div id="service-modal-content" ref={contentRef} className="service-modal__content">
          <section className="service-modal__section">
            <h3 className="service-modal__subtitle">Краткое описание</h3>
            <p>{service.modal.summary}</p>
          </section>

          <section className="service-modal__section">
            <h3 className="service-modal__subtitle">Для чего нужна эта услуга?</h3>
            <ul className="service-modal__list">
              {service.modal.reasons.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="service-modal__section">
            <h3 className="service-modal__subtitle">Что включает услуга</h3>
            <ul className="service-modal__list">
              {service.modal.includes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>

        <div className="service-modal__footer">
          <PrimaryButton variant="cta" size="xl" onClick={handleAppointmentClick}>
            Записаться на приём
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}

export default ServiceModal
