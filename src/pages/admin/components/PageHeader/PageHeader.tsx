import React, { FC } from 'react'

import styles from './PageHeader.module.scss'

import { PageTitle } from '../../../../components/PageTitle/PageTitle'
import { ControlBtn, MODE } from '../../../../components/AdminForm/components/ControlBtn'
import { TOurTeamData } from '../../OurTeamPage/types'

type TProps = {
  name: string
  isOurTeamPage?: boolean
  isCasesPage?: boolean
  isDisabled?: boolean
  btnText?: string
  onClick?: (data: TOurTeamData, id: string) => void
  onCaseAdd?: () => void
}

export const PageHeader: FC<TProps> = ({
  name,
  isOurTeamPage,
  isCasesPage,
  btnText,
  isDisabled,
  onClick,
  onCaseAdd,
}) => {
  return (
    <div className={styles.titleWrapper}>
      <PageTitle name={name} isConst />
      {isOurTeamPage && (
        <ControlBtn
          mode={btnText ? MODE.Info : MODE.Create}
          onClick={onClick}
          text={btnText || 'Новий співробітник'}
          isDisabled={isDisabled}
          reStyle={styles}
        />
      )}
      {isCasesPage && (
        <ControlBtn
          mode={btnText ? MODE.Info : MODE.Create}
          onClick={onCaseAdd}
          text={btnText || 'Новий кейс'}
          isDisabled={isDisabled}
          reStyle={styles}
        />
      )}
    </div>
  )
}
