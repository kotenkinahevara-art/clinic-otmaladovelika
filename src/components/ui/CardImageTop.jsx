function CardImageTop({ image, title, text, onRead }) {
  return (
    <article className="card card--orange article-card">
      <img src={image} alt={title} className="article-card__image" loading="lazy" />

      <div className="article-card__body">
        <h3 className="card__title">{title}</h3>
        <p className="card__text">{text}</p>

        <button type="button" className="article-card__read" onClick={onRead} aria-label={`Читать статью: ${title}`}>
          Читать
        </button>
      </div>
    </article>
  )
}

export default CardImageTop
