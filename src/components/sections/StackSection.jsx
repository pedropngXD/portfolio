import { useState } from 'react'
import { STACK_CATEGORIES, STACK_DATA } from '../../data/stack'
import SectionHeader from '../common/SectionHeader'
import styles from './StackSection.module.css'

export default function StackSection({ t }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const isEn = t?.system?.langLabel === 'EN'

  const filteredStack =
    activeCategory === 'all'
      ? STACK_DATA
      : STACK_DATA.filter((tech) => tech.category === activeCategory)

  return (
    <div className={styles.container}>
      <SectionHeader
        title={t?.stack?.title || 'Tecnologias & Ferramentas'}
        subtitle={
          t?.stack?.subtitle ||
          'Stack real aplicada no desenvolvimento diário de APIs, sistemas internos e projetos práticos.'
        }
      />
      <div className={styles.filterWrapper}>
        <div className={styles.filterBar} role="tablist" aria-label="Categorias de tecnologias">
          {STACK_CATEGORIES.map((cat) => {
            const catLabel = t?.stack?.categories?.[cat.id] || cat.label
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`${styles.filterBtn} ${activeCategory === cat.id ? styles.filterBtnActive : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {catLabel}
              </button>
            )
          })}
        </div>
        <div className={styles.fadeRight} aria-hidden="true" />
      </div>
      <div className={styles.cardsGrid}>
        {filteredStack.map((tech) => (
          <article key={tech.name} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.techName}>{tech.name}</h3>
              <span className={styles.levelBadge}>{isEn ? (tech.levelEn || tech.level) : tech.level}</span>
            </div>
            <p className={styles.description}>{isEn ? (tech.descriptionEn || tech.description) : tech.description}</p>
          </article>
        ))}
      </div>
    </div>
  )
}
