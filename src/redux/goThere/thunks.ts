import { createAsyncThunk } from '@reduxjs/toolkit'

import { TDataCareerText } from './../career/types'

import { TDataGoThere } from '../../pages/GoTherePage/types'
import { instance, getPhone } from '../../helpers'

export const consultation = createAsyncThunk('goThere/consultation', async (data: TDataGoThere) => {
  if (!data.email) delete data.email // in terms of API
  data.phone = getPhone(data.phone) as string
  const { status } = await instance.post('consultation', data)
  return status
})

export const getConsultationText = createAsyncThunk('/consultation/text/get', async () => {
  const { data } = await instance.get('/page/consult')
  return data.languages
})

export const updateConsultationText = createAsyncThunk('career/text/update', async (_data: TDataCareerText) => {
  await instance.put('/page/consult', _data)
  return _data
})
