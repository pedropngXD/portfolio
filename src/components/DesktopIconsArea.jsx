import { SECTIONS } from '../data/sections'
import DesktopIcon from './DesktopIcon'
import styles from './DesktopIconsArea.module.css'

export default function DesktopIconsArea({
  openWindowIds = [],
  focusedWindowId,
  iconPositions = {},
  onSelectSection,
  onDropIcon,
  onMoveIcon,
  onContextMenu
}) {
  return (
    <nav className={styles.iconsArea} aria-label="Atalhos da Área de Trabalho">
      {SECTIONS.map((section, idx) => {
        const isFocused = focusedWindowId === section.id
        const isOpen = openWindowIds.includes(section.id)
        // Posição salva ou padrão em coluna no canto esquerdo
        const position = iconPositions[section.id] || {
          x: 24,
          y: 24 + (idx * 88)
        }

        return (
          <DesktopIcon
            key={section.id}
            id={section.id}
            title={section.title}
            iconType={section.iconType}
            accentColor={section.accentColor}
            isActive={isFocused || isOpen}
            position={position}
            onClick={onSelectSection}
            onDrop={onDropIcon || onMoveIcon}
            onContextMenu={onContextMenu}
          />
        )
      })}
    </nav>
  )
}
