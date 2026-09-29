import { useRef } from 'react'
import SystemIcon from '../SystemIcon'
import { SECTIONS } from '../../data/sections'

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
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[25px] flex flex-col justify-between py-6 px-0 animate-fadeIn select-none"
      onClick={onDismiss}
    >
      {/* ========================================================
          ESPAÇO SUPERIOR (No iOS, o topo é limpo)
          ======================================================== */}
      <div className="w-full h-12 flex items-center justify-end px-6">
        {openAppIds.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              onCloseAll()
            }}
            className="text-[11px] px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all font-medium backdrop-blur-md"
          >
            {isEn ? 'Clear All' : 'Limpar Tudo'}
          </button>
        )}
      </div>

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
        className="flex-1 flex items-center overflow-x-auto gap-6 px-10 snap-x snap-mandatory scroll-smooth no-scrollbar cursor-grab active:cursor-grabbing touch-pan-x"
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

            return (
              <div
                key={appId}
                className="flex-shrink-0 w-[72vw] max-w-[300px] h-[68vh] snap-center flex flex-col items-center group relative"
              >
                {/* Ícone e Nome do App (Flutuando Acima do Card) */}
                <div className="flex items-center gap-2 mb-3 w-full justify-center opacity-90 group-hover:opacity-100 transition-opacity">
                  <SystemIcon
                    type={section.iconType}
                    size={24}
                    color={section.accentColor || '#38bdf8'}
                  />
                  <span className="text-white text-[15px] font-semibold tracking-wide drop-shadow-md truncate max-w-[80%]">
                    {title}
                  </span>
                </div>

                {/* Corpo do Card (Snapshot real do app) */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation()
                    onSelectApp(appId)
                  }}
                  className={`relative w-full h-[88%] overflow-hidden rounded-[36px] text-left transition-all duration-300 cursor-pointer shadow-[0_15px_45px_rgba(0,0,0,0.6)] ${
                    isActive ? 'scale-100 ring-[1.5px] ring-white/15' : 'scale-[0.96] opacity-90 hover:scale-100'
                  } ${theme === 'light' ? 'bg-slate-50' : 'bg-slate-950'}`}
                >
                  {/* Botão de Fechar (Substituto para o swipe up do iOS) */}
                  <div
                    data-close-btn
                    onClick={(e) => {
                      e.stopPropagation()
                      onCloseApp(appId)
                    }}
                    title={isEn ? 'Close tab' : 'Fechar aba'}
                    className="absolute top-4 right-4 w-7 h-7 rounded-full bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:bg-red-500/90 transition-colors z-20 shadow-lg"
                  >
                    <span className="text-[10px] font-bold">✕</span>
                  </div>

                  {renderContentForSection ? (
                    <div
                      className="absolute top-0 left-0 w-[125%] h-[130%] origin-top-left pointer-events-none select-none pt-12 px-7 sm:px-10 flex flex-col items-center"
                      style={{ transform: 'scale(0.8)' }}
                    >
                      <div className="w-full max-w-[350px] sm:max-w-[400px] flex flex-col">
                        {renderContentForSection(appId)}
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full bg-gradient-to-b from-slate-800 to-slate-900" />
                  )}
                </button>
              </div>
            )
          })
        )}
      </div>

      {/* ========================================================
          HOME BAR INFERIOR (RETORNAR À TELA DE INÍCIO)
          ======================================================== */}
      <footer className="w-full flex flex-col items-center justify-center pb-2 pt-4 h-10">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onDismiss()
          }}
          className="w-36 h-1.5 bg-white/70 hover:bg-white active:scale-95 rounded-full transition-all cursor-pointer"
        />
      </footer>
    </div>
  )
}
