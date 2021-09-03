import React, { FC } from 'react'
import { Route, Switch } from 'react-router-dom'

import { RoutesConfig } from './routeConfig'
import { AdminRoutes as Admin } from './adminRoutes'

import MainPage from '../pages/MainPage'
import AboutUsPage from '../pages/AboutUsPage'
import CareerPage from '../pages/CareerPage'
import CasesPage from '../pages/CasesPage'
import GoTherePage from '../pages/GoTherePage'
import OurTeamPage from '../pages/OurTeamPage'
import ServicesPage from '../pages/ServicesPage'
import NotFoundPage from '../pages/NotFoundPage'
import * as AdminPanel from '../pages/admin'
import LoginPage from '../pages/LoginPage'

export const AdminRoutes: FC = () => {
  return (
    <Switch>
      <Route exact path={Admin.MainPage} component={AdminPanel.MainPage} />
      <Route exact path={Admin.AboutUsPage} component={AdminPanel.AboutUsPage} />
      <Route exact path={Admin.OurTeamPage} component={AdminPanel.OurTeamPage} />
      <Route exact path={Admin.CasesPage} component={AdminPanel.CasesPage} />
      <Route exact path={Admin.ServicesPage} component={AdminPanel.ServicesPage} />
      <Route exact path={Admin.ServicePackages} component={AdminPanel.ServicePackages} />
      <Route exact path={Admin.ServicesButtonPage} component={AdminPanel.ServicesButtonPage} />
      <Route exact path={Admin.ServicesListPage} component={AdminPanel.ServicesListPage} />
      <Route exact path={Admin.CareerPage} component={AdminPanel.CareerPage} />
      <Route exact path={Admin.GoTherePage} component={AdminPanel.GoTherePage} />
      <Route exact path={Admin.Footer} component={AdminPanel.Footer} />
      <Route exact path={Admin.SocialNetworks} component={AdminPanel.SocialNetworksPage} />
      <Route exact path={Admin.CVRequests} component={AdminPanel.CVRequestsPage} />
      <Route exact path={Admin.ConsultationRequests} component={AdminPanel.ConsultationRequestsPage} />
    </Switch>
  )
}

export const Routes: FC = () => {
  return (
    <Switch>
      <Route exact path={RoutesConfig.MainPage} component={MainPage} />
      <Route exact path={RoutesConfig.AboutUsPage} component={AboutUsPage} />
      <Route exact path={RoutesConfig.CareerPage} component={CareerPage} />
      <Route exact path={RoutesConfig.CasesPage} component={CasesPage} />
      <Route exact path={RoutesConfig.GoTherePage} component={GoTherePage} />
      <Route exact path={RoutesConfig.OurTeamPage} component={OurTeamPage} />
      <Route exact path={RoutesConfig.ServicesPage} component={ServicesPage} />

      <Route exact path={Admin.LoginPage} component={LoginPage} />
      <Route component={NotFoundPage} />
    </Switch>
  )
}
