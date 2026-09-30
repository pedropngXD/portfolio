import { useState } from 'react'
import { SECTIONS } from './data/sections'
import { CONTACT_CHANNELS } from './data/contact'
import { RESUME_METADATA, getResumePdf } from './data/resume'
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

// Seções internas das janelas
import ReadmeSection from './components/sections/ReadmeSection'
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

  // Estados de ContextMenu e Notificação
  const [contextMenu, setContextMenu] = useState({ isOpen: false, x: 0, y: 0, items: [] })
  const [notification, setNotification] = useState({ isOpen: false, title: '', message: '', icon: '✓' })

  const showNotification = ({ title, message, icon = '✓' }) => {
    playNotification()
    setNotification({ isOpen: true, title, message, icon })
  }

  // Ações de Janelas com Feedback Sonoro
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

  // Menus de Contexto
  const handleDesktopIconContextMenu = (e, sectionId) => {
    const section = SECTIONS.find((s) => s.id === sectionId)
    const inDock = dockAppIds.includes(sectionId)
    const sys = t?.system || {}
    const secTitle = t?.sections?.[sectionId]?.title || section?.title

    const items = []
    if (sectionId === 'resume') {
      const resume = getResumePdf(language)
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
          a.href = resume.url
          a.download = resume.downloadName
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
        onClick: () => window.open(resume.url, '_blank', 'noopener,noreferrer')
      })
    } else if (section?.externalUrl) {
      items.push({
        label: `${language === 'pt' ? 'Abrir' : 'Open'} ${secTitle} 🪟`,
        icon: '📂',
        onClick: () => handleOpenApp(sectionId, { fromDock: false })
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
        onClick: () => handleOpenApp(sectionId, { fromDock: false })
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
      label: sys.alignIcons || (language === 'pt' ? 'Alinhar todos os apps' : 'Align all apps'),
      icon: '📐',
      onClick: handleAlignIcons
    })

    setContextMenu({ isOpen: true, x: e.clientX, y: e.clientY, items })
  }

  const handleDockContextMenu = (e, sectionId) => {
    const sys = t?.system || {}

    if (sectionId === 'email') {
      const emailChannel = CONTACT_CHANNELS.find((c) => c.id === 'email')
      if (emailChannel) {
        const items = [
          {
            label: `${sys.sendEmail || (language === 'pt' ? 'Enviar e-mail' : 'Send email')} ✉️`,
            icon: '✉️',
            onClick: () => {
              window.open(emailChannel.href, '_blank', 'noopener,noreferrer')
            }
          },
          {
            label: `${sys.copyEmail || (language === 'pt' ? 'Copiar e-mail' : 'Copy email')} 📋`,
            icon: '📋',
            onClick: () => {
              navigator.clipboard.writeText(emailChannel.value)
              showNotification({
                title: sys.emailToastTitle || (language === 'pt' ? 'Área de Transferência' : 'Clipboard'),
                message: sys.emailToastMessage || (language === 'pt' ? 'E-mail copiado para a área de transferência!' : 'Email copied to clipboard!'),
                icon: '📋'
              })
            }
          },
          {
            label: `${language === 'pt' ? 'Abrir no Gmail Web' : 'Open in Gmail Web'} 🌐`,
            icon: '🌐',
            onClick: () => {
              window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailChannel.value)}`, '_blank', 'noopener,noreferrer')
            }
          }
        ]
        setContextMenu({ isOpen: true, x: e.clientX, y: e.clientY, items, isFromDock: true })
        return
      }
    }

    const section = SECTIONS.find((s) => s.id === sectionId)
    const secTitle = t?.sections?.[sectionId]?.title || section?.title

    const isRunning = windows[sectionId]?.isOpen

    const items = []
    if (!isRunning) {
      if (section?.externalUrl) {
        items.push({
          label: `${language === 'pt' ? 'Abrir' : 'Open'} ${secTitle} 🪟`,
          icon: '📂',
          onClick: () => handleOpenApp(sectionId, { fromDock: true })
        })
      } else {
        items.push({
          label: `${language === 'pt' ? 'Abrir' : 'Open'} ${secTitle}`,
          icon: '📂',
          onClick: () => handleOpenApp(sectionId, { fromDock: true })
        })
      }
    } else {
      items.push({
        label: `${language === 'pt' ? 'Fechar janela' : 'Close window'}`,
        icon: '✕',
        danger: true,
        onClick: () => handleCloseWindow(sectionId)
      })
    }

    if (section?.externalUrl) {
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
          showNotification({ title: secTitle, message: sys.linkCopied || (language === 'pt' ? 'Link copiado!' : 'Link copied!'), icon: '📋' })
        }
      })
    }

    const isPinned = dockAppIds.includes(sectionId)
    items.push({ separator: true })
    items.push({
      label: isPinned
        ? (sys.unpinFromDock || 'Desafixar da barra de tarefas')
        : (sys.pinToDock || 'Fixar na barra de tarefas'),
      icon: isPinned ? '❌' : '📌',
      danger: isPinned,
      onClick: () => (isPinned ? handleRemoveFromDock(sectionId) : handleAddToDock(sectionId))
    })

    setContextMenu({ isOpen: true, x: e.clientX, y: e.clientY, items, isFromDock: true })
  }

  const handleWorkspaceContextMenu = (e) => {
    // Não abre o menu da área de trabalho se clicou dentro de uma janela de aplicativo ou em botões
    if (e.target.closest('[role="dialog"]') && !e.target.closest('aside')) return
    if (e.target.closest('button') || e.target.closest('[role="button"]')) return

    e.preventDefault()
    e.stopPropagation()
    if (e.nativeEvent?.stopPropagation) {
      e.nativeEvent.stopPropagation()
    }

    const sys = t?.system || {}

    setContextMenu({
      isOpen: true,
      x: e.clientX,
      y: e.clientY,
      items: [
        {
          label: sys.alignIcons || (language === 'pt' ? 'Alinhar todos os apps' : 'Align all apps'),
          icon: '📐',
          onClick: handleAlignIcons
        },
        { separator: true },
        {
          label: language === 'pt' ? 'Idioma: Inglês (EN)' : 'Language: Portuguese (PT)',
          icon: '🌐',
          onClick: toggleLanguage
        },
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
  const renderContentForSection = (sectionId, options = {}) => {
    switch (sectionId) {
      case 'readme':
        return <ReadmeSection onNavigate={handleOpenApp} t={t} onNotify={showNotification} isMobile={options?.isMobile} />
      case 'resume':
        return <ResumeSection language={language} />
      case 'about':
        return <AboutSection onNavigate={handleOpenApp} t={t} isMaximized={windows.about?.isMaximized} />
      case 'stack':
        return <StackSection t={t} />
      case 'experience':
        return <ExperienceSection t={t} />
      case 'projects':
        return <ProjectsSection t={t} />
      case 'contact':
        return <ContactSection t={t} />
      case 'status-check':
        return <StatusCheckSection t={t} isAppSwitcher={options?.isAppSwitcher} />
      default:
        return null
    }
  }

  return (
    <>
      {/* Versão Mobile: isolada via media query Tailwind (< 768px) */}
      <div className="block md:hidden w-full h-screen h-[100dvh] overflow-hidden">
        <MobileLayout
          lang={language}
          onToggleLang={toggleLanguage}
          theme={theme}
          onToggleTheme={toggleTheme}
          onNotify={showNotification}
          renderContentForSection={renderContentForSection}
          audio={audio}
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
        showNotification={showNotification}
        t={t}
      />
    </>
  )
}
