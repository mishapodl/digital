import React, { FC, useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import { Form } from '../../../components/AdminForm'
import { ControlBtn, MODE } from '../../../components/AdminForm/components/ControlBtn'
import { AdminModal } from '../../AdminPanel'
import { CareerField } from '../CareerPage/components/CareerField'
import { careerOpt, careerOptions } from '../CareerPage/constants'
import PageHeader from '../components/PageHeader'
import s from '../CareerPage/CareerPage.module.scss'
import { getServiceQuote, updateQuote } from '../../../redux/services/thunks'
import { selectServices } from '../../../redux/services/slice'
import Loader from '../../../components/Loader'

const fields = Object.entries(careerOpt).map(([code, options]) => (
  // @ts-ignore
  <CareerField langCode={code} options={options} key={code} />
))

const ServicesPage: FC = () => {
  const d = useDispatch()
  const { quote, isFetching } = useSelector(selectServices)
  const adminModal = useContext(AdminModal)
  const form = useForm({ defaultValues: quote })

  useEffect(() => {
    console.log(quote)
    if (!quote.EN.title) d(getServiceQuote())
  }, [])

  useEffect(() => {
    form.reset(quote)
  }, [quote])

  const submitHandler = async (data: any) => {
    const choice = await adminModal?.open()
    if (choice) d(updateQuote(data))
  }
  console.log(isFetching)
  if (isFetching) return <Loader />

  return (
    <>
      <PageHeader name={'Послуги'} />
      <Form onSubmit={submitHandler} options={careerOptions} form={form} reStyle={s}>
        {fields}
        <ControlBtn mode={MODE.Save} text={'Зберегти'} reStyle={s} />
      </Form>
    </>
  )
}

export default ServicesPage
