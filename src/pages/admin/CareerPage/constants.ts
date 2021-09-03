import { LangCode } from './../../../helpers'
import { TCareerFieldOption } from './components/CareerField'

export type TCareerFields = {
  [CareerFields.title]: string
  [CareerFields.subtitle]: string
}

export enum CareerFields {
  title = 'title',
  subtitle = 'subtitle',
}

const createFieldOpt = (langCode: LangCode, title: string, subtitle: string) =>
  ({
    [langCode]: {
      [CareerFields.title]: title,
      [CareerFields.subtitle]: subtitle,
    },
  } as { [code in LangCode]: TCareerFieldOption })

export const careerOpt = {
  ...createFieldOpt(LangCode.UA, 'Заголовок', 'Підзаголовок'),
  ...createFieldOpt(LangCode.RU, 'Заголовок', 'Подзаголовок'),
  ...createFieldOpt(LangCode.EN, 'Title', 'Subtitle'),
}

export const careerOptions = {
  [CareerFields.title]: { required: true },
  [CareerFields.subtitle]: { required: true },
}
