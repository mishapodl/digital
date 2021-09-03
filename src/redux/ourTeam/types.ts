import { MongoItem, TLanguage } from './../../helpers/types'

export type TResTeam = (MongoItem &
  TLanguage<{
    description: string
    name: string
    position: string
  }> & {
    order: number
    picture: string
  })[]

export type TResTeamMember = {
  order: number
  picture: string
  _v: number
  _id: string
} & TLanguage<{
  description: string
  name: string
  position: string
}>

export type TTeamMember = {
  _id: string
  order: number
  picture: File | null
  img?: string
} & TLanguage<{
  description: string
  name: string
  position: string
}>

export type TTeam = ({ _id: string } & TLanguage<{
  description: string
  name: string
  position: string
}> & {
    order: number
    picture: FileList | null
    img?: string
  })[]

// export type TResCreate = () => {
//   a: string
// }
