import { FieldErrors } from 'react-hook-form'
import phone from 'phone'
import axios from 'axios'
import { ActionReducerMapBuilder, Draft, PayloadAction, SerializedError } from '@reduxjs/toolkit'

import { IThunkState, TFetchingThunk } from './types'

import { phone as phoneRegex } from '../components/FeedBack/regex'

export const baseURL = 'http://test.platform-digital.agency/api'

export const instance = axios.create({
  baseURL,
})
instance.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

export const getPhone = (phoneNum: string) => {
  if (!phoneRegex.test(phoneNum)) return null
  let phoneResult = phone(phoneNum, 'UKR')
  if (!!phoneResult.length) {
    return phoneResult[0] // ? trimmed phone number
  }
  phoneResult = phone(phoneNum)
  if (!!phoneResult.length) {
    return phoneResult[0] // ? trimmed phone number
  }
  return null
}

export enum Lang {
  EN = 'English',
  RU = 'Русский',
  UA = 'Українська',
}

export enum LangCode {
  UA = 'UA',
  RU = 'RU',
  EN = 'EN',
}

export enum LowLangCode {
  en = 'en',
  ru = 'ru',
  ua = 'ua',
}

export enum Packages {
  first = 'pack1',
  second = 'pack2',
  third = 'pack3',
}

export const FetchThunkState: IThunkState = {
  isFetching: false,
  error: null as SerializedError | null,
}

export const resolveThunk = <TInitialState extends IThunkState, TThunk extends TFetchingThunk>(
  thunk: TThunk,
  builder: ActionReducerMapBuilder<TInitialState>,
  flag = true
) => {
  return {
    onPending(cb?: (state: Draft<TInitialState>, action: PayloadAction) => void) {
      builder.addCase(thunk.pending, (state, action) => {
        if (flag) {
          state.isFetching = true
          state.error = null
        }
        cb?.(state, action)
      })
      return this
    },
    onFulfilled(
      cb?: (
        state: Draft<TInitialState>,
        action: PayloadAction<any, string, { arg: any; requestId: string }, never>
      ) => void
    ) {
      builder.addCase(thunk.fulfilled, (state, action) => {
        if (flag) {
          state.isFetching = false
        }
        cb?.(state, action)
      })
      return this
    },
    onRejected(cb?: (state: Draft<TInitialState>, action: any) => void) {
      builder.addCase(thunk.rejected, (state, action) => {
        if (flag) {
          state.isFetching = false
          // state.error = action.error
          state.error = null
        }
        cb?.(state, action)
      })
      return this
    },
  }
}

export const handleSubmissionError = (errors: FieldErrors, openModal: () => void) => {
  if (
    Object.values(errors)
      .map((err) => err?.type || err?.title?.type || err?.subtitle?.type)
      .includes('required')
  ) {
    openModal()
  }
}
