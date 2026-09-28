import { RESUME_TEXT_PT, RESUME_TEXT_EN, RESUME_METADATA } from '../../data/resume'
import styles from './ResumeSection.module.css'

export default function ResumeSection({ language = 'pt' }) {
  const isEn = language === 'en'
  const textContent = isEn ? RESUME_TEXT_EN : RESUME_TEXT_PT
  const fileName = isEn ? RESUME_METADATA.fileNameEn : RESUME_METADATA.fileNamePt

  const lineCount = textContent.split('\n').length
  const charCount = textContent.length

  return (
    <div className={styles.container}>
      {/* Barra de Ferramentas estilo Editor / TextEdit */}
      <div className={styles.toolbar}>
        <div className={styles.fileInfo}>
          <span className={styles.fileIcon} aria-hidden="true">📄</span>
          <span className={styles.fileName}>{fileName}</span>
        </div>

        <div className={styles.actionsGroup}>
          <a
            href={RESUME_METADATA.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.actionBtn}
            title={isEn ? 'Open PDF in new tab' : 'Visualizar PDF em nova aba'}
          >
            <span>↗</span>
            <span>{isEn ? 'View PDF' : 'Ver PDF'}</span>
          </a>

          <a
            href={RESUME_METADATA.pdfUrl}
            download={RESUME_METADATA.pdfDownloadName}
            className={styles.actionBtn}
            title={isEn ? 'Download original PDF' : 'Baixar arquivo PDF original'}
          >
            <span>📥</span>
            <span>{isEn ? 'Download PDF' : 'Baixar PDF'}</span>
          </a>
        </div>
      </div>

      {/* Conteúdo do arquivo de texto */}
      <div className={styles.editorWrapper}>
        <pre className={styles.textContent}>
          {textContent}
        </pre>
      </div>

      {/* Barra de Status Inferior */}
      <div className={styles.statusBar}>
        <div className={styles.statusLeft}>
          <span>{lineCount} {isEn ? 'lines' : 'linhas'}</span>
          <span>•</span>
          <span>{charCount} {isEn ? 'characters' : 'caracteres'}</span>
        </div>
        <div className={styles.statusRight}>
          <span>UTF-8</span>
          <span>•</span>
          <span>Text Document (.txt)</span>
        </div>
      </div>
    </div>
  )
}
