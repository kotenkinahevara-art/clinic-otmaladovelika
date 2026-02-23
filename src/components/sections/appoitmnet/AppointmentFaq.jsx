import CardExpandable from '../../ui/CardExpandable.jsx'
import useRemoteJson from '../../../hooks/useRemoteJson.js'
import { appointmentFaqData } from '../../../data/appointmentFaqData.js'

function AppointmentFaq() {
  const { data } = useRemoteJson('/data/appointment-faq.json', appointmentFaqData)
  const appointmentFaq = Array.isArray(data) ? data : appointmentFaqData

  return (
    <div className="appointment-intro">
      <h3 className="appointment-intro__title">Запишитесь на приём онлайн</h3>
      <p className="appointment-intro__subtitle">Уточним детали и подберём удобное время приёма.</p>

      <div className="appointment-intro__faq">
        {appointmentFaq.map((item) => (
          <CardExpandable key={item.title} title={item.title} variant="light" detailsText={item.details} />
        ))}
      </div>
    </div>
  )
}

export default AppointmentFaq
