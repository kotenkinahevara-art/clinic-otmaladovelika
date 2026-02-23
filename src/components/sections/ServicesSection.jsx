import { useMemo, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import Container from '../ui/Container.jsx'
import CardExpandable from '../ui/CardExpandable.jsx'
import ServiceModal from '../ui/ServiceModal.jsx'
import useRemoteJson from '../../hooks/useRemoteJson.js'
import { servicesData } from '../../data/servicesData.js'
import { itemReveal, sectionReveal } from '../ui/motionPresets.js'

function ServicesSection() {
  const [activeServiceTitle, setActiveServiceTitle] = useState(null)
  const { data } = useRemoteJson('/data/services.json', servicesData)
  const servicesCards = Array.isArray(data) ? data : servicesData

  const activeService = useMemo(
    () => servicesCards.find((service) => service.title === activeServiceTitle) ?? null,
    [servicesCards, activeServiceTitle],
  )

  const openModal = (title) => setActiveServiceTitle(title)
  const closeModal = () => setActiveServiceTitle(null)

  return (
    <Motion.section id="services" className="section section--services" {...sectionReveal}>
      <Container>
        <Motion.div className="services-section__layout" {...itemReveal}>
          <h2 className="section__heading">Наши услуги</h2>
        </Motion.div>

        <div className="cards-grid cards-grid--services">
          {servicesCards.map((card) => (
            <CardExpandable
              key={card.title}
              title={card.title}
              variant={card.variant}
              detailsText={card.detailsText}
              buttonText="Подробнее"
              onDetailsClick={() => openModal(card.title)}
            />
          ))}
        </div>
      </Container>

      <ServiceModal service={activeService} onClose={closeModal} />
    </Motion.section>
  )
}

export default ServicesSection

