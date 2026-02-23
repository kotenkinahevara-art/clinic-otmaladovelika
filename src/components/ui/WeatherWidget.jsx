import { useEffect, useMemo, useState } from 'react'

const WEATHER_API_URL =
  'https://api.open-meteo.com/v1/forecast?latitude=55.811533&longitude=44.093931&current=temperature_2m,weather_code&timezone=auto'

const classifyWeather = (temperature, weatherCode) => {
  const rainCodes = new Set([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82])
  const snowCodes = new Set([71, 73, 75, 77, 85, 86])

  if (temperature <= -10 || snowCodes.has(weatherCode)) {
    return {
      condition: 'Холодно',
      advice: 'Осторожно, сильный мороз: сократите прогулку и используйте защиту лап.',
    }
  }

  if (rainCodes.has(weatherCode)) {
    return {
      condition: 'Дождливо',
      advice: 'Дождик: возьмите зонтик и после прогулки просушите лапы и шерсть питомца.',
    }
  }

  return {
    condition: 'Комфортно',
    advice: 'Отличная погода для прогулки: можно планировать более длинный маршрут.',
  }
}

function WeatherWidget({ location = 'Дальнее Константиново' }) {
  const [temperature, setTemperature] = useState(null)
  const [weatherCode, setWeatherCode] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    const loadWeather = async () => {
      try {
        setIsLoading(true)
        setIsError(false)
        setIsEmpty(false)

        const response = await fetch(WEATHER_API_URL, { signal: controller.signal })
        if (!response.ok) {
          throw new Error('Weather request failed')
        }

        const data = await response.json()
        const current = data?.current

        if (!current) {
          setIsEmpty(true)
          return
        }

        if (typeof current.temperature_2m !== 'number') {
          setIsEmpty(true)
          return
        }

        setTemperature(current.temperature_2m)
        setWeatherCode(typeof current.weather_code === 'number' ? current.weather_code : 0)
      } catch (error) {
        if (error.name === 'AbortError') return
        setIsError(true)
      } finally {
        setIsLoading(false)
      }
    }

    loadWeather()

    return () => controller.abort()
  }, [])

  const weatherState = useMemo(() => {
    if (temperature === null || weatherCode === null) {
      return {
        condition: 'Погода обновляется',
        advice: 'Проверяем текущую температуру и условия прогулки для питомца.',
      }
    }

    return classifyWeather(temperature, weatherCode)
  }, [temperature, weatherCode])

  const temperatureText = temperature === null ? '--' : `${Math.round(temperature)}°C`

  return (
    <article className="widget widget--weather" aria-label="Погодная подсказка для прогулки с питомцем">
      {isLoading ? (
        <div className="widget__skeleton" aria-live="polite" aria-busy="true">
          <div className="skeleton-line skeleton-line--short" />
          <div className="skeleton-line" />
          <div className="skeleton-line skeleton-line--short" />
        </div>
      ) : null}

      {!isLoading ? (
        <>
          <p className="widget__label">Погода для прогулки</p>

          <div className="widget__head">
            <p className="widget__place">{location}</p>
            <p className="widget__temp">{temperatureText}</p>
          </div>

          <p className="widget__condition">{weatherState.condition}</p>
          <p className="widget__advice">{weatherState.advice}</p>

          {isError ? (
            <p className="widget__status" aria-live="polite">
              Не удалось загрузить погоду, показываем базовую рекомендацию.
            </p>
          ) : null}

          {isEmpty ? (
            <p className="widget__status" aria-live="polite">
              Данные погоды временно недоступны.
            </p>
          ) : null}
        </>
      ) : null}
    </article>
  )
}

export default WeatherWidget
