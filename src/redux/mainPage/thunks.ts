import { createAsyncThunk } from '@reduxjs/toolkit'

import { TResMainPage } from './types'

import { instance } from '../../helpers'
import { adaptResToMainText, adaptToMainText } from '../../helpers/dal'
import { TMainFields } from '../../pages/admin/MainPage/types'

export const getMainTexts = createAsyncThunk('main/getTexts', async () => {
  const { data } = await instance.get<TResMainPage>('page/main')
  return adaptResToMainText(data)
})

export const putMainTexts = createAsyncThunk('main/putTexts', async (_data: TMainFields) => {
  const { data } = await instance.put('/page/main', adaptToMainText(_data))
  return adaptResToMainText(data)
})
