import { useState } from 'react'
import IPhoneStatusBar from '../mobile/IPhoneStatusBar'
import IPhoneHomeScreen from '../mobile/IPhoneHomeScreen'
import IPhoneAppSheet from '../mobile/IPhoneAppSheet'
import IPhoneAppSwitcher from '../mobile/IPhoneAppSwitcher'
import IPhoneControlCenter from '../mobile/IPhoneControlCenter'
import {
  playWindowOpen,
  playWindowClose,
  playWindowMinimize
} from '../../utils/soundEffects'

export default function MobileLayout({
  lang,
  onToggleLang,
  theme,
  onToggleTheme,
  onNotify,
  renderContentForSection,
  audio,
  t
}) {
  const [activeAppId, setActiveAppId] = useState(null)
  const [openAppIds, setOpenAppIds] = useState(['about'])
  const [isAppSwitcherOpen, setIsAppSwitcherOpen] = useState(false)
  const [isControlCenterOpen, setIsControlCenterOpen] = useState(false)
  const [isIslandExpanded, setIsIslandExpanded] = useState(false)

  // Abrir um aplicativo
  const handleOpenApp = (appId) => {
    playWindowOpen()
    setActiveAppId(appId)
    setIsAppSwitcherOpen(false)
    setIsControlCenterOpen(false)
    setIsIslandExpanded(false)

    setOpenAppIds((prev) => {
      if (!prev.includes(appId)) {
        return [...prev, appId]
      }
      return prev
    })
  }

  // Fechar o app atual e voltar para a Home Screen
  const handleCloseActiveApp = () => {
    playWindowMinimize()
    setActiveAppId(null)
  }

  // Fechar aba específica no App Switcher
  const handleCloseTab = (appId) => {
    playWindowClose()
    setOpenAppIds((prev) => prev.filter((id) => id !== appId))
    if (activeAppId === appId) {
      setActiveAppId(null)
    }
  }

  // Fechar todas as abas
  const handleCloseAllTabs = () => {
    playWindowClose()
    setOpenAppIds([])
    setActiveAppId(null)
    setIsAppSwitcherOpen(false)
  }

  return (
    <div className="w-full h-screen h-[100dvh] relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950 text-white flex flex-col justify-between select-none">
      {/* Barra de Status do iPhone com Dynamic Island */}
      <IPhoneStatusBar
        activeAppId={activeAppId}
        onToggleControlCenter={() => setIsControlCenterOpen((prev) => !prev)}
        onToggleDynamicIsland={() => setIsIslandExpanded((prev) => !prev)}
        isIslandExpanded={isIslandExpanded}
      />

      {/* Conteúdo Principal: Home Screen (Widgets + Grade de Apps + Dock) */}
      <main className="flex-1 relative w-full h-[calc(100dvh-2.75rem)] overflow-hidden">
        <IPhoneHomeScreen
          onOpenApp={handleOpenApp}
          onOpenAppSwitcher={() => setIsAppSwitcherOpen(true)}
          lang={lang}
          t={t}
        />

        {/* Modal Sheet do App Ativo (quando um app está aberto) */}
        {activeAppId && (
          <IPhoneAppSheet
            appId={activeAppId}
            onClose={handleCloseActiveApp}
            onOpenAppSwitcher={() => setIsAppSwitcherOpen(true)}
            renderContentForSection={renderContentForSection}
            openAppsCount={openAppIds.length}
            lang={lang}
            t={t}
          />
        )}

        {/* Multitarefa / Abas estilo iOS (App Switcher) */}
        {isAppSwitcherOpen && (
          <IPhoneAppSwitcher
            openAppIds={openAppIds}
            activeAppId={activeAppId}
            onSelectApp={handleOpenApp}
            onCloseApp={handleCloseTab}
            onCloseAll={handleCloseAllTabs}
            onDismiss={() => setIsAppSwitcherOpen(false)}
            lang={lang}
            t={t}
          />
        )}

        {/* Central de Controle iOS (Control Center) */}
        <IPhoneControlCenter
          isOpen={isControlCenterOpen}
          onClose={() => setIsControlCenterOpen(false)}
          lang={lang}
          onToggleLang={onToggleLang}
          theme={theme}
          onToggleTheme={onToggleTheme}
          audio={audio}
          onNotify={onNotify}
          t={t}
        />
      </main>
    </div>
  )
}
