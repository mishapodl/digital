import { createAsyncThunk } from '@reduxjs/toolkit'

import { instance } from '../../helpers'
import { toFormData } from '../../helpers/dal'
import { ServicesFields, TServicesFields } from '../../pages/admin/ServicesButtonPage/constants'

export const getServices = createAsyncThunk('servicesButton/getServices', async () => {
  const { data } = await instance.get('/page/services/button')
  return data
})

export const updateServices = createAsyncThunk(
  'servicesButton/updateServices',
  async ({ _data, pictureLink }: { _data: TServicesFields; pictureLink: string }) => {
    _data[ServicesFields.image] = _data[ServicesFields.image][0] ? _data[ServicesFields.image][0] : pictureLink
    const formData = toFormData(_data, ['languages'])
    const { data } = await instance.put('/page/services/button', formData)
    return data
  }
)
