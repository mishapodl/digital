import React, { FC, useState } from 'react'
import { FieldError } from 'react-hook-form'

import { FancyInput } from './FancyInput'

import { ReactComponent as EyeIcon } from '../../../assets/icons/eye.svg'
import { ReactComponent as EyeCloseIcon } from '../../../assets/icons/eyeClose.svg'
import s from '../FeedBack.module.scss'

type TProps = {
  name: string
  register: any
  placeholder: string
  error?: FieldError
}

export const FancyPassword: FC<TProps> = ({ name, register, placeholder, error }) => {
  const [isShown, setIsShown] = useState(false)
  return (
    <div className={s.passwordWrapper}>
      <FancyInput
        name={name}
        type={isShown ? 'text' : 'password'}
        register={register}
        placeholder={placeholder}
        error={error}
      />

      {!isShown && <EyeIcon className={s.eyeIcon} onClick={() => setIsShown(true)} />}
      {isShown && <EyeCloseIcon className={s.eyeIcon} onClick={() => setIsShown(false)} />}
    </div>
  )
}
