import ContactsSection from '../components/sections/ContactsSection.jsx'
import usePageMeta from '../hooks/usePageMeta.js'

function ContactsPage() {
  usePageMeta({
    title: 'Контакты ветклиники',
    description: 'Телефоны, адрес, режим работы и карта проезда ветеринарной клиники в Дальнем Константинове.',
  })

  return <ContactsSection />
}

export default ContactsPage
