import React, { useState, useRef, useEffect } from 'react'
import { SECTIONS } from '../../data/sections'
import MenuBar from '../MenuBar'
import DesktopIconsArea from '../DesktopIconsArea'
import Window from '../Window'
import Dock from '../Dock'
import ContextMenu from '../ContextMenu'
import NotificationToast from '../NotificationToast'
import dockStyles from '../Dock.module.css'

export default function DesktopLayout({
  // Sistema e Janelas
  windows,
  focusedWindowId,
  openWindowIds,
  onOpenApp,
  onCloseWindow,
  onMinimizeWindow,
  onMaximizeWindow,
  onFocusWindow,
  onMoveWindow,
  onResizeWindow,
  renderContentForSection,

  // Área de Trabalho e Dock
  iconPositions,
  onDropIcon,
  onDesktopIconContextMenu,
  dockAppIds,
  dockRightIds,
  onDockContextMenu,
  onReorderDockLeft,
  onReorderDockRight,
  hasMaximizedWindow,
  onWorkspaceContextMenu,

  // Áudio e Configurações
  volume,
  isMuted,
  onIncreaseVolume,
  onDecreaseVolume,
  onSetVolume,
  onToggleMute,
  onTestSound,

  // Tema, Idioma e Notificações
  theme,
  onToggleTheme,
  lang,
  onToggleLang,
  contextMenu,
  onCloseContextMenu,
  notification,
  onCloseNotification,
  showNotification,
  t
}) {
  const [isDockRevealed, setIsDockRevealed] = useState(false)

  // Controle estrito da área do Dock quando há janela maximizada (estilo macOS)
  useEffect(() => {
    if (!hasMaximizedWindow) {
      setIsDockRevealed(false)
      return
    }

    const onPointerMove = (e) => {
      // Se o mouse desce até a borda inferior (últimos 12px da tela): revela o dock
      if (e.clientY >= window.innerHeight - 12) {
        setIsDockRevealed(true)
      } else if (isDockRevealed && e.clientY < window.innerHeight - 88) {
        // Se o mouse sai da área do dock (subindo além de 88px da base da tela): desce imediatamente
        setIsDockRevealed(false)
      }
    }

    window.addEventListener('pointermove', onPointerMove)
    return () => {
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [hasMaximizedWindow, isDockRevealed])

  return (
    <div className="hidden md:flex md:flex-col desktop-workspace" onContextMenu={onWorkspaceContextMenu}>
      {/* Barra superior de menus do SO */}
      <MenuBar
        focusedWindowId={focusedWindowId}
        openWindowIds={openWindowIds}
        onOpenSection={onOpenApp}
        theme={theme}
        onToggleTheme={onToggleTheme}
        lang={lang}
        onToggleLang={onToggleLang}
        volume={volume}
        isMuted={isMuted}
        onIncreaseVolume={onIncreaseVolume}
        onDecreaseVolume={onDecreaseVolume}
        onSetVolume={onSetVolume}
        onToggleMute={onToggleMute}
        onTestSound={onTestSound}
        t={t}
      />

      {/* Área central do desktop com ícones livres e janelas */}
      <main className="desktop-content-area" style={{ marginTop: 'var(--menubar-height)' }}>
        <DesktopIconsArea
          openWindowIds={openWindowIds}
          focusedWindowId={focusedWindowId}
          iconPositions={iconPositions}
          onSelectSection={onOpenApp}
          onDropIcon={onDropIcon}
          onContextMenu={onDesktopIconContextMenu}
          t={t}
        />

        {/* Janelas abertas */}
        {SECTIONS.map((section) => {
          const win = windows[section.id]
          if (!win || !win.isOpen || (win.isMinimized && win.animState !== 'minimizing')) return null

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
              animState={win.animState}
              zIndex={win.zIndex}
              position={win.position}
              size={win.size}
              onClose={onCloseWindow}
              onMinimize={onMinimizeWindow}
              onMaximize={onMaximizeWindow}
              onFocus={onFocusWindow}
              onMove={onMoveWindow}
              onResize={onResizeWindow}
            >
              {renderContentForSection(section.id)}
            </Window>
          )
        })}
      </main>

      {/* Área invisível na borda inferior para revelar Dock quando maximizado (estilo macOS) */}
      {hasMaximizedWindow && (
        <div
          className={`${dockStyles.dockTriggerZone} ${isDockRevealed ? dockStyles.dockTriggerZoneActive : ''}`}
          onMouseEnter={() => setIsDockRevealed(true)}
          onMouseLeave={() => setIsDockRevealed(false)}
          aria-hidden="true"
        />
      )}

      {/* Barra de tarefas (Dock) */}
      <Dock
        windows={windows}
        dockAppIds={dockAppIds}
        dockRightIds={dockRightIds}
        isHidden={hasMaximizedWindow}
        isRevealed={isDockRevealed}
        onMouseEnter={() => setIsDockRevealed(true)}
        onMouseLeave={() => setIsDockRevealed(false)}
        onSelectSection={onOpenApp}
        onContextMenu={onDockContextMenu}
        onNotify={showNotification}
        theme={theme}
        onToggleTheme={onToggleTheme}
        onReorderLeft={onReorderDockLeft}
        onReorderRight={onReorderDockRight}
        t={t}
      />

      {/* Menu de contexto nativo com botão direito */}
      {contextMenu.isOpen && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={contextMenu.items}
          onClose={onCloseContextMenu}
        />
      )}

      {/* Notificação Toast do Sistema */}
      {notification.isOpen && (
        <NotificationToast
          title={notification.title}
          message={notification.message}
          icon={notification.icon}
          onClose={onCloseNotification}
        />
      )}
    </div>
  )
}
