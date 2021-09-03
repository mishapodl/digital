import React, { ChangeEvent, FC, useState } from 'react'

import { FooterFields } from '../constants'
import { Input } from '../../../../components/AdminForm'
import s from '../Footer.module.scss'

export const FilesInput: FC<any> = ({ name = '' }: { name: string }) => {
  const [nameFile, setNameFile] = useState<string | null>(name || '(назва_документу.pdf)')
  const setCuttedText = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    const cuttedText =
      files && files[0] && files[0].name.length > 36
        ? files[0].name.substring(0, 33) + '...'
        : files && files[0] && files[0].name
    setNameFile(cuttedText)
  }
  return (
    <>
      <div className={s.privacyPolicy}>
        <h3>Політика конфіденційності</h3>
        <label className={s.label}>
          <span className={s.fileBtn}>+ Завантажити pdf</span>
          <span className={s.tip}>{nameFile}</span>
          <Input name={FooterFields.files} type="file" accept=".pdf" onChange={setCuttedText} />
        </label>
      </div>
    </>
  )
}
