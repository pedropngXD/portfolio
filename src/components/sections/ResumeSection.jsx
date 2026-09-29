import { RESUME_METADATA } from '../../data/resume'
import styles from './ResumeSection.module.css'

export default function ResumeSection({ language = 'pt' }) {
  const isEn = language === 'en'
  const fileName = isEn ? RESUME_METADATA.fileNameEn : RESUME_METADATA.fileNamePt
  const pdfSource = `${RESUME_METADATA.pdfUrl}#view=FitH`

  return (
    <div className={styles.container}>
      {/* Barra superior de ferramentas do leitor de PDF */}
      <div className={styles.toolbar}>
        <div className={styles.fileInfo}>
          <span className={styles.fileIcon} aria-hidden="true">📕</span>
          <span className={styles.fileName}>{fileName}</span>
          <span className={styles.pdfBadge}>PDF</span>
        </div>

        <div className={styles.actionsGroup}>
          <a
            href={RESUME_METADATA.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.actionBtn}
            title={isEn ? 'Open PDF in a new browser tab' : 'Abrir PDF diretamente no navegador'}
          >
            <span>↗</span>
            <span>{isEn ? 'View in Tab' : 'Abrir no Navegador'}</span>
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

      {/* Visualizador de PDF embutido diretamente na janela do sistema */}
      <div className={styles.viewerWrapper}>
        <object
          data={pdfSource}
          type="application/pdf"
          className={styles.pdfFrame}
          title={fileName}
        >
          <iframe
            src={pdfSource}
            title={fileName}
            className={styles.pdfFrame}
          >
            <div className={styles.fallbackNotice}>
              <p>
                {isEn
                  ? 'Your browser does not support inline PDF preview.'
                  : 'Seu navegador não suporta a pré-visualização direta de PDF.'}
              </p>
              <a
                href={RESUME_METADATA.pdfUrl}
                download={RESUME_METADATA.pdfDownloadName}
                className={styles.actionBtn}
              >
                📥 {isEn ? 'Download PDF' : 'Baixar PDF'}
              </a>
            </div>
          </iframe>
        </object>
      </div>
    </div>
  )
}
