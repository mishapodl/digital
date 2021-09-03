import React, { FC } from 'react'

import { TModal } from './Modal.hook'
import s from './Modal.module.scss'

import { ControlBtn, MODE } from '../AdminForm/components/ControlBtn'

export const Modal: FC<{ modal: TModal }> = ({ children, modal: { isOpen, close, mode, resolveOpen, text } }) => {
  const closeHandler = (flag: boolean) => {
    resolveOpen(mode !== 'confirm' || flag)
    close()
  }

  return (
    <figure className={`${s.wrapper} ${!isOpen && s.closed}`} onClick={() => closeHandler(false)}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <span className={s.closeBtn} onClick={() => closeHandler(false)} />
        <div className={s.modalContent}>
          {text ? text : children}
          {mode === 'confirm' && (
            <div className={s.modalFooter}>
              <ControlBtn mode={MODE.Delete} onClick={() => closeHandler(true)} text="Так" />
              <ControlBtn mode={MODE.Save} onClick={() => closeHandler(false)} text="Ні" />
            </div>
          )}
          {mode === 'info' && (
            <div className={s.modalFooter}>
              <ControlBtn mode={MODE.Save} onClick={closeHandler} text="ОК" />
            </div>
          )}
        </div>
      </div>
    </figure>
  )
}
