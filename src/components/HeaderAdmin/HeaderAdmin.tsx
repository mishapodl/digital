import React, { FC, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useMediaQuery } from 'react-responsive'

import styles from './HeaderAdmin.module.scss'

import { ReactComponent as MainLogo } from '../../assets/icons/main-logo.svg'
import { ReactComponent as Burger } from '../../assets/icons/burger.svg'
import { ReactComponent as ExitIcon } from '../../assets/icons/exit.svg'
import { ReactComponent as CloseIcon } from '../../assets/icons/close-icon.svg'
import { logout } from '../../redux/auth/slice'
import Sidebar from '../Sidebar'

const HeaderAdmin: FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch()

  const isMobile = useMediaQuery({
    query: '(max-width: 500px)',
  })

  return (
    <>
      <div className={`${styles['admin-header']} admin-header`}>
        {isOpen ? (
          <div className={styles.burger} onClick={() => setIsOpen(false)}>
            <CloseIcon />
          </div>
        ) : (
          <div className={styles.burger} onClick={() => setIsOpen(true)}>
            <Burger />
          </div>
        )}

        <div className={styles.logo}>
          <MainLogo />
        </div>
        {isMobile ? (
          <NavLink to="/" onClick={() => dispatch(logout())}>
            <ExitIcon />
          </NavLink>
        ) : (
          <NavLink to="/" onClick={() => dispatch(logout())}>
            Вийти
          </NavLink>
        )}
      </div>

      <div className={`${isOpen && styles.sidebar}`}>
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} isHeader />
      </div>
    </>
  )
}

export default HeaderAdmin
