import React, { FC } from 'react'

import { Input } from '../../../../components/AdminForm'
import { AdminFormFieldLang } from '../../../../components/AdminForm/components/AdminFormFieldLang'
import { Lang, LangCode, Packages } from '../../../../helpers'

type TProps = {
  langCode: LangCode
}

export const PackageNameField: FC<TProps> = ({ langCode }) => {
  return (
    <div>
      <AdminFormFieldLang lang={Lang[langCode]} />
      <Input name={`${langCode}.${Packages.first}.text`} title={'Пакет 1'} />
      <Input name={`${langCode}.${Packages.second}.text`} title={'Пакет 2'} />
      <Input name={`${langCode}.${Packages.third}.text`} title={'Пакет 3'} />
    </div>
  )
}
