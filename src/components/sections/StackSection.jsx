import { useState } from 'react'
import { STACK_CATEGORIES, STACK_DATA } from '../../data/stack'
import styles from './StackSection.module.css'

export default function StackSection() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredStack = activeCategory === 'all'
    ? STACK_DATA
    : STACK_DATA.filter((tech) => tech.category === activeCategory)

  return (
    <div className={styles.container}>
      {/* Cabeçalho da Seção */}
      <div className={styles.intro}>
        <h2 className={styles.title}>Tecnologias & Ferramentas</h2>
        <p className={styles.subtitle}>
          Stack real aplicada no desenvolvimento diário de APIs, sistemas internos e projetos práticos.
        </p>
      </div>

      {/* Barra de Filtro por Categoria */}
      <div className={styles.filterBar} role="tablist" aria-label="Categorias de tecnologias">
        {STACK_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={activeCategory === cat.id}
            className={`${styles.filterBtn} ${activeCategory === cat.id ? styles.filterBtnActive : ''}`}
            onClick={() => setActiveCategory(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid de Cards de Tecnologias */}
      <div className={styles.cardsGrid}>
        {filteredStack.map((tech) => (
          <article key={tech.name} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.techName}>{tech.name}</h3>
              <span className={styles.levelBadge}>{tech.level}</span>
            </div>
            <p className={styles.description}>{tech.description}</p>
          </article>
        ))}
      </div>

      {/* Nota de rodapé técnica para recrutadores */}
      <div className={styles.footerNote}>
        <span aria-hidden="true">💡</span>
        <span>
          Prioridade em <strong>código manutenível</strong>, consultas SQL otimizadas e comunicação consistente via endpoints REST.
        </span>
      </div>
    </div>
  )
}
