import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import AgroDashboardPage from '../components/AgroDashboardPage'
import MapPage from '../components/MapPage'
import NewsPage from '../components/NewsPage'
import AboutPage from '../components/AboutPage'
import NotFoundPage from '../components/NotFoundPage'
import Header from '../components/Header'
import Propaganda from '../components/Propaganda'

const AppRouter = () => (
  <BrowserRouter>
    <div className="main-container">
      <Header />
      <div className="information-container">
        <Propaganda />
        <Switch>
          <Route path="/" component={AgroDashboardPage} exact={true} />
          <Route path="/map" component={MapPage} />
          <Route path="/news" component={NewsPage} />
          <Route path="/about" component={AboutPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </div>
  </BrowserRouter>
);

export default AppRouter