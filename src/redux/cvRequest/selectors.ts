import { AppStateType } from '../store'

export const cvList = (state: AppStateType) => state.cv.requests?.requests

export const getLinks = (state: AppStateType) => state.cv.links

export const getIsFetching = (state: AppStateType) => state.cv.isFetching
