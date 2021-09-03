import React, { FC, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import s from '../CareerPage/CareerPage.module.scss'
import { careerOpt, careerOptions } from '../CareerPage/constants'
import { CareerField } from '../CareerPage/components/CareerField'
import { Form } from '../../../components/AdminForm'
import { ControlBtn, MODE } from '../../../components/AdminForm/components/ControlBtn'
import { getConsultationText, updateConsultationText } from '../../../redux/goThere/thunks'
import { TDataCareerText } from '../../../redux/career/types'
import { selectGoThere } from '../../../redux/goThere/selectors'
import PageHeader from '../components/PageHeader'
import { AdminModal } from '../../AdminPanel'
import Loader from '../../../components/Loader'
import { AdminModalInfo } from '../../AdminPanel/AdminPanel'
import { handleSubmissionError } from '../../../helpers'

const fields = Object.entries(careerOpt).map(([code, options]) => (
  // @ts-ignore
  <CareerField langCode={code} options={options} key={code} />
))
const GoTherePage: FC = () => {
  const d = useDispatch()
  const { text, isFetching } = useSelector(selectGoThere)
  const adminModal = useContext(AdminModal)
  const adminModalInfo = useContext(AdminModalInfo)
  const form = useForm({ defaultValues: text })

  useEffect(() => {
    d(getConsultationText())
  }, [])

  useEffect(() => {
    form.reset(text)
  }, [text])

  const submitHandler = async (data: TDataCareerText) => {
    const choice = await adminModal?.open()
    if (choice) d(updateConsultationText(data))
  }

  return isFetching ? (
    <Loader />
  ) : (
    <>
      <PageHeader name={'Консультація'} />
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

export default GoTherePage
