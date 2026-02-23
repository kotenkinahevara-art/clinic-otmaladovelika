import ArticlesSection from '../components/sections/ArticlesSection.jsx'
import usePageMeta from '../hooks/usePageMeta.js'

function ArticlesPage() {
  usePageMeta({
    title: 'Статьи и советы',
    description: 'Полезные статьи ветеринарной клиники о здоровье животных: профилактика, уход и важные рекомендации.',
  })

  return <ArticlesSection />
}

export default ArticlesPage
