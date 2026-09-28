import { useState, useEffect } from 'react'

export default function Clock({ lang = 'pt', className = '' }) {
  const [time, setTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const locale = lang === 'pt' ? 'pt-BR' : 'en-US'
      const formatted = new Intl.DateTimeFormat(locale, {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      }).format(now)

      setTime(formatted.replace(/\./g, ''))
    }

    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [lang])

  return (
    <time className={className} dateTime={new Date().toISOString()}>
      {time || '--:--'}
    </time>
  )
}
