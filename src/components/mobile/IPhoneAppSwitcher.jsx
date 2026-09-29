import { useRef, useState } from 'react'
import SystemIcon from '../SystemIcon'

import { SECTIONS } from '../../data/sections'
import HomeIndicator from './HomeIndicator'
import styles from './IPhone.module.css'

export default function IPhoneAppSwitcher({
  openAppIds = [],
  activeAppId,
  onSelectApp,
  onCloseApp,
  onCloseAll,
  onDismiss,
  renderContentForSection,
  theme = 'dark',
  lang = 'pt',
  t
}) {
  const isEn = lang === 'en'
  const carouselRef = useRef(null)
  const isDraggingCarouselRef = useRef(false)
  const startXRef = useRef(0)
  const scrollLeftRef = useRef(0)

  const handleCarouselPointerDown = (e) => {
    // Não arrasta se clicar no botão de fechar aba ou na header
    const isCloseBtn = e.target.closest('[data-close-btn]')
    const isHeaderBtn = e.target.closest('header')
    if (isCloseBtn || isHeaderBtn) return

    isDraggingCarouselRef.current = false
    startXRef.current = e.clientX
    scrollLeftRef.current = carouselRef.current ? carouselRef.current.scrollLeft : 0

    const onPointerMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - startXRef.current
      if (Math.abs(deltaX) > 5) {
        isDraggingCarouselRef.current = true
      }
      if (isDraggingCarouselRef.current && carouselRef.current) {
        carouselRef.current.scrollLeft = scrollLeftRef.current - deltaX
      }
    }

    const onPointerUp = () => {
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      window.removeEventListener('pointercancel', onPointerUp)
      setTimeout(() => {
        isDraggingCarouselRef.current = false
      }, 50)
    }

    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    window.addEventListener('pointercancel', onPointerUp)
  }

  return (
    <div 
      className="absolute inset-0 z-50 bg-black/60 backdrop-blur-[25px] flex flex-col justify-between pt-6 pb-0 px-0 animate-fadeIn select-none"
      onClick={onDismiss}
    >
      {/* ========================================================
          ESPAÇO SUPERIOR (No iOS, o topo é limpo)
          ======================================================== */}
      <div className="w-full h-8" />

      {/* ========================================================
          CARROSSEL DESLIZÁVEL DE CARDS (APP SWITCHER iOS)
          ======================================================== */}
      <div
        ref={carouselRef}
        onPointerDown={handleCarouselPointerDown}
        onClickCapture={(e) => {
          if (isDraggingCarouselRef.current) {
            e.preventDefault()
            e.stopPropagation()
          }
        }}
        className={`flex-1 flex items-center overflow-x-auto gap-6 px-10 snap-x snap-mandatory scroll-smooth no-scrollbar cursor-grab active:cursor-grabbing touch-pan-x ${
          openAppIds.length === 1 ? 'justify-center' : ''
        }`}
        onClick={(e) => e.stopPropagation()} // Evita fechar ao clicar na área do carrossel vazio
      >
        {openAppIds.length === 0 ? (
          <div className="w-full h-full flex flex-col items-center justify-center text-center text-white/60 gap-3" onClick={onDismiss}>
            <span className="text-lg font-medium tracking-wide">
              {isEn ? 'No Recent Apps' : 'Nenhum App Recente'}
            </span>
          </div>
        ) : (
          openAppIds.map((appId) => {
            const section = SECTIONS.find((s) => s.id === appId) || {
              id: appId,
              title: appId,
              iconType: 'folder'
            }
            const title = t?.sections?.[appId]?.title || section.title
            const isActive = appId === activeAppId
            const APP_GRADIENTS = {
              readme: 'linear-gradient(180deg, #ffd60a 0%, #f59e0b 100%)',
              resume: 'linear-gradient(180deg, #ff453a 0%, #d70015 100%)',
              about: 'linear-gradient(180deg, #6366f1 0%, #4338ca 100%)',
              stack: 'linear-gradient(180deg, #30d158 0%, #15803d 100%)',
              experience: 'linear-gradient(180deg, #32d74b 0%, #28cd41 100%)',
              projects: 'linear-gradient(180deg, #0a84ff 0%, #007aff 100%)',
              education: 'linear-gradient(180deg, #bf5af2 0%, #af52de 100%)',
              contact: 'linear-gradient(180deg, #64d2ff 0%, #5ac8fa 100%)'
            }
            const gradient = APP_GRADIENTS[section.id] || 'linear-gradient(180deg, #007aff 0%, #0051ba 100%)'
            
            return (
              <SwipeableCard
                key={appId}
                appId={appId}
                section={section}
                title={title}
                isActive={isActive}
                gradient={gradient}
                theme={theme}
                isEn={isEn}
                onSelectApp={onSelectApp}
                onCloseApp={onCloseApp}
                renderContentForSection={renderContentForSection}
              />
            )
          })
        )}
      </div>

      {/* ========================================================
          HOME BAR INFERIOR (RETORNAR À TELA DE INÍCIO) E LIMPAR TUDO
          ======================================================== */}
            {/* Botao Limpar Tudo (Proporcao de pill nativa do iOS) */}
      {openAppIds.length > 1 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onCloseAll()
          }}
          className="absolute bottom-[4.5rem] left-1/2 -translate-x-1/2 px-7 py-2.5 rounded-[9999px] bg-[#3a3a3c] border border-[#545456] text-white hover:bg-[#4a4a4c] active:scale-95 text-[13px] font-semibold tracking-wide transition-all z-50 shadow-[0_8px_16px_rgba(0,0,0,0.5)] whitespace-nowrap"
        >
          {isEn ? 'Clear All' : 'Limpar Tudo'}
        </button>
      )}

      {/* HOME INDICATOR (COMPONENTE PADRAO) */}
      <HomeIndicator 
        onClick={onDismiss} 
        title={isEn ? 'Close App Switcher' : 'Fechar Multitarefa'} 
      />
    </div>
  )
}
function SwipeableCard({ appId, section, title, isActive, gradient, theme, isEn, onSelectApp, onCloseApp, renderContentForSection }) {
  const [offsetY, setOffsetY] = useState(0)
  const [isSwipingOut, setIsSwipingOut] = useState(false)
  const startYRef = useRef(0)
  const currentYRef = useRef(0)

  const handlePointerDown = (e) => {
    // Only drag with touch or left mouse button
    if (e.pointerType === 'mouse' && e.button !== 0) return
    const isCloseBtn = e.target.closest('[data-close-btn]')
    if (isCloseBtn) return
    
    startYRef.current = e.clientY
    currentYRef.current = 0
    
    const handlePointerMove = (moveEvent) => {
      const deltaY = moveEvent.clientY - startYRef.current
      if (deltaY < 0) { // Only swipe UP
        currentYRef.current = deltaY
        setOffsetY(deltaY)
      }
    }
    
    const handlePointerUp = () => {
      window.removeEventListener('pointermove', handlePointerMove)
      window.removeEventListener('pointerup', handlePointerUp)
      window.removeEventListener('pointercancel', handlePointerUp)
      
      if (currentYRef.current < -100) {
        setIsSwipingOut(true)
        setTimeout(() => onCloseApp(appId), 250)
      } else {
        setOffsetY(0)
      }
    }
    
    window.addEventListener('pointermove', handlePointerMove)
    window.addEventListener('pointerup', handlePointerUp)
    window.addEventListener('pointercancel', handlePointerUp)
  }

  if (isSwipingOut) {
    return (
      <div className="flex-shrink-0 w-[72vw] max-w-[300px] h-[68vh] snap-center transition-all duration-300 opacity-0 -translate-y-full" />
    )
  }

  return (
    <div
      className="flex-shrink-0 w-[72vw] max-w-[300px] h-[68vh] snap-center flex flex-col items-center group relative transition-transform duration-100"
      style={{ transform: `translateY(${offsetY}px)` }}
      onPointerDown={handlePointerDown}
    >
      <div className="flex items-center gap-2.5 mb-3 w-full justify-center opacity-90 group-hover:opacity-100 transition-opacity">
        <div
          className="flex items-center justify-center shadow-sm flex-shrink-0"
          style={{ width: '28px', height: '28px', borderRadius: '22.5%', background: gradient }}
        >
          <SystemIcon type={section.iconType} size={18} color="#ffffff" />
        </div>
        <span className="text-white text-[15px] font-semibold tracking-wide drop-shadow-md truncate max-w-[75%]">
          {title}
        </span>
      </div>
      <button
        type="button"
        onClick={(e) => {
          if (Math.abs(currentYRef.current) > 10) return
          e.stopPropagation()
          onSelectApp(appId)
        }}
        className={`relative w-full h-[88%] overflow-hidden rounded-[36px] text-left transition-all duration-300 cursor-pointer shadow-[0_15px_45px_rgba(0,0,0,0.6)] ${isActive ? 'scale-100 ring-[1.5px] ring-white/15' : 'scale-[0.96] opacity-90 hover:scale-100'} ${theme === 'light' ? 'bg-slate-50' : 'bg-slate-950'}`}
      >
        <div
          data-close-btn
          onClick={(e) => {
            e.stopPropagation()
            setIsSwipingOut(true)
            setTimeout(() => onCloseApp(appId), 250)
          }}
          title={isEn ? 'Close tab' : 'Fechar aba'}
          className="absolute top-4 right-4 w-7 h-7 rounded-full bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-red-500/90 transition-colors z-20 shadow-lg"
        >
          <span className="text-[10px] font-bold">✕</span>
        </div>
        {renderContentForSection ? (
          <div className="absolute top-0 left-0 w-[125%] h-[130%] origin-top-left pointer-events-none select-none pt-12 px-7 sm:px-10 flex flex-col items-center" style={{ transform: 'scale(0.8)' }}>
            <div className="w-full max-w-[350px] sm:max-w-[400px] flex flex-col flex-1">
              {renderContentForSection(appId)}
            </div>
          </div>
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-slate-800 to-slate-900" />
        )}
      </button>
    </div>
  )
}







