import { Lang } from '../../../helpers'

export enum MainFields {
  ruText = 'RU',
  uaText = 'UA',
  enText = 'EN',
}

export const MainFormConf = [
  { field: MainFields.uaText, title: 'Текст головної', lang: Lang.UA },
  { field: MainFields.ruText, title: 'Текст главной', lang: Lang.RU },
  { field: MainFields.enText, title: 'Main text', lang: Lang.EN },
]

export const MainFormOptions = {
  required: { required: true },
}
