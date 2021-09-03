import { SerializedError } from '@reduxjs/toolkit'

import { TService } from './../../pages/admin/ServicesPage/types'
import { IThunkState, MongoItem, TLangSplit, TLanguage } from './../../helpers/types'
import { LangCode, Packages } from './../../helpers/index'

export type TResQuote = TLanguage<{
  title: string
  subTitle: string
}>

export type TResAllPackages = {
  packages: {
    [key in Packages]: {
      price: number
    } & TLanguage<{ name: string }>
  }
  services: ({
    presentIn: {
      [key in Packages]: boolean
    }
  } & TLanguage<{ name: string }>)[]
} & MongoItem

export type TQuote = Pick<TResQuote, 'languages'>['languages']

export type TPackageNames = {
  [code in LangCode]: {
    [pack in Packages]: {
      text: string
    }
  }
}

export type TPackage = MongoItem & {
  text: string
  allowedIn: { [key in Packages]: boolean }
}

export type TAllPackages = {
  prices: [number, number, number]
  packageNames: {
    [code in LangCode]: {
      [pack in Packages]: {
        text: string
      }
    }
  }
  services: TService[]
}

export type ServiceState = {
  quote: TQuote
  isFetchingServices: boolean
  isFetchingNames: boolean
  errorServices: SerializedError | null
  errorNames: SerializedError | null
} & IThunkState &
  TAllPackages

export type TDataPackagesNames = TLangSplit<
  {
    [pack in Packages]: {
      text: string
    }
  }
>

export type TDataPackages = {
  prices: [number, number, number]
  services: Array<{
    serviceName: TLangSplit<string>
    allowedIn: {
      [pack in Packages]: boolean
    }
  }>
}

export type TReqPackageNames = {
  packages: {
    [pack in Packages]: TLanguage<{ name: string }>
  }
}

export type TReqPackageServices = {
  packages: {
    [pack in Packages]: { price: number } & TLanguage<{ name: string }>
  }
  services: Array<{
    presentIn: {
      [pack in Packages]: boolean
    }
    languages: TLangSplit<{ name: string }>
  }>
}
