import fs from 'node:fs'
import path from 'node:path'

const root = process.cwd()
const dataDir = path.join(root, 'public', 'data', 'articles')
const indexPath = path.join(dataDir, 'index.json')

const categories = new Set(['cases', 'care', 'behavior', 'season'])
const animals = new Set(['all', 'cat', 'dog', 'parrot', 'hamster'])

function fail(message) {
  console.error(message)
  process.exitCode = 1
}

const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'))
const ids = new Set()

for (const article of index) {
  if (!article.id) fail('Article without id in index.json')
  if (ids.has(article.id)) fail(`Duplicate article id: ${article.id}`)
  ids.add(article.id)

  if (!article.title) fail(`Missing title: ${article.id}`)
  if (!article.image) fail(`Missing image: ${article.id}`)
  if (!article.excerpt) fail(`Missing excerpt: ${article.id}`)
  if (!article.category || !categories.has(article.category)) fail(`Invalid category for ${article.id}: ${article.category}`)
  if (!article.animal || !animals.has(article.animal)) fail(`Invalid animal for ${article.id}: ${article.animal}`)

  const imagePath = path.join(root, 'public', article.image.replace(/^\//, ''))
  if (!fs.existsSync(imagePath)) fail(`Missing image file for ${article.id}: ${article.image}`)

  const detailsPath = path.join(dataDir, `${article.id}.json`)
  if (!fs.existsSync(detailsPath)) {
    fail(`Missing details file for ${article.id}`)
    continue
  }

  const details = JSON.parse(fs.readFileSync(detailsPath, 'utf8'))
  if (details.id !== article.id) fail(`Details id mismatch in ${article.id}.json`)
  if (!Array.isArray(details.sections) || details.sections.length === 0) {
    fail(`Details sections are missing for ${article.id}`)
  }
}

if (process.exitCode) {
  console.error('Article validation failed.')
} else {
  console.log(`Article validation passed. ${index.length} articles checked.`)
}
