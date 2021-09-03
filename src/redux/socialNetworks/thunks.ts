import { createAsyncThunk } from '@reduxjs/toolkit'

// import { networkFormData } from './type'

import { instance } from '../../helpers'
import { TResMainPage } from '../mainPage/types'

export const socialNetworksRequest = createAsyncThunk('socialNetworks/getSocialNetworks', async () => {
  const { data } = await instance.get<TResMainPage>('/page/social')
  return data
})
//todo create type for data
export const updateSocialNetworks = createAsyncThunk('socialNetworks/putSocialNetworks', async (_data: FormData) => {
  const { data } = await instance.put('/page/social', _data)
  return data
})
