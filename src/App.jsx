import Container from './components/Container'

function App() {
  return (
    <div className="app-container">
      <main style={{ padding: 'var(--spacing-section) 0' }}>
        <Container>
          <span className="eyebrow">Apresentação de Engenharia</span>
          <h1 className="title-display">
            Pedro. <br />
            Desenvolvedor de Software.
          </h1>
          <p className="lead-text" style={{ marginTop: '1.5rem', maxWidth: '640px' }}>
            Construindo soluções robustas com foco em APIs internas, sistemas financeiros e aplicações web de alto desempenho.
          </p>
        </Container>
      </main>
    </div>
  )
}

export default App
