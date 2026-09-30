import ResumeSection from './ResumeSection'
import AboutSection from './AboutSection'
import StackSection from './StackSection'
import ExperienceSection from './ExperienceSection'
import ProjectsSection from './ProjectsSection'
import ContactSection from './ContactSection'
import StatusCheckSection from './StatusCheckSection'

export default function SectionContent({ sectionId, language, onNavigate, t }) {
  switch (sectionId) {
    case 'resume':
      return <ResumeSection language={language} />
    case 'about':
      return <AboutSection onNavigate={onNavigate} t={t} />
    case 'stack':
      return <StackSection t={t} />
    case 'experience':
      return <ExperienceSection t={t} />
    case 'projects':
      return <ProjectsSection t={t} />
    case 'contact':
      return <ContactSection t={t} />
    case 'status-check':
      return <StatusCheckSection />
    default:
      return null
  }
}
