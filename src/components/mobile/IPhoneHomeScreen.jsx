import SystemIcon from '../SystemIcon'
import { SECTIONS } from '../../data/sections'
import { ABOUT_DATA } from '../../data/about'

export default function IPhoneHomeScreen({
  onOpenApp,
  onOpenAppSwitcher,
  lang = 'pt',
  t
}) {
  const isEn = lang === 'en'

  // 4 aplicativos principais fixados no Dock inferior estilo iOS
  const dockAppIds = ['about', 'projects', 'resume', 'contact']
  const dockSections = dockAppIds.map((id) => SECTIONS.find((s) => s.id === id)).filter(Boolean)

  // Aplicativos na grade da tela de início (excluindo os que estão no dock ou exibindo todos organizados)
  const homeSections = SECTIONS

  return (
    <div className="w-full h-full flex flex-col justify-between px-4 pt-2 pb-6 select-none animate-fadeIn">
      {/* ========================================================
          WIDGETS SUPERIORES ESTILO iOS (2x2)
          ======================================================== */}
      <section className="grid grid-cols-2 gap-3 mb-4">
        {/* Widget 1: Card de Perfil & Disponibilidade */}
        <button
          type="button"
          onClick={() => onOpenApp('about')}
          className="text-left bg-gradient-to-br from-indigo-950/80 via-slate-900/90 to-purple-950/80 backdrop-blur-xl border border-white/15 rounded-[24px] p-3.5 shadow-xl flex flex-col justify-between h-36 transition-transform active:scale-95 cursor-pointer relative overflow-hidden group"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-purple-400/50 shadow-md flex-shrink-0">
              <img
                src={ABOUT_DATA.avatarUrl || '/profile.jpg'}
                alt={ABOUT_DATA.name}
                className="w-full h-full object-cover object-top scale-125"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
              <span className="w-full h-full bg-purple-600 flex items-center justify-center text-white font-bold text-sm">
                P
              </span>
            </div>
            <div className="min-w-0">
              <h2 className="text-white font-bold text-xs tracking-tight truncate">
                {ABOUT_DATA.name}
              </h2>
              <p className="text-[10px] text-purple-300 font-medium truncate">
                {isEn ? 'Junior Developer' : 'Dev Júnior'}
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-400 text-[9px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{isEn ? 'Available' : 'Disponível'}</span>
            </div>
            <p className="text-[9px] text-neutral-300 truncate">
              {isEn ? 'ADS @ Unisinos • 7th sem' : 'ADS @ Unisinos • 7º sem'}
            </p>
          </div>
        </button>

        {/* Widget 2: Card de Tecnologias & Telemetria */}
        <button
          type="button"
          onClick={() => onOpenApp('stack')}
          className="text-left bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-sky-950/80 backdrop-blur-xl border border-white/15 rounded-[24px] p-3.5 shadow-xl flex flex-col justify-between h-36 transition-transform active:scale-95 cursor-pointer relative overflow-hidden"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider">
              {isEn ? 'Tech Stack' : 'Stack'}
            </span>
            <span className="text-sm">⚡</span>
          </div>

          <div className="grid grid-cols-2 gap-1.5 py-1">
            <span className="px-2 py-1 bg-white/10 rounded-lg text-[10px] text-white font-mono text-center font-medium">PHP</span>
            <span className="px-2 py-1 bg-white/10 rounded-lg text-[10px] text-white font-mono text-center font-medium">React</span>
            <span className="px-2 py-1 bg-white/10 rounded-lg text-[10px] text-white font-mono text-center font-medium">SQL</span>
            <span className="px-2 py-1 bg-white/10 rounded-lg text-[10px] text-white font-mono text-center font-medium">Node</span>
          </div>

          <span className="text-[9px] text-neutral-400 font-medium flex items-center justify-between">
            <span>{isEn ? 'Tap to explore' : 'Toque p/ explorar'}</span>
            <span>↗</span>
          </span>
        </button>
      </section>

      {/* ========================================================
          GRADE DE APPS ESTILO iOS (4 COLUNAS)
          ======================================================== */}
      <section className="flex-1 grid grid-cols-4 gap-y-4 gap-x-2 py-2">
        {homeSections.map((section) => {
          const title = t?.sections?.[section.id]?.shortLabel || section.shortLabel || section.title
          return (
            <button
              key={section.id}
              type="button"
              onClick={() => onOpenApp(section.id)}
              className="flex flex-col items-center gap-1.5 transition-transform active:scale-90 cursor-pointer group"
            >
              {/* Ícone Squircle iOS com Gradiente e Sombra */}
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-[18px] sm:rounded-[22px] flex items-center justify-center text-white shadow-xl relative border border-white/20 transition-all group-hover:scale-105"
                style={{
                  background:
                    section.id === 'readme'
                      ? 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)'
                      : section.id === 'resume'
                      ? 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)'
                      : section.id === 'about'
                      ? 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)'
                      : section.id === 'stack'
                      ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                      : section.id === 'experience'
                      ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
                      : section.id === 'contact'
                      ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
                      : section.id === 'projects'
                      ? 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)'
                      : 'linear-gradient(135deg, #14b8a6 0%, #0d9488 100%)'
                }}
              >
                <SystemIcon type={section.iconType} size={26} color="#ffffff" />

                {/* Badge contextual superior */}
                {section.id === 'readme' && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-sky-400 text-slate-900 rounded-full text-[9px] font-bold flex items-center justify-center shadow">
                    1
                  </span>
                )}
                {section.id === 'resume' && (
                  <span className="absolute -top-1.5 -right-1.5 px-1 bg-red-600 text-white rounded-full text-[8px] font-extrabold shadow uppercase tracking-wider">
                    PDF
                  </span>
                )}
              </div>

              {/* Rótulo do App */}
              <span className="text-[11px] font-medium text-white/95 tracking-tight text-center truncate max-w-[70px] drop-shadow-sm">
                {title}
              </span>
            </button>
          )
        })}
      </section>

      {/* ========================================================
          INDICADOR DE PÁGINAS (PONTINHOS iOS)
          ======================================================== */}
      <div className="flex items-center justify-center gap-1.5 py-1">
        <span className="w-1.5 h-1.5 rounded-full bg-white shadow-sm" />
        <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
      </div>

      {/* ========================================================
          DOCK INFERIOR ESTILO iOS (FROSTED GLASS)
          ======================================================== */}
      <nav
        aria-label="iOS Dock"
        className="w-full bg-white/20 dark:bg-white/10 backdrop-blur-2xl border border-white/25 shadow-2xl rounded-[32px] px-3.5 py-2.5 flex items-center justify-around mt-2"
      >
        {dockSections.map((section) => (
          <button
            key={section.id}
            type="button"
            onClick={() => onOpenApp(section.id)}
            title={section.title}
            className="w-13 h-13 sm:w-14 sm:h-14 rounded-[18px] flex items-center justify-center text-white shadow-lg transition-transform active:scale-90 cursor-pointer border border-white/20"
            style={{
              background:
                section.id === 'about'
                  ? 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)'
                  : section.id === 'projects'
                  ? 'linear-gradient(135deg, #ec4899 0%, #be185d 100%)'
                  : section.id === 'resume'
                  ? 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)'
                  : 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
            }}
          >
            <SystemIcon type={section.iconType} size={26} color="#ffffff" />
          </button>
        ))}
      </nav>

      {/* ========================================================
          HOME INDICATOR BAR (BARRA INFERIOR DESLIZÁVEL iOS)
          ======================================================== */}
      <div className="w-full flex justify-center pt-2">
        <button
          type="button"
          onClick={onOpenAppSwitcher}
          title="Ver Abas / Multitarefa"
          className="w-32 h-1 bg-white/70 hover:bg-white active:scale-95 rounded-full transition-all cursor-pointer"
        />
      </div>
    </div>
  )
}
