import { SECTIONS } from '../data/sections'
import DesktopIcon from './DesktopIcon'
import { getDefaultDesktopPositions } from '../utils/desktopGrid'
import styles from './DesktopIconsArea.module.css'

export default function DesktopIconsArea({
  openWindowIds = [],
  focusedWindowId,
  iconPositions = {},
  onSelectSection,
  onDropIcon,
  onMoveIcon,
  onContextMenu,
  onWorkspaceContextMenu,
  t
}) {
  const defaultPositions = getDefaultDesktopPositions()

  return (
    <nav
      className={styles.iconsArea}
      aria-label={t?.system?.desktopAria || "Atalhos da Área de Trabalho"}
      onContextMenu={onWorkspaceContextMenu}
    >
      {SECTIONS.map((section) => {
        const title = t?.sections?.[section.id]?.title || section.title
        const position = iconPositions[section.id] || defaultPositions[section.id] || { x: 24, y: 24 }

        return (
          <DesktopIcon
            key={section.id}
            id={section.id}
            title={title}
            iconType={section.iconType}
            accentColor={section.accentColor}
            isActive={false}
            position={position}
            onClick={onSelectSection}
            onDrop={onDropIcon || onMoveIcon}
            onContextMenu={onContextMenu}
            t={t}
          />
        )
      })}
    </nav>
  )
}
