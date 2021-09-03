import { createAction } from '@reduxjs/toolkit'

import { TCases } from './types'

export const setTeam = createAction<TCases>('case/set')
export const changeOrder = createAction<{ step: number; ind: number }>('case/order')
export const newCase = createAction('case/new')
export const addCase = createAction<{ ind: number; case: TCases[number] }>('case/add')
export const deleteCase = createAction<number>('case/delete')
export const moveUpCase = createAction('case/order/up')
export const moveDownCase = createAction('case/order/down')

export const addServiceToCase = createAction<{ ind: number }>('case/addService')
export const removeServiceFromCase = createAction<any>('case/removeService')
