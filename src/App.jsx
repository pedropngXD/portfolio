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
import { getAvailableGridPosition, sanitizeAllPositions, gridToCoords } from './utils/desktopGrid'

export default function App() {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('pedro-os-theme')
    if (saved) return saved
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  })

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

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  // Dispara um toast de notificação
  const showNotification = ({ title, message, icon = '✓' }) => {
    setNotification({
      isOpen: true,
      title,
      message,
      icon
    })
  }

  // Posiciona o ícone garantindo alinhamento na grade e prevenindo sobreposição com outros ícones
  const handleDropIcon = (id, rawPos) => {
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
    setDockAppIds(SECTIONS.map((s) => s.id))
    setDockRightIds(['github', 'linkedin', 'email', 'theme'])
  }

  // Organiza os ícones em coluna limpa na grade do canto esquerdo
  const handleAlignIcons = () => {
    const resetPositions = {}
    SECTIONS.forEach((sec, idx) => {
      resetPositions[sec.id] = gridToCoords(0, idx)
    })
    setIconPositions(resetPositions)
  }

  // Abre o aplicativo ou link externo correspondente
  const handleOpenApp = (sectionId) => {
    const section = SECTIONS.find((s) => s.id === sectionId)
    if (section?.externalUrl) {
      window.open(section.externalUrl, '_blank', 'noopener,noreferrer')
      showNotification({
        title: section.title,
        message: 'Abrindo projeto em uma nova aba...',
        icon: '↗'
      })
      return
    }
    openWindow(sectionId)
  }

  // Menu de contexto com botão direito em ícone do Desktop
  const handleDesktopIconContextMenu = (e, sectionId) => {
    const section = SECTIONS.find((s) => s.id === sectionId)
    const inDock = dockAppIds.includes(sectionId)

    const items = []
    if (section?.externalUrl) {
      items.push({
        label: `Abrir no Navegador ↗`,
        icon: '↗',
        onClick: () => window.open(section.externalUrl, '_blank', 'noopener,noreferrer')
      })
      items.push({
        label: `Abrir como Janela no Desktop 🪟`,
        icon: '📂',
        onClick: () => openWindow(sectionId)
      })
      items.push({
        label: 'Copiar link do projeto',
        icon: '📋',
        onClick: () => {
          navigator.clipboard.writeText(section.externalUrl)
          showNotification({
            title: section.title,
            message: 'Link copiado para a área de transferência!',
            icon: '📋'
          })
        }
      })
    } else {
      items.push({
        label: `Abrir ${section.title}`,
        icon: '📂',
        onClick: () => openWindow(sectionId)
      })
    }

    items.push({ separator: true })
    items.push({
      label: inDock ? 'Desafixar da barra de tarefas' : 'Fixar na barra de tarefas',
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
      label: 'Alinhar todos os ícones',
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

    const items = []
    if (section?.externalUrl) {
      items.push({
        label: `Abrir no Navegador ↗`,
        icon: '↗',
        onClick: () => window.open(section.externalUrl, '_blank', 'noopener,noreferrer')
      })
      items.push({
        label: `Abrir como Janela no Desktop 🪟`,
        icon: '📂',
        onClick: () => openWindow(sectionId)
      })
      items.push({
        label: 'Copiar link do projeto',
        icon: '📋',
        onClick: () => {
          navigator.clipboard.writeText(section.externalUrl)
          showNotification({
            title: section.title,
            message: 'Link copiado para a área de transferência!',
            icon: '📋'
          })
        }
      })
    } else {
      items.push({
        label: `Abrir ${section.title}`,
        icon: '📂',
        onClick: () => openWindow(sectionId)
      })
    }

    items.push({ separator: true })
    items.push({
      label: 'Desafixar da barra de tarefas',
      icon: '❌',
      danger: true,
      onClick: () => handleRemoveFromDock(sectionId)
    })
    items.push({ separator: true })
    items.push({
      label: 'Restaurar barra de tarefas padrão',
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

    setContextMenu({
      isOpen: true,
      x: e.clientX,
      y: e.clientY,
      items: [
        {
          label: 'Alinhar ícones na área de trabalho',
          icon: '📐',
          onClick: handleAlignIcons
        },
        {
          label: 'Restaurar barra de tarefas padrão',
          icon: '🔄',
          onClick: handleResetDock
        },
        { separator: true },
        {
          label: theme === 'dark' ? 'Modo Claro' : 'Modo Escuro',
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
        return <AboutSection onNavigate={openWindow} />
      case 'stack':
        return <StackSection />
      case 'experience':
        return <ExperienceSection />
      case 'projects':
        return <ProjectsSection />
      case 'contact':
        return <ContactSection />
      case 'status-check':
        return <StatusCheckSection />
      default:
        return null
    }
  }

  return (
    <div
      className="desktop-workspace"
      onContextMenu={handleWorkspaceContextMenu}
    >
      {/* Barra superior de menus do SO */}
      <MenuBar
        focusedWindowId={focusedWindowId}
        openWindowIds={openWindowIds}
        onOpenSection={handleOpenApp}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Área central do desktop com ícones livres */}
      <main className="desktop-content-area" style={{ marginTop: 'var(--menubar-height)' }}>
        {/* Ícones arrastáveis livremente pelo desktop */}
        <DesktopIconsArea
          openWindowIds={openWindowIds}
          focusedWindowId={focusedWindowId}
          iconPositions={iconPositions}
          onSelectSection={handleOpenApp}
          onDropIcon={handleDropIcon}
          onContextMenu={handleDesktopIconContextMenu}
        />

        {/* Janelas abertas */}
        {SECTIONS.map((section) => {
          const win = windows[section.id]
          if (!win || !win.isOpen || win.isMinimized) return null

          return (
            <Window
              key={section.id}
              id={section.id}
              title={section.title}
              tag={section.tag}
              iconType={section.iconType}
              accentColor={section.accentColor}
              isMaximized={win.isMaximized}
              zIndex={win.zIndex}
              position={win.position}
              size={win.size}
              onClose={closeWindow}
              onMinimize={minimizeWindow}
              onMaximize={toggleMaximizeWindow}
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
        onReorderLeft={setDockAppIds}
        onReorderRight={setDockRightIds}
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
  )
}
