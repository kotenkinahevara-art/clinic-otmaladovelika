import { useEffect } from 'react'

const SITE_NAME = 'Все создания от мала до велика'
const SITE_URL = 'https://www.vetotmaladovelika.ru'
const DEFAULT_IMAGE = '/images/logo.svg'

function upsertMetaTag(name, content) {
  let element = document.querySelector(`meta[name="${name}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute('name', name)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function upsertOgTag(property, content) {
  let element = document.querySelector(`meta[property="${property}"]`)

  if (!element) {
    element = document.createElement('meta')
    element.setAttribute('property', property)
    document.head.appendChild(element)
  }

  element.setAttribute('content', content)
}

function upsertCanonical(url) {
  let element = document.querySelector('link[rel="canonical"]')

  if (!element) {
    element = document.createElement('link')
    element.setAttribute('rel', 'canonical')
    document.head.appendChild(element)
  }

  element.setAttribute('href', url)
}

function upsertJsonLd(id, payload) {
  let element = document.querySelector(`script[type="application/ld+json"][data-seo-id="${id}"]`)

  if (!element) {
    element = document.createElement('script')
    element.setAttribute('type', 'application/ld+json')
    element.setAttribute('data-seo-id', id)
    document.head.appendChild(element)
  }

  element.textContent = JSON.stringify(payload)
}

function toAbsoluteUrl(value) {
  if (!value) return `${SITE_URL}${DEFAULT_IMAGE}`
  if (/^https?:\/\//i.test(value)) return value

  const path = value.startsWith('/') ? value : `/${value}`
  return `${SITE_URL}${path}`
}

function usePageMeta({
  title,
  description,
  canonicalPath,
  image = DEFAULT_IMAGE,
  ogType = 'website',
  robots = 'index, follow',
  jsonLd,
}) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`
    const currentPath = canonicalPath || window.location.pathname
    const canonicalUrl = `${SITE_URL}${currentPath}`
    const imageUrl = toAbsoluteUrl(image)

    document.title = fullTitle

    upsertMetaTag('description', description)
    upsertMetaTag('robots', robots)

    upsertOgTag('og:title', fullTitle)
    upsertOgTag('og:description', description)
    upsertOgTag('og:url', canonicalUrl)
    upsertOgTag('og:type', ogType)
    upsertOgTag('og:site_name', SITE_NAME)
    upsertOgTag('og:locale', 'ru_RU')
    upsertOgTag('og:image', imageUrl)

    upsertMetaTag('twitter:card', 'summary_large_image')
    upsertMetaTag('twitter:title', fullTitle)
    upsertMetaTag('twitter:description', description)
    upsertMetaTag('twitter:image', imageUrl)

    upsertCanonical(canonicalUrl)

    upsertJsonLd('webpage',
      jsonLd ?? {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: fullTitle,
        description,
        url: canonicalUrl,
      },
    )
  }, [title, description, canonicalPath, image, ogType, robots, jsonLd])
}

export default usePageMeta
