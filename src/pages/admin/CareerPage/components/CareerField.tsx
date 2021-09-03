import React, { FC, useCallback } from 'react'

import { TextArea } from '../../../../components/AdminForm'
import { Lang, LangCode } from '../../../../helpers'
import { CareerFields } from '../constants'
import s from '../CareerPage.module.scss'

type TProps = {
  langCode: LangCode
  options: {
    [field in CareerFields]: string
  }
}

export type TCareerFieldOption = TProps['options']

export const CareerField: FC<TProps> = ({ langCode, options }) => {
  const createField = useCallback(
    (fieldName: CareerFields) => <TextArea name={`${langCode}.${fieldName}`} title={options[fieldName]} />,
    [langCode, options]
  )
  return (
    <div className={s.langField}>
      <h3 className={s.lang}>{Lang[langCode]}</h3>
      {createField(CareerFields.title)}
      {createField(CareerFields.subtitle)}
    </div>
  )
}
