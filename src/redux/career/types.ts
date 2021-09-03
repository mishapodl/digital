import { LangCode } from '../../helpers'

export type TDataCareerText = {
  [key in LangCode]: {
    title: string
    subtitle: string
  }
}
