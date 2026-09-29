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
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-2xl flex flex-col justify-between py-6 px-4 animate-fadeIn select-none">
      {/* ========================================================
          CABEÇALHO DO MULTITAREFA (ABAS iOS)
          ======================================================== */}
      <header className="w-full flex items-center justify-between px-2 pt-4">
        <div>
          <h2 className="text-white font-bold text-lg tracking-tight">
            {isEn ? 'Open Apps' : 'Abas Abertas'}
          </h2>
          <p className="text-neutral-400 text-xs font-medium">
            {openAppIds.length}{' '}
            {openAppIds.length === 1
              ? isEn
                ? 'app running'
                : 'aplicativo aberto'
              : isEn
              ? 'apps running'
              : 'aplicativos abertos'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {openAppIds.length > 0 && (
            <button
              type="button"
              onClick={onCloseAll}
              className="text-xs px-3 py-1.5 rounded-[10px] bg-white/5 border border-white/10 hover:bg-white/15 text-neutral-300 hover:text-white transition-all cursor-pointer font-medium"
            >
              {isEn ? 'Close All' : 'Fechar Todos'}
            </button>
          )}

          <button
            type="button"
            onClick={onDismiss}
            className="w-8 h-8 rounded-[10px] bg-white/10 border border-white/15 hover:bg-white/20 text-white flex items-center justify-center font-bold text-sm cursor-pointer transition-transform active:scale-95"
            title={isEn ? 'Done' : 'Concluir'}
          >
            ✓
          </button>
        </div>
      </header>

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
        className="flex-1 flex items-center overflow-x-auto py-6 gap-5 snap-x snap-mandatory scroll-smooth no-scrollbar cursor-grab active:cursor-grabbing touch-pan-x"
      >
        {openAppIds.length === 0 ? (
          <div className="w-full flex flex-col items-center justify-center text-center text-neutral-400 gap-2">
            <span className="text-4xl">📱</span>
            <p className="text-sm font-medium">
              {isEn ? 'No open tabs' : 'Nenhuma aba aberta'}
            </p>
            <p className="text-xs text-neutral-500">
              {isEn ? 'Tap below to return to Home' : 'Toque abaixo para voltar ao início'}
            </p>
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
                className="flex-shrink-0 w-[78vw] max-w-[320px] h-[58vh] snap-center flex flex-col group relative"
              >
                {/* Cabeçalho do Card */}
                <div className="flex items-center justify-between px-3 py-2 bg-slate-900/90 rounded-t-2xl border-t border-x border-white/15">
                  <div className="flex items-center gap-2 truncate">
                    <SystemIcon
                      type={section.iconType}
                      size={18}
                      color={section.accentColor || '#38bdf8'}
                    />
                    <span className="text-white text-xs font-bold truncate">
                      {title}
                    </span>
                  </div>

                  {/* Botão fechar aba individual */}
                  <button
                    type="button"
                    data-close-btn
                    onClick={(e) => {
                      e.stopPropagation()
                      onCloseApp(appId)
                    }}
                    title={isEn ? 'Close tab' : 'Fechar aba'}
                    className="w-4 h-4 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 flex items-center justify-center text-[9px] text-black/50 font-bold cursor-pointer transition-colors shadow-sm"
                  >
                    ✕
                  </button>
                </div>

                {/* Corpo do Card com Miniatura & Toque para Focar */}
                <button
                  type="button"
                  onClick={() => onSelectApp(appId)}
                  className={`flex-1 w-full relative overflow-hidden rounded-b-2xl border-b border-x text-left transition-all cursor-pointer ${
                    isActive
                      ? 'border-purple-400 ring-2 ring-purple-400/40 shadow-2xl scale-[1.02]'
                      : 'border-white/15 hover:border-white/30'
                  } ${theme === 'light' ? 'bg-slate-50' : 'bg-slate-900'}`}
                >
                  {renderContentForSection ? (
                    <div
                      className="absolute top-0 left-0 w-[125%] h-[130%] origin-top-left pointer-events-none select-none pt-8 px-7 sm:px-10 flex flex-col items-center"
                      style={{ transform: 'scale(0.8)' }}
                    >
                      <div className="w-full max-w-[350px] sm:max-w-[400px] flex flex-col">
                        {renderContentForSection(appId)}
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 flex flex-col justify-between h-full bg-gradient-to-b from-slate-900 to-slate-950">
                      <div className="space-y-2 opacity-80">
                        <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">
                          {section.tag || 'pedroOS App'}
                        </span>
                        <p className="text-xs text-neutral-300 line-clamp-3 leading-relaxed">
                          {isEn
                            ? 'Tap to resume and interact with this application.'
                            : 'Toque para continuar interagindo com este aplicativo.'}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Overlay Escurecido Inferior para Leitura do Texto de Ação */}
                  <div className="absolute bottom-0 left-0 w-full p-3 pt-12 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-center justify-between text-[11px] text-white font-semibold">
                    <span>{isEn ? 'Tap to open' : 'Toque para abrir'}</span>
                    <span>↗</span>
                  </div>
                </button>
              </div>
            )
          })
        )}
      </div>

      {/* ========================================================
          HOME BAR INFERIOR (RETORNAR À TELA DE INÍCIO)
          ======================================================== */}
      <footer className="w-full flex flex-col items-center gap-2 pt-2">
        <button
          type="button"
          onClick={onDismiss}
          title={isEn ? 'Return to Home' : 'Voltar ao início'}
          className="w-36 h-1.5 bg-white/70 hover:bg-white active:scale-95 rounded-full transition-all cursor-pointer"
        />
        <span className="text-[10px] text-neutral-400 font-medium">
          {isEn ? 'Tap bar to return to Home' : 'Toque na barra para voltar ao Início'}
        </span>
      </footer>
    </div>
  )
}
