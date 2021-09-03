import React, { FC } from 'react'
import { FieldError } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import s from '../FeedBack.module.scss'

type TProps = {
  name: string
  register: any
  placeholder: string
  type?: 'text' | 'tel' | 'email' | 'password'
  error?: FieldError
}

export const FancyInput: FC<TProps> = ({ name, placeholder, register, type, error }) => {
  const { t } = useTranslation()
  return (
    <div className={`${s.field} ${error ? s.error : ''}`}>
      <input className={s.input} name={name} placeholder={placeholder} type={type || 'text'} ref={register} />
      <p data-error>{error ? t(error.message as string) : ''}</p>
    </div>
  )
}
