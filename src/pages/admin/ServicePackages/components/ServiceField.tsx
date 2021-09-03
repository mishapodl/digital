import React, { FC } from 'react'
import { ArrayField } from 'react-hook-form'
import { useMediaQuery } from 'react-responsive'

import { ReactComponent as DelBtn } from '../../../../assets/icons/deleteIcon.svg'
import { Input, CheckBox } from '../../../../components/AdminForm'
import { Lang, Packages } from '../../../../helpers'
import { AdminFormFieldLang } from '../../../../components/AdminForm/components/AdminFormFieldLang'
import s from '../ServicePackages.module.scss'
import { ServiceFields } from '../constants'
import { TService } from '../../ServicesPage/types'
import { ControlBtn, MODE } from '../../../../components/AdminForm/components/ControlBtn'

type TProps = {
  k: number
  onRemove: () => void
  item: Partial<ArrayField<TService, 'id'>>
}

export const ServiceField: FC<TProps> = ({ k, onRemove, item }) => {
  const isFirst = k === 0

  const isMobile = useMediaQuery({
    query: '(max-width: 500px)',
  })
  console.log(item)
  return (
    <>
      <div>
        {isFirst && <AdminFormFieldLang lang={Lang.UA} />}
        <Input
          name={`services[${k}].serviceName.UA`}
          defaultValue={item.serviceName?.UA}
          title="Послуга 1"
          prefixes={[ServiceFields.serviceName]}
        />
      </div>

      <div>
        {isFirst && <AdminFormFieldLang lang={Lang.RU} />}
        <Input
          name={`services[${k}].serviceName.RU`}
          defaultValue={item.serviceName?.RU}
          title="Услуга 1"
          prefixes={[ServiceFields.serviceName]}
        />
      </div>

      <div>
        {isFirst && <AdminFormFieldLang lang={Lang.EN} />}
        <Input
          name={`services[${k}].serviceName.EN`}
          defaultValue={item.serviceName?.EN}
          title="Service 1"
          prefixes={[ServiceFields.serviceName]}
        />
      </div>

      <CheckBox
        name={`services[${k}].allowedIn.${Packages.first}`}
        title={isFirst ? 'СТАНДАРТ' : isMobile ? 'СТАНДАРТ' : ''}
        defaultValue={item.allowedIn?.pack1}
      />
      <CheckBox
        name={`services[${k}].allowedIn.${Packages.second}`}
        title={isFirst ? 'СТАНДАРТ+' : isMobile ? 'СТАНДАРТ+' : ''}
        defaultValue={item.allowedIn?.pack2}
      />
      <CheckBox
        name={`services[${k}].allowedIn.${Packages.third}`}
        title={isFirst ? 'PRO' : isMobile ? 'PRO' : ''}
        defaultValue={item.allowedIn?.pack3}
      />

      <DelBtn className={s.delBtn} onClick={onRemove} />
      <ControlBtn mode={MODE.Remove} onClick={onRemove} text="видалити послугу" reStyle={s} />
    </>
  )
}
