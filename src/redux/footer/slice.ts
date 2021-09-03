import { createSlice } from '@reduxjs/toolkit'

import { footerInfoRequest, updateFooterInfo } from './thunks'

import { TFooterFields } from '../../pages/admin/Footer/constants'
import { resolveThunk, FetchThunkState } from '../../helpers'

const initialState = {
  ...FetchThunkState,
  contacts: null as TFooterFields | null,
  policy: null as any,
  title: '' as string,
}

const footerSlice = createSlice({
  name: 'footer',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get footer info
    resolveThunk(footerInfoRequest, builder)
      .onPending()
      .onFulfilled((state, action) => {
        state.contacts = action.payload.data
        state.policy! = action.payload.policy.data
        state.title! = action.payload.policy.data.languages.EN.title
      })
      .onRejected()

    // update footer info
    resolveThunk(updateFooterInfo, builder)
      .onPending()
      .onRejected()
      .onFulfilled((s, { payload }) => {
        s.contacts! = payload.data
        s.title! = payload.title?.name || payload.policy.languages.EN.title
        s.policy! = !payload.policy.data ? payload.policy : payload.policy.data
      })
  },
})

export const footerReducer = footerSlice.reducer
