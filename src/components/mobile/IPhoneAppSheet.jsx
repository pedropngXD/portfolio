import { useRef, useState } from 'react'
import SystemIcon from '../SystemIcon'
import { SECTIONS } from '../../data/sections'
import { playWindowMinimize } from '../../utils/soundEffects'
import styles from './IPhone.module.css'
import HomeIndicator from './HomeIndicator'

export default function IPhoneAppSheet({
  appId,
  onClose,
  renderContentForSection,
  theme = 'dark',
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

  // Estado para suporte a arrastar a gaveta para baixo (drag-to-dismiss iOS nativo)
  const [dragOffsetY, setDragOffsetY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isClosing, setIsClosing] = useState(false)

  const pointerStartYRef = useRef(0)
  const lastYRef = useRef(0)
  const lastTimeRef = useRef(0)
  const velocityYRef = useRef(0)

  // ========================================================
  // ROLAGEM ARRASTÁVEL COM INÉRCIA MOBILE (DRAG-TO-SCROLL & PULL-TO-DISMISS)
  // Permite arrastar o conteúdo para cima/baixo tanto via Touch quanto Mouse
  // ========================================================
  const scrollRef = useRef(null)
  const isInteractingScrollRef = useRef(false)
  const isDraggingScrollRef = useRef(false)
  const scrollStartYRef = useRef(0)
  const initialScrollTopRef = useRef(0)
  const scrollLastYRef = useRef(0)
  const scrollLastTimeRef = useRef(0)
  const scrollVelocityRef = useRef(0)
  const momentumRafRef = useRef(null)
  const isPullingDownSheetRef = useRef(false)

  // Encerramento suave com animação de descida e som de fechamento
  const handleDismiss = () => {
    if (isClosing) return
    setIsClosing(true)
    playWindowMinimize()
    setTimeout(() => {
      onClose()
    }, 220)
  }

  // Início do arraste pela barra de pegada (grab handle) ou header
  const handlePointerDown = (e) => {
    if (e.target.closest('button')) return

    pointerStartYRef.current = e.clientY
    lastYRef.current = e.clientY
    lastTimeRef.current = Date.now()
    velocityYRef.current = 0
    setIsDragging(true)

    const onPointerMove = (moveEvent) => {
      const currentY = moveEvent.clientY
      const now = Date.now()
      const dt = now - lastTimeRef.current
      if (dt > 0) {
        velocityYRef.current = (currentY - lastYRef.current) / dt
      }
      lastYRef.current = currentY
      lastTimeRef.current = now

      const deltaY = currentY - pointerStartYRef.current
      if (deltaY > 0) {
        setDragOffsetY(deltaY)
      } else {
        // Resistência elástica ao tentar puxar para cima além do limite
        setDragOffsetY(deltaY * 0.12)
      }
    }

    const onPointerUp = (upEvent) => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerUp)

      setIsDragging(false)
      const finalDelta = upEvent.clientY - pointerStartYRef.current
      const velocity = velocityYRef.current

      // Fecha se puxou mais de 85px OU se realizou um gesto rápido de "flick" para baixo
      if (finalDelta > 85 || (velocity > 0.4 && finalDelta > 25)) {
        handleDismiss()
      } else {
        setDragOffsetY(0)
      }
    }

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointercancel', onPointerUp)
  }

  // Arraste do conteúdo para rolar com inércia nativa mobile
  const handleContentPointerDown = (e) => {
    if (momentumRafRef.current) {
      cancelAnimationFrame(momentumRafRef.current)
      momentumRafRef.current = null
    }

    isInteractingScrollRef.current = true
    isDraggingScrollRef.current = false
    isPullingDownSheetRef.current = false

    scrollStartYRef.current = e.clientY
    initialScrollTopRef.current = scrollRef.current ? scrollRef.current.scrollTop : 0
    scrollLastYRef.current = e.clientY
    scrollLastTimeRef.current = performance.now()
    scrollVelocityRef.current = 0

    const onPointerMove = (moveEvent) => {
      if (!isInteractingScrollRef.current || !scrollRef.current) return

      const currentY = moveEvent.clientY
      const now = performance.now()
      const dt = now - scrollLastTimeRef.current
      if (dt > 0) {
        scrollVelocityRef.current = (scrollLastYRef.current - currentY) / dt
      }
      scrollLastYRef.current = currentY
      scrollLastTimeRef.current = now

      const deltaY = currentY - scrollStartYRef.current

      if (!isDraggingScrollRef.current && Math.abs(deltaY) > 4) {
        isDraggingScrollRef.current = true
      }

      if (!isDraggingScrollRef.current) return

      // Se está no topo e puxa para baixo, engaja o fechamento da gaveta
      if (initialScrollTopRef.current <= 0 && deltaY > 0) {
        isPullingDownSheetRef.current = true
        setIsDragging(true)
        setDragOffsetY(deltaY)
        return
      }

      // Caso contrário, arrasta o scroll do app
      if (!isPullingDownSheetRef.current) {
        scrollRef.current.scrollTop = initialScrollTopRef.current - deltaY
      }
    }

    const onPointerUp = (upEvent) => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerUp)

      isInteractingScrollRef.current = false

      if (isPullingDownSheetRef.current) {
        isPullingDownSheetRef.current = false
        setIsDragging(false)
        const finalDelta = upEvent.clientY - scrollStartYRef.current
        if (finalDelta > 85 || (scrollVelocityRef.current < -0.4 && finalDelta > 25)) {
          handleDismiss()
        } else {
          setDragOffsetY(0)
        }
        return
      }

      // Aplica desaceleração suave/inércia mobile
      if (isDraggingScrollRef.current && scrollRef.current) {
        let vel = scrollVelocityRef.current
        vel = Math.max(-2.8, Math.min(2.8, vel))

        if (Math.abs(vel) > 0.06) {
          const stepMomentum = () => {
            if (!scrollRef.current || isInteractingScrollRef.current) return
            scrollRef.current.scrollTop += vel * 15
            vel *= 0.94

            if (Math.abs(vel) > 0.02) {
              momentumRafRef.current = requestAnimationFrame(stepMomentum)
            } else {
              momentumRafRef.current = null
            }
          }
          momentumRafRef.current = requestAnimationFrame(stepMomentum)
        }
      }

      if (isDraggingScrollRef.current) {
        setTimeout(() => {
          isDraggingScrollRef.current = false
        }, 80)
      }
    }

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointercancel', onPointerUp)
  }

  return (
    <div className="fixed inset-0 z-40 flex flex-col justify-end overflow-hidden select-none pointer-events-auto">
      {/* Background Backdrop escuro com blur: permanece fixo e desvanece na medida do arraste */}
      <div
        className="absolute inset-0 bg-black/65 backdrop-blur-xl -z-10"
        style={{
          opacity: isClosing ? 0 : Math.max(0, 1 - Math.max(0, dragOffsetY) / 320),
          transition: isDragging ? 'none' : 'opacity 0.25s ease'
        }}
        onClick={handleDismiss}
        aria-hidden="true"
      />

      {/* Conteúdo da Gaveta Modal (Bottom Sheet iOS com rastreamento 1:1) */}
      <div
        className={`w-full h-[94dvh] rounded-t-[36px] shadow-[0_-12px_40px_rgba(0,0,0,0.6)] flex flex-col overflow-hidden backdrop-blur-2xl transition-colors duration-200 ${
          theme === 'light'
            ? 'bg-slate-50/98 text-slate-900 border-t border-black/10'
            : 'bg-slate-900/95 dark:bg-slate-950/95 text-slate-100 border-t border-white/20'
        } ${!isDragging && !isClosing && dragOffsetY === 0 ? styles.sheetContainer : ''}`}
        style={{
          transform: isClosing
            ? 'translate3d(0, 100%, 0)'
            : `translate3d(0, ${Math.max(0, dragOffsetY)}px, 0)`,
          transition: isDragging
            ? 'none'
            : 'transform 0.25s cubic-bezier(0.2, 0.9, 0.4, 1)'
        }}
      >
        {/* ========================================================
            BARRA DE ARRASTO SUPERIOR (GRAB HANDLE iOS)
            Área de toque ampla (44px de altura) com touch-action: none
            ======================================================== */}
        <div
          className="w-full pt-3 pb-2 cursor-grab active:cursor-grabbing flex flex-col items-center select-none touch-none"
          onPointerDown={handlePointerDown}
        >
          <div
            className={`w-12 h-1.5 rounded-full transition-colors ${
              theme === 'light' ? 'bg-black/25 hover:bg-black/40' : 'bg-white/40 hover:bg-white/60'
            }`}
          />
        </div>

        {/* ========================================================
            BARRA DE NAVEGAÇÃO SUPERIOR DO APP (DESIGN SYSTEM pedroOS)
            ======================================================== */}
        <header
          className={`w-full h-14 px-4 relative flex items-center justify-between border-b select-none cursor-grab active:cursor-grabbing flex-shrink-0 touch-none ${
            theme === 'light' ? 'border-black/10' : 'border-white/10'
          }`}
          onPointerDown={handlePointerDown}
        >
          {/* Esquerda: Botão de voltar (padrão nativo iOS) */}
          <button
            type="button"
            onClick={handleDismiss}
            className="flex items-center text-blue-500 hover:text-blue-400 hover:opacity-80 transition-all font-medium text-[17px] select-none"
            style={{ marginLeft: '12px' }}
            title={isEn ? 'Back' : 'Voltar'}
            aria-label={isEn ? 'Back' : 'Voltar'}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span className="ml-0.5">{isEn ? 'Back' : 'Voltar'}</span>
          </button>

          {/* Centro: Título do app matematicamente centralizado na tela */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-2 max-w-[60%] truncate pointer-events-none z-0">
            <SystemIcon
              type={section.iconType}
              size={18}
              color={section.accentColor || '#38bdf8'}
            />
            <h1 className={`font-bold text-sm truncate ${theme === 'light' ? 'text-slate-900' : 'text-white'}`}>
              {title}
            </h1>
          </div>

          {/* Direita: Espaçador equilibrado para manter o título perfeitamente centralizado */}
          <div className="w-[36px] mr-[0.65rem] flex-shrink-0 pointer-events-none" aria-hidden="true" />
        </header>

        {/* ========================================================
            CORPO ROLÁVEL COM O COMPONENTE DO APP
            ======================================================== */}
        <main
          ref={scrollRef}
          onPointerDown={handleContentPointerDown}
          onClickCapture={(e) => {
            if (isDraggingScrollRef.current) {
              e.preventDefault()
              e.stopPropagation()
            }
          }}
          className="flex-1 overflow-y-auto px-7 sm:px-10 pt-20 sm:pt-24 pb-8 overscroll-contain select-none cursor-grab active:cursor-grabbing touch-pan-y flex flex-col items-center"
          style={{
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <div className="w-full max-w-[350px] sm:max-w-[400px] flex flex-col flex-1">
            {renderContentForSection && renderContentForSection(appId)}
          </div>
        </main>

        {/* ========================================================
            HOME INDICATOR BAR INFERIOR (DESLIZÁVEL / TOQUE)
            ======================================================== */}
                  {/* ========================================================
              HOME INDICATOR BAR (COMPONENTE PADRAO)
              ======================================================== */}
          <div className="w-full border-t border-white/5 bg-slate-950/70 backdrop-blur-md mt-auto">
            <HomeIndicator 
              onClick={handleDismiss} 
              title={isEn ? 'Swipe or tap to go home' : 'Deslize ou toque para incio'} 
            />
          </div>
      </div>
    </div>
  )
}



