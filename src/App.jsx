import { useState } from 'react'
import { SECTIONS } from './data/sections'
import MenuBar from './components/MenuBar'
import DesktopIconsArea from './components/DesktopIconsArea'
import Window from './components/Window'
import AboutSection from './components/sections/AboutSection'
import StackSection from './components/sections/StackSection'

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
      default:
        // Placeholder provisório para as próximas etapas (8 a 10)
        return (
          <div style={{ maxWidth: '640px' }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--weight-semibold)',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: currentSectionData.accentColor,
              marginBottom: '0.5rem'
            }}>
              <span>Próxima Etapa</span>
              <span>•</span>
              <span>{currentSectionData.tag}</span>
            </div>

            <h2 style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--weight-bold)',
              marginBottom: '1rem',
              color: 'var(--window-text-primary)'
            }}>
              {currentSectionData.title}
            </h2>

            <p style={{
              fontSize: 'var(--text-base)',
              lineHeight: 1.6,
              color: 'var(--window-text-secondary)',
              marginBottom: '1.5rem'
            }}>
              O conteúdo específico desta janela será implementado nas etapas seguintes do roteiro.
            </p>

            <button
              type="button"
              onClick={handleCloseWindow}
              style={{
                padding: '0.4rem 0.9rem',
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--weight-semibold)',
                background: currentSectionData.accentColor,
                color: '#ffffff',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              Fechar Janela
            </button>
          </div>
        )
    }
  }

  return (
    <div className="desktop-workspace">
      <MenuBar
        activeSection={activeSection}
        onOpenSection={handleSelectSection}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

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
