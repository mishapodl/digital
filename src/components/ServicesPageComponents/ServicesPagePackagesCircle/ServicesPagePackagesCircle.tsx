import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

import styles from './ServicesPagePackagesCircle.module.scss'

const ServicesPagePackagesTable: FC = () => {
  const { t } = useTranslation()
  return (
    <div className={styles.packagesCircle}>
      <div className={styles.packagesCircleText}>{t('Services.packages')}</div>
    </div>
  )
}

export default ServicesPagePackagesTable
