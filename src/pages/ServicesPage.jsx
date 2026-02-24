import ServicesSection from '../components/sections/ServicesSection.jsx'
import AppointmentSection from '../components/sections/AppointmentSection.jsx'
import usePageMeta from '../hooks/usePageMeta.js'

function ServicesPage() {
  usePageMeta({
    title: 'Услуги ветклиники',
    description:
      'Терапия, хирургия, вакцинация, диагностика, профилактика, аптека и выезд на дом в Дальнем Константинове.',
    canonicalPath: '/uslugi',
    image: '/images/logo.svg',
  })

  return (
    <>
      <ServicesSection />
      <AppointmentSection />
    </>
  )
}

export default ServicesPage
