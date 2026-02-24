import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import PageHeader from '../components/layout/header/PageHeader.jsx'
import Footer from '../components/layout/footer/Footer.jsx'
import ScrollTopButton from '../components/ui/ScrollTopButton.jsx'

function SiteLayout({ children }) {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  return (
    <>
      <a className="skip-link" href="#main-content">
        Перейти к основному контенту
      </a>
      <PageHeader />
      <main id="main-content">{children}</main>
      <Footer />
      <ScrollTopButton />
    </>
  )
}

export default SiteLayout
