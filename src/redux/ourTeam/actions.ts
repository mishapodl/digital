import { createAction } from '@reduxjs/toolkit'

import { TTeam } from './types'

export const setTeam = createAction<TTeam>('team/set')
export const changeOrder = createAction<{ step: number; ind: number }>('team/order')
export const newMember = createAction('member/new')
export const deleteNewMember = createAction('delete/member/new')
export const addMember = createAction<{ ind: number; member: TTeam[number] }>('member/add')
export const deleteMember = createAction<string>('member/delete')
export const moveUpMember = createAction('member/order/up')
export const moveDownMember = createAction('member/order/down')
