import React, { FC, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import styles from './Footer.module.scss'

import { RoutesConfig } from '../../routes/routeConfig'
import { footerInfoRequest } from '../../redux/footer/thunks'
import { getFooterInfo, getPolicy } from '../../redux/footer/selectors'
import { baseURL } from '../../helpers'

const Footer: FC = () => {
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const { contacts } = useSelector(getFooterInfo)
  const { policy } = useSelector(getPolicy)
  useEffect(() => {
    dispatch(footerInfoRequest())
  }, [])

  return (
    <footer>
      <div className={styles.footerContent}>
        <div className={styles.contacts}>
          <ul>
            <li>
              <span>{t('footer.contacts.tel')}</span>
              <a href={`tel:${contacts?.tel}`}>{contacts?.tel}</a>
            </li>
            <li>
              <span>E-mail:</span>
              <a href={`mailto:${contacts?.email}`}>{contacts?.email}</a>
            </li>
            <li>
              <span>Skype:</span>
              <a href={`skype:${contacts?.skype}?chat`}>Platform digital agency</a>
            </li>
            <li>
              <span>{t('footer.contacts.address')}</span>
              <a href={contacts?.gmapsLink} target="_blank" rel="noreferrer">
                {i18n.language === 'ua' && contacts?.languages.UA.address}
                {i18n.language === 'ru' && contacts?.languages.RU.address}
                {i18n.language === 'en' && contacts?.languages.EN.address}
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.map}>
          <a href={contacts?.gmapsLink} target="_blank" rel="noreferrer">
            <img src={`${baseURL}/${contacts?.gmapsPictureLink}`} />
          </a>
        </div>

        <nav className={styles.menu}>
          <ul>
            <li>
              <Link to={RoutesConfig.CareerPage}>{t('footer.menu.1')}</Link>
            </li>
            <li>
              <Link to={RoutesConfig.AboutUsPage}>{t('footer.menu.2')}</Link>
            </li>
            <li>
              <Link to={RoutesConfig.OurTeamPage}>{t('footer.menu.3')}</Link>
            </li>
            <li>
              <Link to={RoutesConfig.ServicesPage}>{t('footer.menu.4')}</Link>
            </li>
            <li>
              <Link to={RoutesConfig.CasesPage}>{t('footer.menu.5')}</Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className={styles.privacyPolicy}>
        2020 Platform, All rights reserved.
        <a target="_blank" href={`${policy?.policy && policy.policy}`} rel="noreferrer">
          {t('footer.privacy')}
        </a>
      </div>
    </footer>
  )
}

export default Footer
