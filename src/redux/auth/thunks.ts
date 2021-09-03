import { createAsyncThunk } from '@reduxjs/toolkit'

import { TAdminCredentials } from '../../pages/LoginPage/types'
import { instance } from '../../helpers'

export const adminAuthorization = createAsyncThunk('admin/login', async (credentials: TAdminCredentials) => {
  const res = await instance.post('/auth/login', credentials)
  if (res.data.accessToken) {
    localStorage.setItem('token', res.data.accessToken)
  }
  return res
})
