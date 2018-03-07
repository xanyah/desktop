import { combineReducers } from 'redux'
import { i18nReducer as i18n } from 'react-redux-i18n'
import { routerReducer as router } from 'react-router-redux'

import auth from './auth'
import global from './global'
import manufacturers from './manufacturers'
import providers from './providers'
import user from './user'

const rootReducer = combineReducers({
  auth,
  global,
  i18n,
  manufacturers,
  providers,
  router,
  user,
})

export default rootReducer
