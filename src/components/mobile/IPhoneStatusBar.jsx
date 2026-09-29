import { useState, useEffect } from 'react'

export default function IPhoneStatusBar({
  activeAppId,
  onToggleControlCenter,
  onToggleDynamicIsland,
  isIslandExpanded
}) {
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = String(now.getHours()).padStart(2, '0')
      const minutes = String(now.getMinutes()).padStart(2, '0')
      setCurrentTime(`${hours}:${minutes}`)
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <header className="w-full h-11 px-6 flex items-center justify-between text-xs font-semibold select-none z-50 text-white relative">
      {/* Horário no canto esquerdo (padrão iPhone) */}
      <div className="w-14 text-left font-medium tracking-tight">
        <span>{currentTime || '09:41'}</span>
      </div>

      {/* Dynamic Island no centro superior */}
      <button
        type="button"
        onClick={onToggleDynamicIsland}
        aria-label="Dynamic Island"
        className={`transition-all duration-300 ease-out bg-black border border-white/10 shadow-lg rounded-full flex items-center justify-between px-3 cursor-pointer ${
          isIslandExpanded
            ? 'w-48 h-8 scale-105'
            : activeAppId
            ? 'w-32 h-7'
            : 'w-24 h-6'
        }`}
      >
        {/* Sensor de câmera frontal */}
        <span className="w-2.5 h-2.5 rounded-full bg-neutral-900 border border-neutral-700/60 flex items-center justify-center">
          <span className="w-1 h-1 rounded-full bg-blue-950" />
        </span>

        {/* Indicador de status no interior da ilha */}
        {isIslandExpanded ? (
          <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 animate-pulse">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            pedroOS 2.0
          </span>
        ) : activeAppId ? (
          <span className="text-[9px] text-neutral-300 font-mono flex items-center gap-1 truncate max-w-[65px]">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-ping" />
            {activeAppId}
          </span>
        ) : (
          <span className="w-1.5 h-1.5 rounded-full bg-neutral-800" />
        )}

        {/* Câmera TrueDepth direita */}
        <span className="w-2 h-2 rounded-full bg-neutral-900 border border-neutral-800" />
      </button>

      {/* Ícones de sinal, Wi-Fi e Bateria no canto direito (clique abre Central de Controle) */}
      <button
        type="button"
        onClick={onToggleControlCenter}
        title="Abrir Central de Controle"
        className="w-14 flex items-center justify-end gap-1.5 cursor-pointer text-white/90 hover:text-white transition-opacity"
      >
        {/* Sinal de Celular */}
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <rect x="2" y="16" width="3" height="6" rx="1" />
          <rect x="7" y="12" width="3" height="10" rx="1" />
          <rect x="12" y="8" width="3" height="14" rx="1" />
          <rect x="17" y="4" width="3" height="18" rx="1" />
        </svg>

        {/* Wi-Fi */}
        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
          <path d="M12 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0-5c-2.8 0-5.3 1.1-7.1 2.9l1.4 1.4C7.7 15.9 9.7 15 12 15s4.3.9 5.7 2.3l1.4-1.4C17.3 14.1 14.8 13 12 13zm0-5C7.6 8 3.6 9.8.7 12.7l1.4 1.4C4.5 11.7 8 10 12 10s7.5 1.7 9.9 4.1l1.4-1.4C20.4 9.8 16.4 8 12 8z" />
        </svg>

        {/* Bateria com cápsula e pino */}
        <div className="flex items-center">
          <div className="w-5 h-2.5 rounded-[4px] border border-white/80 p-0.5 flex items-center">
            <div className="w-full h-full bg-emerald-400 rounded-[2px]" />
          </div>
          <div className="w-0.5 h-1 bg-white/80 rounded-r-sm -ml-[0.5px]" />
        </div>
      </button>
    </header>
  )
}
