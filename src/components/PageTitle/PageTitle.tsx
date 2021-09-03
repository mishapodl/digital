import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

import s from './PageTitle.module.scss'

type TProps = {
  name: string
  isConst?: boolean
}

export const PageTitle: FC<TProps> = ({ name, isConst = false }) => {
  const { t } = useTranslation()
  return (
    <>
      <h1 className={isConst ? s.adminTitle : s.title}>{isConst ? name : t(`${name}.title`)}</h1>
    </>
  )
}
