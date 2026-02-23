function BurgerButton({ isOpen, onClick }) {
  return (
    <button
      type="button"
      className={`burger ${isOpen ? 'is-open' : ''}`}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      aria-haspopup="dialog"
      aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
      onClick={onClick}
    >
      <span className="burger__icon" aria-hidden="true">
        <span className="burger__line burger__line--1" />
        <span className="burger__line burger__line--2" />
        <span className="burger__line burger__line--3" />
      </span>
    </button>
  )
}

export default BurgerButton
