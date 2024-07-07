import { useCallback, useEffect, useState } from 'react'

export default function useCountdown(seconds: number, initialSeconds = seconds) {
  const [countdown, setCountdown] = useState(initialSeconds)

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => (prev <= 0 ? 0 : prev - 1))
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const resetCountdown = useCallback(() => setCountdown(seconds), [seconds])

  return [countdown, resetCountdown] as const
}
