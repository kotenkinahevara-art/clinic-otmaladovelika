import HeroSection from '../components/sections/HeroSection.jsx'
import AboutSection from '../components/sections/AboutSection.jsx'
import ServicesSection from '../components/sections/ServicesSection.jsx'
import ReviewsSection from '../components/sections/ReviewsSection.jsx'
import ArticlesSection from '../components/sections/ArticlesSection.jsx'
import AppointmentSection from '../components/sections/AppointmentSection.jsx'
import ContactsSection from '../components/sections/ContactsSection.jsx'
import usePageMeta from '../hooks/usePageMeta.js'

function HomePage() {
  usePageMeta({
    title: 'Ветеринарная клиника в Дальнем Константинове',
    description: 'Приём, диагностика, хирургия, профилактика и онлайн-запись в ветеринарной клинике «Все создания от мала до велика».',
  })

  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ReviewsSection />
      <ArticlesSection />
      <AppointmentSection />
      <ContactsSection />
    </>
  )
}

export default HomePage
