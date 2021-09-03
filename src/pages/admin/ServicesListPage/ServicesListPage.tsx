/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useCallback, useContext, useEffect } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'

import { ServicesFormConf, ServicesFormOptions, ServicesFields, NEW_SERVICES_ALL_ITEM } from './constants'
import styles from './ServicesListPage.module.scss'
import { ServiceItem } from './components/ServiceItem'
import { TServicesFields } from './types'

import PageHeader from '../components/PageHeader'
import { Form, TextArea } from '../../../components/AdminForm'
import { ControlBtn, MODE } from '../../../components/AdminForm/components/ControlBtn'
import { AdminModal } from '../../AdminPanel'
import { selectServicesAll } from '../../../redux/servicesAll/slice'
import Loader from '../../../components/Loader/Loader'
import { getServicesAll, updateServicesAll } from '../../../redux/servicesAll/thunks'
import { Lang } from '../../../helpers'

const ServicesListPage: FC = () => {
  const adminModal = useContext(AdminModal)
  const dispatch = useDispatch()
  const { services, title, isFetching } = useSelector(selectServicesAll)

  const form = useForm({ defaultValues: { services, title } })
  const { fields, append, remove } = useFieldArray({
    name: ServicesFields.services,
    control: form.control,
  })

  const onSubmit = async (data: TServicesFields) => {
    const choice = await adminModal?.open()
    if (choice) dispatch(updateServicesAll(data))
  }

  useEffect(() => {
    console.log({ services, title })
    if (!title.EN.text) dispatch(getServicesAll())
  }, [])

  useEffect(() => {
    console.log({ services, title })

    form.reset({ services, title })
  }, [services, title])

  if (isFetching) return <Loader />
  return (
    <>
      <PageHeader name={'Послуги'} />
      <Form onSubmit={onSubmit as any} options={ServicesFormOptions} form={form} reStyle={styles}>
        <div className={styles.fields}>
          {ServicesFormConf.map(({ lang, title }) => (
            <div key={lang}>
              <h3 className={styles.lang}>{Lang[lang]}</h3>
              <TextArea name={`${ServicesFields.title}.${lang}.text`} title={title} prefixes={[ServicesFields.title]} />
            </div>
          ))}
        </div>

        <div className={`${styles.fields} ${styles.inputFields}`}>
          {fields.map((service, ind) => (
            <ServiceItem
              ind={ind}
              key={service.id}
              field={service}
              onRemove={() => remove(ind)}
              prefixes={[ServicesFields.services]}
            />
          ))}
        </div>

        <ControlBtn
          mode={MODE.Create}
          text="додати послугу"
          onClick={() => append(NEW_SERVICES_ALL_ITEM)}
          reStyle={styles}
        />
        <ControlBtn mode={MODE.Save} text="Зберегти" reStyle={styles} />
      </Form>
    </>
  )
}

export default ServicesListPage
