import { motion as Motion } from 'framer-motion'
import Container from '../ui/Container.jsx'
import PrimaryButton from '../ui/PrimaryButton.jsx'
import DecoratedBlock from '../ui/DecoratedBlock.jsx'
import OpenNowWidget from '../ui/OpenNowWidget.jsx'
import useContactInfo from '../../hooks/useContactInfo.js'
import { itemReveal } from '../ui/motionPresets.js'
import scrollToSection from '../../utils/scrollToSection.js'

function HeroSection() {
  const { contactInfo } = useContactInfo()

  const goToReception = () => {
    scrollToSection('reception')
  }

  return (
    <section id="main" className="section--hero">
      <div className="section--hero__decor-wrap" aria-hidden="true">
        <Container>
          <DecoratedBlock className="section--hero__decor" />
        </Container>
      </div>

      <Container>
        <div className="section--hero__layout">
          <Motion.div className="section--hero__left" {...itemReveal}>
            <h1 className="section--hero__title">
              Все создания<br /> от мала до велика
            </h1>
            <p className="section--hero__subtitle">
              Ветеринарная клиника<br /> в Дальнем Константинове
            </p>
          </Motion.div>

          <Motion.div className="section--hero__right" {...itemReveal}>
            <OpenNowWidget workHours={contactInfo.workHours} />

            <div className="section--hero__button">
              <PrimaryButton size="md" variant="primary" onClick={goToReception}>
                Записаться на приём
              </PrimaryButton>
            </div>
          </Motion.div>
        </div>
      </Container>
    </section>
  )
}

export default HeroSection


