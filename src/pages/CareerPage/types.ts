import { Fields } from './constants'

export type TDataCareer = {
  [Fields.name]: string
  [Fields.phone]: string
  [Fields.files]: FileList
}
