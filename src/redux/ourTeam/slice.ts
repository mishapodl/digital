import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import { NEW_MEMBER, NEW_MEMBER_ID } from './../../pages/admin/OurTeamPage/constants'
import { changeOrder, deleteMember, deleteNewMember, newMember } from './actions'
import { teamGET, teamCreate, teamPATCH, teamDELETE, teamUpdate } from './thunks'
import { TTeamMember } from './types'

import { resolveThunk, FetchThunkState } from '../../helpers'

export const ourTeamAdapter = createEntityAdapter()

const teamAdapter = createEntityAdapter<TTeamMember>({
  selectId: (member) => member._id,
  sortComparer: (l, r) => l.order - r.order,
})
const teamState = teamAdapter.getInitialState(FetchThunkState)

const goThereSlice = createSlice({
  name: 'ourTeam',
  initialState: teamState,
  reducers: {},
  extraReducers: (builder) => {
    resolveThunk(teamUpdate, builder)
      .onPending()
      .onRejected()
      .onFulfilled((s, { payload }) => {
        teamAdapter.updateOne(s, { id: payload._id, changes: { ...payload, img: payload.picture } })
      })
    builder.addCase(newMember, (state) => {
      teamAdapter.setAll(state, [NEW_MEMBER, ...teamSelector.selectAll(state)])
    })
    builder.addCase(changeOrder, (state, { payload }) => {
      const { step, ind } = payload
      if ((ind != 0 || step > 0) && (ind != state.ids!.length - 1 || step < 0)) {
        const [curId, nextId] = [state.ids[ind], state.ids[ind + step]]
        teamAdapter.updateOne(state, { id: curId, changes: { order: state.entities[nextId]!.order } })
        teamAdapter.updateOne(state, { id: nextId, changes: { order: state.entities[curId]!.order - step } })
      }
    })
    builder.addCase(deleteMember, (state, { payload }) => {
      teamAdapter.removeOne(state, payload)
    })
    builder.addCase(deleteNewMember, (state) => {
      teamAdapter.removeOne(state, NEW_MEMBER_ID)
    })
    resolveThunk(teamGET, builder)
      .onPending()
      .onRejected()
      .onFulfilled((state, { payload }) => {
        teamAdapter.setAll(state, payload)
      })
    resolveThunk(teamCreate, builder)
      .onPending()
      .onRejected()
      .onFulfilled((s, { payload }) => {
        teamAdapter.removeOne(s, NEW_MEMBER_ID)
        teamAdapter.addOne(s, { ...payload.member, order: 0 })
        Object.values(s.entities).forEach((member) => member!.order++)
      })

    resolveThunk(teamPATCH, builder).onPending().onRejected().onFulfilled()
    resolveThunk(teamDELETE, builder).onPending().onRejected().onFulfilled()
  },
})

export const ourTeamReducer = goThereSlice.reducer
export const teamSelector = teamAdapter.getSelectors()
