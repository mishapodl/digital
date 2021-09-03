import { LangCode } from './../../../helpers/index'
import { TLanguage, TMongoListItem } from './../../../helpers/types'
import { OurTeamFields } from './constants'

export type TMemberInfo = {
  [OurTeamFields.name]: string
  [OurTeamFields.position]: string
  [OurTeamFields.description]: string
}

export type TOurTeamFields = TMemberInfo & TMongoListItem & { [OurTeamFields.picture]: FileList | null }

export type TOurTeamData = {
  _id: string
  [OurTeamFields.picture]: FileList
} & {
  [code in LangCode]: TMemberInfo
}

export type TMember = {
  _id?: string
  [OurTeamFields.picture]: string | null
} & TLanguage<TMemberInfo>
