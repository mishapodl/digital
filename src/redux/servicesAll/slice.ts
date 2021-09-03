import { createSlice } from '@reduxjs/toolkit'

import { AppStateType } from './../store'
import { TSliceServicesAll } from './types'
import { getServicesAll, updateServicesAll } from './thunks'

import { FetchThunkState, resolveThunk } from '../../helpers'

const initialState: TSliceServicesAll = {
  services: [{ EN: { text: '' }, RU: { text: '' }, UA: { text: '' } }],
  title: { EN: { text: '' }, RU: { text: '' }, UA: { text: '' } },
  ...FetchThunkState,
}

const servicesAllSlice = createSlice({
  name: 'servicesAll',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    resolveThunk(getServicesAll, builder)
      .onPending()
      .onRejected()
      .onFulfilled((state, { payload }) => {
        state.services = payload.services
        state.title = payload.title
      })
    resolveThunk(updateServicesAll, builder)
      .onPending()
      .onRejected()
      .onFulfilled((state, { payload }) => {
        state.services = payload.services
        state.title = payload.title
      })
  },
})

export const servicesAllReducer = servicesAllSlice.reducer
export const selectServicesAll = (state: AppStateType) => state.servicesAll
