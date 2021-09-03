import { createAsyncThunk } from '@reduxjs/toolkit'

import { instance } from '../../helpers'
import { TAboutUsFields } from '../../pages/admin/AboutUsPage/types'
import { adaptResToMainText, adaptToMainText } from '../../helpers/dal'
import { TResMainPage } from '../mainPage/types'

export const aboutUsInfoRequest = createAsyncThunk('aboutUs/getAboutUs', async () => {
  const { data } = await instance.get<TResMainPage>('/page/who')
  return adaptResToMainText(data)
})

export const updateAboutUsInfo = createAsyncThunk('aboutUs/putAboutUs', async (_data: TAboutUsFields) => {
  const { data } = await instance.put('/page/who', adaptToMainText(_data))
  return adaptResToMainText(data)
})
