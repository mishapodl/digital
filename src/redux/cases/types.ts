import { MongoItem, TLanguage } from './../../helpers/types'

export type TResCases = (MongoItem &
  TLanguage<{
    description: string
    name: string
    activity: string
  }> & {
    picture: string
    order: number
  })[]

export type TCases = ({ _id?: string } & TLanguage<{
  description: string
  name: string
  activity: string
}> & {
    picture: FileList | string | null
    order: number
    img?: string
    file?: File | null
  })[]
