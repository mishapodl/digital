import React, { FC } from 'react'

import styles from '../SocialNetworksPage.module.scss'
import { Input, Image } from '../../../../components/AdminForm'
import { ControlBtn, MODE } from '../../../../components/AdminForm/components/ControlBtn'
import { baseURL } from '../../../../helpers'

type TProps = {
  fieldName: string
  fileName: string
  index?: string
  imgUrl?: string
  callback?: any
}

export const Field: FC<TProps> = ({ fieldName, fileName, imgUrl, callback }) => {
  const clear = () => {
    callback(fieldName, fileName)
  }

  if (imgUrl == baseURL + '//') {
    clear()
  }
  return (
    <div className={styles.socialFieldsWrapper}>
      <Image name={fileName} img={imgUrl} isSocialPage={true} title="Icon" />
      <Input name={fieldName} title="Link" />
      <ControlBtn mode={MODE.Remove} onClick={clear} text="" reStyle={styles} />
    </div>
  )
}
