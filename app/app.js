import React from 'react'
import { Switch, Route } from 'react-router'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { configureStore, history } from './store/configureStore'

import './app.global.scss'


import HomePage from './containers/home-page'
import SignIn from './containers/sign-in-page'

const store = configureStore()

export default class App extends React.Component {
  render() {
    return (
      <AppContainer>
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <div>
              <Switch>
              <Route path="/sign-in" component={SignIn} />
              <Route path="/" component={HomePage} />
              </Switch>
            </div>
          </ConnectedRouter>
        </Provider>
      </AppContainer>
    )
  }
}
