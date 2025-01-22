import React, {useEffect} from 'react'
import {
  BrowserRouter,
  Route,
  Routes,
} from 'react-router-dom'
import { Provider } from 'react-redux'
import {
  loadTranslations,
  syncTranslationWithStore,
} from 'react-redux-i18n'

// import { ipcRenderer } from 'electron'

import store from './store'

import translations from './i18n'

import { initialSync, validateToken } from './actions'

import { queryClient, routes } from './constants'

import './app.scss'
import { QueryClientProvider } from '@tanstack/react-query'

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

  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  )
}

export default App
