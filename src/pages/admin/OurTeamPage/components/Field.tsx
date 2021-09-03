import React, { FC } from 'react'

import styles from '../OurTeamPage.module.scss'
import { TextArea, Input } from '../../../../components/AdminForm'
import { Lang, LangCode } from '../../../../helpers'
import { OurTeamFields } from '../constants'

type TProps = {
  lang: LangCode
  nameField: OurTeamFields.name
  positionField: OurTeamFields.position
  descriptionField: OurTeamFields.description
  firstName: string
  position: string
  description: string
  prefixes?: string[]
}

export const Field: FC<TProps> = ({
  lang,
  nameField,
  positionField,
  descriptionField,
  description,
  firstName,
  position,
  prefixes,
}) => {
  return (
    <div>
      <h3 className={styles.lang}>{Lang[lang]}</h3>
      <Input name={`${lang}.${nameField}`} title={firstName} prefixes={prefixes} />
      <Input name={`${lang}.${positionField}`} title={position} prefixes={prefixes} />
      <TextArea name={`${lang}.${descriptionField}`} title={description} prefixes={prefixes} />
    </div>
  )
}
