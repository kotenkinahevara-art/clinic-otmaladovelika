import ArticlesSection from '../components/sections/ArticlesSection.jsx'
import AppointmentSection from '../components/sections/AppointmentSection.jsx'
import usePageMeta from '../hooks/usePageMeta.js'

function ArticlesPage() {
  usePageMeta({
    title: 'Статьи и советы',
    description:
      'Полезные статьи ветеринарной клиники о здоровье животных: профилактика, уход и важные рекомендации.',
    canonicalPath: '/stati',
    image: '/images/logo.svg',
  })

  return (
    <>
      <ArticlesSection />
      <AppointmentSection />
    </>
  )
}

export default ArticlesPage
