import { useCallback, useEffect, useRef, useState } from 'react'
import PrimaryButton from '../../ui/PrimaryButton.jsx'
import PolicyModal from '../../ui/PolicyModal.jsx'
import AppointmentFormProgress from './AppointmentFormProgress.jsx'

const FORM_ENDPOINT = String(import.meta.env.VITE_FORM_ENDPOINT ?? '/api/send-lead.php').trim()

const formatPhoneValue = (rawValue) => {
  const digitsOnly = rawValue.replace(/\D/g, '')
  const normalized = digitsOnly.startsWith('8') ? `7${digitsOnly.slice(1)}` : digitsOnly
  const withCountry = normalized.startsWith('7') ? normalized : `7${normalized}`
  const digits = withCountry.slice(0, 11)

  let result = '+7'

  if (digits.length > 1) {
    result += ` (${digits.slice(1, Math.min(4, digits.length))}`
  }

  if (digits.length >= 4) {
    result += ')'
  }

  if (digits.length > 4) {
    result += ` ${digits.slice(4, Math.min(7, digits.length))}`
  }

  if (digits.length > 7) {
    result += `-${digits.slice(7, Math.min(9, digits.length))}`
  }

  if (digits.length > 9) {
    result += `-${digits.slice(9, Math.min(11, digits.length))}`
  }

  return result
}

function AppointmentForm() {
  const formRef = useRef(null)
  const sentResetTimerRef = useRef(null)
  const [isPolicyOpen, setIsPolicyOpen] = useState(false)
  const [isCallDisabled, setIsCallDisabled] = useState(false)
  const [isPolicyAccepted, setIsPolicyAccepted] = useState(false)
  const [formProgress, setFormProgress] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [submitError, setSubmitError] = useState(false)

  const calculateFormProgress = useCallback(() => {
    const form = formRef.current
    if (!form) return

    const nameValue = form.elements.name?.value?.trim() ?? ''
    const phoneValue = form.elements.phone?.value?.trim() ?? ''
    const petTypeValue = form.elements.petType?.value?.trim() ?? ''
    const reasonValue = form.elements.reason?.value?.trim() ?? ''
    const telegramValue = form.elements.telegram?.value?.trim() ?? ''

    const phoneValid = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(phoneValue)
    const telegramValid = /^@?[A-Za-z0-9_]{5,32}$/.test(telegramValue)

    const requiredChecks = [
      nameValue.length >= 2,
      phoneValid,
      petTypeValue.length >= 2,
      reasonValue.length >= 10,
      isPolicyAccepted,
    ]

    if (isCallDisabled) {
      requiredChecks.push(telegramValid)
    }

    const completedCount = requiredChecks.filter(Boolean).length
    const progress = Math.round((completedCount / requiredChecks.length) * 100)

    setFormProgress(progress)
  }, [isCallDisabled, isPolicyAccepted])

  useEffect(() => {
    calculateFormProgress()
  }, [calculateFormProgress])

  useEffect(() => {
    return () => {
      if (sentResetTimerRef.current) {
        clearTimeout(sentResetTimerRef.current)
      }
    }
  }, [])

  const handleCallDisabledChange = (event) => {
    const checked = event.target.checked
    setIsCallDisabled(checked)

    const form = event.target.form
    if (!form) return

    const telegramInput = form.elements.telegram
    if (!telegramInput) return

    if (!checked) {
      telegramInput.setCustomValidity('')
    }
  }

  const handleTelegramInput = (event) => {
    event.target.setCustomValidity('')
  }

  const handlePhoneInput = (event) => {
    const input = event.target
    input.value = formatPhoneValue(input.value)
    input.setCustomValidity('')
  }

  const handlePhoneFocus = (event) => {
    if (!event.target.value) {
      event.target.value = '+7'
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const form = event.currentTarget
    const telegramInput = form.elements.telegram

    if (isCallDisabled && telegramInput && !telegramInput.value.trim()) {
      telegramInput.setCustomValidity('Укажите Telegram для связи')
    } else if (telegramInput) {
      telegramInput.setCustomValidity('')
    }

    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }

    const payload = {
      name: form.elements.name?.value?.trim() ?? '',
      phone: form.elements.phone?.value?.trim() ?? '',
      petType: form.elements.petType?.value?.trim() ?? '',
      reason: form.elements.reason?.value?.trim() ?? '',
      noCall: isCallDisabled,
      telegram: form.elements.telegram?.value?.trim() ?? '',
      policyAccepted: isPolicyAccepted,
    }

    setIsSubmitting(true)
    setIsSent(false)
    setSubmitMessage('')
    setSubmitError(false)

    fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(async (response) => {
        const data = await response.json().catch(() => ({}))

        if (!response.ok || !data.ok) {
          throw new Error(data.error || 'Не удалось отправить заявку')
        }

        form.reset()
        setIsCallDisabled(false)
        setIsPolicyAccepted(false)
        setFormProgress(0)
        setSubmitError(false)
        setSubmitMessage('Заявка отправлена. Мы скоро свяжемся с вами.')
        setIsSent(true)

        if (sentResetTimerRef.current) {
          clearTimeout(sentResetTimerRef.current)
        }

        sentResetTimerRef.current = setTimeout(() => {
          setIsSent(false)
        }, 1800)
      })
      .catch((error) => {
        setSubmitError(true)
        setSubmitMessage(error.message || 'Ошибка отправки. Попробуйте еще раз.')
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  const handleAgreePolicy = () => {
    setIsPolicyAccepted(true)
    setIsPolicyOpen(false)
  }

  return (
    <>
      <form className="appointment-form" onSubmit={handleSubmit} ref={formRef} onInput={calculateFormProgress} onChange={calculateFormProgress}>
        <AppointmentFormProgress value={formProgress} />

        <div className="appointment-form__fields">
          <label className="sr-only" htmlFor="appointment-name">
            Ваше имя
          </label>
          <input
            id="appointment-name"
            className="appointment-form__input"
            type="text"
            name="name"
            placeholder="Ваше имя"
            required
            minLength={2}
            autoComplete="name"
          />
          <label className="sr-only" htmlFor="appointment-phone">
            Номер телефона
          </label>
          <input
            id="appointment-phone"
            className="appointment-form__input"
            type="tel"
            name="phone"
            placeholder="Номер телефона"
            required
            inputMode="tel"
            pattern="^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$"
            title="Введите номер в формате +7 (999) 999-99-99"
            maxLength={18}
            onInput={handlePhoneInput}
            onFocus={handlePhoneFocus}
            autoComplete="tel"
          />
          <label className="sr-only" htmlFor="appointment-pet-type">
            Вид питомца
          </label>
          <input
            id="appointment-pet-type"
            className="appointment-form__input"
            type="text"
            name="petType"
            placeholder="Вид питомца: кошка, собака.."
            required
            minLength={2}
          />
          <label className="sr-only" htmlFor="appointment-reason">
            Кратко опишите причину обращения
          </label>
          <textarea
            id="appointment-reason"
            className="appointment-form__input appointment-form__input--textarea"
            name="reason"
            placeholder="Кратко опишите причину обращения"
            rows="4"
            required
            minLength={10}
          />

          <label className="appointment-form__check">
            <input
              className="appointment-form__check-input"
              type="checkbox"
              id="appointment-no-call"
              checked={isCallDisabled}
              onChange={handleCallDisabledChange}
            />
            <span className="appointment-form__check-label">Не могу принять звонок, напишите</span>
          </label>

          <label className="sr-only" htmlFor="appointment-telegram">
            Telegram для связи
          </label>
          <input
            id="appointment-telegram"
            className="appointment-form__input"
            type="text"
            name="telegram"
            placeholder="@ для связи в телеграм"
            required={isCallDisabled}
            pattern="^@?[A-Za-z0-9_]{5,32}$"
            title="Введите Telegram username, например @vet_clinic"
            onInput={handleTelegramInput}
          />

          <label className="appointment-form__check">
            <input
              className="appointment-form__check-input"
              type="checkbox"
              required
              checked={isPolicyAccepted}
              onChange={(event) => setIsPolicyAccepted(event.target.checked)}
            />
            <span className="appointment-form__check-label">
              Заполняя форму, вы соглашаетесь с{' '}
              <button
                type="button"
                className="appointment-form__policy-link"
                aria-haspopup="dialog"
                onClick={() => setIsPolicyOpen(true)}
              >
                политикой конфиденциальности
              </button>
            </span>
          </label>
        </div>

        <PrimaryButton
          variant="cta"
          size="xl"
          type="submit"
          disabled={isSubmitting || isSent}
          className={`appointment-form__submit-btn ${isSent ? 'is-sent' : ''}`.trim()}
        >
          {isSent ? 'Отправлено' : 'Отправить заявку'}
        </PrimaryButton>

        {submitMessage ? (
          <p role="status" aria-live="polite" className="appointment-form__submit-status" data-error={submitError || undefined}>
            {submitMessage}
          </p>
        ) : null}
      </form>

      <PolicyModal isOpen={isPolicyOpen} onClose={() => setIsPolicyOpen(false)} onAgree={handleAgreePolicy} />
    </>
  )
}

export default AppointmentForm

