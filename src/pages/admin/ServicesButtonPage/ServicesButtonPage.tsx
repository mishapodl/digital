import React, { FC, useEffect, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { ServicesFields, ServicesFormConf, ServicesFormOptions, TServicesFields } from './constants'
import styles from './ServicesButtonPage.module.scss'

import PageHeader from '../components/PageHeader'
import { AdminModal } from '../../AdminPanel'
import { Form, TextArea, Image } from '../../../components/AdminForm'
import { ControlBtn, MODE } from '../../../components/AdminForm/components/ControlBtn'
import { getServicesInfo } from '../../../redux/servicesButton/selectors'
import { getServices, updateServices } from '../../../redux/servicesButton/thunks'
import Loader from '../../../components/Loader'
import { baseURL } from '../../../helpers'

const ServicesButtonPage: FC = () => {
  const dispatch = useDispatch()
  const { data, isFetching } = useSelector(getServicesInfo)
  const adminModal = useContext(AdminModal)

  useEffect(() => {
    dispatch(getServices())
  }, [])

  const onSubmit: any = async (_data: TServicesFields) => {
    const choice = await adminModal?.open()
    if (choice) dispatch(updateServices({ _data, pictureLink: data!.picture }))
  }

  const defVals = data ? { ...data, picture: null } : undefined

  if (!data) return null

  return isFetching ? (
    <Loader />
  ) : (
    <>
      <PageHeader name={'Послуги'} />
      <Form defaultValues={defVals} onSubmit={onSubmit} options={ServicesFormOptions} reStyle={styles}>
        <div className={styles.fields}>
          <Image img={`${baseURL}/${data.picture}`} name={ServicesFields.image} size="360х292 рх" title="Зображення" />
          {ServicesFormConf.map(({ field, lang, title }) => (
            <div key={field} className={styles.fieldWrapper}>
              <h3 className={styles.lang}>{lang}</h3>
              <TextArea name={field} title={title} />
            </div>
          ))}
        </div>

        <ControlBtn mode={MODE.Save} text="Зберегти" reStyle={styles} />
      </Form>
    </>
  )
}

export default ServicesButtonPage
