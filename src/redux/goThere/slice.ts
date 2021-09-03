import { createSlice } from '@reduxjs/toolkit'

import { TDataCareerText } from './../career/types'
import { resolveThunk, FetchThunkState } from './../../helpers'
import { consultation, getConsultationText, updateConsultationText } from './thunks'

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

const goThereSlice = createSlice({
  name: 'goThere',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    resolveThunk(consultation, builder).onFulfilled().onPending().onRejected()
    resolveThunk(getConsultationText, builder)
      .onFulfilled((state, { payload }) => {
        state.text = payload
      })
      .onPending()
      .onRejected()
    resolveThunk(updateConsultationText, builder)
      .onFulfilled((state, { payload }) => {
        state.text = payload
      })
      .onPending()
      .onRejected()
  },
})

export const goThereReducer = goThereSlice.reducer
