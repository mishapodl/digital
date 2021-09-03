import React, { Dispatch, FC, SetStateAction } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import styles from './Header.module.scss'

import { ReactComponent as Logo } from '../../assets/icons/mobile-navbar-logo.svg'
import { ReactComponent as CloseIcon } from '../../assets/icons/close-icon.svg'
import { ReactComponent as InstagramIcon } from '../../assets/icons/instagram.svg'
import { ReactComponent as FacebookIcon } from '../../assets/icons/facebook.svg'
import { ReactComponent as TelegramIcon } from '../../assets/icons/telegram.svg'
import { ReactComponent as LinkedInIcon } from '../../assets/icons/linked-in.svg'
import { RoutesConfig } from '../../routes/routeConfig'

interface IMobileNavbar {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const MobileNavbar: FC<IMobileNavbar> = ({ open, setOpen }) => {
  const { t, i18n } = useTranslation()

  return (
    <div className={`${styles.mobileNavbarWrapper} ${open && styles.mobileNavbarWrapperShow}`}>
      <div className={styles.mobileNavbar}>
        <div className={styles.navbarPanel}>
          <Link to={RoutesConfig.MainPage} onClick={() => setOpen(false)}>
            <Logo />
          </Link>

          <nav>
            <ul>
              <li>
                <Link to={RoutesConfig.AboutUsPage} onClick={() => setOpen(false)}>
                  {t('header.menu.1')}
                </Link>
              </li>
              <li>
                <Link to={RoutesConfig.OurTeamPage} onClick={() => setOpen(false)}>
                  {t('header.menu.2')}
                </Link>
              </li>
              <li>
                <Link to={RoutesConfig.ServicesPage} onClick={() => setOpen(false)}>
                  {t('header.menu.3')}
                </Link>
              </li>
              <li>
                <Link to={RoutesConfig.CasesPage} onClick={() => setOpen(false)}>
                  {t('header.menu.4')}
                </Link>
              </li>
              <li>
                <Link to={RoutesConfig.CareerPage} onClick={() => setOpen(false)}>
                  {t('header.menu.5')}
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <div className={styles.languagePanel}>
          <div className={styles.languageBlock}>
            <button
              className={`${styles.lngButton} ${i18n && i18n.language === 'ua' && styles.activeButton}`}
              onClick={() => i18n.changeLanguage('ua')}
            >
              ua
            </button>
            <button
              className={`${styles.lngButton} ${i18n && i18n.language === 'ru' && styles.activeButton}`}
              onClick={() => i18n.changeLanguage('ru')}
            >
              ru
            </button>
            <button
              className={`${styles.lngButton} ${i18n && i18n.language === 'en' && styles.activeButton}`}
              onClick={() => i18n.changeLanguage('en')}
            >
              en
            </button>
          </div>
        </div>

        <div className={`${styles.languagePanel} ${styles.socialPanel}`}>
          <div className={styles.languageBlock}>
            <a href="https://www.instagram.com/platform.digital.agency/" target="_blank" rel="noreferrer">
              <InstagramIcon />
            </a>
            <a href="https://www.facebook.com/Platform.Digital.Agency/" target="_blank" rel="noreferrer">
              <FacebookIcon />
            </a>
            <a href="https://t.me/platform_digital_agency" target="_blank" rel="noreferrer">
              <TelegramIcon />
            </a>
            <a href="https://www.linkedin.com/company/platform-digital-agency" target="_blank" rel="noreferrer">
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.closeButton} onClick={() => setOpen(false)}>
        <CloseIcon />
      </div>
    </div>
  )
}

export default MobileNavbar
