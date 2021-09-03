import React, { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { Fields, options } from './constants'
import { TDataCareer } from './types'
import { FilesInput } from './components/FilesInput'

import { FancyForm } from '../../components/FeedBack/FancyForm/FancyForm'
import { FancyInput } from '../../components/FeedBack/FancyForm/FancyInput'
import { FeedBack } from '../../components/FeedBack/FeedBack'
import { selectCareer } from '../../redux/career/selectors'
import { sendCV, getText } from '../../redux/career/thunks'
import Loader from '../../components/Loader'

const CareerPage: FC = () => {
  const { t } = useTranslation()
  const d = useDispatch()
  const { handleSubmit, register, reset, control, errors } = useForm()
  const { text, isFetching } = useSelector(selectCareer)

  useEffect(() => {
    d(getText())
  }, [])

  const onSubmit = async (data: TDataCareer) => {
    /* *
    ! 'await' is required. DON'T trust typescript
    * return statusCode in payload 
    * */
    const { payload } = ((await d(sendCV(data))) as unknown) as { payload: number }

    if (payload === 201) {
      reset()
      return true // open modal
    }
    return false // not open modal
  }

  if (!text) return null

  return isFetching ? (
    <Loader />
  ) : (
    <FeedBack text={text}>
      <FancyForm name="Career" form={{ handleSubmit, onSubmit, isFetching }}>
        <FancyInput
          name={Fields.name}
          placeholder={t(`Career.${Fields.name}`)}
          register={register(options.name)}
          error={errors[Fields.name]}
        />
        <FancyInput
          name={Fields.phone}
          placeholder={t(`Career.${Fields.phone}`)}
          register={register(options.phone)}
          error={errors[Fields.phone]}
        />
        <FilesInput control={control} register={register} error={errors[Fields.files]} />
      </FancyForm>
    </FeedBack>
  )
}

export default CareerPage
