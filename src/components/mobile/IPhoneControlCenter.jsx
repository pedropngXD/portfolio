import { CONTACT_CHANNELS } from '../../data/contact'
import { playToggle, playNotification } from '../../utils/soundEffects'

export default function IPhoneControlCenter({
  isOpen,
  onClose,
  lang = 'pt',
  onToggleLang,
  theme = 'dark',
  onToggleTheme,
  audio,
  onNotify,
  t
}) {
  if (!isOpen) return null

  const isEn = lang === 'en'
  const isMuted = audio?.isMuted ?? false

  const handleToggleLangWithSound = () => {
    playToggle()
    onToggleLang && onToggleLang()
  }

  const handleToggleThemeWithSound = () => {
    playToggle()
    onToggleTheme && onToggleTheme()
  }

  const handleToggleMuteWithSound = () => {
    playToggle()
    audio?.onToggleMute && audio.onToggleMute()
  }

  const handleCopyEmail = () => {
    const email = CONTACT_CHANNELS.find((c) => c.id === 'email')
    if (!email) return
    navigator.clipboard.writeText(email.value).then(() => {
      playNotification()
      onNotify &&
        onNotify({
          title: isEn ? 'Clipboard' : 'Área de Transferência',
          message: isEn ? 'Email address copied!' : 'E-mail copiado com sucesso!',
          icon: '📋'
        })
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-start bg-black/60 backdrop-blur-2xl animate-fadeIn select-none">
      {/* Backdrop para fechar ao tocar fora */}
      <div className="absolute inset-0 -z-10" onClick={onClose} aria-hidden="true" />

      {/* Painel da Central de Controle (Control Center iOS) */}
      <div className="w-full max-w-md mx-auto p-5 space-y-4">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between text-white pb-2 border-b border-white/10">
          <div className="flex items-center gap-2">
            <span className="text-base">⚙️</span>
            <h2 className="font-bold text-sm tracking-tight">
              {isEn ? 'Control Center' : 'Central de Controle'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center text-xs font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Grade de Controles do Sistema 2x2 */}
        <div className="grid grid-cols-2 gap-3">
          {/* Alternância de Idioma (PT / EN) */}
          <button
            type="button"
            onClick={handleToggleLangWithSound}
            className="bg-white/15 hover:bg-white/25 backdrop-blur-md rounded-2xl p-3.5 border border-white/15 flex items-center justify-between transition-transform active:scale-95 cursor-pointer text-left"
          >
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-white block">
                {lang === 'pt' ? '🇧🇷 Português' : '🇺🇸 English'}
              </span>
              <span className="text-[10px] text-neutral-300">
                {isEn ? 'Switch to PT' : 'Mudar para EN'}
              </span>
            </div>
            <span className="text-xl">🌐</span>
          </button>

          {/* Alternância de Tema (Escuro / Claro) */}
          <button
            type="button"
            onClick={handleToggleThemeWithSound}
            className="bg-white/15 hover:bg-white/25 backdrop-blur-md rounded-2xl p-3.5 border border-white/15 flex items-center justify-between transition-transform active:scale-95 cursor-pointer text-left"
          >
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-white block">
                {theme === 'dark' ? (isEn ? 'Dark Mode' : 'Modo Escuro') : (isEn ? 'Light Mode' : 'Modo Claro')}
              </span>
              <span className="text-[10px] text-neutral-300">
                {theme === 'dark' ? (isEn ? 'Switch to Light' : 'Ativar Claro') : (isEn ? 'Switch to Dark' : 'Ativar Escuro')}
              </span>
            </div>
            <span className="text-xl">{theme === 'dark' ? '🌙' : '☀️'}</span>
          </button>

          {/* Controle de Áudio / Som */}
          <button
            type="button"
            onClick={handleToggleMuteWithSound}
            className="bg-white/15 hover:bg-white/25 backdrop-blur-md rounded-2xl p-3.5 border border-white/15 flex items-center justify-between transition-transform active:scale-95 cursor-pointer text-left"
          >
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-white block">
                {isMuted ? (isEn ? 'Muted' : 'Silenciado') : (isEn ? 'Sound On' : 'Som Ativo')}
              </span>
              <span className="text-[10px] text-neutral-300">Web Audio API</span>
            </div>
            <span className="text-xl">{isMuted ? '🔇' : '🔊'}</span>
          </button>

          {/* Botão Copiar E-mail Rápido */}
          <button
            type="button"
            onClick={handleCopyEmail}
            className="bg-white/15 hover:bg-white/25 backdrop-blur-md rounded-2xl p-3.5 border border-white/15 flex items-center justify-between transition-transform active:scale-95 cursor-pointer text-left"
          >
            <div className="space-y-0.5">
              <span className="text-xs font-bold text-white block">
                {isEn ? 'Copy Email' : 'Copiar E-mail'}
              </span>
              <span className="text-[10px] text-neutral-300">pgpmoser@gmail.com</span>
            </div>
            <span className="text-xl">📋</span>
          </button>
        </div>

        {/* Links Diretos de Rede / Contato */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15 space-y-2">
          <span className="text-[10px] font-bold text-neutral-300 uppercase tracking-wider block px-1">
            {isEn ? 'Quick Profiles' : 'Perfis & Redes'}
          </span>
          <div className="grid grid-cols-3 gap-2">
            <a
              href="https://github.com/pedropngXD"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all text-white text-center"
            >
              <span className="text-lg">🐙</span>
              <span className="text-[10px] font-medium">GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/pedro-moser/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all text-white text-center"
            >
              <span className="text-lg">💼</span>
              <span className="text-[10px] font-medium">LinkedIn</span>
            </a>
            <a
              href="mailto:pgpmoser@gmail.com"
              className="flex flex-col items-center gap-1 p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all text-white text-center"
            >
              <span className="text-lg">✉️</span>
              <span className="text-[10px] font-medium">Email</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
