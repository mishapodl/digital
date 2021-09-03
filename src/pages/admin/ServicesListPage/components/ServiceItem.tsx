import React, { FC } from 'react'
import { ArrayField } from 'react-hook-form'

import styles from '../ServicesListPage.module.scss'
import { Input } from '../../../../components/AdminForm'
import { ReactComponent as RemoveIcon } from '../../../../assets/icons/deleteIcon.svg'
import { ServicesFields } from '../constants'
import { LangCode } from '../../../../helpers'

type TProps = {
  ind: number
  prefixes: string[]
  field: Partial<ArrayField<Record<string, any>, 'id'>>
  onRemove: () => void
}

export const ServiceItem: FC<TProps> = ({ ind, field, prefixes, onRemove }) => {
  return (
    <>
      <div className={styles.item}>
        <Input
          name={`${ServicesFields.services}[${ind}].${LangCode.UA}.text`}
          defaultValue={field[LangCode.UA].text}
          title="Послуга 1"
          prefixes={prefixes}
        />
      </div>
      <div className={styles.item}>
        <Input
          name={`${ServicesFields.services}[${ind}].${LangCode.RU}.text`}
          defaultValue={field[LangCode.RU].text}
          title="Услуга 1"
          prefixes={prefixes}
        />
      </div>
      <div className={`${styles.item} ${styles.lastItem}`}>
        <div className={styles.inputWrapper}>
          <Input
            name={`${ServicesFields.services}[${ind}].${LangCode.EN}.text`}
            title="Service 1"
            defaultValue={field[LangCode.EN].text}
            prefixes={prefixes}
          />
        </div>
        <div className={styles.buttonWrapper}>
          <button>
            <RemoveIcon onClick={onRemove} />
          </button>
        </div>
      </div>
    </>
  )
}
