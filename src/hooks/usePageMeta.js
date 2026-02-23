import { useEffect } from 'react'

const SITE_NAME = 'Все создания от мала до велика'

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

function usePageMeta({ title, description }) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`
    const canonicalUrl = `${window.location.origin}${window.location.pathname}`

    document.title = fullTitle
    upsertMetaTag('description', description)
    upsertOgTag('og:title', fullTitle)
    upsertOgTag('og:description', description)
    upsertOgTag('og:url', canonicalUrl)
    upsertMetaTag('twitter:title', fullTitle)
    upsertMetaTag('twitter:description', description)
    upsertCanonical(canonicalUrl)
  }, [title, description])
}

export default usePageMeta
