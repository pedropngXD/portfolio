import SectionContent from './components/sections/SectionContent'
import { useContextMenus } from './hooks/useContextMenus'
import { useState } from 'react'

import { useTheme } from './hooks/useTheme'
import { useLanguage } from './hooks/useLanguage'
import { useSystemAudio } from './hooks/useSystemAudio'
import { useSystemWifi } from './hooks/useSystemWifi'
import { useDesktopIcons } from './hooks/useDesktopIcons'
import { useDockApps } from './hooks/useDockApps'
import { useWindowManager } from './hooks/useWindowManager'
import DesktopLayout from './components/layout/DesktopLayout'
import MobileLayout from './components/layout/MobileLayout'
import NotificationToast from './components/NotificationToast'

import {
  playNotification,
  playWindowOpen,
  playWindowClose,
  playWindowMinimize,
  playWindowMaximize
} from './utils/soundEffects'

export default function App() {
  const { theme, toggleTheme } = useTheme()
  const { language, toggleLanguage, t } = useLanguage()
  const audio = useSystemAudio()
  const { isWifiEnabled, toggleWifi } = useSystemWifi()
  const { iconPositions, handleDropIcon, handleAlignIcons } = useDesktopIcons()
  const {
    dockAppIds,
    dockRightIds,
    setDockAppIds,
    setDockRightIds,
    handleAddToDock,
    handleRemoveFromDock
  } = useDockApps()

  const {
    windows,
    focusedWindowId,
    openWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    unmaximizeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize
  } = useWindowManager()

  const [notification, setNotification] = useState({ isOpen: false, title: '', message: '', icon: '✓' })

  const showNotification = ({ title, message, icon = '✓' }) => {
    playNotification()
    setNotification({ isOpen: true, title, message, icon })
  }

  const handleOpenApp = (sectionId, options = {}) => {
    playWindowOpen()
    openWindow(sectionId, options)
  }

  const handleCloseWindow = (id) => {
    playWindowClose()
    closeWindow(id)
  }

  const handleMinimizeWindow = (id) => {
    playWindowMinimize()
    minimizeWindow(id)
  }

  const handleToggleMaximizeWindow = (id) => {
    playWindowMaximize()
    toggleMaximizeWindow(id)
  }

  const handleRestoreFromDrag = (id, newPos) => {
    playWindowMaximize()
    unmaximizeWindow(id, newPos)
  }

  const { contextMenu, setContextMenu, handleDesktopIconContextMenu, handleDockContextMenu, handleWorkspaceContextMenu } = useContextMenus({
    dockAppIds,
    language,
    t,
    handleOpenApp,
    showNotification,
    handleRemoveFromDock,
    handleAddToDock,
    handleAlignIcons,
    windows,
    handleCloseWindow,
    toggleLanguage,
    theme,
    toggleTheme
  })

  const openWindowIds = Object.keys(windows).filter((id) => windows[id].isOpen)
  const hasMaximizedWindow = Object.values(windows).some((w) => w.isOpen && !w.isMinimized && w.isMaximized)

  const renderContentForSection = (sectionId, options = {}) => (
    <SectionContent sectionId={sectionId} language={language} onNavigate={handleOpenApp}
      onNotify={showNotification} t={t} isAboutMaximized={windows.about?.isMaximized} options={options} />
  )

  return (
    <>
      <div className="block md:hidden w-full h-screen h-[100dvh] overflow-hidden">
        <MobileLayout
          lang={language}
          onToggleLang={toggleLanguage}
          theme={theme}
          onToggleTheme={toggleTheme}
          onNotify={showNotification}
          renderContentForSection={renderContentForSection}
          t={t}
        />
        {notification.isOpen && (
          <NotificationToast
            title={notification.title}
            message={notification.message}
            icon={notification.icon}
            onClose={() => setNotification((prev) => ({ ...prev, isOpen: false }))}
          />
        )}
      </div>

      <DesktopLayout
        windows={windows}
        focusedWindowId={focusedWindowId}
        openWindowIds={openWindowIds}
        onOpenApp={handleOpenApp}
        onCloseWindow={handleCloseWindow}
        onMinimizeWindow={handleMinimizeWindow}
        onMaximizeWindow={handleToggleMaximizeWindow}
        onFocusWindow={focusWindow}
        onMoveWindow={updateWindowPosition}
        onResizeWindow={updateWindowSize}
        onRestoreFromDrag={handleRestoreFromDrag}
        renderContentForSection={renderContentForSection}
        iconPositions={iconPositions}
        onDropIcon={handleDropIcon}
        onDesktopIconContextMenu={handleDesktopIconContextMenu}
        dockAppIds={dockAppIds}
        dockRightIds={dockRightIds}
        onDockContextMenu={handleDockContextMenu}
        onReorderDockLeft={setDockAppIds}
        onReorderDockRight={setDockRightIds}
        hasMaximizedWindow={hasMaximizedWindow}
        onWorkspaceContextMenu={handleWorkspaceContextMenu}
        volume={audio.volume}
        isMuted={audio.isMuted}
        onIncreaseVolume={audio.handleIncreaseVolume}
        onDecreaseVolume={audio.handleDecreaseVolume}
        onSetVolume={audio.handleSetVolume}
        onToggleMute={audio.handleToggleMute}
        onTestSound={audio.handleTestSound}
        isWifiEnabled={isWifiEnabled}
        onToggleWifi={toggleWifi}
        theme={theme}
        onToggleTheme={toggleTheme}
        lang={language}
        onToggleLang={toggleLanguage}
        contextMenu={contextMenu}
        onCloseContextMenu={() => setContextMenu((prev) => ({ ...prev, isOpen: false, isFromDock: false }))}
        notification={notification}
        onCloseNotification={() => setNotification((prev) => ({ ...prev, isOpen: false }))}
        t={t}
      />
    </>
  )
}
