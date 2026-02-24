import { useEffect, useMemo, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Container from '../ui/Container.jsx'
import ArticleModal from '../ui/ArticleModal.jsx'
import useRemoteJson from '../../hooks/useRemoteJson.js'
import { itemReveal, sectionReveal } from '../ui/motionPresets.js'
import { mergeArticleDetails, sanitizeArticleSummary } from '../../data/articlesModel.js'
import ArticlesHomeView from './articles/ArticlesHomeView.jsx'
import ArticlesCatalogView from './articles/ArticlesCatalogView.jsx'

function ArticlesSection({ mode = 'full' }) {
  const [activeArticleId, setActiveArticleId] = useState(null)
  const navigate = useNavigate()

  const { data, isLoading, isError, reload } = useRemoteJson('/data/articles/index.json', [])
  const { data: activeArticleData } = useRemoteJson(
    activeArticleId ? `/data/articles/${activeArticleId}.json` : '',
    null,
    { enabled: Boolean(activeArticleId) },
  )

  const articles = useMemo(() => {
    if (!Array.isArray(data)) return []
    return data.map(sanitizeArticleSummary)
  }, [data])

  useEffect(() => {
    if (!activeArticleId) return
    if (!articles.some((article) => article.id === activeArticleId)) {
      setActiveArticleId(null)
    }
  }, [articles, activeArticleId])

  const activeArticle = useMemo(() => {
    if (!activeArticleData || activeArticleData.id !== activeArticleId) return null

    const summary = articles.find((article) => article.id === activeArticleId)
    if (!summary) return null

    return mergeArticleDetails(summary, activeArticleData)
  }, [activeArticleData, activeArticleId, articles])

  return (
    <Motion.section id="articles" className="section section--articles" {...sectionReveal}>
      <Container>
        <Motion.h2 className="section__heading" {...itemReveal}>
          Статьи
        </Motion.h2>

        {mode === 'home' ? (
          <ArticlesHomeView
            articles={articles}
            isLoading={isLoading}
            isError={isError}
            reload={reload}
            onRead={setActiveArticleId}
            onMore={() => navigate('/stati')}
          />
        ) : (
          <ArticlesCatalogView
            articles={articles}
            isLoading={isLoading}
            isError={isError}
            reload={reload}
            onRead={setActiveArticleId}
          />
        )}
      </Container>

      <ArticleModal article={activeArticle} onClose={() => setActiveArticleId(null)} />
    </Motion.section>
  )
}

export default ArticlesSection
