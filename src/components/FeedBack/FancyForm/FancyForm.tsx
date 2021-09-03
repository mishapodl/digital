import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'

import type { TForm } from './types'

import s from '../FeedBack.module.scss'
import mainImg from '../../../assets/images/fancyFormBg.png'
import { useModal } from '../../Modal/Modal.hook'
import { Modal } from '../../Modal/Modal'

type TProps = {
  name: string
  form: TForm
}

export const FancyForm: FC<TProps> = ({ name, form, children }) => {
  const modal = useModal()
  const { t } = useTranslation()

  const onSubmit = async (data: any) => {
    const isSuccess = await form.onSubmit(data)
    if (isSuccess) form.modal !== false && modal.open()
  }

  return (
    <div className={s.formWrapper}>
      <img className={s.bg} src={mainImg} />
      <form className={s.form} onSubmit={form.handleSubmit(onSubmit)}>
        {children}
        <button className={s.submit} type="submit" disabled={form.isFetching}>
          {t(`${name}.submit`)}
        </button>
      </form>
      <Modal modal={modal}>
        <div className={s.modal}>{t(`${name}.modal`)}</div>
      </Modal>
    </div>
  )
}
