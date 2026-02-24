import { useMemo } from 'react'
import { motion as Motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import PrimaryButton from '../../ui/PrimaryButton.jsx'
import CardImageTop from '../../ui/CardImageTop.jsx'
import DataState from '../../ui/DataState.jsx'
import ArticlesFilters from './ArticlesFilters.jsx'
import { itemReveal } from '../../ui/motionPresets.js'
import {
  articleAnimalLabels,
  articleAnimalOrder,
  articleCategoryLabels,
  articleCategoryOrder,
  createArticlePreview,
  sanitizeArticleSummary,
} from '../../../data/articlesModel.js'
import scrollToSection from '../../../utils/scrollToSection.js'
import ArticleCardSkeleton from './ArticleCardSkeleton.jsx'

const INITIAL_VISIBLE = 3
const VISIBLE_STEP = 3

const normalize = (value) => String(value ?? '').toLowerCase().trim()

function ArticlesCatalogView({ articles, isLoading, isError, reload, onRead }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const items = useMemo(() => articles.map(sanitizeArticleSummary), [articles])

  const query = searchParams.get('q') ?? ''
  const activeCategory = searchParams.get('category')?.trim() || 'all'
  const activeAnimal = searchParams.get('animal')?.trim() || 'all'

  const visibleCount = useMemo(() => {
    const raw = Number.parseInt(searchParams.get('limit') ?? `${INITIAL_VISIBLE}`, 10)
    if (Number.isNaN(raw)) return INITIAL_VISIBLE
    return Math.max(INITIAL_VISIBLE, raw)
  }, [searchParams])

  const categoryOptions = useMemo(() => {
    const categories = new Set(['all'])

    for (const article of items) {
      if (article.category) categories.add(article.category)
    }

    const ordered = articleCategoryOrder.filter((value) => categories.has(value))
    const tail = Array.from(categories).filter((value) => !articleCategoryOrder.includes(value))

    return [...ordered, ...tail].map((value) => ({
      value,
      label: articleCategoryLabels[value] ?? value,
    }))
  }, [items])

  const animalOptions = useMemo(
    () =>
      articleAnimalOrder.map((value) => ({
        value,
        label: articleAnimalLabels[value] ?? value,
      })),
    [],
  )

  const filteredArticles = useMemo(() => {
    const normalizedQuery = normalize(query)
    const matched = items.filter((article) => {
      const categoryMatches = activeCategory === 'all' || article.category === activeCategory
      const animalMatches = activeAnimal === 'all' || article.animal === activeAnimal

      if (!categoryMatches || !animalMatches) return false
      if (!normalizedQuery) return true

      const title = normalize(article.title)
      const text = normalize(article.excerpt)

      return title.includes(normalizedQuery) || text.includes(normalizedQuery)
    })

    return matched.sort((a, b) => {
      if (a.id === 'cat-stepan') return -1
      if (b.id === 'cat-stepan') return 1
      return 0
    })
  }, [items, activeCategory, activeAnimal, query])

  const visibleArticles = filteredArticles.slice(0, visibleCount)
  const hasMore = filteredArticles.length > visibleCount
  const canClose = visibleCount > INITIAL_VISIBLE && filteredArticles.length > INITIAL_VISIBLE
  const hasActiveFilters = Boolean(query.trim()) || activeCategory !== 'all' || activeAnimal !== 'all'

  const updateFilters = ({
    nextQuery = query,
    nextCategory = activeCategory,
    nextAnimal = activeAnimal,
    nextLimit = INITIAL_VISIBLE,
  }) => {
    const nextParams = new URLSearchParams(searchParams)

    if (nextQuery.trim()) {
      nextParams.set('q', nextQuery)
    } else {
      nextParams.delete('q')
    }

    if (nextCategory && nextCategory !== 'all') {
      nextParams.set('category', nextCategory)
    } else {
      nextParams.delete('category')
    }

    if (nextAnimal && nextAnimal !== 'all') {
      nextParams.set('animal', nextAnimal)
    } else {
      nextParams.delete('animal')
    }

    if (nextLimit > INITIAL_VISIBLE) {
      nextParams.set('limit', String(nextLimit))
    } else {
      nextParams.delete('limit')
    }

    setSearchParams(nextParams, { replace: true, preventScrollReset: true })
  }

  const handleCollapse = () => {
    updateFilters({ nextLimit: INITIAL_VISIBLE })
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
      <Motion.div {...itemReveal}>
        <ArticlesFilters
          query={query}
          onQueryChange={(nextQuery) => updateFilters({ nextQuery, nextLimit: INITIAL_VISIBLE })}
          categoryOptions={categoryOptions}
          activeCategory={activeCategory}
          onCategoryChange={(nextCategory) => updateFilters({ nextCategory, nextLimit: INITIAL_VISIBLE })}
          animalOptions={animalOptions}
          activeAnimal={activeAnimal}
          onAnimalChange={(nextAnimal) => updateFilters({ nextAnimal, nextLimit: INITIAL_VISIBLE })}
        />
      </Motion.div>

      <Motion.div className="articles__meta" {...itemReveal}>
        <p className="articles__summary">
          Показано {visibleArticles.length} из {filteredArticles.length}
        </p>

        {hasActiveFilters ? (
          <button
            type="button"
            className="articles__reset"
            onClick={() =>
              updateFilters({
                nextQuery: '',
                nextCategory: 'all',
                nextAnimal: 'all',
                nextLimit: INITIAL_VISIBLE,
              })
            }
          >
            Сбросить фильтры
          </button>
        ) : null}
      </Motion.div>

      {hasActiveFilters ? (
        <Motion.div className="articles__tags" {...itemReveal}>
          {query.trim() ? <span className="articles__tag">Поиск: {query.trim()}</span> : null}
          {activeCategory !== 'all' ? <span className="articles__tag">Категория: {articleCategoryLabels[activeCategory] ?? activeCategory}</span> : null}
          {activeAnimal !== 'all' ? <span className="articles__tag">Питомец: {articleAnimalLabels[activeAnimal] ?? activeAnimal}</span> : null}
        </Motion.div>
      ) : null}

      {filteredArticles.length === 0 ? (
        <DataState
          className="articles__state"
          title="Ничего не найдено"
          text="Попробуйте изменить запрос или снять фильтр."
          actionLabel={hasActiveFilters ? 'Сбросить фильтры' : undefined}
          onAction={
            hasActiveFilters
              ? () =>
                  updateFilters({
                    nextQuery: '',
                    nextCategory: 'all',
                    nextAnimal: 'all',
                    nextLimit: INITIAL_VISIBLE,
                  })
              : undefined
          }
        />
      ) : (
        <>
          <div className="articles__grid">
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

          {hasMore || canClose ? (
            <Motion.div className="articles__actions" {...itemReveal}>
              {hasMore ? (
                <PrimaryButton variant="cta" size="md" onClick={() => updateFilters({ nextLimit: visibleCount + VISIBLE_STEP })}>
                  Показать ещё
                </PrimaryButton>
              ) : null}

              {canClose ? (
                <PrimaryButton variant="primary" size="md" onClick={handleCollapse}>
                  Закрыть
                </PrimaryButton>
              ) : null}
            </Motion.div>
          ) : null}
        </>
      )}
    </>
  )
}

export default ArticlesCatalogView
