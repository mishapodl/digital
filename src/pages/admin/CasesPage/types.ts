import { CasesFields } from './constants'

import { LangCode } from '../../../helpers/index'
import { TLanguage, TMongoListItem } from '../../../helpers/types'

export type TCasesInfo = {
  [CasesFields.name]: string
  [CasesFields.activity]: string
  [CasesFields.description]: string
}

export type TCasesFields = TCasesInfo & TMongoListItem & { [CasesFields.picture]: FileList | null }

export type TCasesData = {
  _id: string
  [CasesFields.picture]: FileList
} & {
  [code in LangCode]: TCasesInfo
}

export type TCase = {
  _id?: string
  [CasesFields.picture]: string | null
} & TLanguage<TCasesInfo>
