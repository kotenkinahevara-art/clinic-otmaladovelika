import { useEffect, useMemo, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import Container from '../ui/Container.jsx'
import PrimaryButton from '../ui/PrimaryButton.jsx'
import CardImageTop from '../ui/CardImageTop.jsx'
import ArticleModal from '../ui/ArticleModal.jsx'
import DataState from '../ui/DataState.jsx'
import useRemoteJson from '../../hooks/useRemoteJson.js'
import { itemReveal, sectionReveal } from '../ui/motionPresets.js'

const createPreview = (sections) => {
  const firstParagraph = sections?.[0]?.paragraphs?.[0] ?? ''
  const clean = firstParagraph.replace(/\s+/g, ' ').trim()
  if (!clean) return ''
  if (clean.length <= 190) return `${clean}...`
  return `${clean.slice(0, 190).trimEnd()}...`
}

function ArticleCardSkeleton() {
  return (
    <article className="card card--orange article-card article-card--skeleton" aria-hidden="true">
      <div className="article-card__image skeleton-block" />
      <div className="article-card__body">
        <div className="skeleton-line skeleton-line--title" />
        <div className="skeleton-line" />
        <div className="skeleton-line skeleton-line--short" />
      </div>
    </article>
  )
}

function ArticlesSection() {
  const [activeArticleId, setActiveArticleId] = useState(null)
  const { data, isLoading, isError, reload } = useRemoteJson('/data/articles.json', [])

  const articles = useMemo(() => (Array.isArray(data) ? data : []), [data])

  useEffect(() => {
    if (!activeArticleId) return
    if (!articles.some((article) => article.id === activeArticleId)) {
      setActiveArticleId(null)
    }
  }, [articles, activeArticleId])

  const activeArticle = useMemo(() => articles.find((article) => article.id === activeArticleId) ?? null, [articles, activeArticleId])

  const hasEmptyState = !isLoading && !isError && articles.length === 0

  return (
    <Motion.section id="articles" className="section section--articles" {...sectionReveal}>
      <Container>
        <Motion.h2 className="section__heading" {...itemReveal}>
          Статьи
        </Motion.h2>

        {isLoading ? (
          <div className="articles__grid" aria-live="polite" aria-busy="true">
            <ArticleCardSkeleton />
            <ArticleCardSkeleton />
            <ArticleCardSkeleton />
          </div>
        ) : null}

        {isError ? (
          <DataState
            className="articles__state"
            title="Не удалось загрузить статьи"
            text="Проверьте подключение и попробуйте снова."
            actionLabel="Повторить"
            onAction={reload}
          />
        ) : null}

        {hasEmptyState ? (
          <DataState className="articles__state" title="Пока нет доступных статей" text="Добавьте статьи в JSON, и они появятся в этом блоке." />
        ) : null}

        {!isLoading && !isError && articles.length > 0 ? (
          <>
            <div className="articles__grid">
              {articles.map((article) => (
                <CardImageTop
                  key={article.id}
                  image={article.image}
                  title={article.title}
                  text={createPreview(article.sections)}
                  onRead={() => setActiveArticleId(article.id)}
                />
              ))}
            </div>

            <Motion.div className="articles__actions" {...itemReveal}>
              <PrimaryButton variant="cta" size="md">
                Больше статей
              </PrimaryButton>
            </Motion.div>
          </>
        ) : null}
      </Container>

      <ArticleModal article={activeArticle} onClose={() => setActiveArticleId(null)} />
    </Motion.section>
  )
}

export default ArticlesSection

