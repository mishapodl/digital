import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import { PackageNameField } from './PackegeNameField'

import { Form } from '../../../../components/AdminForm'
import { LangCode } from '../../../../helpers'
import { getPackages, updatePackageNames } from '../../../../redux/services/thunks'
import s from '../ServicePackages.module.scss'
import { ControlBtn, MODE } from '../../../../components/AdminForm/components/ControlBtn'
import { selectServices } from '../../../../redux/services/slice'
import Loader from '../../../../components/Loader'
import { TDataPackagesNames } from '../../../../redux/services/types'

const fields = Object.values(LangCode).map((langCode) => <PackageNameField key={langCode} langCode={langCode} />)

export const PackageNames = () => {
  const d = useDispatch()
  const { packageNames, isFetchingNames } = useSelector(selectServices)
  const form = useForm({ defaultValues: packageNames })

  useEffect(() => {
    if (!packageNames.EN.pack1.text) d(getPackages())
  }, [])

  useEffect(() => {
    console.log(packageNames)
    form.reset(packageNames)
  }, [packageNames])

  const handleSubmit = (data: TDataPackagesNames) => {
    console.log(data)
    d(updatePackageNames(data))
  }
  console.log('rerendered')
  if (isFetchingNames) return <Loader />
  return (
    <Form onSubmit={handleSubmit} form={form} options={{}} reStyle={s}>
      <div className={s.packageNames}>{fields}</div>
      <ControlBtn mode={MODE.Save} text="Зберегти" reStyle={s} dataAtr={'packageNameSubmit'} />
    </Form>
  )
}
