import { useRef } from 'react'
import PrimaryButton from './PrimaryButton'
import useDialogA11y from './useDialogA11y'
import scrollToSection from '../../utils/scrollToSection.js'

function ArticleModal({ article, onClose }) {
  const dialogRef = useRef(null)
  const contentRef = useRef(null)
  useDialogA11y({ isOpen: Boolean(article), onClose, containerRef: dialogRef })

  if (!article) return null

  const handleAppointmentClick = () => {
    onClose()
    requestAnimationFrame(() => {
      requestAnimationFrame(() => scrollToSection('reception'))
    })
  }

  return (
    <div
      ref={dialogRef}
      className="article-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-title"
      aria-describedby="article-modal-content"
    >
      <button className="article-modal__backdrop" type="button" aria-label="Закрыть" onClick={onClose} />

      <div className="article-modal__window">
        <button className="article-modal__close" type="button" aria-label="Закрыть" onClick={onClose}>
          <span aria-hidden="true">×</span>
        </button>

        <h2 id="article-modal-title" className="article-modal__title">
          {article.title}
        </h2>

        <div id="article-modal-content" ref={contentRef} className="article-modal__content">
          {article.sections.map((section) => (
            <section key={section.heading} className="article-modal__section">
              <h3 className="article-modal__subtitle">{section.heading}</h3>

              {section.paragraphs?.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}

              {section.list?.length ? (
                <ul className="article-modal__list">
                  {section.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}

          {article.source && (
            <p className="article-modal__source">
              Источник:{' '}
              <a href={article.source.url} target="_blank" rel="noreferrer">
                {article.source.title}
              </a>
            </p>
          )}
        </div>

        <div className="article-modal__footer">
          <PrimaryButton variant="cta" size="xl" onClick={handleAppointmentClick}>
            Записаться на приём
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}

export default ArticleModal
