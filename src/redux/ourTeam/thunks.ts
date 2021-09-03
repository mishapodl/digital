import { createAsyncThunk } from '@reduxjs/toolkit'

import { NEW_MEMBER_ID } from './../../pages/admin/OurTeamPage/constants'
import { TOurTeamData } from './../../pages/admin/OurTeamPage/types'
import { adaptTeam, adaptToTeamCreate, adaptToTeamUpdate } from './../../helpers/dal'
import { TResTeam, TResTeamMember, TTeam, TTeamMember } from './types'

import { instance } from '../../helpers'

export const teamGET = createAsyncThunk(
  'ourTeam/list',
  async (): Promise<TTeam> => {
    const res = await instance.get<TResTeam>('/team')
    return adaptTeam([...res.data.sort((l, r) => l.order - r.order)])
  }
)

export const teamCreate = createAsyncThunk(
  'ourTeam/create',
  async ({ _data, team }: { _data: TOurTeamData; team: TTeamMember[] }) => {
    const fd = adaptToTeamCreate(_data)

    const { status, data } = await instance.post<TResTeamMember>('/team', fd)
    const res = await instance.patch<any>('/team/order', {
      orderedIds: team.map((member) => (member._id === NEW_MEMBER_ID ? data._id : member._id)),
    })

    return { status, member: data, res }
  }
)

export const teamUpdate = createAsyncThunk(
  'ourTeam/update',
  async ({ _data, team }: { _data: TOurTeamData; team: TTeamMember[] }) => {
    const fd = adaptToTeamUpdate(_data)
    const { data } = await instance.post<TResTeamMember>('/team', fd)

    await instance.patch<any>('/team/order', {
      orderedIds: team.map((member) => (member._id === NEW_MEMBER_ID ? data._id : member._id)),
    })

    // return _data
    return data
  }
)

export const teamPATCH = createAsyncThunk('ourTeam/order', async (data: string[]) => {
  const res = await instance.patch<any>('/team/order', {
    orderedIds: data,
  })
  return res.data
})

export const teamDELETE = createAsyncThunk('ourTeam/dalete', async (id: string) => {
  const res = await instance.delete<any>('/team/' + id)
  return res.status
})
