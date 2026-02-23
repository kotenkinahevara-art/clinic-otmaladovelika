const OPEN_MINUTES = 9 * 60
const LUNCH_START_MINUTES = 13 * 60
const LUNCH_END_MINUTES = 14 * 60
const CLOSE_MINUTES = 18 * 60 + 30

const getCurrentMinutes = () => {
  const now = new Date()
  return now.getHours() * 60 + now.getMinutes()
}

const isClinicOpenNow = () => {
  const currentMinutes = getCurrentMinutes()

  const isBeforeLunch = currentMinutes >= OPEN_MINUTES && currentMinutes < LUNCH_START_MINUTES
  const isAfterLunch = currentMinutes >= LUNCH_END_MINUTES && currentMinutes < CLOSE_MINUTES

  return isBeforeLunch || isAfterLunch
}

function OpenNowWidget({ workHours = [] }) {
  const isOpen = isClinicOpenNow()

  return (
    <article className="widget widget--open" aria-live="polite">
      <p className="widget__label">{isOpen ? 'Сейчас открыты' : 'Сейчас закрыты'}</p>

      <div className="widget__hours">
        {workHours.map((line) => (
          <p key={line} className="widget__line">
            {line}
          </p>
        ))}
      </div>

      <p className="widget__hint">
        {isOpen
          ? 'Можно записаться онлайн прямо сейчас.'
          : 'Вы можете оставить заявку онлайн, и мы свяжемся с вами в рабочее время.'}
      </p>
    </article>
  )
}

export default OpenNowWidget
