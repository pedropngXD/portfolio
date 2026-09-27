import { useState } from 'react'
import { SECTIONS } from './data/sections'
import MenuBar from './components/MenuBar'
import DesktopIconsArea from './components/DesktopIconsArea'
import Window from './components/Window'

function App() {
  const [theme, setTheme] = useState('light')
  // Controla qual seção/janela está aberta (apenas uma por vez)
  const [activeSection, setActiveSection] = useState(null)

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme)
  }

  const handleSelectSection = (sectionId) => {
    // Clique simples: abre a janela selecionada ou fecha se já for a mesma
    setActiveSection((current) => (current === sectionId ? null : sectionId))
  }

  const handleCloseWindow = () => {
    setActiveSection(null)
  }

  // Objeto da seção atualmente aberta
  const currentSectionData = SECTIONS.find((sec) => sec.id === activeSection)

  return (
    <div className="desktop-workspace">
      {/* Barra superior fixa de menus */}
      <MenuBar
        activeSection={activeSection}
        onOpenSection={handleSelectSection}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Área central do desktop */}
      <main className="desktop-content-area" style={{ marginTop: 'var(--menubar-height)' }}>
        {/* Ícones de atalho na lateral esquerda da tela */}
        <DesktopIconsArea
          activeSection={activeSection}
          onSelectSection={handleSelectSection}
        />

        {/* Janela centralizada reutilizável */}
        {currentSectionData && (
          <Window
            title={currentSectionData.title}
            tag={currentSectionData.tag}
            iconType={currentSectionData.iconType}
            accentColor={currentSectionData.accentColor}
            onClose={handleCloseWindow}
          >
            {/* Conteúdo genérico estruturado para validar a Window na Etapa 5 */}
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
                <span>Seção Ativa</span>
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
                A janela genérica está pronta, posicionada no centro da tela e com scroll interno isolado.
                Nas próximas etapas (6 a 10), preencheremos o conteúdo específico de cada seção técnica:
                Sobre mim, Stack técnica, Experiência Credware, Projetos e Contato.
              </p>

              <div style={{
                padding: '1rem 1.25rem',
                background: 'var(--window-surface)',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--window-border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.75rem'
              }}>
                <span style={{ fontSize: 'var(--text-sm)', color: 'var(--window-text-muted)' }}>
                  Pressione <strong>ESC</strong> ou clique na bolinha vermelha para fechar esta janela.
                </span>

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
            </div>
          </Window>
        )}
      </main>
    </div>
  )
}

export default App
