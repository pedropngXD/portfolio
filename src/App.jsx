import { useState } from 'react'
import MenuBar from './components/MenuBar'

function App() {
  const [theme, setTheme] = useState('light')
  // Controla qual seção/janela está ativa (apenas uma por vez, conforme especificado)
  const [activeSection, setActiveSection] = useState(null)

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme)
  }

  const handleOpenSection = (sectionId) => {
    // Clique simples: se já estiver aberta, fecha; caso contrário, abre a nova (fechando a anterior)
    setActiveSection((current) => (current === sectionId ? null : sectionId))
  }

  return (
    <div className="desktop-workspace">
      {/* Barra de Menu Superior Fixa */}
      <MenuBar
        activeSection={activeSection}
        onOpenSection={handleOpenSection}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Área Central de Trabalho do Desktop */}
      <main className="desktop-content-area" style={{ marginTop: 'var(--menubar-height)' }}>
        {/* Feedback visual provisório para testar cliques no MenuBar */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          background: 'var(--dock-bg)',
          border: '1px solid var(--dock-border)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem 2.5rem',
          boxShadow: 'var(--dock-shadow)',
          maxWidth: '520px',
          width: '90%'
        }}>
          <h1 style={{ fontSize: 'var(--text-2xl)', fontWeight: 'var(--weight-bold)', marginBottom: '0.75rem', color: 'var(--window-text-primary)' }}>
            Pedro OS v1.0
          </h1>
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--window-text-secondary)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
            MenuBar fixado no topo com relógio em tempo real, menus de atalho e alternador de tema.
          </p>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            background: 'var(--window-surface)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--window-border)',
            fontSize: 'var(--text-sm)',
            color: 'var(--window-text-primary)'
          }}>
            <span>Seção selecionada no menu:</span>
            <strong>{activeSection ? activeSection.toUpperCase() : 'NENHUMA (Área limpa)'}</strong>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
