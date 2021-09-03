import React, { FC } from 'react'

import s from './AdminFormSeparator.module.scss'

type TProps = {
  reStyle?: { [key: string]: string }
}

export const AdminFormSeparator: FC<TProps> = ({ reStyle }) => {
  return <div className={`${s.separator} ${reStyle?.separator}`} />
}
