import vkIconTop from '../../../assets/icons/vk-top.svg'
import BurgerButton from './BurgerButton'
import PrimaryButton from '../../ui/PrimaryButton.jsx'

function HeaderTop({ isOpen, onToggleMenu, contactInfo }) {
  const callClinic = () => {
    const primaryPhone = contactInfo.phones[0]
    const tel = primaryPhone.replace(/[^+\d]/g, '')
    window.location.href = `tel:${tel}`
  }

  return (
    <div className="header-top">
      <div className="header-top__logo">
        <img src="/images/logo.svg" alt="Логотип" className="logo" />
        <span className="header-top__tagline">Забота рядом</span>
      </div>

      <div className="header-top__address">
        {contactInfo.address}
      </div>
      <div className="header-top__phones">
        {contactInfo.phones.map((phone) => (
          <a key={phone} href={`tel:${phone.replace(/[^+\d]/g, '')}`}>
            {phone}
          </a>
        ))}
      </div>

      <div className="header-top__icon-social">
        <a href={contactInfo.vkUrl} aria-label="ВКонтакте" target="_blank" rel="noreferrer">
          <img src={vkIconTop} alt="ВКонтакте" className="header-top__social" />
        </a>

        <PrimaryButton size="sm" variant="secondary" onClick={callClinic}>
          Позвонить
        </PrimaryButton>
      </div>

      <BurgerButton isOpen={isOpen} onClick={onToggleMenu} />
    </div>
  )
}

export default HeaderTop
