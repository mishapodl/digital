import React, { FC } from 'react'

import { Field } from './Field'

import { RequestsFormConfig, RequestsFormOptions } from '../constants'
import { TRequestsFields } from '../types'
import styles from '../RequestsPage.module.scss'
import { Form } from '../../../../components/AdminForm'
import { ControlBtn, MODE } from '../../../../components/AdminForm/components/ControlBtn'

type TProps = {
  onSubmit: (data: TRequestsFields) => void
  links: TRequestsFields
}

export const LinkForm: FC<TProps> = ({ onSubmit, links }) => {
  return (
    <Form defaultValues={links} onSubmit={onSubmit} options={RequestsFormOptions} reStyle={styles}>
      <div className={styles.fields}>
        {RequestsFormConfig.map(({ field, title }) => (
          <div className={styles.inputWrapper} key={field}>
            <Field name={field} title={title} />
          </div>
        ))}
      </div>
      <ControlBtn mode={MODE.Save} text="Зберегти" reStyle={styles} />
    </Form>
  )
}
