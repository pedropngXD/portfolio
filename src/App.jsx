import { useState } from 'react'
import { SECTIONS } from './data/sections'
import MenuBar from './components/MenuBar'
import DesktopIconsArea from './components/DesktopIconsArea'
import Window from './components/Window'
import AboutSection from './components/sections/AboutSection'
import StackSection from './components/sections/StackSection'
import ExperienceSection from './components/sections/ExperienceSection'
import ProjectsSection from './components/sections/ProjectsSection'
import ContactSection from './components/sections/ContactSection'

function App() {
  const [theme, setTheme] = useState('light')
  const [activeSection, setActiveSection] = useState(null)

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme)
  }

  const handleSelectSection = (sectionId) => {
    setActiveSection((current) => (current === sectionId ? null : sectionId))
  }

  const handleCloseWindow = () => {
    setActiveSection(null)
  }

  const currentSectionData = SECTIONS.find((sec) => sec.id === activeSection)

  const renderWindowContent = () => {
    if (!currentSectionData) return null

    switch (activeSection) {
      case 'about':
        return <AboutSection onNavigate={handleSelectSection} />
      case 'stack':
        return <StackSection />
      case 'experience':
        return <ExperienceSection />
      case 'projects':
        return <ProjectsSection />
      case 'contact':
        return <ContactSection />
      default:
        return null
    }
  }

  return (
    <div className="desktop-workspace">
      {/* Barra superior de menus */}
      <MenuBar
        activeSection={activeSection}
        onOpenSection={handleSelectSection}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Área central do desktop */}
      <main className="desktop-content-area" style={{ marginTop: 'var(--menubar-height)' }}>
        <DesktopIconsArea
          activeSection={activeSection}
          onSelectSection={handleSelectSection}
        />

        {currentSectionData && (
          <Window
            title={currentSectionData.title}
            tag={currentSectionData.tag}
            iconType={currentSectionData.iconType}
            accentColor={currentSectionData.accentColor}
            onClose={handleCloseWindow}
          >
            {renderWindowContent()}
          </Window>
        )}
      </main>
    </div>
  )
}

export default App
