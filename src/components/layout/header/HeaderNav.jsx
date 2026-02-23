import { NavLink } from 'react-router-dom'

function HeaderNav({ links = [] }) {
  return (
    <nav className="header-nav" aria-label="Основная навигация">
      <ul className="nav-links nav-links--desktop">
        {links.map((item) => (
          <li key={item.href} className="nav-links__item">
            <NavLink to={item.href} end={item.href === '/'} className="nav-links__link">
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default HeaderNav
