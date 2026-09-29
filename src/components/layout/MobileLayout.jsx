import { useState } from 'react'
import IPhoneHomeScreen from '../mobile/IPhoneHomeScreen'
import IPhoneAppSheet from '../mobile/IPhoneAppSheet'
import IPhoneAppSwitcher from '../mobile/IPhoneAppSwitcher'
import styles from '../mobile/IPhone.module.css'
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

  // Abrir um aplicativo
  const handleOpenApp = (appId) => {
    playWindowOpen()
    setActiveAppId(appId)
    setIsAppSwitcherOpen(false)

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
    <div className={styles.phoneContainer}>
      {/* Conteúdo Principal: Home Screen (Widgets + Grade de Apps + Dock) */}
      <main className="flex-1 relative w-full h-full overflow-hidden flex flex-col">
        <IPhoneHomeScreen
          onOpenApp={handleOpenApp}
          onOpenAppSwitcher={() => setIsAppSwitcherOpen(true)}
          lang={lang}
          onToggleLang={onToggleLang}
          onNotify={onNotify}
          theme={theme}
          onToggleTheme={onToggleTheme}
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
            theme={theme}
            onToggleTheme={onToggleTheme}
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
            renderContentForSection={renderContentForSection}
            theme={theme}
            lang={lang}
            t={t}
          />
        )}
      </main>
    </div>
  )
}
