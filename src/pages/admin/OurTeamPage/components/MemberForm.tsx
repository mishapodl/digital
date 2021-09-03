/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FC, useEffect, useState } from 'react'
import { SubmitErrorHandler, useForm, UseFormMethods } from 'react-hook-form'
import { useMediaQuery } from 'react-responsive'

import { Field } from './Field'

import { Form, Image } from '../../../../components/AdminForm'
import { ControlBtn, MODE } from '../../../../components/AdminForm/components/ControlBtn'
import { AdminFormSeparator } from '../../../../components/AdminFormSeparator/AdminFormSeparator'
import { NEW_MEMBER_ID, OurTeamFieldPrefixes, OurTeamFields, OurTeamFormConfig, OurTeamFormOptions } from '../constants'
import styles from '../OurTeamPage.module.scss'
import { TOurTeamData, TOurTeamFields } from '../types'
import { TTeam } from '../../../../redux/ourTeam/types'
import { ReactComponent as MoreArrow } from '../../../../assets/icons/language-arrow.svg'

type TProps = {
  member: TTeam[number] | null
  onSubmit: (data: TOurTeamData, id: string) => void
  onDelete: (id?: string) => void
  changeOrder: (step: number) => () => void
  isCreateForm?: boolean
  onError?: SubmitErrorHandler<any>
}

export const MemberForm: FC<TProps> = ({ member, onDelete, onError, changeOrder, onSubmit, isCreateForm = false }) => {
  const defVals = member ? { ...member.languages, picture: null } : undefined

  const form = useForm({ defaultValues: defVals })
  const prefixes = isCreateForm ? [OurTeamFieldPrefixes.create] : undefined

  const [isOpen, setIsOpen] = useState(false)

  const isMobile = useMediaQuery({
    query: '(max-width: 500px)',
  })

  useEffect(() => {
    if (member?._id === NEW_MEMBER_ID) {
      form.reset(member as any)
    }
    form.reset({ ...member, ...member?.languages } as any)
  }, [])

  let img = undefined
  if (member?.img) {
    img = member.img
  }
  if (!img && member?.picture) {
    if (typeof member.picture !== 'string') img = URL.createObjectURL(member.picture)
    else img = member.picture
  }

  return (
    <>
      <Form<TOurTeamFields>
        // @ts-ignore
        onSubmit={(data) => onSubmit(data, member?._id)}
        onError={onError}
        options={OurTeamFormOptions}
        reStyle={styles}
        form={form as any}
      >
        <div className={styles.formWrapper}>
          <div className={styles.leftWrapper}>
            <Image
              img={img}
              name={`${member?._id}.${OurTeamFields.picture}`}
              size="320x336 px"
              title="Зображення"
              prefixes={prefixes}
            />

            <div className={styles.buttonWrapper}>
              <ControlBtn mode={MODE.MoveUp} onClick={changeOrder(-1)} text="Підняти співробітника" reStyle={styles} />
              <ControlBtn
                mode={MODE.MoveDown}
                onClick={changeOrder(1)}
                text="Опустити співробітника"
                reStyle={styles}
              />
              <ControlBtn mode={MODE.Remove} onClick={onDelete} text="Видалити співробітника" reStyle={styles} />
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

          <div className={`${styles.fields} ${isOpen && styles.showFields}`}>
            {Object.entries(OurTeamFormConfig).map(([code, { nameField, firstName, position, description, lang }]) => (
              <Field
                key={`${code}.${nameField}`}
                nameField={OurTeamFields.name}
                positionField={OurTeamFields.position}
                descriptionField={OurTeamFields.description}
                firstName={firstName}
                position={position}
                description={description}
                lang={lang}
                prefixes={prefixes}
              />
            ))}
          </div>
        </div>
        {!isMobile && <ControlBtn mode={MODE.Save} text="Зберегти" reStyle={styles} />}
      </Form>
      <AdminFormSeparator reStyle={styles} />
    </>
  )
}
