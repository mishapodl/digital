import { teamSelector } from './slice'
import { AppStateType } from './../store'

export const selectOurTeam = (state: AppStateType) => ({
  isFetching: state.ourTeam.isFetching,
  error: state.ourTeam.error,
  team: teamSelector.selectAll(state.ourTeam),
})
