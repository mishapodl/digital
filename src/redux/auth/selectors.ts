import { AppStateType } from '../store'

export const getLogedIn = (state: AppStateType) => state.auth.admin
