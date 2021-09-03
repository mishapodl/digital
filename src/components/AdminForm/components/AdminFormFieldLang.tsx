import React, { FC } from 'react'

import { Lang } from '../../../helpers'
import s from '../Form.module.scss'

export const AdminFormFieldLang: FC<{ lang: Lang }> = ({ lang }) => {
  return <h3 className={s.fieldLang}>{lang}</h3>
}
