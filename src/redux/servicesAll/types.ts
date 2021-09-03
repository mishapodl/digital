import { IThunkState, MongoItem, TLangSplit } from '../../helpers/types'

export type TResAllServices = {
  title: TLangSplit<{ text: string }>
  services: TLangSplit<{ text: string }>[]
} & MongoItem

export type TReqAllServices = Pick<TResAllServices, 'services' | 'title'>

export type TSliceServicesAll = IThunkState & Pick<TResAllServices, 'services' | 'title'>
