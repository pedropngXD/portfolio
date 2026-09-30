import { useEffect, useState } from 'react'

export default function HomeIndicator({ onClick, title }) {
  const [isLight, setIsLight] = useState(false)

  useEffect(() => {
    const checkTheme = () => {
      const container = document.querySelector('[data-theme]')
      if (container) {
        setIsLight(container.getAttribute('data-theme') === 'light')
      }
    }
    checkTheme()
    const observer = new MutationObserver(checkTheme)
    const container = document.querySelector('[data-theme]')
    if (container) observer.observe(container, { attributes: true })
    return () => observer.disconnect()
  }, [])

  return (
    <footer
      className="w-full flex flex-col items-center justify-end flex-shrink-0 touch-none mt-auto z-40"
      style={{ paddingTop: '16px', paddingBottom: '20px' }}
    >
      <button
        type="button"
        onClick={(e) => {
          if (e) e.stopPropagation();
          if (onClick) onClick();
        }}
        title={title}
        style={{
          background: isLight ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.7)'
        }}
        className="w-[130px] h-[4.5px] active:scale-95 rounded-full transition-all cursor-pointer border-none"
      />
    </footer>
  )
}
