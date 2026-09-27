import { useState } from 'react'
import MenuBar from './components/MenuBar'
import DesktopIconsArea from './components/DesktopIconsArea'

function App() {
  const [theme, setTheme] = useState('light')
  // Controla qual seção/janela está ativa (apenas uma por vez, fechando a anterior ao abrir outra)
  const [activeSection, setActiveSection] = useState(null)

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme)
  }

  const handleSelectSection = (sectionId) => {
    // Clique simples: se clicar no mesmo que já está aberto, fecha; se clicar em outro, abre o novo
    setActiveSection((current) => (current === sectionId ? null : sectionId))
  }

  return (
    <div className="desktop-workspace">
      {/* Barra superior de menus do SO */}
      <MenuBar
        activeSection={activeSection}
        onOpenSection={handleSelectSection}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Área central do desktop */}
      <main className="desktop-content-area" style={{ marginTop: 'var(--menubar-height)' }}>
        {/* Coluna de ícones de atalho das seções no canto esquerdo */}
        <DesktopIconsArea
          activeSection={activeSection}
          onSelectSection={handleSelectSection}
        />

        {/* Card temporário no centro indicando o estado selecionado (será substituído pela Window na Etapa 5) */}
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
          maxWidth: '500px',
          width: '90%'
        }}>
          <h1 style={{ fontSize: 'var(--text-xl)', fontWeight: 'var(--weight-bold)', marginBottom: '0.5rem', color: 'var(--window-text-primary)' }}>
            Área de Ícones Ativa
          </h1>
          <p style={{ fontSize: 'var(--text-sm)', color: 'var(--window-text-secondary)', marginBottom: '1.25rem', lineHeight: 1.5 }}>
            Clique em qualquer ícone à esquerda ou item no MenuBar para testar a seleção unificada.
          </p>

          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.5rem 1rem',
            background: 'var(--window-surface)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--window-border)',
            fontSize: 'var(--text-sm)',
            color: 'var(--window-text-primary)'
          }}>
            <span>Janela ativa:</span>
            <strong>{activeSection ? activeSection.toUpperCase() : 'NENHUMA (Área de trabalho limpa)'}</strong>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
