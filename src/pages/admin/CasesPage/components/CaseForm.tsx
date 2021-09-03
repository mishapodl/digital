import React, { FC, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import { Field } from './Field'
import Social from './Social'
import Services from './Services'

import { Form, Image } from '../../../../components/AdminForm'
import { ControlBtn, MODE } from '../../../../components/AdminForm/components/ControlBtn'
import { AdminFormSeparator } from '../../../../components/AdminFormSeparator/AdminFormSeparator'
import { CasesFields, CasesConfig, CasesOptions, CasesFieldsPrefixes } from '../constants'
import styles from '../CasesPage.module.scss'
import { TCasesData, TCasesFields } from '../types'
import { TCases } from '../../../../redux/cases/types'
import { ReactComponent as MoreArrow } from '../../../../assets/icons/language-arrow.svg'

type TProps = {
  c: TCases[number] | null
  onSubmit: (data: TCasesData, id: string) => void
  changeOrder: (step: number) => () => void
  onDelete: (id?: string) => void
  addService?: any
  removeService: (indexCase: number, iCase: number) => void
  isCreateForm?: boolean
  indexCase: number
}

export const CasesForm: FC<TProps> = ({
  c,
  onDelete,
  onSubmit,
  changeOrder,
  isCreateForm,
  addService,
  removeService,
  indexCase,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const isMobile = useMediaQuery({
    query: '(max-width: 500px)',
  })

  const defVals = c ? { ...c.languages, picture: null } : undefined
  const prefixes = isCreateForm ? [CasesFieldsPrefixes.create] : undefined
  let img: string | undefined = undefined
  if (c?.img) img = c.img
  else {
    if (c?.picture?.length) {
      img = URL.createObjectURL(c?.picture[0])
    } else if (c?.file) {
      img = URL.createObjectURL(c?.picture)
    }
  }

  return (
    <>
      <Form<TCasesFields>
        // @ts-ignore
        onSubmit={(data) => onSubmit(data, c?._id)}
        defaultValues={defVals}
        options={CasesOptions}
        reStyle={styles}
      >
        <div className={styles.formWrapper}>
          <div className={styles.leftWrapper}>
            <Image
              img={img}
              name={c?._id === 'new-case' ? `${CasesFields.picture}` : `${c?._id}.${CasesFields.picture}`}
              size="360x360 px"
              title="Зображення"
              prefixes={prefixes}
            />
            <div className={styles.buttonWrapper}>
              <ControlBtn mode={MODE.MoveUp} onClick={changeOrder(-1)} text="Підняти кейс" reStyle={styles} />
              <ControlBtn mode={MODE.MoveDown} onClick={changeOrder(1)} text="Опустити кейс" reStyle={styles} />
              <ControlBtn mode={MODE.Remove} onClick={onDelete} text="Видалити кейс" reStyle={styles} />
            </div>
          </div>

          <div className={styles.mobileButtonsWrapper}>
            {isOpen ? (
              <div className={styles.moreButton} onClick={() => setIsOpen(false)}>
                <p>Менше</p>
                <MoreArrow className={styles.rotatedArrow} />
              </div>
            ) : (
              <div className={styles.moreButton} onClick={() => setIsOpen(true)}>
                <p>Більше</p>
                <MoreArrow />
              </div>
            )}
            {isMobile && <ControlBtn mode={MODE.Save} text="Зберегти" reStyle={styles} />}
          </div>

          <div className={`${styles.hideFields} ${isOpen && styles.showFields}`}>
            <Social prefixes={prefixes} />
            <div className={styles.fields}>
              {Object.entries(CasesConfig).map(([code, { nameField, name, activity, description, lang }]) => (
                <Field
                  key={`${code}.${nameField}`}
                  nameField={CasesFields.name}
                  activityField={CasesFields.activity}
                  descriptionField={CasesFields.description}
                  name={name}
                  activity={activity}
                  description={description}
                  lang={lang}
                  prefixes={prefixes}
                />
              ))}
            </div>
            <div className={styles.addService}>
              <h3>Що клієнт отримав від нас?</h3>
              <ControlBtn mode={MODE.Create} onClick={addService} text="Додати послугу" reStyle={styles} />
            </div>
            <div className={styles.services}>
              {Object.entries(CasesConfig).map(([code, { services, serviceField, lang }]) => (
                <>
                  <Services
                    key={`${code}.${serviceField}`}
                    lang={lang}
                    serviceField={CasesFields.servicesProvide}
                    servicesProvides={c?.languages ? c?.languages[lang] : []}
                    services={services}
                    prefixes={prefixes}
                    removeService={removeService}
                    indexCase={indexCase}
                  />
                </>
              ))}
            </div>
          </div>
        </div>
        {!isMobile && <ControlBtn mode={MODE.Save} text="Зберегти" reStyle={styles} />}
      </Form>
      <AdminFormSeparator reStyle={styles} />
    </>
  )
}
