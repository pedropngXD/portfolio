/**
 * Sistema de Áudio e Efeitos Sonoros do Sistema Operacional via Web Audio API nativa
 * Sintetiza os efeitos sem depender de arquivos externos de áudio.
 */

let audioCtx = null

let masterVolume = 0.7 // 0.0 a 1.0 (70% padrão)
let isMuted = false

if (typeof window !== 'undefined') {
  const savedVol = localStorage.getItem('pedro-os-volume')
  if (savedVol !== null) {
    const parsed = parseFloat(savedVol)
    if (!isNaN(parsed)) masterVolume = Math.max(0, Math.min(1, parsed))
  }
  const savedMuted = localStorage.getItem('pedro-os-muted')
  if (savedMuted !== null) {
    isMuted = savedMuted === 'true'
  }
}

/**
 * Obtém ou inicializa o contexto de áudio do navegador
 */
function getAudioContext() {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {})
  }
  return audioCtx
}

/**
 * Retorna o ganho efetivo considerando mudo e curva de volume
 */
function getEffectiveGain(relative = 1.0) {
  if (isMuted || masterVolume <= 0) return 0
  // Escala suave (teto master de 0.28 para manter sons sempre agradáveis e sutis)
  return masterVolume * 0.28 * relative
}

/**
 * Ajusta o volume global (0 a 1)
 */
export function setSystemVolume(newVol) {
  masterVolume = Math.max(0, Math.min(1, newVol))
  if (masterVolume > 0 && isMuted) {
    isMuted = false
  }
  if (typeof window !== 'undefined') {
    localStorage.setItem('pedro-os-volume', masterVolume.toString())
    localStorage.setItem('pedro-os-muted', isMuted.toString())
  }
}

/**
 * Retorna o volume atual (0 a 1)
 */
export function getSystemVolume() {
  return masterVolume
}

/**
 * Alterna ou define estado de mudo
 */
export function toggleSystemMute(forceState) {
  if (typeof forceState === 'boolean') {
    isMuted = forceState
  } else {
    isMuted = !isMuted
  }
  if (typeof window !== 'undefined') {
    localStorage.setItem('pedro-os-muted', isMuted.toString())
  }
  return isMuted
}

export function isSystemMuted() {
  return isMuted
}

/**
 * Toca feedback de ajuste de volume (bipe suave de retorno no volume atual)
 */
export function playVolumeFeedback() {
  const ctx = getAudioContext()
  if (!ctx) return

  const gain = getEffectiveGain(0.8)
  if (gain <= 0) return

  const osc = ctx.createOscillator()
  const gainNode = ctx.createGain()

  osc.type = 'sine'
  osc.frequency.setValueAtTime(680, ctx.currentTime)

  gainNode.gain.setValueAtTime(gain, ctx.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08)

  osc.connect(gainNode)
  gainNode.connect(ctx.destination)

  osc.start()
  osc.stop(ctx.currentTime + 0.08)
}

/**
 * Som de abertura de janela: Acorde de vidro/marimba harmônico suave
 */
export function playWindowOpen() {
  const ctx = getAudioContext()
  if (!ctx) return

  const gain = getEffectiveGain(0.9)
  if (gain <= 0) return

  // Acorde em tríade cristalina (E5, B5, E6)
  const notes = [659.25, 987.77, 1318.51]

  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator()
    const gainNode = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.035)

    const startTime = ctx.currentTime + idx * 0.035
    const duration = 0.28 - idx * 0.04

    gainNode.gain.setValueAtTime(0.001, startTime)
    gainNode.gain.linearRampToValueAtTime(gain * 0.5, startTime + 0.015)
    gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + duration)

    osc.connect(gainNode)
    gainNode.connect(ctx.destination)

    osc.start(startTime)
    osc.stop(startTime + duration)
  })
}

/**
 * Som de fechamento de janela: Sweep sutil descendente
 */
export function playWindowClose() {
  const ctx = getAudioContext()
  if (!ctx) return

  const gain = getEffectiveGain(0.7)
  if (gain <= 0) return

  const osc = ctx.createOscillator()
  const gainNode = ctx.createGain()

  osc.type = 'sine'
  osc.frequency.setValueAtTime(360, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.12)

  gainNode.gain.setValueAtTime(gain * 0.6, ctx.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.12)

  osc.connect(gainNode)
  gainNode.connect(ctx.destination)

  osc.start()
  osc.stop(ctx.currentTime + 0.12)
}

/**
 * Som de minimizar: Gota d'água / pop curto ascendente
 */
export function playWindowMinimize() {
  const ctx = getAudioContext()
  if (!ctx) return

  const gain = getEffectiveGain(0.75)
  if (gain <= 0) return

  const osc = ctx.createOscillator()
  const gainNode = ctx.createGain()

  osc.type = 'sine'
  osc.frequency.setValueAtTime(320, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(620, ctx.currentTime + 0.09)

  gainNode.gain.setValueAtTime(gain * 0.5, ctx.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.09)

  osc.connect(gainNode)
  gainNode.connect(ctx.destination)

  osc.start()
  osc.stop(ctx.currentTime + 0.09)
}

/**
 * Som de maximizar: Acorde expansivo
 */
export function playWindowMaximize() {
  const ctx = getAudioContext()
  if (!ctx) return

  const gain = getEffectiveGain(0.85)
  if (gain <= 0) return

  const notes = [440, 659.25, 880] // A4, E5, A5
  notes.forEach((freq) => {
    const osc = ctx.createOscillator()
    const gainNode = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, ctx.currentTime)

    const duration = 0.22
    gainNode.gain.setValueAtTime(0.001, ctx.currentTime)
    gainNode.gain.linearRampToValueAtTime(gain * 0.45, ctx.currentTime + 0.02)
    gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration)

    osc.connect(gainNode)
    gainNode.connect(ctx.destination)

    osc.start()
    osc.stop(ctx.currentTime + duration)
  })
}

/**
 * Som de encaixe (Snap): Toque suave amadeirado ao soltar ícone na grade ou no dock
 */
export function playSnap() {
  const ctx = getAudioContext()
  if (!ctx) return

  const gain = getEffectiveGain(0.85)
  if (gain <= 0) return

  const osc = ctx.createOscillator()
  const gainNode = ctx.createGain()

  osc.type = 'triangle'
  osc.frequency.setValueAtTime(190, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.06)

  gainNode.gain.setValueAtTime(gain * 0.7, ctx.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.06)

  osc.connect(gainNode)
  gainNode.connect(ctx.destination)

  osc.start()
  osc.stop(ctx.currentTime + 0.06)
}

/**
 * Som de notificação / toast (Ex: e-mail copiado)
 */
export function playNotification() {
  const ctx = getAudioContext()
  if (!ctx) return

  const gain = getEffectiveGain(0.85)
  if (gain <= 0) return

  const notes = [698.46, 1046.5] // F5, C6 (ding alegre e positivo)
  notes.forEach((freq, idx) => {
    const startTime = ctx.currentTime + idx * 0.08
    const osc = ctx.createOscillator()
    const gainNode = ctx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(freq, startTime)

    gainNode.gain.setValueAtTime(0.001, startTime)
    gainNode.gain.linearRampToValueAtTime(gain * 0.5, startTime + 0.015)
    gainNode.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.28)

    osc.connect(gainNode)
    gainNode.connect(ctx.destination)

    osc.start(startTime)
    osc.stop(startTime + 0.28)
  })
}

/**
 * Som de alternância (Toggle de tema ou idioma): Micro-clique de interruptor
 */
export function playToggle() {
  const ctx = getAudioContext()
  if (!ctx) return

  const gain = getEffectiveGain(0.65)
  if (gain <= 0) return

  const osc = ctx.createOscillator()
  const gainNode = ctx.createGain()

  osc.type = 'sine'
  osc.frequency.setValueAtTime(850, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.035)

  gainNode.gain.setValueAtTime(gain * 0.4, ctx.currentTime)
  gainNode.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.035)

  osc.connect(gainNode)
  gainNode.connect(ctx.destination)

  osc.start()
  osc.stop(ctx.currentTime + 0.035)
}
