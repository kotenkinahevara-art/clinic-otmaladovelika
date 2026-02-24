import { useCallback, useEffect, useState } from 'react'

const cache = new Map()

function useRemoteJson(url, fallbackData, options = {}) {
  const { enabled = true } = options
  const [data, setData] = useState(() => cache.get(url) ?? fallbackData)
  const [isLoading, setIsLoading] = useState(enabled && !cache.has(url))
  const [isError, setIsError] = useState(false)

  const load = useCallback(async () => {
    if (!enabled || !url) {
      setData(fallbackData)
      setIsLoading(false)
      setIsError(false)
      return
    }

    try {
      setIsLoading(true)
      setIsError(false)

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`)
      }

      const payload = await response.json()
      cache.set(url, payload)
      setData(payload)
    } catch {
      setIsError(true)
      setData((prev) => (prev === undefined ? fallbackData : prev))
    } finally {
      setIsLoading(false)
    }
  }, [url, fallbackData, enabled])

  useEffect(() => {
    if (!enabled || !url) {
      setData(fallbackData)
      setIsLoading(false)
      setIsError(false)
      return
    }

    if (!cache.has(url)) {
      load()
    }
  }, [url, load, fallbackData, enabled])

  return { data, isLoading, isError, reload: load }
}

export default useRemoteJson
