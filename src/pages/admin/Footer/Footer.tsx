import React, { useEffect, FC, useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { FooterFields, addressConf, TFooterFields, FooterFormOptions } from './constants'
import s from './Footer.module.scss'
import { FilesInput } from './components/FilesInput'

import style from '../../admin/MainPage/MainPage.module.scss'
import PageHeader from '../components/PageHeader'
import { Form, Input } from '../../../components/AdminForm'
import { Image } from '../../../components/AdminForm/components/Image'
import { ControlBtn, MODE } from '../../../components/AdminForm/components/ControlBtn'
import { getFooterInfo, getPolicy } from '../../../redux/footer/selectors'
import { updateFooterInfo, footerInfoRequest } from '../../../redux/footer/thunks'
import { AdminModal } from '../../AdminPanel'
import { AdminFormSeparator } from '../../../components/AdminFormSeparator/AdminFormSeparator'
import Loader from '../../../components/Loader'
import { baseURL } from '../../../helpers'

const Footer: FC = () => {
  const dispatch = useDispatch()
  const { contacts, isFetching } = useSelector(getFooterInfo)
  const { policy, title } = useSelector(getPolicy)
  const adminModal = useContext(AdminModal)

  useEffect(() => {
    dispatch(footerInfoRequest())
  }, [])

  const onSubmit: any = async (data: TFooterFields) => {
    const choice = await adminModal?.open()
    if (choice)
      dispatch(
        updateFooterInfo({
          _data: data,
          imgLink: contacts!.gmapsPictureLink,
          filePolicy: policy,
        })
      )
  }

  if (!contacts) return null

  return isFetching ? (
    <Loader />
  ) : (
    <>
      <PageHeader name={'Контакти'} />
      <Form defaultValues={contacts} onSubmit={onSubmit} options={FooterFormOptions}>
        <div className={s.separate}>
          <Image
            img={`${baseURL}/${contacts.gmapsPictureLink}`}
            name={FooterFields.image}
            size="210х210 рх"
            title="Зображення карти"
          />
          <Input name={FooterFields.mapLink} title="Посилання на GoogleMaps" />
        </div>
        <div className={s.addresses}>
          {addressConf.map(({ field, title, lang }) => (
            <div key={field}>
              <h3 className={style.lang}>{lang}</h3>
              <Input name={field} title={title} />
            </div>
          ))}
        </div>
        <div className={s.subFields}>
          <Input name={FooterFields.phone} title="Тел.:" />
          <Input name={FooterFields.email} title="E-mail:" />
          <Input name={FooterFields.skype} title="Skype:" />
        </div>
        <AdminFormSeparator />
        <FilesInput name={title} />
        <ControlBtn mode={MODE.Save} text="Зберегти" reStyle={s} />
      </Form>
    </>
  )
}

export default Footer
