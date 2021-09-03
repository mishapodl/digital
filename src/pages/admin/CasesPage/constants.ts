import { TCasesInfo } from './types'

import { LangCode } from '../../../helpers/index'
import { TCases } from '../../../redux/cases/types'

export enum CasesFields {
  _id = '_id',
  name = 'name',
  instagram = 'instagram',
  facebook = 'facebook',
  linkedin = 'linkedin',
  website = 'website',
  activity = 'activity',
  description = 'description',
  picture = 'picture',
  servicesProvide = 'services',
}

export enum CasesFieldsPrefixes {
  create = 'create',
}

const createLangFields = (
  lang: LangCode,
  name: string,
  activity: string,
  description: string,
  website: string,
  instagram: string,
  facebook: string,
  linkedin: string,
  services: any
) => {
  return {
    nameField: CasesFields.name,
    activityField: CasesFields.activity,
    descriptionField: CasesFields.description,
    instagramField: CasesFields.instagram,
    linkedinField: CasesFields.linkedin,
    facebookField: CasesFields.facebook,
    websiteField: CasesFields.website,
    serviceField: CasesFields.servicesProvide,
    lang,
    name,
    activity,
    description,
    instagram,
    linkedin,
    facebook,
    website,
    services,
  }
}

export const CasesConfig = {
  [LangCode.UA]: createLangFields(
    LangCode.UA,
    "Ім'я",
    'Дiяльнiсть',
    'Опис',
    'Website',
    'Instagram',
    'Facebook',
    'Linkedin',
    'Послуга'
  ),
  [LangCode.RU]: createLangFields(
    LangCode.RU,
    'Имя',
    'Деятельность',
    'Описание',
    'Website',
    'Instagram',
    'Facebook',
    'Linkedin',
    'Услуга'
  ),
  [LangCode.EN]: createLangFields(
    LangCode.EN,
    'Name',
    'Activity',
    'Description',
    'Website',
    'Instagram',
    'Facebook',
    'Linkedin',
    'Service'
  ),
}

export const CasesOptions = {
  [CasesFields._id]: { required: false },
  [CasesFields.name]: { required: false },
  [CasesFields.description]: { required: false },
  [CasesFields.picture]: { required: false },
  [CasesFields.activity]: { required: false },
  [CasesFieldsPrefixes.create]: { required: true },
}

export const defFields = () => ({
  [CasesFields.description]: '',
  [CasesFields.activity]: '',
  [CasesFields.name]: '',
  [CasesFields.instagram]: '#',
  [CasesFields.facebook]: '#',
  [CasesFields.website]: '#',
  [CasesFields.linkedin]: '#',
  [CasesFields.servicesProvide]: [],
})

export const NEW_CASE_ID = 'new-case'

export const NEW_CASE: TCases[number] = {
  _id: NEW_CASE_ID,
  order: 0,
  picture: null,
  languages: (() => {
    const langs = {} as { [code in LangCode]: TCasesInfo }
    Object.values(LangCode).forEach((code) => {
      langs[code] = defFields()
    })
    return langs
  })(),
}
