import { useRef, useState } from 'react'
import SystemIcon from '../SystemIcon'
import { SECTIONS } from '../../data/sections'
import styles from './IPhone.module.css'

export default function IPhoneAppSheet({
  appId,
  onClose,
  onOpenAppSwitcher,
  renderContentForSection,
  openAppsCount = 1,
  theme = 'dark',
  onToggleTheme,
  lang = 'pt',
  t
}) {
  const isEn = lang === 'en'
  const section = SECTIONS.find((s) => s.id === appId) || {
    id: appId,
    title: appId,
    iconType: 'folder'
  }
  const title = t?.sections?.[appId]?.title || section.title

  // Estado para suporte a arrastar a folha (drag-to-dismiss iOS tanto via touch quanto mouse)
  const [dragOffsetY, setDragOffsetY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const pointerStartYRef = useRef(0)

  const handlePointerDown = (e) => {
    if (e.target.closest('button')) return
    pointerStartYRef.current = e.clientY
    setIsDragging(true)

    const onPointerMove = (moveEvent) => {
      const deltaY = moveEvent.clientY - pointerStartYRef.current
      if (deltaY > 0) {
        setDragOffsetY(deltaY)
      }
    }

    const onPointerUp = (upEvent) => {
      setIsDragging(false)
      const finalDelta = upEvent.clientY - pointerStartYRef.current
      if (finalDelta > 80) {
        onClose()
      }
      setDragOffsetY(0)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
    }

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
  }

  return (
    <div
      className={`fixed inset-0 z-40 flex flex-col justify-end transition-transform duration-150 ease-out ${styles.sheetContainer}`}
      style={{
        transform: `translateY(${dragOffsetY}px)`
      }}
    >
      {/* Background Backdrop escuro com gradiente progressivo e transição suave */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/55 to-black/35 ${styles.sheetBackdrop} -z-10`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Conteúdo da Folha Modal do App (Bottom Sheet iOS) */}
      <div
        className={`w-full h-[94dvh] rounded-t-[36px] shadow-[0_-12px_40px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden backdrop-blur-2xl transition-colors duration-200 ${
          theme === 'light'
            ? 'bg-slate-50/98 text-slate-900 border-t border-black/10'
            : 'bg-slate-900/95 dark:bg-slate-950/95 text-slate-100 border-t border-white/20'
        }`}
      >
        {/* ========================================================
            BARRA DE ARRASTO SUPERIOR (GRAB HANDLE iOS)
            ======================================================== */}
        <div
          className="w-full pt-3 pb-1 cursor-grab active:cursor-grabbing flex flex-col items-center select-none"
          onPointerDown={handlePointerDown}
        >
          <div
            className={`w-12 h-1.5 rounded-full transition-colors ${
              theme === 'light' ? 'bg-black/25 hover:bg-black/40' : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        </div>

        {/* ========================================================
            BARRA DE NAVEGAÇÃO SUPERIOR DO APP (iOS NAVBAR EQUILIBRADA)
            ======================================================== */}
        <header
          className={`w-full h-14 px-5 relative flex items-center justify-between border-b select-none cursor-grab active:cursor-grabbing flex-shrink-0 ${
            theme === 'light' ? 'border-black/10' : 'border-white/10'
          }`}
          onPointerDown={handlePointerDown}
        >
          {/* Esquerda: Botão de voltar para a Home Screen com chevron SVG */}
          <button
            type="button"
            onClick={onClose}
            className={`flex items-center gap-1 font-semibold text-sm transition-all cursor-pointer py-1.5 px-2 -ml-2 rounded-xl z-10 ${
              theme === 'light'
                ? 'text-sky-600 hover:text-sky-700 active:bg-black/5'
                : 'text-sky-400 hover:text-sky-300 active:bg-white/10'
            }`}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="flex-shrink-0"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span>{isEn ? 'Home' : 'Início'}</span>
          </button>

          {/* Centro: Título do app matematicamente centralizado na tela */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-2 max-w-[50%] truncate pointer-events-none z-0">
            <SystemIcon
              type={section.iconType}
              size={18}
              color={section.accentColor || '#38bdf8'}
            />
            <h1 className={`font-bold text-sm truncate ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>{title}</h1>
          </div>

          {/* Direita: Controles circulares uniformes e perfeitamente alinhados */}
          <div className="flex items-center gap-2 z-10">
            {onToggleTheme && (
              <button
                type="button"
                onClick={onToggleTheme}
                title={
                  theme === 'dark'
                    ? isEn
                      ? 'Switch to Light Mode'
                      : 'Modo Claro'
                    : isEn
                    ? 'Switch to Dark Mode'
                    : 'Modo Escuro'
                }
                className={`w-8 h-8 rounded-full active:scale-90 flex items-center justify-center text-xs transition-all cursor-pointer border shadow-sm ${
                  theme === 'light'
                    ? 'bg-black/5 hover:bg-black/10 text-slate-800 border-black/10'
                    : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
                }`}
              >
                <span>{theme === 'dark' ? '☀️' : '🌙'}</span>
              </button>
            )}

            <button
              type="button"
              onClick={onOpenAppSwitcher}
              title={isEn ? 'Tabs / Multitask' : 'Abas / Multitarefa'}
              className={`w-8 h-8 rounded-full active:scale-90 flex items-center justify-center text-xs font-bold transition-all cursor-pointer border shadow-sm ${
                theme === 'light'
                  ? 'bg-black/5 hover:bg-black/10 text-slate-800 border-black/10'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/10'
              }`}
            >
              <span>{openAppsCount}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              title={isEn ? 'Close app' : 'Fechar app'}
              className={`w-8 h-8 rounded-full active:scale-90 flex items-center justify-center text-xs font-bold transition-all cursor-pointer border shadow-sm ${
                theme === 'light'
                  ? 'bg-black/5 hover:bg-black/10 text-slate-700 hover:text-slate-900 border-black/10'
                  : 'bg-white/10 hover:bg-white/20 text-white/80 hover:text-white border-white/10'
              }`}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </header>

        {/* ========================================================
            CORPO ROLÁVEL COM O COMPONENTE DO APP
            ======================================================== */}
        <main className="flex-1 overflow-y-auto px-6 py-6 sm:px-8 pb-24 overscroll-contain">
          {renderContentForSection && renderContentForSection(appId)}
        </main>

        {/* ========================================================
            HOME INDICATOR BAR INFERIOR (DESLIZÁVEL)
            ======================================================== */}
        <footer className="w-full py-2.5 flex flex-col items-center border-t border-white/5 bg-slate-950/70 backdrop-blur-md flex-shrink-0">
          <button
            type="button"
            onClick={onClose}
            title={isEn ? 'Swipe or tap to go home' : 'Deslize ou toque para início'}
            className="w-32 h-1 bg-white/70 hover:bg-white active:scale-95 rounded-full transition-all cursor-pointer"
          />
        </footer>
      </div>
    </div>
  )
}

