import { Lang } from '../../../helpers'

export enum AboutUsFields {
  ruText = 'RU',
  uaText = 'UA',
  enText = 'EN',
}

export const AboutUsFormConf = [
  { field: AboutUsFields.uaText, title: 'Текст “Хто ми”', lang: Lang.UA },
  { field: AboutUsFields.ruText, title: 'Текст “Кто мы”', lang: Lang.RU },
  { field: AboutUsFields.enText, title: 'Text “Who we are”', lang: Lang.EN },
]

export const AboutUsFormOptions = {
  [AboutUsFields.uaText]: { required: true },
  [AboutUsFields.ruText]: { required: true },
  [AboutUsFields.enText]: { required: true },
}
