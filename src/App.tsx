import React, { FC } from 'react'
import { Redirect, Route, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Header from './components/Header'
import Footer from './components/Footer'
import { Routes } from './routes'
import { RoutesConfig } from './routes/routeConfig'
import { AdminRoutes as Admin } from './routes/adminRoutes'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import LoginPage from './pages/LoginPage'
import { getLogedIn } from './redux/auth/selectors'
import AdminPanel from './pages/AdminPanel'

const App: FC = () => {
  const location = useLocation()
  const { isLogedIn } = useSelector(getLogedIn)

  return (
    <ScrollToTop>
      {location.pathname.includes(Admin.LoginPage) ? (
        isLogedIn ? (
          <>
            {location.pathname === Admin.LoginPage && <Redirect to="/admin/main-page" />}
            <AdminPanel />
          </>
        ) : (
          <>
            <LoginPage />
            <Redirect to="/admin" />
          </>
        )
      ) : (
        <>
          <Route
            path={RoutesConfig.MainPage}
            render={(props) => {
              return props.location.pathname === RoutesConfig.MainPage ? null : (
                <Header fixed={true} onAnimate={false} />
              )
            }}
          />
          <Routes />
          <Route
            path={RoutesConfig.MainPage}
            render={(props) => props.location.pathname !== RoutesConfig.MainPage && <Footer />}
          />
        </>
      )}
    </ScrollToTop>
  )
}

export default App
