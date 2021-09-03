import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

import { NEW_CASE, NEW_CASE_ID } from './../../pages/admin/CasesPage/constants'
import { addCase, addServiceToCase, removeServiceFromCase, changeOrder, deleteCase, newCase } from './actions'
import { caseGET, caseCreate, caseUpdate, caseDELETE, casePATCH } from './thunks'
import { TCases } from './types'

import { resolveThunk, FetchThunkState } from '../../helpers'
import { AppStateType } from '../store'

export const casesAdapter = createEntityAdapter()

const initialState = { ...FetchThunkState, isNeedReFetch: false as boolean, cases: null as TCases | null }

const goThereSlice = createSlice({
  name: 'cases',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addServiceToCase, (state, { payload }) => {
      const caseLang: any = state.cases !== null && state.cases[payload.ind].languages
      ;['EN', 'RU', 'UA'].forEach((code) => {
        if (!caseLang[code].services) {
          caseLang[code].services = []
        }
        caseLang[code].services.push(' ')
      })
    })
    builder.addCase(removeServiceFromCase, (state, { payload }) => {
      const caseLang: any = state.cases !== null && state.cases[payload.indexCase].languages
      ;['EN', 'RU', 'UA'].forEach((code) => {
        caseLang[code].services = caseLang[code].services.map((s: any, ind: number) =>
          ind === payload.iService ? null : s
        )
      })
    })
    builder.addCase(newCase, (state) => {
      state.cases?.unshift(NEW_CASE)
    })
    builder.addCase(changeOrder, (state, { payload }) => {
      const { step, ind } = payload
      if ((ind != 0 || step > 0) && (ind != state.cases!.length - 1 || step < 0)) {
        const temp = state.cases![ind]
        state.cases![ind] = state.cases![ind + step]
        state.cases![ind + step] = temp
      }
    })
    builder.addCase(addCase, (state, { payload }) => {
      state.cases?.splice(payload.ind, 1, payload.case)
    })
    builder.addCase(deleteCase, (state, { payload }) => {
      state.cases?.splice(payload, 1)
    })
    resolveThunk(caseGET, builder)
      .onPending()
      .onRejected()
      .onFulfilled((state, { payload }) => {
        state.cases = payload
        state.isNeedReFetch = false
      })
    resolveThunk(caseCreate, builder)
      .onPending()
      .onRejected()
      .onFulfilled((s, { payload }) => {
        s.cases = s.cases!.map((el) => {
          if (el._id === NEW_CASE_ID) {
            return {
              ...payload.case.languages,
              picture: payload.case.picture,
              _id: payload.case._id,
            }
          }
          return el
        })
        s.isNeedReFetch = true
      })
    resolveThunk(caseUpdate, builder)
      .onPending()
      .onRejected()
      .onFulfilled((state, { payload }) => {
        state.cases =
          payload.cases?.map((c: TCases[number]) => {
            if (c._id === payload.case._id) return payload.case
            return c
          }) || []
        state.isNeedReFetch = true
      })
    resolveThunk(casePATCH, builder).onPending().onRejected().onFulfilled()
    resolveThunk(caseDELETE, builder).onPending().onRejected().onFulfilled()
  },
})

export const casesReducer = goThereSlice.reducer
export const selectCases = (state: AppStateType) => state.cases
