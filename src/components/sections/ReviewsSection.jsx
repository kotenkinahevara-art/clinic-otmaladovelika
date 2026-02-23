import { motion as Motion } from 'framer-motion'
import Container from '../ui/Container.jsx'
import BasicCard from '../ui/Card.jsx'
import twoGisIcon from '../../assets/icons/2gis-seeklogo.svg'
import yandexIcon from '../../assets/icons/yandex-maps-seeklogo.svg'
import useRemoteJson from '../../hooks/useRemoteJson.js'
import { reviewsCardsData, reviewsLinksData } from '../../data/reviewsData.js'
import { itemReveal, sectionReveal } from '../ui/motionPresets.js'

const iconMap = {
  '2gis': twoGisIcon,
  yandex: yandexIcon,
}

function ReviewsSection() {
  const { data } = useRemoteJson('/data/reviews.json', { cards: reviewsCardsData, links: reviewsLinksData })
  const reviewsCards = Array.isArray(data?.cards) ? data.cards : reviewsCardsData
  const reviewsLinks = Array.isArray(data?.links) ? data.links : reviewsLinksData

  return (
    <Motion.section id="reviews" className="section section--reviews" {...sectionReveal}>
      <Container>
        <Motion.h2 className="section__heading" {...itemReveal}>
          Отзывы
        </Motion.h2>

        <div className="reviews__cards" role="list" aria-label="Отзывы клиентов">
          {reviewsCards.map((review) => (
            <BasicCard key={review.title} title={review.title} variant={review.variant} className="review-card">
              <div className="review-card__text-wrap">
                <p className="review-card__text">{review.text}</p>
                <div className="review-card__shade" aria-hidden="true" />
              </div>
            </BasicCard>
          ))}
        </div>

        <Motion.p className="reviews__hint" {...itemReveal}>
          Листайте карточки, чтобы посмотреть отзывы
        </Motion.p>

        <div className="reviews__links">
          {reviewsLinks.map((link) => (
            <a key={link.alt} href={link.href} className="reviews__link-btn" target="_blank" rel="noreferrer">
              <img src={iconMap[link.icon] ?? twoGisIcon} alt={link.alt} className="reviews__link-icon" />
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </Container>
    </Motion.section>
  )
}

export default ReviewsSection

