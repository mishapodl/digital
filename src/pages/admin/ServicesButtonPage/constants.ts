import { Lang, LangCode } from '../../../helpers'

export enum ServicesFields {
  pictureLink = 'pictureLink',
  image = 'picture',
  title = 'languages',
}

export type TServicesFields = {
  [ServicesFields.image]: any
  [ServicesFields.pictureLink]: string
  [ServicesFields.title]: { [key in keyof typeof LangCode]: { title: string } }
}

export const ServicesFormConf = [
  { field: `${ServicesFields.title}.UA.title`, title: 'Заголовок', lang: Lang.UA },
  { field: `${ServicesFields.title}.RU.title`, title: 'Заголовок:', lang: Lang.RU },
  { field: `${ServicesFields.title}.EN.title`, title: 'Title', lang: Lang.EN },
]

export const ServicesFormOptions = {
  [ServicesFields.title]: { required: true },
  [ServicesFields.image]: { required: false },
}
