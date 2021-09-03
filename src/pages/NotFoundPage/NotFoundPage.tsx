import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

import styles from './NotFoundPage.module.scss'

import BackgroundBlob from '../../assets/images/fancyFormBg.png'
import AnimatedButton from '../../components/AnimatedButton'
import { RoutesConfig } from '../../routes/routeConfig'

const MainPage: FC = () => {
  const { t } = useTranslation()

  return (
    <div className="container">
      <div className={styles.centered}>
        <div className={styles.imgContainer}>
          <img className={styles.blob} src={BackgroundBlob} />
          <div className={styles.imgText}>Oops :(</div>
        </div>
        <div className={styles.notFoundTextWrapper}>
          <div className={styles.notFoundHeader}>404</div>
          <div className={styles.subText}>{t('pageNotFound.pageNotFoundText')}</div>
          <div className={styles.buttonPadding}>
            <AnimatedButton name={t('button.backToMainPage')} url={RoutesConfig.MainPage} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainPage
