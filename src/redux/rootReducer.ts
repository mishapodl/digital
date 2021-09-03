import { combineReducers } from '@reduxjs/toolkit'

import { servicesReducer } from './services/slice'
import { servicesButtonReducer } from './servicesButton/slice'
import { authReducer } from './auth/slice'
import { goThereReducer } from './goThere/slice'
import { careerReducer } from './career/slice'
import { ourTeamReducer } from './ourTeam/slice'
import { casesReducer } from './cases/slice'
import { aboutUsReducer } from './aboutUs/slice'
import { mainPageReducer } from './mainPage/slice'
import { footerReducer } from './footer/slice'
import { socialNetworkReducer } from './socialNetworks/slice'
import { consultationRequestReducer } from './consultationRequest/slice'
import { cvRequestReducer } from './cvRequest/slice'
import { servicesAllReducer } from './servicesAll/slice'

export const rootReducer = combineReducers({
  auth: authReducer,
  career: careerReducer,
  goThere: goThereReducer,
  ourTeam: ourTeamReducer,
  cases: casesReducer,
  aboutUs: aboutUsReducer,
  mainPage: mainPageReducer,
  footer: footerReducer,
  networks: socialNetworkReducer,
  consultation: consultationRequestReducer,
  cv: cvRequestReducer,
  network: socialNetworkReducer,
  services: servicesReducer,
  servicesAll: servicesAllReducer,
  servicesButton: servicesButtonReducer,
})
