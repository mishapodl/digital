import { createAction } from '@reduxjs/toolkit'

export const addNewService = createAction('services/new/local')
export const delService = createAction<number>('services/del/local')
