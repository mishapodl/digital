import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import { CareerField } from './components/CareerField'
import { careerOpt, careerOptions } from './constants'
import s from './CareerPage.module.scss'

import PageHeader from '../components/PageHeader'
import { Form } from '../../../components/AdminForm'
import { ControlBtn, MODE } from '../../../components/AdminForm/components/ControlBtn'
import { getText, updateText } from '../../../redux/career/thunks'
import { TDataCareerText } from '../../../redux/career/types'
import { selectCareer } from '../../../redux/career/selectors'
import { AdminModal } from '../../AdminPanel'
import Loader from '../../../components/Loader'
import { AdminModalInfo } from '../../AdminPanel/AdminPanel'
import { handleSubmissionError } from '../../../helpers'

const fields = Object.entries(careerOpt).map(([code, options]) => (
  // @ts-ignore
  <CareerField langCode={code} options={options} key={code} />
))

const CareerPage = () => {
  const d = useDispatch()
  const { text, isFetching } = useSelector(selectCareer)
  const adminModal = useContext(AdminModal)
  const adminModalInfo = useContext(AdminModalInfo)
  const form = useForm({ defaultValues: text })

  useEffect(() => {
    d(getText())
  }, [])

  useEffect(() => {
    form.reset(text)
  }, [text])

  const submitHandler = async (data: TDataCareerText) => {
    const choice = await adminModal?.open()
    if (choice) d(updateText(data))
  }

  return isFetching ? (
    <>
      <Loader />
    </>
  ) : (
    <>
      <PageHeader name={'Кар’єра'} />
      <Form
        onSubmit={submitHandler}
        onError={(errors) => handleSubmissionError(errors, adminModalInfo!.open)}
        options={careerOptions}
        form={form}
        reStyle={s}
      >
        {fields}
        <ControlBtn mode={MODE.Save} text={'Зберегти'} reStyle={s} />
      </Form>
    </>
  )
}

export default CareerPage
