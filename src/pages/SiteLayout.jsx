import PageHeader from '../components/layout/header/PageHeader.jsx'
import Footer from '../components/layout/footer/Footer.jsx'
import ScrollTopButton from '../components/ui/ScrollTopButton.jsx'

function SiteLayout({ children }) {
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
