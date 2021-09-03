import React, { useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'

import { ServiceField } from './ServiceField'

import { Form, Input } from '../../../../components/AdminForm'
import { ControlBtn, MODE } from '../../../../components/AdminForm/components/ControlBtn'
import { NEW_SERVICE, ServiceFields, serviceOptions } from '../constants'
import s from '../ServicePackages.module.scss'
import { selectServices } from '../../../../redux/services/slice'
import { updatePackageServices } from '../../../../redux/services/thunks'
import Loader from '../../../../components/Loader'

const packages = ['СТАНДАРТ', 'СТАНДАРТ+', 'PRO']

export const ServiceList = () => {
  const d = useDispatch()
  const { services, prices, packageNames, isFetchingServices } = useSelector(selectServices)
  console.log(services)
  const form = useForm({
    defaultValues: { services, prices },
  })
  useEffect(() => {
    form.reset({ services, prices })
  }, [services, prices])
  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: `services`,
  })
  const onSubmit = (data: any) => {
    d(updatePackageServices({ values: data, packagesData: { services, prices, packageNames } }))
  }
  const handleServiceAdd = () => {
    append(NEW_SERVICE)
  }
  console.log(fields)
  console.log(prices)
  const isMobile = useMediaQuery({
    query: '(max-width: 500px)',
  })
  console.log(isFetchingServices)
  if (isFetchingServices) return <Loader />
  return (
    <>
      <Form onSubmit={onSubmit} form={form} options={serviceOptions} reStyle={s}>
        <div className={s.services}>
          {fields.map((item, k) => {
            return <ServiceField key={item.id} onRemove={() => remove(k)} item={item} k={k} />
          })}
          <ControlBtn mode={MODE.Create} onClick={handleServiceAdd} text="додати послугу" reStyle={s} />

          {isMobile && (
            <div className={s.mobilePrices}>
              <div>
                {packages.map((item, index) => (
                  <p className={s.pricePackages} key={index}>
                    {item}
                  </p>
                ))}
              </div>

              <div>
                {prices.map((cost, ind) => (
                  <Input
                    key={ind}
                    title={ind ? '' : 'ціна'}
                    className={s.mobilePriceField}
                    name={`${ServiceFields.prices}[${ind}]`}
                    prefixes={[ServiceFields.prices]}
                  />
                ))}
              </div>
            </div>
          )}

          {prices.map((cost, ind) => (
            <Input
              key={ind}
              title={ind ? '' : 'ціна'}
              className={s.priceField}
              name={`${ServiceFields.prices}[${ind}]`}
              prefixes={[ServiceFields.prices]}
            />
          ))}
        </div>
        <ControlBtn mode={MODE.Save} text="Зберегти" reStyle={s} />
      </Form>
    </>
  )
}
