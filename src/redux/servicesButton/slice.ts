import { createSlice } from '@reduxjs/toolkit'

import { getServices, updateServices } from './thunks'

import { TServicesFields } from '../../pages/admin/ServicesButtonPage/constants'
import { resolveThunk, FetchThunkState } from '../../helpers'

const initialState = {
  ...FetchThunkState,
  data: null as TServicesFields | null,
}

const servicesButtonSlice = createSlice({
  name: 'servicesButton',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get services info
    resolveThunk(getServices, builder)
      .onPending()
      .onFulfilled((state, action) => {
        state.data = action.payload
      })
      .onRejected()

    // update services info
    resolveThunk(updateServices, builder)
      .onPending()
      .onRejected()
      .onFulfilled((state, { payload }) => {
        state.data! = payload
      })
  },
})

export const servicesButtonReducer = servicesButtonSlice.reducer
