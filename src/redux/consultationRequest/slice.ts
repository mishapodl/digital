import { createSlice } from '@reduxjs/toolkit'

import { getConsultations, getConsultationLinks, postConsultationLinks } from './thunks'
import { TRequest } from './types'

import { TRequestsFields } from '../../pages/admin/RequestsPage/types'
import { resolveThunk, FetchThunkState } from '../../helpers'

const initialState = {
  ...FetchThunkState,
  requests: null as TRequest | null,
  links: null as TRequestsFields | null,
}

const consultationRequestSlice = createSlice({
  name: 'consultationRequest',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all consultation requests
    resolveThunk(getConsultations, builder)
      .onPending()
      .onFulfilled((state, action) => {
        state.requests = action.payload
      })
      .onRejected()

    // get links
    resolveThunk(getConsultationLinks, builder)
      .onPending()
      .onFulfilled((state, action) => {
        state.links = action.payload
      })
      .onRejected()

    // post links
    resolveThunk(postConsultationLinks, builder).onPending().onRejected().onFulfilled()
  },
})

export const consultationRequestReducer = consultationRequestSlice.reducer
