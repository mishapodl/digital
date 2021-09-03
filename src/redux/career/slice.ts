import { createSlice } from '@reduxjs/toolkit'

import { resolveThunk, FetchThunkState } from './../../helpers'
import { getText, sendCV, updateText } from './thunks'
import { TDataCareerText } from './types'

const initialState = {
  ...FetchThunkState,
  text: {
    UA: {
      title: '',
      subtitle: '',
    },
    RU: {
      title: '',
      subtitle: '',
    },
    EN: {
      title: '',
      subtitle: '',
    },
  } as TDataCareerText,
}

const slice = createSlice({
  name: 'career',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    resolveThunk(sendCV, builder).onPending().onRejected().onFulfilled()
    resolveThunk(getText, builder)
      .onFulfilled((state, { payload }) => {
        state.text = payload
      })
      .onPending()
      .onRejected()
    resolveThunk(updateText, builder)
      .onPending()
      .onRejected()
      .onFulfilled((state, { payload }) => {
        state.text = payload
      })
  },
})

export const careerReducer = slice.reducer
