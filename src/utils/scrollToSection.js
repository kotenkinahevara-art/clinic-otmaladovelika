const sectionRouteMap = {
  main: '/',
  about: '/o-klinike',
  services: '/uslugi',
  reviews: '/otzyvy',
  articles: '/stati',
  reception: '/zapis',
  contacts: '/kontakty',
}

function scrollToSection(sectionId) {
  const id = sectionId.startsWith('#') ? sectionId.slice(1) : sectionId
  const target = document.getElementById(id)

  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    return
  }

  const nextRoute = sectionRouteMap[id]

  if (nextRoute && window.location.pathname !== nextRoute) {
    window.location.assign(nextRoute)
    return
  }

  window.scrollTo({ top: 0, behavior: 'smooth' })
}

export default scrollToSection
