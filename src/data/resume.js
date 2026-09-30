export const RESUME_METADATA = {
  pdfUrlPt: '/curriculo_pedro_moser.pdf',
  pdfUrlEn: '/pedro_moser_resume_en.pdf',
  pdfDownloadNamePt: 'Pedro Gabriel Pinheiro Moser.pdf',
  pdfDownloadNameEn: 'Pedro Moser - Resume (EN).pdf',
  fileNamePt: 'currículo.pdf',
  fileNameEn: 'resume.pdf'
}

export const getResumePdf = (lang = 'pt') => {
  const isEn = lang === 'en'
  return {
    url: isEn ? RESUME_METADATA.pdfUrlEn : RESUME_METADATA.pdfUrlPt,
    downloadName: isEn ? RESUME_METADATA.pdfDownloadNameEn : RESUME_METADATA.pdfDownloadNamePt,
    fileName: isEn ? RESUME_METADATA.fileNameEn : RESUME_METADATA.fileNamePt
  }
}
