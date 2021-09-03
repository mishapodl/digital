import { createSlice } from '@reduxjs/toolkit'

import { adminAuthorization } from './thunks'

import { resolveThunk, FetchThunkState } from '../../helpers'

const token = localStorage.getItem('token')

const initialState = {
  ...FetchThunkState,
  admin: token
    ? {
        token,
        isLogedIn: true,
      }
    : {
        token: null,
        isLogedIn: false,
      },
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout() {
      localStorage.removeItem('token')
    },
  },
  extraReducers: (builder) => {
    resolveThunk(adminAuthorization, builder)
      .onPending()
      .onFulfilled((state, action) => {
        state.admin.token = action.payload.data.accessToken
        state.admin.isLogedIn = true
      })
      .onRejected((state) => {
        state.admin.token = null
        state.admin.isLogedIn = false
      })
  },
})

export const { logout } = authSlice.actions
export const authReducer = authSlice.reducer
