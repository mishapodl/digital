import React, { FC, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'react-responsive'

import styles from './Header.module.scss'
import MobileNavbar from './MobileNavbar'
import MenuLanguage from './MenuLanguage'
import HeaderMenu from './HeaderMenu'

import AnimatedButton from '../AnimatedButton'
import { ReactComponent as Logo } from '../../assets/icons/header-logo.svg'
import { ReactComponent as MobileLogo } from '../../assets/icons/header-logo-mobile.svg'
import { ReactComponent as Burger } from '../../assets/icons/burger.svg'
import { RoutesConfig } from '../../routes/routeConfig'

interface IHeader {
  fixed: boolean
  onAnimate: boolean
}

const Header: FC<IHeader> = ({ fixed, onAnimate }) => {
  const { t } = useTranslation()

  const [open, setOpen] = useState(false)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const delay = setTimeout(() => {
      setAnimate(true)
    }, 2000)

    return () => clearTimeout(delay)
  }, [])

  const mobileHeader = useMediaQuery({
    query: '(max-width: 768px)',
  })
  return (
    <>
      {mobileHeader ? (
        <header className={`${styles.mobileContainer} ${fixed && styles.fixedHeader}`}>
          <div className={styles.wrapper}>
            <Link to={RoutesConfig.MainPage}>
              <MobileLogo />
            </Link>

            <AnimatedButton name={t('button.goThere')} url={RoutesConfig.GoTherePage} />
            <Burger className={`${open && styles.burgerHide}`} onClick={() => setOpen(true)} />

            {open && <MobileNavbar open={open} setOpen={setOpen} />}
          </div>
        </header>
      ) : (
        <header
          className={`${styles.container} ${fixed && styles.fixedHeader} ${!fixed && styles.hiddenContainer} ${
            onAnimate && animate && styles.animatedContainer
          }`}
        >
          <div className={styles.left}>
            <Link to={RoutesConfig.MainPage}>
              <Logo />
            </Link>

            <HeaderMenu />
          </div>

          <div className={styles.right}>
            <AnimatedButton name={t('button.goThere')} url={RoutesConfig.GoTherePage} />
            <MenuLanguage />
          </div>
        </header>
      )}
    </>
  )
}

export default Header
