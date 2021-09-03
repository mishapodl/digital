import { createSlice } from '@reduxjs/toolkit'

import { getPackages, getServiceQuote, updatePackageNames, updatePackageServices, updateQuote } from './thunks'
import { AppStateType } from './../store'
import { FetchThunkState, LangCode, Packages, resolveThunk } from './../../helpers/index'
import { ServiceState, TPackageNames, TQuote } from './types'

import { NEW_SERVICE } from '../../pages/admin/ServicePackages/constants'

const initialState: ServiceState = {
  quote: Object.values(LangCode).reduce((acc, code) => {
    acc[code] = { title: '', subTitle: '' }
    return acc
  }, {} as TQuote),

  services: [NEW_SERVICE],

  packageNames: Object.values(LangCode).reduce((acc, code) => {
    acc[code] = Object.values(Packages).reduce((acc, pack) => {
      acc[pack] = { text: '' }
      return acc
    }, {} as TPackageNames['EN']) // type of prop
    return acc
  }, {} as TPackageNames),

  prices: [7, 0, 0],

  ...FetchThunkState,
  isFetchingServices: false,
  isFetchingNames: false,
  errorNames: null,
  errorServices: null,
}

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    resolveThunk(getServiceQuote, builder)
      .onPending()
      .onRejected()
      .onFulfilled((state, { payload }) => {
        state.quote = payload.quote
      })
    resolveThunk(updateQuote, builder)
      .onPending()
      .onRejected()
      .onFulfilled((state, { payload }) => {
        console.log(payload)
        state.quote = payload.quote
      })
    resolveThunk(getPackages, builder)
      .onPending()
      .onRejected()
      .onFulfilled((state, { payload }) => {
        state.packageNames = payload.packageNames
        state.services = payload.services
        state.prices = payload.prices
      })
    resolveThunk(updatePackageNames, builder, false)
      .onPending((state) => {
        state.isFetchingNames = true
        state.errorNames = null
      })
      .onRejected((state) => {
        state.isFetchingNames = false
      })
      .onFulfilled((state, { payload }) => {
        state.prices = payload.prices
        state.services = payload.services
        state.packageNames = payload.packageNames
        state.isFetchingNames = false
      })
    resolveThunk(updatePackageServices, builder, false)
      .onPending((state) => {
        state.isFetchingServices = true
        state.errorServices = null
      })
      .onRejected((state) => {
        state.isFetchingServices = false
      })
      .onFulfilled((state, { payload }) => {
        state.prices = payload.prices
        state.services = payload.services
        state.packageNames = payload.packageNames
        state.isFetchingServices = false
      })
  },
})

export const servicesReducer = servicesSlice.reducer
export const selectServices = (state: AppStateType) => state.services
