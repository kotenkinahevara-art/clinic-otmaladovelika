import ContactsSection from '../components/sections/ContactsSection.jsx'
import AppointmentSection from '../components/sections/AppointmentSection.jsx'
import usePageMeta from '../hooks/usePageMeta.js'

function ContactsPage() {
  usePageMeta({
    title: 'Контакты ветклиники',
    description:
      'Телефоны, адрес, режим работы и карта проезда ветеринарной клиники в Дальнем Константинове.',
    canonicalPath: '/kontakty',
    image: '/images/logo.svg',
  })

  return (
    <>
      <ContactsSection />
      <AppointmentSection />
    </>
  )
}

export default ContactsPage
