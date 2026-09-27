import { useState, useEffect } from 'react'
import { SECTIONS } from './data/sections'
import MenuBar from './components/MenuBar'
import DesktopIconsArea from './components/DesktopIconsArea'
import Window from './components/Window'
import Dock from './components/Dock'
import AboutSection from './components/sections/AboutSection'
import StackSection from './components/sections/StackSection'
import ExperienceSection from './components/sections/ExperienceSection'
import ProjectsSection from './components/sections/ProjectsSection'
import ContactSection from './components/sections/ContactSection'

function App() {
  // Inicialização com preferência salva ou detecção automática do SO do usuário
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('pedro-os-theme')
    if (saved) return saved
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    }
    return 'light'
  })

  // Janela inicial: abre 'about' por padrão para causar impacto imediato ao recrutador
  const [activeSection, setActiveSection] = useState('about')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('pedro-os-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
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

        {/* Janela centralizada */}
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

      {/* Dock flutuante fixo na parte inferior da tela */}
      <Dock
        activeSection={activeSection}
        onSelectSection={handleSelectSection}
        theme={theme}
        onToggleTheme={toggleTheme}
      />
    </div>
  )
}

export default App
