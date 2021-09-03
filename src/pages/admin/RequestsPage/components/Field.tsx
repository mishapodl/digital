import React, { FC } from 'react'

import { Input } from '../../../../components/AdminForm'
import { RequestsFields } from '../constants'

type TProps = {
  name: RequestsFields
  title: string
  value?: string
}

export const Field: FC<TProps> = ({ title, name }) => {
  return (
    <>
      <Input name={name} title={title} />
    </>
  )
}
