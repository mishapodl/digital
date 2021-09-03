import React, { useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

import { TAboutUsFields } from './types'
import { AboutUsFormConf, AboutUsFormOptions } from './constants'
import { Field } from './components/Field'

import s from '../MainPage/MainPage.module.scss'
import { Form } from '../../../components/AdminForm'
import PageHeader from '../components/PageHeader'
import { ControlBtn, MODE } from '../../../components/AdminForm/components/ControlBtn'
import { aboutUsInfoRequest, updateAboutUsInfo } from '../../../redux/aboutUs/thunks'
import { getAboutUsInfo } from '../../../redux/aboutUs/selectors'
import { AdminModal } from '../../AdminPanel'
import Loader from '../../../components/Loader'
import { AdminModalInfo } from '../../AdminPanel/AdminPanel'
import { handleSubmissionError } from '../../../helpers'

const AboutUsPage = () => {
  const dispatch = useDispatch()
  const { texts, isFetching } = useSelector(getAboutUsInfo)
  const adminModal = useContext(AdminModal)
  const adminModalInfo = useContext(AdminModalInfo)
  const form = useForm({ defaultValues: texts })

  useEffect(() => {
    if (!texts.EN) dispatch(aboutUsInfoRequest())
  }, [])

  useEffect(() => {
    form.reset(texts)
  }, [texts])

  const onSubmit = async (data: TAboutUsFields) => {
    const choice = await adminModal?.open()
    if (choice) dispatch(updateAboutUsInfo(data))
  }

  return isFetching ? (
    <Loader />
  ) : (
    <>
      <PageHeader name={'Хто ми'} />
      <Form
        onSubmit={onSubmit}
        onError={(errors) => handleSubmissionError(errors, adminModalInfo!.open)}
        options={AboutUsFormOptions}
        form={form}
        reStyle={s}
      >
        <div className={s.fields}>
          {AboutUsFormConf.map(({ field, lang, title }) => (
            <Field key={field} name={field} lang={lang} title={title} />
          ))}
        </div>
        <ControlBtn mode={MODE.Save} text="Зберегти" reStyle={s} />
      </Form>
    </>
  )
}

export default AboutUsPage
