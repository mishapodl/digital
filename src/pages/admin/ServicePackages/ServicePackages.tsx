import React, { FC } from 'react'
import { useSelector } from 'react-redux'

import s from './ServicePackages.module.scss'

import { PackageNames } from '../ServicePackages/components/PackageNames'
import { ServiceList } from '../ServicePackages/components/ServiceList'
import PageHeader from '../components/PageHeader'
import { AdminFormSeparator } from '../../../components/AdminFormSeparator/AdminFormSeparator'
import { selectServices } from '../../../redux/services/slice'
import Loader from '../../../components/Loader'

const ServicePackages: FC = () => {
  const { isFetching } = useSelector(selectServices)
  if (isFetching) return <Loader />
  return (
    <>
      <PageHeader name={'Послуги'} />
      <PackageNames />
      <AdminFormSeparator reStyle={s} />
      <ServiceList />
    </>
  )
}

export { ServicePackages }
