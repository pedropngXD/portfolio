import { useState, useRef, useEffect } from 'react'
import { SECTIONS } from '../../data/sections'
import MenuBar from '../MenuBar'
import DesktopIconsArea from '../DesktopIconsArea'
import Window from '../Window'
import Dock from '../Dock'
import ContextMenu from '../ContextMenu'
import NotificationToast from '../NotificationToast'
import FullscreenPrompt from '../FullscreenPrompt'
import dockStyles from '../Dock.module.css'

export default function DesktopLayout({
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
  onRestoreFromDrag,
  renderContentForSection,
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
  volume,
  isMuted,
  onIncreaseVolume,
  onDecreaseVolume,
  onSetVolume,
  onToggleMute,
  onTestSound,
  isWifiEnabled = true,
  onToggleWifi,
  theme,
  onToggleTheme,
  lang,
  onToggleLang,
  contextMenu,
  onCloseContextMenu,
  notification,
  onCloseNotification,
  t
}) {
  const [isDockRevealed, setIsDockRevealed] = useState(false)
  const isDockContextMenuOpen = Boolean(contextMenu?.isOpen && contextMenu?.isFromDock)
  const dockIsRevealed = isDockRevealed || isDockContextMenuOpen
  const mouseYRef = useRef(0)
  const prevContextMenuOpenRef = useRef(isDockContextMenuOpen)

  useEffect(() => {
    if (!hasMaximizedWindow) {
      setIsDockRevealed(false)
      return
    }

    const onPointerMove = (e) => {
      mouseYRef.current = e.clientY

      // Se o menu de contexto originado do Dock estiver aberto, mantém o dock visível
      if (isDockContextMenuOpen) return

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
  }, [hasMaximizedWindow, isDockRevealed, isDockContextMenuOpen])

  // Quando o menu de contexto do dock fecha, verifica se o mouse ainda está na área do dock
  useEffect(() => {
    if (prevContextMenuOpenRef.current && !isDockContextMenuOpen) {
      if (hasMaximizedWindow && mouseYRef.current < window.innerHeight - 88) {
        setIsDockRevealed(false)
      }
    }
    prevContextMenuOpenRef.current = isDockContextMenuOpen
  }, [isDockContextMenuOpen, hasMaximizedWindow])

  return (
    <div className="hidden md:flex md:flex-col desktop-workspace" onContextMenu={onWorkspaceContextMenu}>
      <MenuBar
        focusedWindowId={focusedWindowId}
        openWindowIds={openWindowIds}
        onOpenSection={(id) => onOpenApp && onOpenApp(id, { fromDock: false })}
        lang={lang}
        onToggleLang={onToggleLang}
        volume={volume}
        isMuted={isMuted}
        onIncreaseVolume={onIncreaseVolume}
        onDecreaseVolume={onDecreaseVolume}
        onSetVolume={onSetVolume}
        onToggleMute={onToggleMute}
        onTestSound={onTestSound}
        isWifiEnabled={isWifiEnabled}
        onToggleWifi={onToggleWifi}
        t={t}
      />
      <main
        className="desktop-content-area"
        onContextMenu={onWorkspaceContextMenu}
        style={{ marginTop: 'var(--menubar-height)' }}
      >
        <DesktopIconsArea
          iconPositions={iconPositions}
          onSelectSection={(id) => onOpenApp && onOpenApp(id, { fromDock: false })}
          onDropIcon={onDropIcon}
          onContextMenu={onDesktopIconContextMenu}
          onWorkspaceContextMenu={onWorkspaceContextMenu}
          t={t}
        />
        <FullscreenPrompt t={t} />

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
              prevBounds={win.prevBounds}
              onClose={onCloseWindow}
              onMinimize={onMinimizeWindow}
              onMaximize={onMaximizeWindow}
              onFocus={onFocusWindow}
              onMove={onMoveWindow}
              onResize={onResizeWindow}
              onRestoreFromDrag={onRestoreFromDrag}
              isWifiEnabled={isWifiEnabled}
              onToggleWifi={onToggleWifi}
              t={t}
            >
              {renderContentForSection(section.id)}
            </Window>
          )
        })}
      </main>

      {hasMaximizedWindow && (
        <div
          className={`${dockStyles.dockTriggerZone} ${dockIsRevealed ? dockStyles.dockTriggerZoneActive : ''}`}
          onMouseEnter={() => setIsDockRevealed(true)}
          onMouseLeave={() => {
            if (!isDockContextMenuOpen) setIsDockRevealed(false)
          }}
          aria-hidden="true"
        />
      )}
      <Dock
        windows={windows}
        dockAppIds={dockAppIds}
        dockRightIds={dockRightIds}
        isHidden={hasMaximizedWindow}
        isRevealed={dockIsRevealed}
        onMouseEnter={() => setIsDockRevealed(true)}
        onMouseLeave={() => {
          if (!isDockContextMenuOpen) setIsDockRevealed(false)
        }}
        onSelectSection={(id, opts) => onOpenApp && onOpenApp(id, { fromDock: true, ...opts })}
        onContextMenu={onDockContextMenu}
        theme={theme}
        onToggleTheme={onToggleTheme}
        onReorderLeft={onReorderDockLeft}
        onReorderRight={onReorderDockRight}
        t={t}
      />

      {contextMenu.isOpen && (
        <ContextMenu
          x={contextMenu.x}
          y={contextMenu.y}
          items={contextMenu.items}
          onClose={onCloseContextMenu}
        />
      )}

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
