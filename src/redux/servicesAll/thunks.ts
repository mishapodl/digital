import { createAsyncThunk } from '@reduxjs/toolkit'

import { TResAllServices } from './types'

import { instance } from '../../helpers'
import { TServicesFields } from '../../pages/admin/ServicesListPage/types'

export const getServicesAll = createAsyncThunk(
  'service/all/get',
  async (): Promise<TResAllServices> => {
    const { data } = await instance.get<TResAllServices>('/page/services/all')
    return data
  }
)

export const updateServicesAll = createAsyncThunk(
  'service/all/update',
  async ({ services, title }: TServicesFields): Promise<TResAllServices> => {
    const { data } = await instance.put<TResAllServices>('/page/services/all', { services, title })
    return data
  }
)
