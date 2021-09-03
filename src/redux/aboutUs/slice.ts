import { createSlice } from '@reduxjs/toolkit'

import { aboutUsInfoRequest, updateAboutUsInfo } from './thunks'

import { TAboutUsFields } from '../../pages/admin/AboutUsPage/types'
import { resolveThunk, FetchThunkState } from '../../helpers'

const initialState = {
  ...FetchThunkState,
  texts: {
    UA: '',
    RU: '',
    EN: '',
  } as TAboutUsFields,
}

const aboutUsSlice = createSlice({
  name: 'aboutUs',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // get about us info
    resolveThunk(aboutUsInfoRequest, builder)
      .onPending()
      .onFulfilled((state, action) => {
        state.texts = action.payload
      })
      .onRejected()

    // update about us info
    resolveThunk(updateAboutUsInfo, builder)
      .onPending()
      .onRejected()
      .onFulfilled((s, a) => {
        s.texts = a.payload
      })
  },
})

export const aboutUsReducer = aboutUsSlice.reducer
