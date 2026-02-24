import { useMemo, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import PrimaryButton from '../../ui/PrimaryButton.jsx'
import CardImageTop from '../../ui/CardImageTop.jsx'
import DataState from '../../ui/DataState.jsx'
import { itemReveal } from '../../ui/motionPresets.js'
import { createArticlePreview, sanitizeArticleSummary } from '../../../data/articlesModel.js'
import scrollToSection from '../../../utils/scrollToSection.js'
import ArticleCardSkeleton from './ArticleCardSkeleton.jsx'

const HOME_VISIBLE = 3

function ArticlesHomeView({ articles, isLoading, isError, reload, onRead, onMore }) {
  const [offset, setOffset] = useState(0)
  const items = useMemo(() => {
    return articles
      .map(sanitizeArticleSummary)
      .sort((a, b) => {
        if (a.id === 'cat-stepan') return -1
        if (b.id === 'cat-stepan') return 1
        return 0
      })
  }, [articles])

  const visibleArticles = useMemo(() => {
    if (items.length <= HOME_VISIBLE) return items

    const safeOffset = offset % items.length
    const chunk = items.slice(safeOffset, safeOffset + HOME_VISIBLE)

    if (chunk.length === HOME_VISIBLE) return chunk
    return [...chunk, ...items.slice(0, HOME_VISIBLE - chunk.length)]
  }, [items, offset])

  const hasSwap = items.length > HOME_VISIBLE

  const handleNext = () => {
    setOffset((prev) => (prev + HOME_VISIBLE) % items.length)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => scrollToSection('articles'))
    })
  }

  if (isLoading) {
    return (
      <div className="articles__grid" aria-live="polite" aria-busy="true">
        <ArticleCardSkeleton />
        <ArticleCardSkeleton />
        <ArticleCardSkeleton />
      </div>
    )
  }

  if (isError) {
    return (
      <DataState
        className="articles__state"
        title="Не удалось загрузить статьи"
        text="Проверьте подключение и попробуйте снова."
        actionLabel="Повторить"
        onAction={reload}
      />
    )
  }

  if (!items.length) {
    return <DataState className="articles__state" title="Пока нет доступных статей" text="Добавьте статьи в index.json, и они появятся в этом блоке." />
  }

  return (
    <>
      <div className="articles__grid articles__grid--home">
        {visibleArticles.map((article) => (
          <CardImageTop
            key={article.id}
            image={article.image}
            title={article.title}
            text={createArticlePreview(article)}
            onRead={() => onRead(article.id)}
          />
        ))}
      </div>

      <Motion.div className="articles__actions" {...itemReveal}>
        <PrimaryButton variant="cta" size="md" onClick={onMore}>
          Больше статей
        </PrimaryButton>
        {hasSwap ? (
          <PrimaryButton variant="violet" size="md" onClick={handleNext}>
            Следующие статьи
          </PrimaryButton>
        ) : null}
      </Motion.div>
    </>
  )
}

export default ArticlesHomeView
