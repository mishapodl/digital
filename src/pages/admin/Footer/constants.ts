import { Lang, LangCode } from '../../../helpers'

export enum FooterFields {
  imageLink = 'gmapsPictureLink',
  image = 'gmapsPicture',
  phone = 'tel',
  email = 'email',
  skype = 'skype',
  mapLink = 'gmapsLink',
  address = 'languages',
  files = 'files',
}

export type TFooterFields = {
  [FooterFields.image]: any
  [FooterFields.phone]: string
  [FooterFields.email]: string
  [FooterFields.skype]: string
  [FooterFields.mapLink]: string
  [FooterFields.imageLink]: string
  [FooterFields.files]: any
  [FooterFields.address]: { [key in keyof typeof LangCode]: { address: string } }
}

export const addressConf = [
  { field: `${FooterFields.address}.UA.address`, title: 'Адреса:', lang: Lang.UA },
  { field: `${FooterFields.address}.RU.address`, title: 'Адрес:', lang: Lang.RU },
  { field: `${FooterFields.address}.EN.address`, title: 'Address', lang: Lang.EN },
]

// const requiredExtensions = ['pdf']

export const FooterFormOptions = {
  [FooterFields.image]: { required: false },
  [FooterFields.phone]: { required: true },
  [FooterFields.email]: { required: true },
  [FooterFields.skype]: { required: true },
  [FooterFields.mapLink]: { required: true },
  [FooterFields.address]: { required: true },
  [FooterFields.files]: {
    required: { value: false, message: `form.error.${FooterFields.files}.size` },
  },
  // [FooterFields.files]: {
  //   required: { value: true, message: `form.error.${FooterFields.files}.size` },
  //   validate: {
  //     extension: (files: FileList): true | string => {
  //       return requiredExtensions.includes(files[0].name.split('.')[1]) || `form.error.${FooterFields.files}.extension`
  //     },
  //     size: (files: FileList): true | string => {
  //       // ? less than 5MB
  //       return files[0].size / 1024 ** 2 < 5 || `form.error.${FooterFields.files}.size`
  //     },
  //   },
  // },
}
