import { createAsyncThunk } from '@reduxjs/toolkit'

import { instance } from '../../helpers'
import { toFormData } from '../../helpers/dal'
import { FooterFields, TFooterFields } from '../../pages/admin/Footer/constants'

export const footerInfoRequest = createAsyncThunk('footer/getFooterInfo', async () => {
  const { data } = await instance.get('/page/contacts')
  const policy = await instance.get('/policy')
  return { data, policy }
})

export const updateFooterInfo = createAsyncThunk(
  'footer/putFooterInfo',
  async ({ _data, imgLink, filePolicy }: { _data: TFooterFields; imgLink: string; filePolicy: string }) => {
    let policy = filePolicy
    const title = _data[FooterFields.files][0]
    const formDataPP = new FormData()
    _data[FooterFields.files] = _data[FooterFields.files][0] && _data[FooterFields.files][0]

    if (_data[FooterFields.files]) {
      const titleFile = JSON.stringify({
        UA: { title },
        RU: { title },
        EN: { title: title.name },
      })
      formDataPP.append('policy', _data[FooterFields.files])
      formDataPP.append('languages', titleFile)
      policy = await instance.post('/policy', formDataPP)
    }

    delete _data[FooterFields.files]
    _data[FooterFields.image] = _data[FooterFields.image][0] ? _data[FooterFields.image][0] : imgLink
    const formData = toFormData(_data, ['languages'])
    const { data } = await instance.put('/page/contacts', formData)
    return { data, policy, title }
  }
)
