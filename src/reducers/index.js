import { combineReducers } from 'redux'
import { i18nReducer as i18n } from 'react-redux-i18n'
import { routerReducer as router } from 'react-router-redux'

import auth from './auth'
import global from './global'
import manufacturers from './manufacturers'
import providers from './providers'
import settings from './settings'
import stores from './stores'
import user from './user'

export default combineReducers({
  auth,
  global,
  i18n,
  manufacturers,
  providers,
  router,
  settings,
  stores,
  user,
})
