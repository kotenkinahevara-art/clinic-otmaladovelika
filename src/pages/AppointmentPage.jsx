import AppointmentSection from '../components/sections/AppointmentSection.jsx'
import usePageMeta from '../hooks/usePageMeta.js'

function AppointmentPage() {
  usePageMeta({
    title: 'Запись на приём',
    description: 'Онлайн-запись в ветеринарную клинику: оставьте заявку, и мы подберём удобное время приёма.',
    canonicalPath: '/zapis',
    image: '/images/logo.svg',
  })

  return <AppointmentSection />
}

export default AppointmentPage
