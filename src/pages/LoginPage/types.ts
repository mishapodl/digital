import { Fields } from './constants'

export type TDataAdmin = {
  [Fields.password]: string
  [Fields.login]: string
}

export type TAdminCredentials = {
  [Fields.admin]: string
  [Fields.password]: string
}

export type TAdminValidate = {
  [Fields.login]: boolean
  [Fields.password]: boolean
}
