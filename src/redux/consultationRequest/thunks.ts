import { createAsyncThunk } from '@reduxjs/toolkit'

import { TRequest } from './types'

import { instance } from '../../helpers'
import { TRequestsFields } from '../../pages/admin/RequestsPage/types'

export const getConsultations = createAsyncThunk('consultationRequest/getConsultations', async () => {
  const { data } = await instance.get<TRequest>('/consultation')
  return data
})

export const getConsultationLinks = createAsyncThunk('consultationRequest/getConsultationLinks', async () => {
  const { data } = await instance.get<TRequestsFields>('/consultation/links')
  return data
})

export const postConsultationLinks = createAsyncThunk(
  'consultationRequest/postConsultationLinks',
  async (_data: TRequestsFields) => {
    await instance.post<TRequestsFields>('/consultation/links', _data)
    return _data
  }
)
