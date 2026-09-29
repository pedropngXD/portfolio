import { useRef, useState } from 'react'
import SystemIcon from '../SystemIcon'
import { SECTIONS } from '../../data/sections'

export default function IPhoneAppSheet({
  appId,
  onClose,
  onOpenAppSwitcher,
  renderContentForSection,
  openAppsCount = 1,
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

  // Estado para suporte a arrastar a folha (drag-to-dismiss iOS)
  const [dragOffsetY, setDragOffsetY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const touchStartYRef = useRef(0)

  const handleTouchStart = (e) => {
    // Permite arrastar apenas se iniciar no cabeçalho ou na barra de navegação superior
    touchStartYRef.current = e.touches[0].clientY
    setIsDragging(true)
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    const currentY = e.touches[0].clientY
    const deltaY = currentY - touchStartYRef.current
    // Permite apenas arrastar para baixo (deslocamento positivo)
    if (deltaY > 0) {
      setDragOffsetY(deltaY)
    }
  }

  const handleTouchEnd = () => {
    if (!isDragging) return
    setIsDragging(false)
    // Se arrastou para baixo mais de 90px, fecha o app voltando para a Home
    if (dragOffsetY > 90) {
      onClose()
    }
    setDragOffsetY(0)
  }

  return (
    <div
      className="fixed inset-0 z-40 flex flex-col justify-end transition-transform duration-200 ease-out"
      style={{
        transform: `translateY(${dragOffsetY}px)`
      }}
    >
      {/* Background Backdrop escuro com efeito de profundidade */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm -z-10"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Conteúdo da Folha Modal do App (Bottom Sheet iOS) */}
      <div className="w-full h-[93dvh] bg-slate-900/95 dark:bg-slate-950/95 text-slate-100 rounded-t-[36px] border-t border-white/20 shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl">
        {/* ========================================================
            BARRA DE ARRASTO SUPERIOR (GRAB HANDLE iOS)
            ======================================================== */}
        <div
          className="w-full pt-3 pb-1 cursor-grab active:cursor-grabbing flex flex-col items-center select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="w-12 h-1.5 bg-white/40 rounded-full hover:bg-white/60 transition-colors" />
        </div>

        {/* ========================================================
            BARRA DE NAVEGAÇÃO SUPERIOR DO APP (iOS NAVBAR)
            ======================================================== */}
        <header
          className="w-full h-12 px-4 flex items-center justify-between border-b border-white/10 select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Botão de voltar para a Home Screen */}
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1 text-sky-400 font-semibold text-sm hover:text-sky-300 transition-colors cursor-pointer"
          >
            <span>‹</span>
            <span>{isEn ? 'Home' : 'Início'}</span>
          </button>

          {/* Título centralizado com ícone */}
          <div className="flex items-center gap-2 max-w-[180px] truncate">
            <SystemIcon
              type={section.iconType}
              size={18}
              color={section.accentColor || '#38bdf8'}
            />
            <h1 className="font-bold text-sm text-white truncate">{title}</h1>
          </div>

          {/* Botão de Abas / Multitarefa e Fechar */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onOpenAppSwitcher}
              title={isEn ? 'Tabs / Multitask' : 'Abas / Multitarefa'}
              className="w-7 h-7 rounded-lg border border-white/20 bg-white/10 text-white text-xs font-bold flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all active:scale-95"
            >
              <span>{openAppsCount}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              title={isEn ? 'Close app' : 'Fechar app'}
              className="w-7 h-7 rounded-full bg-white/10 text-white/80 hover:text-white flex items-center justify-center text-xs font-bold cursor-pointer hover:bg-white/20 transition-all active:scale-95"
            >
              ✕
            </button>
          </div>
        </header>

        {/* ========================================================
            CORPO ROLÁVEL COM O COMPONENTE DO APP
            ======================================================== */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-5 overscroll-contain">
          {renderContentForSection && renderContentForSection(appId)}
        </main>

        {/* ========================================================
            HOME INDICATOR BAR INFERIOR (DESLIZÁVEL)
            ======================================================== */}
        <footer className="w-full py-2 flex flex-col items-center border-t border-white/5 bg-slate-950/60 backdrop-blur-md">
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
