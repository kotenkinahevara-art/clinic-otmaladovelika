import ServicesSection from '../components/sections/ServicesSection.jsx'
import usePageMeta from '../hooks/usePageMeta.js'

function ServicesPage() {
  usePageMeta({
    title: 'Услуги ветклиники',
    description: 'Дерматология, терапия, хирургия, вакцинация, диагностика, профилактика, аптека и выезд на дом.',
  })

  return <ServicesSection />
}

export default ServicesPage
