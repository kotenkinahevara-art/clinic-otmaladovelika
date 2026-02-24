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

export default ArticleCardSkeleton
