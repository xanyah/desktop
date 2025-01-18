import React, {useEffect} from 'react'
import {
  BrowserRouter,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom'
import { Provider } from 'react-redux'
import {
  loadTranslations,
  setLocale,
  syncTranslationWithStore,
} from 'react-redux-i18n'

// import { ipcRenderer } from 'electron'

import history from './history'
import store from './store'

import translations from './i18n'

import { initialSync, validateToken } from './actions'

import { routes } from './constants'

import './app.scss'

const App = () => {
  useEffect(() => {
    syncTranslationWithStore(store)
    store.dispatch(loadTranslations(translations))
    // store.dispatch(setLocale(ipcRenderer.sendSync('get-locale')))
    store.dispatch(validateToken(
      () => {
        store.dispatch(initialSync())
        if (window.location.pathname !== '/home') {
          window.location = '/home'
        }
      },
      () => {
        if (window.location.pathname !== '/sign-in') {
          window.location = '/sign-in'
        }
      }
    ))
  }, [])

  console.log(routes
    .filter(route => route.inRouter))

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {routes
            .filter(route => route.inRouter)
            .map(route =>
              <Route
                element={route.element}
                key={route.path}
                exact={route.exact}
                path={route.path}
                strict={route.strict}
              />)}
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

export default App
