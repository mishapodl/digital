import React, { FC } from 'react'
import { Control, FieldError, useWatch } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import s from '../CareerPage.module.scss'
import { Fields, options } from '../constants'

type TProps = {
  control: Control<Record<string, any>>
  register: any
  error: FieldError
}

export const FilesInput: FC<TProps> = ({ control, register, error }) => {
  const { t } = useTranslation()
  const files = useWatch<FileList | null>({
    control,
    name: Fields.files,
    defaultValue: null,
  })

  const cuttedText =
    files && files[0] && files[0].name.length > 36
      ? files[0].name.substring(0, 33) + '...'
      : files && files[0] && files[0].name

  return (
    <label className={s.label}>
      <div className={s.file}>
        <span>{t('Career.file.add')}</span>
        <span className={s.tip}>{!files || !files[0] ? t('Career.file.tip') : cuttedText}</span>
        <span data-error>{error ? t(error.message as string) : ''}</span>
      </div>
      <input
        type="file"
        name={Fields.files}
        className={s.input}
        ref={register(options.files)}
        accept=".doc, .docx, .pdf"
      />
    </label>
  )
}
