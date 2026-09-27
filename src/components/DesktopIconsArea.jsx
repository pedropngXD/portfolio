import { SECTIONS } from '../data/sections'
import DesktopIcon from './DesktopIcon'
import styles from './DesktopIconsArea.module.css'

export default function DesktopIconsArea({ activeSection, onSelectSection }) {
  return (
    <nav className={styles.iconsArea} aria-label="Atalhos da Área de Trabalho">
      {SECTIONS.map((section) => (
        <DesktopIcon
          key={section.id}
          id={section.id}
          title={section.title}
          iconType={section.iconType}
          accentColor={section.accentColor}
          isActive={activeSection === section.id}
          onClick={onSelectSection}
        />
      ))}
    </nav>
  )
}
