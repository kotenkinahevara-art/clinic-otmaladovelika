import ReviewsSection from '../components/sections/ReviewsSection.jsx'
import AppointmentSection from '../components/sections/AppointmentSection.jsx'
import usePageMeta from '../hooks/usePageMeta.js'

function ReviewsPage() {
  usePageMeta({
    title: 'Отзывы о клинике',
    description:
      'Отзывы владельцев питомцев о работе ветеринарной клиники «Все создания от мала до велика».',
    canonicalPath: '/otzyvy',
    image: '/images/logo.svg',
  })

  return (
    <>
      <ReviewsSection />
      <AppointmentSection />
    </>
  )
}

export default ReviewsPage
