import React, { FC, useContext } from 'react'

import s from '../Form.module.scss'
import { FormContext } from '../Form'

type TProps = {
  name: string
  title?: string
  prefixes?: string[]
  service?: string
}

export const TextArea: FC<TProps> = ({ name, title, prefixes, service }) => {
  const { register, options, reStyle, errors } = useContext(FormContext)
  const _name = name.split('.')[name.split('.').length - 1]

  const _options = prefixes
    ? prefixes.reduce((acc, prefix) => {
        Object.assign(acc, options[prefix])
        return acc
      }, {})
    : options[_name]

  return (
    <div className={`${s.fieldWrapper} ${reStyle?.fieldWrapper}`}>
      {title && <p className={`${s.title} ${reStyle?.title}`}>{title}</p>}
      <textarea
        className={`${s.field} ${s.textarea} ${reStyle?.field} ${reStyle?.textarea} ${errors[name] ? s.error : ''}`}
        name={name}
        ref={register(_options)}
        data-service={service && service?.split('.')[2]}
      />
    </div>
  )
}
