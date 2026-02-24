function ArticlesFilters({
  query,
  onQueryChange,
  categoryOptions,
  activeCategory,
  onCategoryChange,
  animalOptions,
  activeAnimal,
  onAnimalChange,
}) {
  return (
    <div className="articles-filters" aria-label="Фильтры статей">
      <div className="articles-filters__group">
        <p className="articles-filters__group-title">Категория</p>
        <div className="articles-filters__chips" role="tablist" aria-label="Фильтр статей по категории">
          {categoryOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`btn ${activeCategory === option.value ? 'btn--cta' : 'btn--primary'} btn--sm`}
              onClick={() => onCategoryChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="articles-filters__group">
        <p className="articles-filters__group-title">Питомец</p>
        <div className="articles-filters__chips" role="tablist" aria-label="Фильтр статей по животному">
          {animalOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`btn ${activeAnimal === option.value ? 'btn--cta' : 'btn--primary'} btn--sm`}
              onClick={() => onAnimalChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <label className="articles-filters__search">
        <span className="articles-filters__label">Поиск по статьям</span>
        <input
          className="articles-filters__input"
          type="search"
          value={query}
          placeholder="Например: кот, операция, стресс"
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </label>
    </div>
  )
}

export default ArticlesFilters
