function AppointmentFormProgress({ value }) {
  return (
    <div className="appointment-form__progress">
      <div className="appointment-form__progress-head">
        <p className="appointment-form__progress-label">Заполнение формы</p>
        <p className="appointment-form__progress-value" aria-live="polite">{value}%</p>
      </div>
      <div
        className="appointment-form__progress-track"
        role="progressbar"
        aria-label="Прогресс заполнения формы"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
      >
        <span className="appointment-form__progress-fill" style={{ width: `${value}%` }} />
      </div>
    </div>
  )
}

export default AppointmentFormProgress
