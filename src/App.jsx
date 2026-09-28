import { useState } from 'react'
import { SECTIONS } from './data/sections'
import { useTheme } from './hooks/useTheme'
import { useLanguage } from './hooks/useLanguage'
import { useSystemAudio } from './hooks/useSystemAudio'
import { useDesktopIcons } from './hooks/useDesktopIcons'
import { useDockApps } from './hooks/useDockApps'
import { useWindowManager } from './hooks/useWindowManager'
import DesktopLayout from './components/layout/DesktopLayout'
import MobileLayout from './components/layout/MobileLayout'
import NotificationToast from './components/NotificationToast'

// Seções internas das janelas
import ResumeSection from './components/sections/ResumeSection'
import AboutSection from './components/sections/AboutSection'
import StackSection from './components/sections/StackSection'
import ExperienceSection from './components/sections/ExperienceSection'
import ProjectsSection from './components/sections/ProjectsSection'
import ContactSection from './components/sections/ContactSection'
import StatusCheckSection from './components/sections/StatusCheckSection'
import {
  playNotification,
  playWindowOpen,
  playWindowClose,
  playWindowMinimize,
  playWindowMaximize
} from './utils/soundEffects'

export default function App() {
  // Hooks customizados e desacoplados
  const { theme, toggleTheme } = useTheme()
  const { language, toggleLanguage, t } = useLanguage()
  const audio = useSystemAudio()
  const { iconPositions, handleDropIcon, handleAlignIcons } = useDesktopIcons()
  const {
    dockAppIds,
    dockRightIds,
    setDockAppIds,
    setDockRightIds,
    handleAddToDock,
    handleRemoveFromDock,
    handleResetDock
  } = useDockApps()

  const {
    windows,
    focusedWindowId,
    openWindow,
    closeWindow,
    minimizeWindow,
    toggleMaximizeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize
  } = useWindowManager()

  // Estados de ContextMenu e Notificação
  const [contextMenu, setContextMenu] = useState({ isOpen: false, x: 0, y: 0, items: [] })
  const [notification, setNotification] = useState({ isOpen: false, title: '', message: '', icon: '✓' })

  const showNotification = ({ title, message, icon = '✓' }) => {
    playNotification()
    setNotification({ isOpen: true, title, message, icon })
  }

  // Ações de Janelas com Feedback Sonoro
  const handleOpenApp = (sectionId) => {
    playWindowOpen()
    openWindow(sectionId)
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

  // Menus de Contexto
  const handleDesktopIconContextMenu = (e, sectionId) => {
    const section = SECTIONS.find((s) => s.id === sectionId)
    const inDock = dockAppIds.includes(sectionId)
    const sys = t?.system || {}
    const secTitle = t?.sections?.[sectionId]?.title || section?.title

    const items = []
    if (sectionId === 'resume') {
      items.push({
        label: `${language === 'pt' ? 'Abrir' : 'Open'} ${secTitle} 📄`,
        icon: '📄',
        onClick: () => handleOpenApp(sectionId)
      })
      items.push({
        label: language === 'pt' ? 'Baixar PDF original 📥' : 'Download original PDF 📥',
        icon: '📥',
        onClick: () => {
          const a = document.createElement('a')
          a.href = '/curriculo_pedro_moser.pdf'
          a.download = 'Pedro Gabriel Pinheiro Moser.pdf'
          a.click()
          showNotification({
            title: secTitle,
            message: language === 'pt' ? 'Download do currículo em PDF iniciado!' : 'Resume PDF download started!',
            icon: '📥'
          })
        }
      })
      items.push({
        label: language === 'pt' ? 'Visualizar PDF no Navegador ↗' : 'View PDF in Browser ↗',
        icon: '↗',
        onClick: () => window.open('/curriculo_pedro_moser.pdf', '_blank', 'noopener,noreferrer')
      })
    } else if (section?.externalUrl) {
      items.push({
        label: `${language === 'pt' ? 'Abrir' : 'Open'} ${secTitle} 🪟`,
        icon: '📂',
        onClick: () => handleOpenApp(sectionId)
      })
      items.push({
        label: sys.openInBrowser || `Abrir no Navegador ↗`,
        icon: '↗',
        onClick: () => window.open(section.externalUrl, '_blank', 'noopener,noreferrer')
      })
      items.push({
        label: sys.copyProjectLink || 'Copiar link do projeto',
        icon: '📋',
        onClick: () => {
          navigator.clipboard.writeText(section.externalUrl)
          showNotification({
            title: secTitle,
            message: sys.emailToastMessage ? 'Link copiado!' : 'Link copiado para a área de transferência!',
            icon: '📋'
          })
        }
      })
    } else {
      items.push({
        label: `${language === 'pt' ? 'Abrir' : 'Open'} ${secTitle}`,
        icon: '📂',
        onClick: () => handleOpenApp(sectionId)
      })
    }

    items.push({ separator: true })
    items.push({
      label: inDock ? sys.unpinFromDock || 'Desafixar da barra de tarefas' : sys.pinToDock || 'Fixar na barra de tarefas',
      icon: inDock ? '❌' : '📌',
      danger: inDock,
      onClick: () => (inDock ? handleRemoveFromDock(sectionId) : handleAddToDock(sectionId))
    })
    items.push({ separator: true })
    items.push({
      label: sys.alignIcons || 'Alinhar todos os ícones',
      icon: '📐',
      onClick: handleAlignIcons
    })

    setContextMenu({ isOpen: true, x: e.clientX, y: e.clientY, items })
  }

  const handleDockContextMenu = (e, sectionId) => {
    const section = SECTIONS.find((s) => s.id === sectionId)
    const sys = t?.system || {}
    const secTitle = t?.sections?.[sectionId]?.title || section?.title

    const items = []
    if (section?.externalUrl) {
      items.push({
        label: `${language === 'pt' ? 'Abrir' : 'Open'} ${secTitle} 🪟`,
        icon: '📂',
        onClick: () => handleOpenApp(sectionId)
      })
      items.push({
        label: sys.openInBrowser || `Abrir no Navegador ↗`,
        icon: '↗',
        onClick: () => window.open(section.externalUrl, '_blank', 'noopener,noreferrer')
      })
      items.push({
        label: sys.copyProjectLink || 'Copiar link do projeto',
        icon: '📋',
        onClick: () => {
          navigator.clipboard.writeText(section.externalUrl)
          showNotification({ title: secTitle, message: 'Link copiado!', icon: '📋' })
        }
      })
    } else {
      items.push({
        label: `${language === 'pt' ? 'Abrir' : 'Open'} ${secTitle}`,
        icon: '📂',
        onClick: () => handleOpenApp(sectionId)
      })
    }

    items.push({ separator: true })
    items.push({
      label: sys.unpinFromDock || 'Desafixar da barra de tarefas',
      icon: '❌',
      danger: true,
      onClick: () => handleRemoveFromDock(sectionId)
    })
    items.push({ separator: true })
    items.push({
      label: sys.resetDock || 'Restaurar barra de tarefas padrão',
      icon: '🔄',
      onClick: handleResetDock
    })

    setContextMenu({ isOpen: true, x: e.clientX, y: e.clientY, items })
  }

  const handleWorkspaceContextMenu = (e) => {
    if (e.target.closest('[role="dialog"]') || e.target.closest('button')) return
    e.preventDefault()

    const sys = t?.system || {}

    setContextMenu({
      isOpen: true,
      x: e.clientX,
      y: e.clientY,
      items: [
        {
          label: language === 'pt' ? '🌐 Idioma: Inglês (EN)' : '🌐 Language: Portuguese (PT)',
          icon: '🌐',
          onClick: toggleLanguage
        },
        { separator: true },
        {
          label: sys.alignIcons || 'Alinhar ícones na área de trabalho',
          icon: '📐',
          onClick: handleAlignIcons
        },
        {
          label: sys.resetDock || 'Restaurar barra de tarefas padrão',
          icon: '🔄',
          onClick: handleResetDock
        },
        { separator: true },
        {
          label: theme === 'dark' ? sys.switchThemeLight || 'Modo Claro' : sys.switchThemeDark || 'Modo Escuro',
          icon: theme === 'dark' ? '☀️' : '🌙',
          onClick: toggleTheme
        }
      ]
    })
  }

  const openWindowIds = Object.keys(windows).filter((id) => windows[id].isOpen)
  const hasMaximizedWindow = Object.values(windows).some((w) => w.isOpen && !w.isMinimized && w.isMaximized)

  // Renderizador de seções de janelas
  const renderContentForSection = (sectionId) => {
    switch (sectionId) {
      case 'resume':
        return <ResumeSection language={language} />
      case 'about':
        return <AboutSection onNavigate={handleOpenApp} t={t} />
      case 'stack':
        return <StackSection t={t} />
      case 'experience':
        return <ExperienceSection t={t} />
      case 'projects':
        return <ProjectsSection t={t} />
      case 'contact':
        return <ContactSection t={t} />
      case 'status-check':
        return <StatusCheckSection />
      default:
        return null
    }
  }

  return (
    <>
      {/* Versão Mobile: isolada via media query Tailwind (< 768px) */}
      <div className="block md:hidden w-full min-h-screen min-h-[100dvh] overflow-y-auto">
        <MobileLayout
          lang={language}
          onToggleLang={toggleLanguage}
          theme={theme}
          onToggleTheme={toggleTheme}
          onNotify={showNotification}
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

      {/* Versão Desktop: ativada via media query Tailwind (≥ 768px) */}
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
        theme={theme}
        onToggleTheme={toggleTheme}
        lang={language}
        onToggleLang={toggleLanguage}
        contextMenu={contextMenu}
        onCloseContextMenu={() => setContextMenu((prev) => ({ ...prev, isOpen: false }))}
        notification={notification}
        onCloseNotification={() => setNotification((prev) => ({ ...prev, isOpen: false }))}
        showNotification={showNotification}
        t={t}
      />
    </>
  )
}
