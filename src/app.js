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

import { ipcRenderer } from 'electron'

import history from './history'
import store from './store'

import translations from './i18n'

import { initialSync, validateToken } from './actions'

import { routes } from './constants'

import './app.scss'

import './libs/iconic-font/css/iconmonstr-iconic-font.css'

class App extends React.Component {
  componentWillMount() {
    syncTranslationWithStore(store)
    store.dispatch(loadTranslations(translations))
    store.dispatch(setLocale(ipcRenderer.sendSync('get-locale')))
    store.dispatch(validateToken(
      () => {
        store.dispatch(initialSync())
        store.dispatch(push('/home'))
      },
      () => store.dispatch(push('/sign-in'))
    ))
  }

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            {routes
              .filter(route => route.inRouter)
              .map(route =>
                <Route
                  component={route.component}
                  key={route.path}
                  exact={route.exact}
                  path={route.path}
                  strict={route.strict}
                />)}
          </Switch>
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App
