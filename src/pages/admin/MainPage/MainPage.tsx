import React, { useContext, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { useForm } from 'react-hook-form'
import { useForm } from 'react-hook-form'

import { Field } from './components/Field'
import { TMainFields } from './types'
import { MainFormConf, MainFormOptions } from './constants'
import s from './MainPage.module.scss'

import { Form } from '../../../components/AdminForm'
import PageHeader from '../components/PageHeader'
import { ControlBtn, MODE } from '../../../components/AdminForm/components/ControlBtn'
import { selectMainPage } from '../../../redux/mainPage/selectors'
import { getMainTexts, putMainTexts } from '../../../redux/mainPage/thunks'
import { AdminModal } from '../../AdminPanel'
import Loader from '../../../components/Loader'
import { handleSubmissionError } from '../../../helpers'
import { AdminModalInfo } from '../../AdminPanel/AdminPanel'

const MainPage = () => {
  const d = useDispatch()
  const { texts, isFetching } = useSelector(selectMainPage)
  const adminModal = useContext(AdminModal)
  const adminModalInfo = useContext(AdminModalInfo)
  const form = useForm({ defaultValues: texts })

  useEffect(() => {
    if (!texts.EN) d(getMainTexts())
  }, [])

  useEffect(() => {
    form.reset(texts)
  }, [texts])

  const onSubmit = async (data: TMainFields) => {
    const choice = await adminModal?.open()
    if (choice) d(putMainTexts(data))
  }

  return isFetching ? (
    <Loader />
  ) : (
    <>
      <PageHeader name={'Головна'} />
      <Form
        onSubmit={onSubmit}
        onError={(errors) => {
          handleSubmissionError(errors, adminModalInfo!.open)
        }}
        form={form}
        options={MainFormOptions}
        reStyle={s}
      >
        <div className={s.fields}>
          {MainFormConf.map(({ field, lang, title }) => (
            <Field key={field} name={field} lang={lang} title={title} />
          ))}
        </div>
        <ControlBtn mode={MODE.Save} text="Зберегти" reStyle={s} isDisabled={isFetching} />
      </Form>
    </>
  )
}

export default MainPage
