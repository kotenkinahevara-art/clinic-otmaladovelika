import { useMemo, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import CardImageTop from '../components/ui/CardImageTop.jsx'
import ArticleModal from '../components/ui/ArticleModal.jsx'
import Container from '../components/ui/Container.jsx'
import ServicesSection from '../components/sections/ServicesSection.jsx'
import ContactsSection from '../components/sections/ContactsSection.jsx'
import AppointmentSection from '../components/sections/AppointmentSection.jsx'
import usePageMeta from '../hooks/usePageMeta.js'
import useRemoteJson from '../hooks/useRemoteJson.js'
import { itemReveal, sectionReveal } from '../components/ui/motionPresets.js'
import { mergeArticleDetails } from '../data/articlesModel.js'

function DalneeKonstantinovoPage() {
  const [activeArticleId, setActiveArticleId] = useState(null)
  const { data } = useRemoteJson('/data/articles/index.json', [])
  const { data: activeArticleData } = useRemoteJson(
    activeArticleId ? `/data/articles/${activeArticleId}.json` : '',
    null,
    { enabled: Boolean(activeArticleId) },
  )
  const articles = useMemo(() => (Array.isArray(data) ? data : []), [data])

  const stepanArticle = useMemo(() => articles.find((article) => article.id === 'cat-stepan') ?? null, [articles])
  const activeArticle = useMemo(() => {
    if (!activeArticleData || activeArticleData.id !== activeArticleId) return null

    const summary = articles.find((article) => article.id === activeArticleId)
    if (!summary) return null

    return mergeArticleDetails(summary, activeArticleData)
  }, [activeArticleData, activeArticleId, articles])

  usePageMeta({
    title: 'Ветклиника в Дальнем Константинове',
    description:
      'Ветеринарная клиника в Дальнем Константинове: приём, диагностика, хирургия, профилактика, лечение и онлайн-запись на приём.',
    canonicalPath: '/vetklinika-v-dalnem-konstantinove',
    image: '/images/logo.svg',
  })

  return (
    <>
      <Motion.section className="section section--about" {...sectionReveal}>
        <Container>
          <div className="section--about__layout">
            <Motion.div className="section--about__intro" {...itemReveal}>
              <h1 className="section__heading">Ветклиника в Дальнем Константинове</h1>

              <div className="intro__content">
                <p>
                  «Все создания от мала до велика» началась с простой мысли: в Дальнем Константинове должна быть ветклиника, где питомца
                  лечат профессионально, а владельца слышат и поддерживают. Мы росли шаг за шагом: от первых приёмов и базовой помощи до
                  полноценной клиники с диагностикой, хирургией и продуманным сопровождением после лечения.
                </p>
                <p>
                  Для нас важны не только назначения и процедуры, но и атмосфера. В клинике спокойно, бережно и по-человечески: без
                  спешки, с объяснениями понятным языком, с вниманием к характеру каждого животного. Мы знаем, как питомцы чувствуют
                  настроение вокруг, поэтому создаём пространство, где меньше стресса и больше доверия.
                </p>
                <p>
                  Сегодня мы продолжаем развиваться, чтобы в Дальнем Константинове можно было получить современную ветеринарную помощь
                  рядом с домом. Нам важно, чтобы после каждого визита у владельца оставалось ощущение уверенности, а у питомца - спокойствия
                  и заботы.
                </p>
              </div>
            </Motion.div>

            <Motion.div className="section--about__intro" {...itemReveal}>
              <div>
                <CardImageTop
                  image={stepanArticle?.image ?? '/images/articles-optimized/cat-stepan.jpg'}
                  title={stepanArticle?.title ?? 'Кот Степан и редкая аномалия урахуса'}
                  text="История 6-месячного кота Степана: от острой задержки мочи до редкого диагноза, операции и полного восстановления."
                  onRead={() => setActiveArticleId('cat-stepan')}
                />
              </div>
            </Motion.div>
          </div>
        </Container>
      </Motion.section>

      <ServicesSection />
      <ContactsSection />
      <AppointmentSection />

      <ArticleModal article={activeArticle} onClose={() => setActiveArticleId(null)} />
    </>
  )
}

export default DalneeKonstantinovoPage
