import { useState } from 'react'
import { SECTIONS } from '../data/sections'
import { CONTACT_CHANNELS } from '../data/contact'
import { getResumePdf } from '../data/resume'

export function useContextMenus({
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
}) {
  const [contextMenu, setContextMenu] = useState({ isOpen: false, x: 0, y: 0, items: [] })

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

  return { contextMenu, setContextMenu, handleDesktopIconContextMenu, handleDockContextMenu, handleWorkspaceContextMenu }
}
