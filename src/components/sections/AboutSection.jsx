import { motion as Motion } from 'framer-motion'
import BasicCard from '../ui/Card'
import Container from '../ui/Container.jsx'
import PrimaryButton from '../ui/PrimaryButton.jsx'
import { itemReveal, listStagger, sectionReveal } from '../ui/motionPresets.js'
import scrollToSection from '../../utils/scrollToSection.js'
import { Link } from 'react-router-dom'

function AboutSection() {
  const goToContacts = () => {
    scrollToSection('contacts')
  }
  const goToReception = () => {
    scrollToSection('reception')
  }

  return (
    <Motion.section id="about" className="section section--about" {...sectionReveal}>
      <Container>
        <div className="section--about__layout">
          <Motion.div className="section--about__intro" {...itemReveal}>
            <h2 className="section__heading">О клинике</h2>
            <div className="intro__content">
              <p>
                «Все создания от мала до велика» — современная, активно развивающаяся ветеринарная клиника, где каждый день мы лечим,
                помогаем и спасаем жизни животных. Для нас важно не просто оказать услугу, а действительно позаботиться о здоровье и
                благополучии каждого пациента.
              </p>
              <p>
                В нашей клинике помощь получают не только кошки и собаки, но и самые необычные питомцы. Мы работаем с разными видами
                животных и подбираем индивидуальный подход к каждому из них, учитывая особенности и потребности.
              </p>
              <p>
                Мы понимаем, как сильно питомцы могут бояться врачей и незнакомой обстановки. Поэтому в «Все создания от мала до велика»
                мы создаём спокойную и безопасную атмосферу, в которой животные чувствуют заботу, внимание и доверие, а владельцы —
                уверенность и спокойствие за своих любимцев.
              </p>
              <p>
                Хотите узнать больше о клинике?{' '}
                <Link to="/vetklinika-v-dalnem-konstantinove">ветклиника в Дальнем Константинове</Link>.
              </p>
            </div>
          </Motion.div>

          <Motion.div className="cards-grid cards-grid--about" variants={listStagger} initial="initial" whileInView="whileInView" viewport={listStagger.viewport}>
            <Motion.div variants={itemReveal}>
              <BasicCard
                title="Мы поддерживаем волонтеров"
                text="Предлагаем льготные цены на услуги для волонтеров"
                variant="purple"
              />
            </Motion.div>

            <Motion.div variants={itemReveal}>
              <BasicCard
                title="Скидка 50% для пенсионеров"
                text="Только по средам, по предварительной записи. Акция распространяется на услугу кастрации и стерилизации домашних животных"
                variant="green"
              />
            </Motion.div>

            <Motion.div variants={itemReveal} className="about-buttons">
              <PrimaryButton size="xl" variant="cta" onClick={goToContacts}>
                Подробнее
              </PrimaryButton>

              <PrimaryButton size="xl" variant="cta" onClick={goToReception}>
                Записаться на приём
              </PrimaryButton>
            </Motion.div>
          </Motion.div>
        </div>
      </Container>
    </Motion.section>
  )
}

export default AboutSection


