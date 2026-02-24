export const articleCategoryLabels = {
  all: 'Все',
  cases: 'Спасённые нами',
  care: 'Уход',
  behavior: 'Поведение',
  season: 'Сезонные',
}

export const articleAnimalLabels = {
  all: 'Все питомцы',
  cat: 'Коты и кошки',
  dog: 'Собаки',
  parrot: 'Попугаи',
  hamster: 'Хомячки',
}

export const articleCategoryOrder = ['all', 'cases', 'care', 'behavior', 'season']
export const articleAnimalOrder = ['all', 'cat', 'dog', 'parrot', 'hamster']

const normalize = (value) => String(value ?? '').trim()

export function sanitizeArticleSummary(article) {
  return {
    id: normalize(article?.id),
    title: normalize(article?.title),
    image: normalize(article?.image),
    excerpt: normalize(article?.excerpt),
    category: normalize(article?.category) || 'all',
    animal: normalize(article?.animal) || 'all',
    source: article?.source
      ? {
          title: normalize(article.source.title),
          url: normalize(article.source.url),
        }
      : null,
  }
}

export function mergeArticleDetails(summary, details) {
  const cleanSummary = sanitizeArticleSummary(summary)

  return {
    ...cleanSummary,
    sections: Array.isArray(details?.sections) ? details.sections : [],
  }
}

export function createArticlePreview(article) {
  const source = article?.excerpt ?? article?.sections?.[0]?.paragraphs?.[0] ?? ''
  const clean = String(source).replace(/\s+/g, ' ').trim()

  if (!clean) return ''
  if (clean.length <= 190) return `${clean}...`

  return `${clean.slice(0, 190).trimEnd()}...`
}
