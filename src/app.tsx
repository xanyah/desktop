import React, {useEffect} from 'react'
import { Provider } from 'react-redux'
import {
  loadTranslations,
  syncTranslationWithStore,
} from 'react-redux-i18n'
import './index.css'

// import { ipcRenderer } from 'electron'

import store from './store'

import translations from './i18n'

import { initialSync, validateToken } from './actions'

import { queryClient, routes } from './constants'

import './app.scss'
import { QueryClientProvider } from '@tanstack/react-query'
import Router from './routes'

const App = () => {
  useEffect(() => {
    syncTranslationWithStore(store)
    store.dispatch(loadTranslations(translations))
    // store.dispatch(setLocale(ipcRenderer.sendSync('get-locale')))
    store.dispatch(validateToken(
      () => {
        store.dispatch(initialSync())
        if (window.location.pathname === '/sign-in') {
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
        <Router />
      </Provider>
    </QueryClientProvider>
  )
}

export default App
