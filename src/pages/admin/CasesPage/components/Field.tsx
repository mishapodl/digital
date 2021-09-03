import React, { FC } from 'react'

import styles from '../CasesPage.module.scss'
import { TextArea, Input } from '../../../../components/AdminForm'
import { Lang, LangCode } from '../../../../helpers'
import { CasesFields } from '../constants'

type TProps = {
  lang: LangCode
  nameField: CasesFields.name
  activityField: CasesFields.activity
  descriptionField: CasesFields.description
  name: string
  activity: string
  description: string
  prefixes?: string[]
  n?: string
}

export const Field: FC<TProps> = ({
  lang,
  nameField,
  activityField,
  descriptionField,
  description,
  name,
  activity,
  prefixes,
}) => {
  return (
    <>
      <div>
        <h3 className={styles.lang}>{Lang[lang]}</h3>
        <Input name={`${lang}.${nameField}`} title={name} prefixes={prefixes} />
        <Input name={`${lang}.${activityField}`} title={activity} prefixes={prefixes} />
        <TextArea name={`${lang}.${descriptionField}`} title={description} prefixes={prefixes} />
      </div>
    </>
  )
}
