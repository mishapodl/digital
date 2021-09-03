import React, { FC, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'

import styles from './LoginPage.module.scss'
import { Fields, options } from './constants'
import { FancyForm } from './../../components/FeedBack/FancyForm/FancyForm'
import { TDataAdmin } from './types'
import { useLogin } from './useLogin'

import { FancyInput } from '../../components/FeedBack/FancyForm/FancyInput'
import { FancyPassword } from '../../components/FeedBack/FancyForm/FancyPassword'
import { ReactComponent as Logo } from '../../assets/icons/mobile-navbar-logo.svg'

const LoginPage: FC = () => {
  const { t } = useTranslation()
  const { handleSubmit, register, errors, watch } = useForm()
  const { login } = useLogin()
  const [valid, setValid] = useState(false)

  const l = useRef({})
  const p = useRef({})
  p.current = watch('password', '')
  l.current = watch('login', '')

  const onSubmit = async (data: TDataAdmin) => {
    setValid(false)
    await login({ admin: data.login, password: data.password })
    localStorage.getItem('token') || setValid(true)
    return !!localStorage.getItem('token')
  }

  const checkCredentials = () => {
    l.current === '' && p.current === '' && setValid(false)
    return valid ? <span>{t(`form.error.credentials`)}</span> : ''
  }

  return (
    <>
      <div className={styles.adminContainer}>
        <div className={styles.logo}>
          <Logo />
        </div>

        <div className={styles.header}>
          <h1>Admin Panel</h1>
        </div>

        <div className={styles.form}>
          <FancyForm name="admin" form={{ handleSubmit, onSubmit, modal: false }}>
            <FancyInput
              name="login"
              placeholder={t(`admin.${Fields.login}`)}
              type="text"
              register={register(options.login)}
              error={errors[Fields.login]}
            />
            <FancyPassword
              name="password"
              placeholder={t(`admin.${Fields.password}`)}
              register={register({
                ...options.password,
              })}
              error={errors[Fields.password]}
            />
            <span className={styles.errorForm}>{valid && checkCredentials()}</span>
          </FancyForm>
        </div>
      </div>
    </>
  )
}

export default LoginPage
