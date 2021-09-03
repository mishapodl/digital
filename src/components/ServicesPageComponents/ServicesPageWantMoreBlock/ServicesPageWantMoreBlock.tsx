import React, { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import styles from './ServicesPageWantMoreBlock.module.scss'

import AnimatedButton from '../../AnimatedButton'
import { RoutesConfig } from '../../../routes/routeConfig'
import { getServicesInfo } from '../../../redux/servicesButton/selectors'
import { getServices } from '../../../redux/servicesButton/thunks'
import { baseURL } from '../../../helpers'

const ServicesPageWantMoreBlock: FC = () => {
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const { data } = useSelector(getServicesInfo)

  useEffect(() => {
    dispatch(getServices())
  }, [])

  return (
    <div className={styles.wantMoreBlockContainer}>
      <div className={styles.wantMoreBlockTextAndButtonWrapper}>
        <div className={styles.wantMoreBlockText}>
          {i18n.language === 'ua' && data?.languages.UA.title}
          {i18n.language === 'ru' && data?.languages.RU.title}
          {i18n.language === 'en' && data?.languages.EN.title}
        </div>
        <div className={styles.buttonMaxWidth}>
          <AnimatedButton name={t('button.wantMore')} url={RoutesConfig.GoTherePage} />
        </div>
      </div>
      <div className={styles.wantMoreBlockImage}>
        <img src={`${baseURL}/${data?.picture}`} alt="free consultation" />
      </div>
    </div>
  )
}

export default ServicesPageWantMoreBlock
