import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

import styles from './ServicesPagePackagesTable.module.scss'

import { ReactComponent as ServiceIncludedTick } from '../../../assets/icons/service-included-tick.svg'
import { ReactComponent as ServiceNotIncludedCross } from '../../../assets/icons/service-not-included-cross.svg'

const ServicesPagePackagesTable: FC = () => {
  const { t } = useTranslation()

  const mockData = {
    packages: [
      [1, 2, 3],
      [1, 2, 3],
      [1, 2, 3],
      [1, 2, 3],
      [1, 2, 3],
      [1, 2, 3],
      [1, 2, 3],
      [1, 2, 3],
      [1, 2, 3],
      [1, 2, 3],
      [1, 2, 3],
      [1, 2, 3],
      [1, 2, 3],
      [1, 2, 3],
    ],
    tiers: [1, 2, 3],
  }
  return (
    <ul>
      <div className={styles.packageTierNamesPadding}>
        <div className={styles.packageTierNames}>
          <div className={styles.serviceTitle}></div>
          {mockData.tiers.map((item, idx) => (
            <div key={idx} className={styles.packageCentered}>
              <div className={styles.packageTierName}>{t(`Services.packagesList.tiers.${idx + 1}.name`)}</div>
              <div className={styles.packageTierNameUnderline}></div>
            </div>
          ))}
        </div>
      </div>
      <div>
        {mockData.packages.map((item, idx) => (
          <li key={idx} className={(() => ((idx + 1) % 2 == 1 ? styles.oddListItem : styles.evenListItem))()}>
            <div className={styles.packagesTable}>
              <div className={styles.serviceTitle}>{t(`Services.packagesList.packages.${idx + 1}.serviceTitle`)}</div>
              {mockData.packages[idx].map((item, childIndex) => (
                <div key={childIndex} className={styles.packageCentered}>
                  {t(`Services.packagesList.packages.${idx + 1}.servicesIncluded.${childIndex + 1}`) ? (
                    <ServiceIncludedTick />
                  ) : (
                    <ServiceNotIncludedCross />
                  )}
                </div>
              ))}
            </div>
          </li>
        ))}
      </div>
      <div className={styles.packageBackground}>
        <div className={styles.packagesTable}>
          <div></div>
          {mockData.tiers.map((item, idx) => (
            <div key={idx} className={styles.priceContainer}>
              <div className={styles.packagePrice}>{t(`Services.packagesList.tiers.${idx + 1}.price`)}</div>
              <div className={styles.packagePriceCurrency}>{t('Services.monthlyPrice')}</div>
            </div>
          ))}
        </div>
      </div>
    </ul>
  )
}

export default ServicesPagePackagesTable
