import React, { FC, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import styles from './ServicesPage.module.scss'

import ServicesPageQuote from '../../components/ServicesPageComponents/ServicesPageQuote/'
import ServicesPagePackagesCircle from '../../components/ServicesPageComponents/ServicesPagePackagesCircle'
import ServicesPagePackagesTable from '../../components/ServicesPageComponents/ServicesPagePackagesTable'
import ServicesPageWantMoreBlock from '../../components/ServicesPageComponents/ServicesPageWantMoreBlock'
import ServicesPageSeparatePackagesList from '../../components/ServicesPageComponents/ServicesPageSeparatePackagesList'
import SocialNetworks from '../../components/SocialNetworks'
import { getServiceQuote } from '../../redux/services/thunks'
import { selectServices } from '../../redux/services/slice'

const AdminServices: FC = () => {
  const d = useDispatch()
  const { t } = useTranslation()
  const { quote, packageNames } = useSelector(selectServices)

  useEffect(() => {
    if (!quote || !packageNames) d(getServiceQuote)
  }, [])

  if (!quote) return null

  return (
    <div className="container">
      <SocialNetworks />
      <div className={styles.services}>{t('Services.services')}</div>
      <ServicesPageQuote quote={quote} />
      <ServicesPagePackagesCircle />
      <ServicesPagePackagesTable />
      <ServicesPageWantMoreBlock />
      <ServicesPageSeparatePackagesList />
    </div>
  )
}

export default AdminServices
