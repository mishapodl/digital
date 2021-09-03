import { createSlice } from '@reduxjs/toolkit'

import { getMainTexts, putMainTexts } from './thunks'

import { TMainFields } from '../../pages/admin/MainPage/types'
import { resolveThunk, FetchThunkState } from '../../helpers'

const initialState = {
  ...FetchThunkState,
  texts: {
    UA: '',
    RU: '',
    EN: '',
  } as TMainFields,
}

const mainPageSlice = createSlice({
  name: 'mainPage',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // **** GET MainTexts
    resolveThunk(getMainTexts, builder)
      .onPending()
      .onFulfilled((state, action) => {
        state.texts = action.payload
      })
      .onRejected()

    // **** PUT MainTexts
    resolveThunk(putMainTexts, builder)
      .onPending()
      .onRejected()
      .onFulfilled((s, a) => {
        s.texts = a.payload
      })
  },
})

export const mainPageReducer = mainPageSlice.reducer
