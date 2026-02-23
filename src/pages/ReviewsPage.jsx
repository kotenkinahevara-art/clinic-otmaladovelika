import ReviewsSection from '../components/sections/ReviewsSection.jsx'
import usePageMeta from '../hooks/usePageMeta.js'

function ReviewsPage() {
  usePageMeta({
    title: 'Отзывы о клинике',
    description: 'Отзывы владельцев питомцев о работе ветеринарной клиники «Все создания от мала до велика».',
  })

  return <ReviewsSection />
}

export default ReviewsPage
