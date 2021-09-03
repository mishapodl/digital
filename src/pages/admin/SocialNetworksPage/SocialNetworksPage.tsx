import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'

import { Field } from './components/Field'
import { TSocialNetworksFields } from './types'
import { SocialNetworksOptions, SocialNetworksFields } from './constants'
import styles from './SocialNetworksPage.module.scss'

import PageHeader from '../components/PageHeader'
import { Form } from '../../../components/AdminForm'
import { ControlBtn, MODE } from '../../../components/AdminForm/components/ControlBtn'
import { AdminModal } from '../../AdminPanel'
import { updateSocialNetworks } from '../../../redux/socialNetworks/thunks'
import { socialNetworksRequest } from '../../../redux/socialNetworks/thunks'
import { AppStateType } from '../../../redux/store'
import { baseURL } from '../../../helpers'

//todo импортировать этот урл

// const baseUrl = 'http://test.platform-digital.agency/api/'

const SocialNetworksPage = () => {
  // Todo заглавная буква
  const [FieldsValue, setFieldsValue]: any = useState()
  const [FieldsIcon, setFieldsIcon]: any = useState()
  const [mustBeActive, setMustBeActive]: any = useState(false)
  const form = useForm({ defaultValues: FieldsValue })

  useEffect(() => {
    form.reset(FieldsValue)
  }, [FieldsValue])

  useEffect(() => {
    dispatch(socialNetworksRequest())
  }, [])

  const socialNetworkData = useSelector((state: AppStateType) => state.networks.formData)
  const dispatch = useDispatch()
  const adminModal = useContext(AdminModal)

  const onSubmit = async (data: TSocialNetworksFields) => {
    const choice = await adminModal?.open()
    const formData = new FormData()
    if (choice) {
      const { socialIcon1, socialIcon2, socialIcon3, socialIcon4, socialIcon5, socialIcon6 } = data
      const { socialInput1, socialInput2, socialInput3, socialInput4, socialInput5, socialInput6 } = data

      setMustBeActive(false)

      formData.append('social_1_img', socialIcon1[0] || '')
      formData.append('social_1_url', socialInput1)
      formData.append('social_2_img', socialIcon2[0] || '')
      formData.append('social_2_url', socialInput2)
      formData.append('social_3_img', socialIcon3[0] || '')
      formData.append('social_3_url', socialInput3)
      formData.append('social_4_img', socialIcon4[0] || '')
      formData.append('social_4_url', socialInput4)
      formData.append('social_5_img', socialIcon5[0] || '')
      formData.append('social_5_url', socialInput5)
      formData.append('social_6_img', socialIcon6[0] || '')
      formData.append('social_6_url', socialInput6)

      dispatch(updateSocialNetworks(formData))

      // arrData.forEach((el) => {
      //   if (!putRequest) return
      //
      //   if (el.socialIcon.length != 0 && el.socialInput) {
      //     putRequest = true
      //     formData.append(el.socialInput, el.socialIcon[0])
      //   } else {
      //     putRequest = false
      //   }
      // })
      // console.log(arrData)
    }
  }

  const clearField = (socialInput: any, socialIcon: any) => {
    setFieldsIcon((FieldsIcon: any) => ({ ...FieldsIcon, [socialIcon]: FieldsIcon[socialIcon] != '' ? '' : '/' }))
    setFieldsValue({ ...FieldsValue, [socialInput]: '' })
    setMustBeActive(true)
  }

  useEffect(() => {
    //todo shorten code
    setFieldsIcon({
      socialIcon1: socialNetworkData[0] ? socialNetworkData[0].iconFileName : '',
      socialIcon2: socialNetworkData[1] ? socialNetworkData[1].iconFileName : '',
      socialIcon3: socialNetworkData[2] ? socialNetworkData[2].iconFileName : '',
      socialIcon4: socialNetworkData[3] ? socialNetworkData[3].iconFileName : '',
      socialIcon5: socialNetworkData[4] ? socialNetworkData[4].iconFileName : '',
      socialIcon6: socialNetworkData[5] ? socialNetworkData[5].iconFileName : '',
    })

    setFieldsValue({
      socialInput1: socialNetworkData[0] ? socialNetworkData[0].url : '',
      socialInput2: socialNetworkData[1] ? socialNetworkData[1].url : '',
      socialInput3: socialNetworkData[2] ? socialNetworkData[2].url : '',
      socialInput4: socialNetworkData[3] ? socialNetworkData[3].url : '',
      socialInput5: socialNetworkData[4] ? socialNetworkData[4].url : '',
      socialInput6: socialNetworkData[5] ? socialNetworkData[5].url : '',
    })
  }, [socialNetworkData])

  /// todo fix name  fieldName and fileName
  if (FieldsValue) {
    return (
      <>
        <PageHeader name={'Соцмережі'} />
        <Form<TSocialNetworksFields> form={form} onSubmit={onSubmit} options={SocialNetworksOptions} reStyle={styles}>
          <Field
            fieldName={SocialNetworksFields.socialInput1}
            fileName={SocialNetworksFields.socialIcon1}
            imgUrl={FieldsIcon.socialIcon1 ? baseURL + '/' + FieldsIcon.socialIcon1 : ' '}
            callback={clearField}
          />
          <Field
            fieldName={SocialNetworksFields.socialInput2}
            fileName={SocialNetworksFields.socialIcon2}
            imgUrl={FieldsIcon.socialIcon2 ? baseURL + '/' + FieldsIcon.socialIcon2 : ' '}
            callback={clearField}
          />
          <Field
            fieldName={SocialNetworksFields.socialInput3}
            fileName={SocialNetworksFields.socialIcon3}
            imgUrl={FieldsIcon.socialIcon3 ? baseURL + '/' + FieldsIcon.socialIcon3 : ' '}
            callback={clearField}
          />
          <Field
            fieldName={SocialNetworksFields.socialInput4}
            fileName={SocialNetworksFields.socialIcon4}
            imgUrl={FieldsIcon.socialIcon4 ? baseURL + '/' + FieldsIcon.socialIcon4 : ' '}
            callback={clearField}
          />
          <Field
            fieldName={SocialNetworksFields.socialInput5}
            fileName={SocialNetworksFields.socialIcon5}
            imgUrl={FieldsIcon.socialIcon5 ? baseURL + '/' + FieldsIcon.socialIcon5 : ' '}
            callback={clearField}
          />
          <Field
            fieldName={SocialNetworksFields.socialInput6}
            fileName={SocialNetworksFields.socialIcon6}
            imgUrl={FieldsIcon.socialIcon6 ? baseURL + FieldsIcon.socialIcon6 : ' '}
            callback={clearField}
          />
          <ControlBtn mode={MODE.Save} text="Зберегти" type={'submit'} reStyle={styles} mustBeActive={mustBeActive} />
        </Form>
      </>
    )
  } else {
    return null
  }
}

export default SocialNetworksPage
