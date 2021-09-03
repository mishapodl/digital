import React, { FC, RefObject, useContext } from 'react'

import s from '../Form.module.scss'
import { FormContext } from '../Form'

export enum MODE {
  // ? buttons as text
  Create = 'create',
  Info = 'info',
  MoveUp = 'moveUp',
  MoveDown = 'moveDown',
  Remove = 'remove',
  // ? buttons
  Delete = 'delete',
  Save = 'save',
}

type TProps = {
  mode: MODE
  text: string
  reStyle?: { [key: string]: string }
  dataAtr?: string
  htmlFor?: string
  isDisabled?: boolean
  type?: 'submit' | 'button'
  btnRef?: RefObject<HTMLButtonElement> | null
  className?: string
  onClick?: (...args: any[]) => void
  onMouseEnter?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  onMouseLeave?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  isSocialPage?: boolean
  mustBeActive?: boolean
}

export const ControlBtn: FC<TProps> = ({
  mode,
  type,
  text,
  onClick,
  reStyle,
  dataAtr,
  htmlFor,
  isDisabled = false,
  btnRef,
  className,
  onMouseEnter,
  onMouseLeave,
  isSocialPage,
  mustBeActive,
}) => {
  const { dirtyFields } = useContext(FormContext)

  const isNotDirty = dirtyFields ? !Object.keys(dirtyFields).length : false
  if (mode === MODE.Save && isNotDirty) isDisabled = true
  if (mode === MODE.Save && !isNotDirty) isDisabled = false
  if (mode === MODE.Save && isDisabled && mustBeActive) isDisabled = false

  return (
    <button
      className={`${s[mode]} ${s.textBtn} ${reStyle?.[mode]} ${className} ${
        isDisabled && text === 'Зберегти' && s.disabledButton
      }`}
      data-btn={dataAtr}
      ref={btnRef}
      type={type ? type : mode === MODE.Save ? 'submit' : 'button'}
      onClick={onClick}
      disabled={isDisabled}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {mode === MODE.Create ? (
        <>
          <span className={s.plus}>
            <label htmlFor={htmlFor} className={s.controlBtnText}>
              +{!isSocialPage && '\u00A0'}
            </label>
          </span>
          <span>
            <label htmlFor={htmlFor} className={s.controlBtnText}>
              {text}
            </label>
          </span>
        </>
      ) : (
        text
      )}
    </button>
  )
}
