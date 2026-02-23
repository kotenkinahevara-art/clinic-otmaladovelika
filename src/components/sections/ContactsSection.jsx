import { motion as Motion } from 'framer-motion'
import Container from '../ui/Container.jsx'
import PrimaryButton from '../ui/PrimaryButton.jsx'
import useContactInfo from '../../hooks/useContactInfo.js'
import phoneIcon from '../../assets/icons/phone.svg'
import mapIcon from '../../assets/icons/map.svg'
import clockIcon from '../../assets/icons/clock.svg'
import vkIcon from '../../assets/icons/vk-btn.svg'
import { itemReveal, listStagger, sectionReveal } from '../ui/motionPresets.js'

const routeUrl =
  'https://yandex.ru/maps/?ll=44.094253%2C55.811492&mode=routes&routes%5BignoreTravelModes%5D=bicycle%2Cscooter&rtext=~55.811533%2C44.093931&rtt=comparison&ruri=~ymapsbm1%3A%2F%2Forg%3Foid%3D32340767230&z=19.89'

const mapWidgetUrl =
  'https://yandex.ru/map-widget/v1/?ll=44.094253%2C55.811492&z=19&pt=44.093931,55.811533,pm2rdm'

function ContactCard({ card }) {
  return (
    <article className="contacts-card" role="listitem">
      <header className="contacts-card__header">
        <img src={card.icon} alt="" className="contacts-card__icon" aria-hidden="true" />
        <h3 className="contacts-card__title">{card.title}</h3>
      </header>

      <div className="contacts-card__panel">
        {card.id === 'phones'
          ? card.content.map((phone) => (
              <a key={phone} href={`tel:${phone.replace(/[^+\d]/g, '')}`} className="contacts-card__link">
                {phone}
              </a>
            ))
          : card.content.map((line) => (
              <p key={line} className="contacts-card__text">
                {line}
              </p>
            ))}
      </div>
    </article>
  )
}

function ContactsSection() {
  const { contactInfo } = useContactInfo()

  const contactCards = [
    {
      id: 'phones',
      icon: phoneIcon,
      title: 'Телефоны для связи',
      content: contactInfo.phones,
    },
    {
      id: 'address',
      icon: mapIcon,
      title: 'Адрес клиники',
      content: ['Нижегородская область,', contactInfo.address],
    },
    {
      id: 'hours',
      icon: clockIcon,
      title: 'Режим работы',
      content: contactInfo.workHours,
    },
  ]

  const socialLinks = [
    {
      id: 'vk',
      icon: vkIcon,
      label: 'Мы ВКонтакте',
      href: contactInfo.vkUrl,
    },
  ]

  const leftColumnCards = contactCards.slice(0, 2)
  const hoursCard = contactCards[2]

  return (
    <Motion.section id="contacts" className="section section--contacts" {...sectionReveal}>
      <Container>
        <Motion.h2 className="section__heading" {...itemReveal}>
          Контакты
        </Motion.h2>

        <Motion.div className="contacts__layout" aria-label="Контакты клиники" variants={listStagger} initial="initial" whileInView="whileInView" viewport={listStagger.viewport}>
          <Motion.div className="contacts__column contacts__column--left" role="list" variants={itemReveal}>
            {leftColumnCards.map((card) => (
              <ContactCard key={card.id} card={card} />
            ))}
          </Motion.div>

          <Motion.div className="contacts__column contacts__column--right" role="list" variants={itemReveal}>
            <ContactCard card={hoursCard} />

            <div className="contacts__actions">
              {socialLinks.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  className="btn btn--violet btn--xl contacts__action-btn"
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={item.icon} alt="" className="contacts__action-icon" aria-hidden="true" />
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </Motion.div>
        </Motion.div>

        <Motion.div className="contacts__map" {...itemReveal}>
          <iframe
            title="Карта расположения ветеринарной клиники"
            src={mapWidgetUrl}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Motion.div>

        <Motion.div className="contacts__map-actions" {...itemReveal}>
          <PrimaryButton variant="cta" size="md" onClick={() => window.open(routeUrl, '_blank', 'noopener,noreferrer')}>
            Построить маршрут
          </PrimaryButton>
        </Motion.div>
      </Container>
    </Motion.section>
  )
}

export default ContactsSection

