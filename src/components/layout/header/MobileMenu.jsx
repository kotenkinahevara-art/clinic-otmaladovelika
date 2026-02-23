import { useEffect, useRef } from 'react'
import { AnimatePresence, motion as Motion } from 'framer-motion'
import { NavLink, useLocation } from 'react-router-dom'
import vkIconTop from '../../../assets/icons/vk-top-orange.svg'
import PrimaryButton from '../../ui/PrimaryButton.jsx'
import useDialogA11y from '../../ui/useDialogA11y'

function MobileMenu({ isOpen, onClose, links = [], onLinkClick, contactInfo }) {
  const menuRef = useRef(null)
  const location = useLocation()

  useDialogA11y({ isOpen, onClose, containerRef: menuRef, lockBodyClass: 'no-scroll' })

  useEffect(() => {
    if (isOpen) {
      onClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  const callClinic = () => {
    const primaryPhone = contactInfo.phones[0]
    const tel = primaryPhone.replace(/[^+\d]/g, '')
    window.location.href = `tel:${tel}`
  }

  return (
    <AnimatePresence>
      {isOpen ? (
        <Motion.div
          id="mobile-menu"
          ref={menuRef}
          className="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Мобильное меню"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          <nav aria-label="Разделы сайта">
            <Motion.ul
              className="nav-links nav-links--mobile"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.04 } },
              }}
            >
              {links.map((item) => (
                <Motion.li
                  key={item.href}
                  className="nav-links__item"
                  variants={{ hidden: { opacity: 0, x: -10 }, show: { opacity: 1, x: 0 } }}
                >
                  <NavLink
                    to={item.href}
                    end={item.href === '/'}
                    onClick={onLinkClick}
                    className={({ isActive }) => `nav-links__link ${isActive ? 'nav-links__link--active' : ''}`.trim()}
                  >
                    {item.label}
                  </NavLink>
                </Motion.li>
              ))}
            </Motion.ul>
          </nav>

          <Motion.div
            className="mobile-menu__meta"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.18, delay: 0.06 }}
          >
            <div className="mobile-menu__group">
              <p className="mobile-menu__address">{contactInfo.address}</p>
            </div>

            <div className="mobile-menu__group mobile-menu__phones">
              {contactInfo.phones.map((phone) => (
                <a key={phone} href={`tel:${phone.replace(/[^+\d]/g, '')}`}>
                  {phone}
                </a>
              ))}
            </div>

            <div className="mobile-menu__group mobile-menu__actions">
              <a className="mobile-menu__social" href={contactInfo.vkUrl} aria-label="ВКонтакте" target="_blank" rel="noreferrer">
                <img src={vkIconTop} alt="" />
              </a>

              <PrimaryButton variant="secondary" size="sm" onClick={callClinic}>
                Позвонить
              </PrimaryButton>
            </div>
          </Motion.div>
        </Motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default MobileMenu
