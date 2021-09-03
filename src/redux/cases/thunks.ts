import { createAsyncThunk } from '@reduxjs/toolkit'

// import { TCasesData } from './../../pages/admin/CasesPage/types'
import {
  adaptCase /* adaptToCaseCreate, */ /* adaptToCaseUpdate  */ /* , toLanguagesCases */,
} from './../../helpers/dal'
import { TResCases, TCases } from './types'

import { instance } from '../../helpers'
import { NEW_CASE_ID } from '../../pages/admin/CasesPage/constants'

function toAdaptCase(data: any) {
  data.languages = {
    EN: data.EN,
    RU: data.RU,
    UA: data.UA,
  }
  delete data.EN
  delete data.RU
  delete data.UA

  data.picture = data[data._id].picture[0]

  return data
}

export const caseGET = createAsyncThunk(
  'cases/list',
  async (): Promise<TCases> => {
    const res = await instance.get<TResCases>('/cases')
    return adaptCase(res.data.sort((l, r) => l.order - r.order))
  }
)

export const caseCreate = createAsyncThunk(
  'cases/create',
  async ({ _data, cases }: { _data: any; cases: TCases | null }) => {
    _data.languages = {
      EN: _data.EN,
      RU: _data.RU,
      UA: _data.UA,
    }
    delete _data.EN
    delete _data.RU
    delete _data.UA

    _data.picture = _data['picture'][0]

    const fd = new FormData()
    fd.append('languages', JSON.stringify(_data.languages))
    fd.append('picture', _data.picture)

    const { status, data } = await instance.post<{ upserted: { _id: number }[] }>('/cases', fd)
    await instance.patch<any>('/cases/order', {
      orderedIds: cases!.map((el) => (el._id === NEW_CASE_ID ? data.upserted[0]._id : el._id)),
    })
    _data._id = data.upserted[0]._id

    return { status, case: _data }
  }
)

export const caseUpdate = createAsyncThunk(
  'cases/update',
  async ({ data, cases }: { data: any; cases: TCases | null }) => {
    const d = toAdaptCase(data)
    if (!d.picture) d.img = cases!.filter((el) => el._id === d._id)[0].img

    const fd = new FormData()
    fd.append('languages', JSON.stringify(d.languages))
    fd.append('picture', d.picture ? d.picture : cases!.filter((el) => el._id === d._id)[0].img)
    fd.append('_id', d._id)

    const res = await instance.post<any>('/cases', fd)
    await instance.patch<any>('/cases/order', {
      orderedIds: cases!.map((el) => (el._id === NEW_CASE_ID ? res.data.upserted[0]._id : el._id)),
    })
    return { case: d, cases }
  }
)

export const casePATCH = createAsyncThunk('cases/order', async (data: any[]) => {
  const res = await instance.patch<any>('/cases/order', {
    orderedIds: data,
  })
  return res.data
})

export const caseDELETE = createAsyncThunk('cases/dalete', async (id: string) => {
  const res = await instance.delete<any>('/cases/' + id)
  return res.data
})
