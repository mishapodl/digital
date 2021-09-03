import React, { FC } from 'react'

import styles from '../CasesPage.module.scss'
import { Input } from '../../../../components/AdminForm'
import { CasesConfig } from '../constants'

type TProps = {
  prefixes?: string[]
}

const Social: FC<TProps> = ({ prefixes }) => {
  const { EN } = CasesConfig
  return (
    <div className={styles.rightWrapper}>
      <Input
        name={`${EN.lang}.${EN.instagramField}`}
        title={EN.instagram}
        prefixes={prefixes}
        placeholder="Приклад: http://www.website.ua"
      />
      <Input
        name={`${EN.lang}.${EN.linkedinField}`}
        title={EN.linkedin}
        prefixes={prefixes}
        placeholder="Приклад: http://www.website.ua"
      />
      <Input
        name={`${EN.lang}.${EN.facebookField}`}
        title={EN.facebook}
        prefixes={prefixes}
        placeholder="Приклад: http://www.website.ua"
      />
      <Input
        name={`${EN.lang}.${EN.websiteField}`}
        title={EN.website}
        prefixes={prefixes}
        placeholder="Приклад: http://www.website.ua"
      />
    </div>
  )
}

export default Social
