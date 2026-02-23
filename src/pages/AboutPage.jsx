import AboutSection from '../components/sections/AboutSection.jsx'
import usePageMeta from '../hooks/usePageMeta.js'

function AboutPage() {
  usePageMeta({
    title: 'О клинике',
    description: 'О ветеринарной клинике «Все создания от мала до велика»: опыт, подход к лечению и забота о питомцах.',
  })

  return <AboutSection />
}

export default AboutPage
