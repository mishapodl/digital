import { LangCode } from '../../../helpers'
import { TSliceServicesAll } from '../../../redux/servicesAll/types'

export enum ServicesFields {
  title = 'title',
  services = 'services',
}

export const ServicesFormConf = [
  { title: 'Заголовок', lang: LangCode.UA },
  { title: 'Заголовок', lang: LangCode.RU },
  { title: 'Title', lang: LangCode.EN },
]

// export const ServiceItemConf = [
//   { field: ServiceItemFields.uaItem, title: 'Послуга 1', lang: Lang.UA },
//   { field: ServiceItemFields.ruItem, title: 'Услуга 1', lang: Lang.RU },
//   { field: ServiceItemFields.enItem, title: 'Service 1', lang: Lang.EN },
// ]

export const ServicesFormOptions = {
  [ServicesFields.services]: { required: true },
  [ServicesFields.title]: { required: true },
}

export const NEW_SERVICES_ALL_ITEM: TSliceServicesAll['services'][number] = {
  EN: { text: '' },
  UA: { text: '' },
  RU: { text: '' },
}
