import { createSlice } from '@reduxjs/toolkit'

import { getCV, getCVLinks, postCVLinks } from './thunks'
import { TRequest } from './types'

import { TRequestsFields } from '../../pages/admin/RequestsPage/types'
import { resolveThunk, FetchThunkState } from '../../helpers'

const initialState = {
  ...FetchThunkState,
  requests: null as TRequest | null,
  links: null as TRequestsFields | null,
}

const cvRequestSlice = createSlice({
  name: 'cvRequest',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get all cv's
    resolveThunk(getCV, builder)
      .onPending()
      .onFulfilled((state, action) => {
        state.requests = action.payload
      })
      .onRejected()

    // get links
    resolveThunk(getCVLinks, builder)
      .onPending()
      .onFulfilled((state, action) => {
        state.links = action.payload
      })
      .onRejected()

    // post links
    resolveThunk(postCVLinks, builder).onPending().onRejected().onFulfilled()
  },
})

export const cvRequestReducer = cvRequestSlice.reducer
