import { TTeamMember } from './../../../redux/ourTeam/types'
import { LangCode } from './../../../helpers/index'
import { TMemberInfo } from './types'

export enum OurTeamFields {
  _id = '_id',
  name = 'name',
  position = 'position',
  description = 'description',
  picture = 'picture',
}

export enum OurTeamFieldPrefixes {
  create = 'create',
}

const createLangFields = (lang: LangCode, firstName: string, position: string, description: string) => {
  return {
    nameField: OurTeamFields.name,
    positionField: OurTeamFields.position,
    descriptionField: OurTeamFields.description,
    lang,
    firstName,
    position,
    description,
  }
}

export const OurTeamFormConfig = {
  [LangCode.UA]: createLangFields(LangCode.UA, "Ім'я", 'Посада', 'Опис'),
  [LangCode.RU]: createLangFields(LangCode.RU, 'Имя', 'Должность', 'Описание'),
  [LangCode.EN]: createLangFields(LangCode.EN, 'Name', 'Position', 'Description'),
}

export const OurTeamFormOptions = {
  [OurTeamFields._id]: { required: true },
  [OurTeamFields.name]: { required: true },
  [OurTeamFields.description]: { required: true },
  [OurTeamFields.picture]: { required: false },
  [OurTeamFields.position]: { required: true },
  [OurTeamFieldPrefixes.create]: { required: true },
}

export const defFields = () => ({
  [OurTeamFields.description]: '',
  [OurTeamFields.position]: '',
  [OurTeamFields.name]: '',
})

export const NEW_MEMBER_ID = 'new-member'

export const NEW_MEMBER: TTeamMember = {
  _id: NEW_MEMBER_ID,
  order: 0,
  picture: null,
  languages: (() => {
    const langs = {} as { [code in LangCode]: TMemberInfo }
    Object.values(LangCode).forEach((code) => {
      langs[code] = defFields()
    })
    return langs
  })(),
}
