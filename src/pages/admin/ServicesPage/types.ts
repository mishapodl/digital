import { LangCode, Packages } from './../../../helpers/index'

import { ServiceFields } from '../ServicePackages/constants'

export type TServiceName = { [code in LangCode]: string }
export type TService = {
  [ServiceFields.serviceName]: TServiceName
  allowedIn: { [key in Packages]: boolean }
}
