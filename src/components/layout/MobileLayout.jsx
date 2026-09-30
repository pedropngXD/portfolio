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

export default function MobileLayout({ lang, onToggleLang, theme, onToggleTheme, onNotify, renderContentForSection, t }) {
  const [activeAppId, setActiveAppId] = useState(null)
  const [openAppIds, setOpenAppIds] = useState(['about'])
  const [isAppSwitcherOpen, setIsAppSwitcherOpen] = useState(false)

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

  const handleCloseActiveApp = () => {
    playWindowMinimize()
    setActiveAppId(null)
  }

  const handleCloseTab = (appId) => {
    playWindowClose()
    setOpenAppIds((prev) => prev.filter((id) => id !== appId))
    if (activeAppId === appId) {
      setActiveAppId(null)
    }
  }

  const handleCloseAllTabs = () => {
    playWindowClose()
    setOpenAppIds([])
    setActiveAppId(null)
    setIsAppSwitcherOpen(false)
  }

  const renderMobileContent = (sectionId) => {
    return renderContentForSection && renderContentForSection(sectionId, { isMobile: true })
  }

  return (
    <div className={styles.phoneContainer}>
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

        {activeAppId && (
          <IPhoneAppSheet
            appId={activeAppId}
            onClose={handleCloseActiveApp}
            onOpenAppSwitcher={() => setIsAppSwitcherOpen(true)}
            renderContentForSection={renderMobileContent}
            openAppsCount={openAppIds.length}
            theme={theme}
            onToggleTheme={onToggleTheme}
            lang={lang}
            t={t}
          />
        )}

        {isAppSwitcherOpen && (
          <IPhoneAppSwitcher
            openAppIds={openAppIds}
            activeAppId={activeAppId}
            onSelectApp={handleOpenApp}
            onCloseApp={handleCloseTab}
            onCloseAll={handleCloseAllTabs}
            onDismiss={() => setIsAppSwitcherOpen(false)}
            renderContentForSection={renderMobileContent}
            theme={theme}
            lang={lang}
            t={t}
          />
        )}
      </main>
    </div>
  )
}
