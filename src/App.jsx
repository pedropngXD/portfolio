import { useState, useEffect } from 'react'
import { SECTIONS } from './data/sections'
import { useWindowManager } from './hooks/useWindowManager'
import MenuBar from './components/MenuBar'
import DesktopIconsArea from './components/DesktopIconsArea'
import Window from './components/Window'
import Dock from './components/Dock'
import ContextMenu from './components/ContextMenu'
import NotificationToast from './components/NotificationToast'
import AboutSection from './components/sections/AboutSection'
import StackSection from './components/sections/StackSection'
import ExperienceSection from './components/sections/ExperienceSection'
import ProjectsSection from './components/sections/ProjectsSection'
import ContactSection from './components/sections/ContactSection'
import StatusCheckSection from './components/sections/StatusCheckSection'
import MobilePlaceholder from './components/MobilePlaceholder'
import { TRANSLATIONS } from './data/translations'
import { getAvailableGridPosition, sanitizeAllPositions, gridToCoords } from './utils/desktopGrid'
import {
  getSystemVolume,
  setSystemVolume,
  isSystemMuted,
  toggleSystemMute,
  playVolumeFeedback,
  playWindowOpen,
  playWindowClose,
  playWindowMinimize,
  playWindowMaximize,
  playSnap,
  playNotification,
  playToggle
} from './utils/soundEffects'

export default function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('pedro-os-theme')
    if (saved) return saved
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  })

  // Idioma do sistema (Português 'pt' ou Inglês 'en')
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('pedro-os-lang') || 'pt'
  })

  useEffect(() => {
    localStorage.setItem('pedro-os-lang', language)
    document.documentElement.setAttribute('lang', language === 'pt' ? 'pt-BR' : 'en')
  }, [language])

  const toggleLanguage = () => {
    playToggle()
    setLanguage((prev) => (prev === 'pt' ? 'en' : 'pt'))
  }

  const t = TRANSLATIONS[language] || TRANSLATIONS.pt

  // Posições dos ícones da área de trabalho (alinhados em grade e com prevenção total de sobreposição)
  const [iconPositions, setIconPositions] = useState(() => {
    const sectionIds = SECTIONS.map((s) => s.id)
    const saved = localStorage.getItem('pedro-os-desktop-icons')
    let parsed = {}
    if (saved) {
      try { parsed = JSON.parse(saved) } catch (e) { /* ignore */ }
    }
    return sanitizeAllPositions(parsed, sectionIds)
  })

  // Aplicativos fixados na barra de tarefas (Dock) - seção esquerda
  const [dockAppIds, setDockAppIds] = useState(() => {
    const saved = localStorage.getItem('pedro-os-dock-apps')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) { /* ignore */ }
    }
    return SECTIONS.map((s) => s.id)
  })

  // Atalhos do lado direito da barra de tarefas (Dock) - seção direita
  const [dockRightIds, setDockRightIds] = useState(() => {
    const saved = localStorage.getItem('pedro-os-dock-right-apps')
    if (saved) {
      try { return JSON.parse(saved) } catch (e) { /* ignore */ }
    }
    return ['github', 'linkedin', 'email', 'theme']
  })

  // Estado do Menu de Contexto (botão direito)
  const [contextMenu, setContextMenu] = useState({ isOpen: false, x: 0, y: 0, items: [] })

  // Estado da Notificação Toast de Sistema
  const [notification, setNotification] = useState({ isOpen: false, title: '', message: '', icon: '✓' })

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

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('pedro-os-theme', theme)
  }, [theme])

  useEffect(() => {
    localStorage.setItem('pedro-os-desktop-icons', JSON.stringify(iconPositions))
  }, [iconPositions])

  useEffect(() => {
    localStorage.setItem('pedro-os-dock-apps', JSON.stringify(dockAppIds))
  }, [dockAppIds])

  useEffect(() => {
    localStorage.setItem('pedro-os-dock-right-apps', JSON.stringify(dockRightIds))
  }, [dockRightIds])

  // Volume do sistema e estado mudo
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

  const handleOpenWindow = (id) => {
    playWindowOpen()
    openWindow(id)
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

  const toggleTheme = () => {
    playToggle()
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  // Dispara um toast de notificação
  const showNotification = ({ title, message, icon = '✓' }) => {
    playNotification()
    setNotification({
      isOpen: true,
      title,
      message,
      icon
    })
  }

  // Posiciona o ícone garantindo alinhamento na grade e prevenindo sobreposição com outros ícones
  const handleDropIcon = (id, rawPos) => {
    playSnap()
    const cleanPos = getAvailableGridPosition(rawPos, id, iconPositions)
    setIconPositions((prev) => ({
      ...prev,
      [id]: cleanPos
    }))
  }

  // Desafixa um app da barra de tarefas
  const handleRemoveFromDock = (sectionId) => {
    setDockAppIds((prev) => prev.filter((id) => id !== sectionId))
  }

  // Fixa um app na barra de tarefas
  const handleAddToDock = (sectionId) => {
    setDockAppIds((prev) => (prev.includes(sectionId) ? prev : [...prev, sectionId]))
  }

  // Restaura a barra de tarefas com todos os apps e atalhos padrão
  const handleResetDock = () => {
    playSnap()
    setDockAppIds(SECTIONS.map((s) => s.id))
    setDockRightIds(['github', 'linkedin', 'email', 'theme'])
  }

  // Organiza os ícones em coluna limpa na grade do canto esquerdo
  const handleAlignIcons = () => {
    playSnap()
    const resetPositions = {}
    SECTIONS.forEach((sec, idx) => {
      resetPositions[sec.id] = gridToCoords(0, idx)
    })
    setIconPositions(resetPositions)
  }

  // Abre o aplicativo correspondente diretamente dentro do sistema operacional (Pedro OS)
  const handleOpenApp = (sectionId) => {
    handleOpenWindow(sectionId)
  }

  // Menu de contexto com botão direito em ícone do Desktop
  const handleDesktopIconContextMenu = (e, sectionId) => {
    const section = SECTIONS.find((s) => s.id === sectionId)
    const inDock = dockAppIds.includes(sectionId)
    const sys = t?.system || {}
    const secTitle = t?.sections?.[sectionId]?.title || section?.title

    const items = []
    if (section?.externalUrl) {
      items.push({
        label: `${language === 'pt' ? 'Abrir' : 'Open'} ${secTitle}`,
        icon: '📂',
        onClick: () => handleOpenWindow(sectionId)
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
        onClick: () => handleOpenWindow(sectionId)
      })
    }

    items.push({ separator: true })
    items.push({
      label: inDock ? (sys.unpinFromDock || 'Desafixar da barra de tarefas') : (sys.pinToDock || 'Fixar na barra de tarefas'),
      icon: inDock ? '❌' : '📌',
      danger: inDock,
      onClick: () => {
        if (inDock) {
          handleRemoveFromDock(sectionId)
        } else {
          handleAddToDock(sectionId)
        }
      }
    })
    items.push({ separator: true })
    items.push({
      label: sys.alignIcons || 'Alinhar todos os ícones',
      icon: '📐',
      onClick: handleAlignIcons
    })

    setContextMenu({
      isOpen: true,
      x: e.clientX,
      y: e.clientY,
      items
    })
  }

  // Menu de contexto com botão direito em ícone da barra de tarefas (Dock)
  const handleDockContextMenu = (e, sectionId) => {
    const section = SECTIONS.find((s) => s.id === sectionId)
    const sys = t?.system || {}
    const secTitle = t?.sections?.[sectionId]?.title || section?.title

    const items = []
    if (section?.externalUrl) {
      items.push({
        label: `${language === 'pt' ? 'Abrir' : 'Open'} ${secTitle} 🪟`,
        icon: '📂',
        onClick: () => handleOpenWindow(sectionId)
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
            message: 'Link copiado!',
            icon: '📋'
          })
        }
      })
    } else {
      items.push({
        label: `${language === 'pt' ? 'Abrir' : 'Open'} ${secTitle}`,
        icon: '📂',
        onClick: () => handleOpenWindow(sectionId)
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

    setContextMenu({
      isOpen: true,
      x: e.clientX,
      y: e.clientY,
      items
    })
  }

  // Menu de contexto com botão direito no papel de parede
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
          label: theme === 'dark' ? (sys.switchThemeLight || 'Modo Claro') : (sys.switchThemeDark || 'Modo Escuro'),
          icon: theme === 'dark' ? '☀️' : '🌙',
          onClick: toggleTheme
        }
      ]
    })
  }

  const openWindowIds = Object.keys(windows).filter((id) => windows[id].isOpen)

  // Verifica se há alguma janela aberta em modo maximizado
  const hasMaximizedWindow = Object.values(windows).some(
    (w) => w.isOpen && !w.isMinimized && w.isMaximized
  )

  const renderContentForSection = (sectionId) => {
    switch (sectionId) {
      case 'about':
        return <AboutSection onNavigate={handleOpenWindow} t={t} />
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
      {/* Versão Mobile: ativada via media query Tailwind (visível em telas menores que 'md') */}
      <div className="block md:hidden w-full min-h-screen min-h-[100dvh] overflow-y-auto">
        <MobilePlaceholder
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

      {/* Versão Desktop: ativada via media query Tailwind (visível apenas a partir de 'md') */}
      <div
        className="hidden md:flex md:flex-col desktop-workspace"
        onContextMenu={handleWorkspaceContextMenu}
      >
        {/* Barra superior de menus do SO com toggle de idioma e controle de volume */}
        <MenuBar
          focusedWindowId={focusedWindowId}
          openWindowIds={openWindowIds}
          onOpenSection={handleOpenApp}
          theme={theme}
          onToggleTheme={toggleTheme}
          lang={language}
          onToggleLang={toggleLanguage}
          volume={volume}
          isMuted={isMuted}
          onIncreaseVolume={handleIncreaseVolume}
          onDecreaseVolume={handleDecreaseVolume}
          onSetVolume={handleSetVolume}
          onToggleMute={handleToggleMute}
          onTestSound={handleTestSound}
          t={t}
        />

      {/* Área central do desktop com ícones livres */}
      <main className="desktop-content-area" style={{ marginTop: 'var(--menubar-height)' }}>
        {/* Ícones arrastáveis livremente pelo desktop com títulos traduzidos */}
        <DesktopIconsArea
          openWindowIds={openWindowIds}
          focusedWindowId={focusedWindowId}
          iconPositions={iconPositions}
          onSelectSection={handleOpenApp}
          onDropIcon={handleDropIcon}
          onContextMenu={handleDesktopIconContextMenu}
          t={t}
        />

        {/* Janelas abertas */}
        {SECTIONS.map((section) => {
          const win = windows[section.id]
          if (!win || !win.isOpen || win.isMinimized) return null

          const sectionTitle = t?.sections?.[section.id]?.title || section.title
          const sectionTag = t?.sections?.[section.id]?.tag || section.tag

          return (
            <Window
              key={section.id}
              id={section.id}
              title={sectionTitle}
              tag={sectionTag}
              iconType={section.iconType}
              accentColor={section.accentColor}
              isMaximized={win.isMaximized}
              zIndex={win.zIndex}
              position={win.position}
              size={win.size}
              onClose={handleCloseWindow}
              onMinimize={handleMinimizeWindow}
              onMaximize={handleToggleMaximizeWindow}
              onFocus={focusWindow}
              onMove={updateWindowPosition}
              onResize={updateWindowSize}
            >
              {renderContentForSection(section.id)}
            </Window>
          )
        })}
      </main>

      {/* Barra de tarefas (Dock) com suporte a ocultar quando janela estiver maximizada e reordenação isolada */}
      <Dock
        windows={windows}
        dockAppIds={dockAppIds}
        dockRightIds={dockRightIds}
        isHidden={hasMaximizedWindow}
        onSelectSection={handleOpenApp}
        onContextMenu={handleDockContextMenu}
        onNotify={showNotification}
        theme={theme}
        onToggleTheme={toggleTheme}
        onReorderLeft={(newOrder) => {
          playSnap()
          setDockAppIds(newOrder)
        }}
        onReorderRight={(newOrder) => {
          playSnap()
          setDockRightIds(newOrder)
        }}
        t={t}
      />

      {/* Menu de contexto nativo com botão direito */}
      {contextMenu.isOpen && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={contextMenu.items}
          onClose={() => setContextMenu((prev) => ({ ...prev, isOpen: false }))}
        />
      )}

        {/* Notificação Toast do Sistema */}
        {notification.isOpen && (
          <NotificationToast
            title={notification.title}
            message={notification.message}
            icon={notification.icon}
            onClose={() => setNotification((prev) => ({ ...prev, isOpen: false }))}
          />
        )}
      </div>
    </>
  )
}
