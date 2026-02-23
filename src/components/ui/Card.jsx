import PawPattern from './PawPattern.jsx'

function BasicCard({ title, text, variant, className = '', children }) {
  const classes = `card card--${variant} card--paw-bg ${className}`.trim()

  return (
    <article className={classes}>
      <PawPattern count={2} />
      <h3 className="card__title">{title}</h3>
      {text && <p className="card__text">{text}</p>}
      {children}
    </article>
  )
}

export default BasicCard
