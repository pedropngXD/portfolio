import { useState } from 'react'

function App() {
  // Estado preliminar de tema para testar os tokens
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
    document.documentElement.setAttribute('data-theme', nextTheme)
  }

  return (
    <div className="desktop-workspace">
      {/* Área central do Desktop (onde entrarão ícones, janelas e dock) */}
      <main className="desktop-content-area">
        {/* Placeholder visual temporário da Etapa 2 para validação de tokens */}
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
          <p style={{ fontSize: 'var(--text-base)', color: 'var(--window-text-secondary)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
            Layout base ativo: viewport travada sem rolagem global, papel de parede dinâmico e paleta de acentos configurada.
          </p>

          {/* Teste das cores de acento de cada seção futura */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <span title="Sobre Mim" style={{ width: 14, height: 14, borderRadius: '50%', background: 'var(--accent-about)' }} />
            <span title="Projetos" style={{ width: 14, height: 14, borderRadius: '50%', background: 'var(--accent-projects)' }} />
            <span title="Stack Técnica" style={{ width: 14, height: 14, borderRadius: '50%', background: 'var(--accent-stack)' }} />
            <span title="Experiência" style={{ width: 14, height: 14, borderRadius: '50%', background: 'var(--accent-experience)' }} />
            <span title="Contato" style={{ width: 14, height: 14, borderRadius: '50%', background: 'var(--accent-contact)' }} />
          </div>

          <button
            onClick={toggleTheme}
            style={{
              padding: '0.6rem 1.2rem',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--weight-medium)',
              background: 'var(--accent-experience)',
              color: '#ffffff',
              borderRadius: 'var(--radius-md)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
            }}
          >
            Alternar Tema: {theme === 'light' ? '🌙 Modo Escuro' : '☀️ Modo Claro'}
          </button>
        </div>
      </main>
    </div>
  )
}

export default App
