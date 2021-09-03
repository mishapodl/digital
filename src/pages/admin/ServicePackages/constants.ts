import { TService } from './../ServicesPage/types'

import { TFormOptions } from '../../../helpers/types'
import { Packages } from '../../../helpers'

export enum ServiceFields {
  serviceName = 'serviceName',
  check = 'check',
  services = 'services',
  prices = 'prices',
  allowedIn = 'allowedIn',
}

export const serviceOptions: TFormOptions = {
  _id: { required: false },
  [ServiceFields.serviceName]: { required: true },
  [ServiceFields.prices]: { required: true, min: 0, valueAsNumber: true },
}

export const NEW_SERVICE: TService = {
  allowedIn: { [Packages.first]: false, [Packages.second]: false, [Packages.third]: false },
  serviceName: {
    EN: '',
    RU: '',
    UA: '',
  },
}
