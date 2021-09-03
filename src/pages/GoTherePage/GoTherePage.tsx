import React, { FC, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import { Fields, options } from './constants'
import { TDataGoThere } from './types'

import { FancyForm } from '../../components/FeedBack/FancyForm/FancyForm'
import { FeedBack } from '../../components/FeedBack/FeedBack'
import { FancyInput } from '../../components/FeedBack/FancyForm/FancyInput'
import { selectGoThere } from '../../redux/goThere/selectors'
import { consultation, getConsultationText } from '../../redux/goThere/thunks'
import Loader from '../../components/Loader'

const GoTherePage: FC = () => {
  const { t } = useTranslation()
  const d = useDispatch()
  const { handleSubmit, register, reset, errors } = useForm()
  const { text, isFetching } = useSelector(selectGoThere)

  useEffect(() => {
    d(getConsultationText())
  }, [])

  const onSubmit = async (data: TDataGoThere) => {
    const { payload } = ((await d(consultation(data))) as unknown) as { payload: number }
    if (payload === 201) {
      reset()
      return true
    }
    return false
  }

  if (!text) return null

  return isFetching ? (
    <Loader />
  ) : (
    <FeedBack text={text}>
      <FancyForm name="GoThere" form={{ handleSubmit, onSubmit, isFetching }}>
        <FancyInput
          name="name"
          placeholder={t(`GoThere.${Fields.name}`)}
          register={register(options.name)}
          error={errors[Fields.name]}
        />
        <FancyInput
          name="phone"
          type="tel"
          placeholder={t(`GoThere.${Fields.phone}`)}
          register={register(options.phone)}
          error={errors[Fields.phone]}
        />
        <FancyInput
          name="email"
          placeholder={t(`GoThere.${Fields.email}`)}
          register={register(options.email)}
          error={errors[Fields.email]}
        />
      </FancyForm>
    </FeedBack>
  )
}

export default GoTherePage
