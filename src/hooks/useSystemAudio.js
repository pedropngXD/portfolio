import { useState } from 'react'
import {
  getSystemVolume,
  setSystemVolume,
  isSystemMuted,
  toggleSystemMute,
  playVolumeFeedback,
  playWindowOpen
} from '../utils/soundEffects'

export function useSystemAudio() {
  const [volume, setVolume] = useState(getSystemVolume)
  const [isMuted, setIsMuted] = useState(isSystemMuted)

  const handleIncreaseVolume = () => {
    const next = Math.min(1, Math.round((volume + 0.1) * 10) / 10)
    setSystemVolume(next)
    setVolume(next)
    setIsMuted(false)
    playVolumeFeedback()
  }

  const handleDecreaseVolume = () => {
    const next = Math.max(0, Math.round((volume - 0.1) * 10) / 10)
    setSystemVolume(next)
    setVolume(next)
    playVolumeFeedback()
  }

  const handleSetVolume = (newVol) => {
    setSystemVolume(newVol)
    setVolume(newVol)
    if (newVol > 0 && isMuted) {
      setIsMuted(false)
    }
    playVolumeFeedback()
  }

  const handleToggleMute = () => {
    const muted = toggleSystemMute()
    setIsMuted(muted)
    if (!muted) {
      playVolumeFeedback()
    }
  }

  const handleTestSound = () => {
    playWindowOpen()
  }

  return {
    volume,
    isMuted,
    handleIncreaseVolume,
    handleDecreaseVolume,
    handleSetVolume,
    handleToggleMute,
    handleTestSound
  }
}
