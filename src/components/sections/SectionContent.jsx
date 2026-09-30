import ReadmeSection from './ReadmeSection'
import ResumeSection from './ResumeSection'
import AboutSection from './AboutSection'
import StackSection from './StackSection'
import ExperienceSection from './ExperienceSection'
import ProjectsSection from './ProjectsSection'
import ContactSection from './ContactSection'
import StatusCheckSection from './StatusCheckSection'

export default function SectionContent({ sectionId, language, onNavigate, onNotify, t, isAboutMaximized, options = {} }) {
  switch (sectionId) {
    case 'readme':
      return <ReadmeSection onNavigate={onNavigate} t={t} onNotify={onNotify} isMobile={options?.isMobile} />
    case 'resume':
      return <ResumeSection language={language} />
    case 'about':
      return <AboutSection  t={t} isMaximized={isAboutMaximized} />
    case 'stack':
      return <StackSection t={t} />
    case 'experience':
      return <ExperienceSection t={t} />
    case 'projects':
      return <ProjectsSection t={t} />
    case 'contact':
      return <ContactSection t={t} />
    case 'status-check':
      return <StatusCheckSection t={t} isAppSwitcher={options?.isAppSwitcher} />
    default:
      return null
  }
}
