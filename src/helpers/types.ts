import { RegisterOptions } from 'react-hook-form'
import { AsyncThunk, SerializedError } from '@reduxjs/toolkit'
import { ChangeEvent } from 'react'

import { LangCode } from './index'

// ? [__PRIVATE__]
// **** INTERFACES
type IExpandable = {
  [key: string]: any
}

// ? [__PUBLIC__]
// **** TYPES
export type TFetchingThunk = AsyncThunk<any, any, any>

export type MongoItem = {
  _id: string
  changedAt: Date
  _v: number
}

export type TMongoListItem = Pick<MongoItem, '_id'>

export type TLangSplit<T> = { [key in LangCode]: T }
export type TLanguage<T> = { languages: TLangSplit<T> }

export type TFieldConf = {
  name: string
  title: string
}

export type TFormOptions = { [key: string]: RegisterOptions }

// **** INTERFACES

export type IThunkState = {
  isFetching: boolean
  error: SerializedError | null
} & IExpandable

export type IMultiLanguage = {
  [key in LangCode]: any
} &
  IExpandable

export type setValueCallback = (event: ChangeEvent<HTMLInputElement>) => void
export type setIconCallback = (file: string | Blob) => void
export type CallbackType = setValueCallback | setIconCallback
