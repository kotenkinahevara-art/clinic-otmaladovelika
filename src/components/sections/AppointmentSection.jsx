import { motion as Motion } from 'framer-motion'
import Container from '../ui/Container.jsx'
import AppointmentFaq from './appoitmnet/AppointmentFaq.jsx'
import AppointmentForm from './appoitmnet/AppointmentForm.jsx'
import AppointmentWidget from './appoitmnet/AppointmentWidget.jsx'
import { itemReveal, sectionReveal } from '../ui/motionPresets.js'

function AppointmentSection() {
  return (
    <>
      <Motion.section id="reception" className="section section--appointment-heading" {...sectionReveal}>
        <Container>
          <Motion.h2 className="section__heading" {...itemReveal}>
            Запись на приём
          </Motion.h2>
        </Container>
      </Motion.section>

      <Motion.section className="section section--appointment" {...sectionReveal}>
        <Container>
          <div className="appointment-layout">
            <AppointmentFaq />
            <AppointmentForm />
            <AppointmentWidget />
          </div>
        </Container>
      </Motion.section>
    </>
  )
}

export default AppointmentSection

