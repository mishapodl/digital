import React, { ChangeEvent, FC, useContext } from 'react'

import { FormContext } from '../Form'
import s from '../Form.module.scss'

type TProps = {
  name: string
  title?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  prefixes?: string[]
  defaultValue?: boolean
}

export const CheckBox: FC<TProps> = ({ name, title, defaultValue, onChange, prefixes = null }) => {
  const { register, options, reStyle, errors } = useContext(FormContext)
  const _name = name.split('.')[name.split('.').length - 1]

  const _options = prefixes
    ? prefixes.reduce((acc, prefix) => {
        Object.assign(acc, options[prefix])
        return acc
      }, {})
    : options[_name]

  return (
    <div
      className={`${s.fieldWrapper} ${s.checkboxFieldWrapper} ${reStyle?.checkboxFieldWrapper} ${reStyle?.fieldWrapper}`}
    >
      {title && <p className={`${s.title} ${reStyle?.title}`}>{title}</p>}
      <div className={`${s.checkboxWrapper} ${reStyle?.checkboxWrapper}`}>
        <input
          onChange={onChange}
          id={name}
          className={`${s.field} ${s.checkbox} ${reStyle?.field} ${reStyle?.checkbox}  ${errors[name] ? s.error : ''}`}
          type="checkbox"
          name={name}
          defaultChecked={defaultValue}
          ref={register(_options)}
        />
      </div>
    </div>
  )
}
