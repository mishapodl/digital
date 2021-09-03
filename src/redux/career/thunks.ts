import { createAsyncThunk } from '@reduxjs/toolkit'

import { TDataCareerText } from './types'

import { TDataCareer } from '../../pages/CareerPage/types'
import { instance, getPhone } from '../../helpers'

export const sendCV = createAsyncThunk('career/join', async (_data: TDataCareer) => {
  const formData = new FormData()
  formData.append('file', _data.files[0])
  formData.append('name', _data.name)
  formData.append('phone', getPhone(_data.phone) as string)

  const { status } = await instance.post('career', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

  return status
})

export const getText = createAsyncThunk('career/text/get', async () => {
  const { data } = await instance.get('/page/career')
  return data.languages
})

export const updateText = createAsyncThunk('career/text/update', async (_data: TDataCareerText) => {
  await instance.put('/page/career', _data)
  return _data
})
