import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Container from '../../ui/Container.jsx'
import DecoratedBlock from '../../ui/DecoratedBlock.jsx'
import useNavLinks from '../../../hooks/useNavLinks.js'
import PolicyModal from '../../ui/PolicyModal.jsx'
import useContactInfo from '../../../hooks/useContactInfo.js'
import vkIcon from '../../../assets/icons/vk-top.svg'
import dogIcon from '../../../assets/icons/dog.svg'
import catIcon from '../../../assets/icons/cat.svg'

function Footer() {
  const [isPolicyOpen, setIsPolicyOpen] = useState(false)
  const { contactInfo } = useContactInfo()
  const { navLinks } = useNavLinks()

  const openPolicy = () => setIsPolicyOpen(true)
  const closePolicy = () => setIsPolicyOpen(false)

  return (
    <>
      <footer className="footer" aria-label="Подвал сайта">
        <div className="footer__decor-wrap" aria-hidden="true">
          <Container>
            <DecoratedBlock className="footer__decor" />
          </Container>
        </div>

        <Container>
          <div className="footer__body">
            <h2 className="footer__title">Забота о близких вот, что действительно важно</h2>

            <div className="footer__grid">
              <nav className="footer__block footer__block--nav" aria-label="Навигация футера">
                <ul className="footer__nav-list">
                  {navLinks.map((item) => (
                    <li key={item.href}>
                      <NavLink to={item.href} end={item.href === '/'}>
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>

              <section className="footer__block footer__block--contacts">
                <p className="footer__text">Нижегородская область, {contactInfo.address}</p>
                <div className="footer__phones">
                  {contactInfo.phones.map((phone) => (
                    <a key={phone} href={`tel:${phone.replace(/[^+\d]/g, '')}`}>
                      {phone}
                    </a>
                  ))}
                </div>
              </section>

              <section className="footer__block footer__block--meta">
                <a href={contactInfo.vkUrl} className="footer__vk" target="_blank" rel="noreferrer" aria-label="ВКонтакте">
                  <img src={vkIcon} alt="" aria-hidden="true" />
                </a>
                <button type="button" className="footer__policy" aria-haspopup="dialog" onClick={openPolicy}>
                  Политика конфиденциальности
                </button>
              </section>
            </div>

            <div className="footer__bottom">
              <p className="footer__copyright footer__copyright--left">Разработано с любовью к животным</p>

              <div className="footer__pets" aria-hidden="true">
                <img src={dogIcon} alt="" className="footer__pet footer__pet--dog" />
                <img src={catIcon} alt="" className="footer__pet footer__pet--cat" />
              </div>

              <p className="footer__copyright footer__copyright--right">@ 2026 Все создания от мала до велика</p>
            </div>
          </div>
        </Container>
      </footer>

      <PolicyModal isOpen={isPolicyOpen} onClose={closePolicy} onAgree={closePolicy} />
    </>
  )
}

export default Footer
