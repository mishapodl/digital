import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import styles from './Header.module.scss'

import { RoutesConfig } from '../../routes/routeConfig'

const menuItems = [
  { item: RoutesConfig.AboutUsPage },
  { item: RoutesConfig.OurTeamPage },
  { item: RoutesConfig.ServicesPage },
  { item: RoutesConfig.CasesPage },
]

const HeaderMenu = () => {
  const { t } = useTranslation()
  const [hover, setHover] = useState(false)

  const onHover = (e: any) => {
    if (e.target.tagName === 'A' && !e.target.className) {
      setHover(true)
    }
  }

  return (
    <nav>
      <ul
        onMouseOver={onHover}
        onMouseOut={() => setHover(false)}
        onClick={() => setHover(false)}
        className={hover ? styles.hover : ''}
      >
        {menuItems.map(({ item }, i) => (
          <li key={i}>
            <NavLink activeClassName={styles.activeLink} to={item}>
              {t(`header.menu.${i + 1}`)}
            </NavLink>
            <span className={styles.borderGradient}></span>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default HeaderMenu
