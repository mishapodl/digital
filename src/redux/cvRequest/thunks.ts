import { createAsyncThunk } from '@reduxjs/toolkit'

import { TRequest } from './types'

import { instance } from '../../helpers'
import { TRequestsFields } from '../../pages/admin/RequestsPage/types'

export const getCV = createAsyncThunk('cvRequest/getCV', async () => {
  const { data } = await instance.get<TRequest>('/career')
  return data
})

export const getCVLinks = createAsyncThunk('cvRequest/getCVLinks', async () => {
  const { data } = await instance.get<TRequestsFields>('/career/links')
  return data
})

export const postCVLinks = createAsyncThunk('cvRequest/postCVLinks', async (_data: TRequestsFields) => {
  await instance.post<TRequestsFields>('/career/links', _data)
  return _data
})
