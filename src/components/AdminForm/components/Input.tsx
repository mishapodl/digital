import React, { ChangeEvent, FC, useContext } from 'react'

import { FormContext } from '../Form'
import s from '../Form.module.scss'

type TProps = {
  name: string
  type?: 'text' | 'file'
  title?: string
  defaultValue?: any
  className?: string
  pattern?: string
  prefixes?: string[]
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  service?: string
  placeholder?: string
  accept?: string
}

export const Input: FC<TProps> = ({
  name,
  title,
  onChange,
  className,
  pattern,
  type = 'text',
  defaultValue,
  prefixes = null,
  service,
  placeholder,
  accept,
}) => {
  const { register, options, reStyle, errors } = useContext(FormContext)
  const _name = name.split('.')[name.split('.').length - 1]
  const _options = prefixes
    ? prefixes.reduce((acc, prefix) => {
        Object.assign(acc, options[prefix])
        return acc
      }, {})
    : options[_name]
  return (
    <div className={`${s.fieldWrapper} ${reStyle?.fieldWrapper} ${className}`}>
      {title && <p className={`${s.title} ${reStyle?.title}`}>{title}</p>}
      <input
        onChange={onChange}
        id={name}
        className={`${s.field} ${s.input} ${reStyle?.field} ${reStyle?.input}  ${errors[name] ? s.error : ''}`}
        type={type}
        defaultValue={defaultValue}
        name={name}
        pattern={pattern}
        ref={register(_options)}
        data-service={service && service?.split('.')[2]}
        placeholder={placeholder && placeholder}
        accept={accept && accept}
      />
    </div>
  )
}
