import { TServiceName } from './../pages/admin/ServicesPage/types'
import {
  TAllPackages,
  TResAllPackages,
  TPackageNames,
  TReqPackageNames,
  TDataPackagesNames,
  TReqPackageServices,
} from './../redux/services/types'
import { NEW_MEMBER_ID } from './../pages/admin/OurTeamPage/constants'
import { TOurTeamData } from './../pages/admin/OurTeamPage/types'
import { IMultiLanguage } from './types'
import { TResTeam, TTeam } from './../redux/ourTeam/types'
import { TResCases, TCases } from './../redux/cases/types'

import { TMainFields } from '../pages/admin/MainPage/types'
import { MainFields } from '../pages/admin/MainPage/constants'
import { TResMainPage, TResMainPagePUT } from '../redux/mainPage/types'

import { LangCode, Packages } from './index'

const toSingleFile = (name: string, data: any) => {
  if (typeof data[name] !== 'string') data[name] = data[data._id ? data._id : NEW_MEMBER_ID][name][0]

  delete data[data._id ? data._id : NEW_MEMBER_ID]
}

export const toFormData = (data: any, objFields: string[]) => {
  const fd = new FormData()
  Object.entries(data).map(([key, val]) => {
    if (objFields.includes(key)) {
      fd.append(key, JSON.stringify(val))
    } else fd.append(key, val as any)
  })
  return fd
}

const toMember = (data: Partial<TOurTeamData>) => {
  delete data._id
  return data
}

export const adapt = (...funcs: ((obj: any) => any)[]) => (obj: any) => {
  let res = null
  funcs.forEach((f) => {
    res = f(obj)
  })
  return res
}

export const toLanguages = (data: any) => {
  data.languages = {}
  Object.values(LangCode).forEach((langCode) => {
    data.languages[langCode] = data[langCode]
    delete data[langCode]
  })
  return data
}

export const toLanguagesCases = (data: IMultiLanguage) => {
  data.languages = {}
  Object.values(LangCode).forEach((langCode) => {
    data.languages[langCode] = data['new-case'][langCode]
    delete data['new-case'][langCode]
  })
  return data
}

export const adaptToTeamUpdate = (data: TOurTeamData) =>
  adapt(
    (data) => toSingleFile('picture', data),
    toLanguages,
    (d) => toFormData(d, ['languages'])
  )(data)

export const adaptToTeamCreate = (data: TOurTeamData) =>
  adapt(
    (data) => toSingleFile('picture', data),
    toLanguages,
    toMember,
    (d) => toFormData(d, ['languages'])
  )(data)

export const adaptTeam = (data: TResTeam): TTeam =>
  data.map((member) => ({ ...member, img: member.picture, picture: null }))

export const adaptToMainText = (data: TMainFields): TResMainPagePUT => ({
  EN: { content: data[MainFields.enText] },
  RU: { content: data[MainFields.ruText] },
  UA: { content: data[MainFields.uaText] },
})

export const adaptCase = (data: TResCases): TCases =>
  data.map((member) => ({ ...member, img: member.picture, picture: null }))

export const adaptResToMainText = (data: TResMainPage): TMainFields => ({
  [MainFields.enText]: data.languages.EN.content,
  [MainFields.uaText]: data.languages.UA.content,
  [MainFields.ruText]: data.languages.RU.content,
})

export const adaptResToAllPackages = (data: TResAllPackages): TAllPackages => {
  return {
    services: data.services.map((service) => ({
      allowedIn: service.presentIn,
      serviceName: Object.values(LangCode).reduce((acc, lang) => {
        acc[lang] = service.languages[lang].name
        return acc
      }, {} as TServiceName),
    })),

    prices: Object.values(data.packages).map((pack) => pack.price) as [number, number, number],

    packageNames: Object.values(LangCode).reduce((acc, lang) => {
      acc[lang] = Object.values(Packages).reduce((acc, pack) => {
        acc[pack] = { text: data.packages[pack].languages[lang].name }
        return acc
      }, {} as TPackageNames['EN'])
      return acc
    }, {} as TPackageNames),
  }
}
const createPack = (pack: Packages, values: TDataPackagesNames) => ({
  languages: {
    EN: { name: values.EN[pack].text },
    UA: { name: values.UA[pack].text },
    RU: { name: values.RU[pack].text },
  },
})
const createPackages = (
  pack: Packages,
  values: TAllPackages,
  priceInd: number
): TResAllPackages['packages']['pack1'] => ({
  price: values.prices[priceInd],
  languages: {
    EN: { name: values.packageNames.EN[pack].text },
    UA: { name: values.packageNames.UA[pack].text },
    RU: { name: values.packageNames.RU[pack].text },
  },
})
export const adaptToReqPackageNames = (values: TDataPackagesNames): TReqPackageNames => ({
  packages: {
    [Packages.first]: createPack(Packages.first, values),
    [Packages.second]: createPack(Packages.second, values),
    [Packages.third]: createPack(Packages.third, values),
  },
})

export const adaptToReqPackageServices = (values: TAllPackages): TReqPackageServices => ({
  packages: {
    [Packages.first]: createPackages(Packages.first, values, 0),
    [Packages.second]: createPackages(Packages.second, values, 1),
    [Packages.third]: createPackages(Packages.third, values, 2),
  },

  services: values.services.map((service) => ({
    presentIn: {
      [Packages.first]: service.allowedIn[Packages.first],
      [Packages.second]: service.allowedIn[Packages.second],
      [Packages.third]: service.allowedIn[Packages.third],
    },
    languages: {
      [LangCode.EN]: { name: service.serviceName[LangCode.EN] },
      [LangCode.UA]: { name: service.serviceName[LangCode.UA] },
      [LangCode.RU]: { name: service.serviceName[LangCode.RU] },
    },
  })),
})
