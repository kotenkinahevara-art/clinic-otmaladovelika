import { useCallback, useEffect, useState } from 'react'

const cache = new Map()

function useRemoteJson(url, fallbackData) {
  const [data, setData] = useState(() => cache.get(url) ?? fallbackData)
  const [isLoading, setIsLoading] = useState(!cache.has(url))
  const [isError, setIsError] = useState(false)

  const load = useCallback(async () => {
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
  }, [url, fallbackData])

  useEffect(() => {
    if (!cache.has(url)) {
      load()
    }
  }, [url, load])

  return { data, isLoading, isError, reload: load }
}

export default useRemoteJson
