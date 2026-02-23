function DataState({ title, text, actionLabel, onAction, className = '' }) {
  return (
    <div className={`data-state ${className}`.trim()} role="status" aria-live="polite">
      <p className="data-state__title">{title}</p>
      {text ? <p className="data-state__text">{text}</p> : null}
      {actionLabel && onAction ? (
        <button type="button" className="data-state__action" onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
    </div>
  )
}

export default DataState
