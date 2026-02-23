import { useState } from 'react'
import Container from '../../ui/Container.jsx'
import HeaderTop from './HeaderTop.jsx'
import HeaderNav from './HeaderNav.jsx'
import MobileMenu from './MobileMenu.jsx'
import useContactInfo from '../../../hooks/useContactInfo.js'
import useNavLinks from '../../../hooks/useNavLinks.js'

function PageHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const { contactInfo } = useContactInfo()
  const { navLinks } = useNavLinks()

  const toggleMenu = () => setIsOpen((prev) => !prev)
  const closeMenu = () => setIsOpen(false)

  return (
    <header className="header">
      <Container>
        <HeaderTop isOpen={isOpen} onToggleMenu={toggleMenu} contactInfo={contactInfo} />
        <HeaderNav links={navLinks} />
      </Container>
      <MobileMenu isOpen={isOpen} onClose={closeMenu} links={navLinks} onLinkClick={closeMenu} contactInfo={contactInfo} />
    </header>
  )
}

export default PageHeader
