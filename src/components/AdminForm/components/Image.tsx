import React, { ChangeEvent, FC, useContext, useRef } from 'react'

import { ControlBtn, MODE } from './ControlBtn'

import { FormContext } from '../Form'
import { Input } from '..'
import s from '../Form.module.scss'

type TProps = {
  name: string
  title?: string
  size?: string
  img?: string
  isSocialPage?: boolean
  prefixes?: string[]
  previewRef?: React.RefObject<HTMLImageElement>
}

const runOnMouseMove = (cb: () => void) => {
  const listener = () => {
    cb()
    window.removeEventListener('mousemove', listener)
  }
  window.addEventListener('mousemove', listener)
}

export const Image: FC<TProps> = ({ name, title, size, img, isSocialPage, prefixes, previewRef }) => {
  const { reStyle } = useContext(FormContext)
  const preview = useRef<HTMLImageElement>(null)
  const eclipse = useRef<HTMLDivElement>(null)
  const btn = useRef<HTMLButtonElement>(null)

  const onMouseEnter = () => {
    if (btn.current) btn.current.classList.remove(s.unHover)
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (preview.current) {
      preview.current.src = URL.createObjectURL(e.target.files?.[0])
    }

    if (eclipse.current && btn.current) {
      eclipse.current.className = ''
      btn.current.classList.add(s.unHover)
    }

    runOnMouseMove(() => {
      if (eclipse.current) {
        eclipse.current.className = s.eclipse
      }
    })
  }

  return (
    <div className={`${s.imageWrapper} ${reStyle?.imageWrapper}`}>
      <Input onChange={handleChange} name={name} type="file" prefixes={prefixes} title={title} />
      <div className={`${s.field} ${s.image} ${isSocialPage && s.socialImage}`}>
        <img className={s.preview} ref={previewRef || preview} src={img} />
        <ControlBtn
          mode={MODE.Create}
          text={`${isSocialPage ? '' : 'додати'}`}
          htmlFor={name}
          btnRef={btn}
          className={s.unHover}
          onMouseEnter={onMouseEnter}
          isSocialPage={isSocialPage}
        />
        <div className={`${img ? s.eclipse : ''}`} ref={eclipse} />
      </div>
      {!isSocialPage && <p className={`${s.sizePrompt} ${s.noSize}`}>Розмір</p>}
      <p>{size}</p>
    </div>
  )
}
