import React from 'react'
import {
  Route,
  Switch,
} from 'react-router'
import { Provider } from 'react-redux'
import { ConnectedRouter, push } from 'react-router-redux'
import {
  loadTranslations,
  setLocale,
  syncTranslationWithStore,
} from 'react-redux-i18n'

import history from './history'
import store from './store'

import HomePage from './containers/home-page'
import SignIn from './containers/sign-in-page'

import translations from './i18n'

import { validateToken } from './utils/api-helper'

import './app.scss'

class App extends React.Component {
  componentWillMount() {
    syncTranslationWithStore(store)
    store.dispatch(loadTranslations(translations))
    store.dispatch(setLocale('en'))
    validateToken()
      .then(() => store.dispatch(push('/home')))
      .catch(() => store.dispatch(push('/sign-in')))
  }

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/sign-in" component={SignIn} />
            <Route path="/home" component={HomePage} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App
