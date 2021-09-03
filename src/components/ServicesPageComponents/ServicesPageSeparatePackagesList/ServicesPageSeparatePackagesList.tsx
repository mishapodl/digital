import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

import styles from './ServicesPageSeparatePackagesList.module.scss'

const ServicesPageSeparatePackagesList: FC = () => {
  const { t } = useTranslation()
  const mockList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  return (
    <div className={styles.separateServicesListContainer}>
      <div className={styles.separateListTitle}>{t('Services.separatePackagesListHeader')}</div>
      <ul className={styles.separateServicesList}>
        {mockList.map((item) => (
          <li key={item} className={styles.separateServiceContainer}>
            <div className={styles.separateServiceTitle}>{t(`Services.separatePackagesList.${item}`)}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ServicesPageSeparatePackagesList
