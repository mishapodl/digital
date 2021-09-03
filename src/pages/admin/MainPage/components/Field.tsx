import React, { FC } from 'react'

import { TextArea } from '../../../../components/AdminForm'
import { Lang } from '../../../../helpers'
import { MainFields } from '../constants'
import s from '../MainPage.module.scss'

type TProps = {
  lang: Lang
  name: MainFields
  title: string
}

export const Field: FC<TProps> = ({ lang, title, name }) => {
  return (
    <div>
      <h3 className={s.lang}>{lang}</h3>
      <TextArea name={name} title={title} prefixes={['required']} />
    </div>
  )
}
