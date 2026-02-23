import { useId, useState } from 'react'
import PrimaryButton from './PrimaryButton'
import PawPattern from './PawPattern.jsx'
import openIcon from '../../assets/icons/open-arrow.svg'
import closeIcon from '../../assets/icons/close-arrow.svg'

function CardExpandable({ title, variant = 'orange', detailsText, buttonText, onDetailsClick }) {
  const [isOpen, setIsOpen] = useState(false)
  const id = useId()
  const panelId = `card-expandable-panel-${id}`
  const titleId = `card-expandable-title-${id}`
  const iconSrc = isOpen ? closeIcon : openIcon
  const actionLabel = isOpen ? 'Свернуть' : 'Развернуть'

  return (
    <article className={`card card--${variant} card--paw-bg card-expandable ${isOpen ? 'is-open' : ''}`}>
      <PawPattern count={2} />

      <h3 id={titleId} className="card-expandable__heading">
        <button
          className="card-expandable__toggle"
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls={panelId}
          aria-labelledby={titleId}
          aria-label={`${actionLabel}: ${title}`}
        >
          <span className="card__title">{title}</span>
          <img className="card-expandable__icon" src={iconSrc} alt="" aria-hidden="true" />
        </button>
      </h3>

      <div id={panelId} className="card-expandable__content-wrap" role="region" aria-labelledby={titleId} aria-hidden={!isOpen}>
        <div className="card-expandable__content">
          {detailsText ? <p className="card-expandable__details">{detailsText}</p> : null}
          {buttonText ? (
            <PrimaryButton variant="cta" size="md" onClick={onDetailsClick} tabIndex={isOpen ? 0 : -1}>
              {buttonText}
            </PrimaryButton>
          ) : null}
        </div>
      </div>
    </article>
  )
}

export default CardExpandable
