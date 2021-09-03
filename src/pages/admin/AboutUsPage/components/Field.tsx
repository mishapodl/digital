import React, { FC } from 'react'

import { Lang } from '../../../../helpers'
import { AboutUsFields } from '../constants'
import s from '../../../MainPage/MainPage.module.scss'
import { TextArea } from '../../../../components/AdminForm'

type TProps = {
  lang: Lang
  name: AboutUsFields
  title: string
}

export const Field: FC<TProps> = ({ lang, title, name }) => {
  return (
    <div>
      <h3 className={s.lang} style={{ marginBottom: '12px' }}>
        {lang}
      </h3>
      <TextArea name={name} title={title} />
    </div>
  )
}
