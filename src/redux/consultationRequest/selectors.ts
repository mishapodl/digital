import { AppStateType } from '../store'

export const consultationsList = (state: AppStateType) => state.consultation.requests?.requests

export const getLinks = (state: AppStateType) => state.consultation.links

export const getIsFetching = (state: AppStateType) => state.consultation.isFetching
