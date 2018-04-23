import { combineReducers } from 'redux'
import { i18nReducer as i18n } from 'react-redux-i18n'
import { routerReducer as router } from 'react-router-redux'

import auth from './auth'
import categories from './categories'
import clients from './clients'
import customAttributes from './custom-attributes'
import global from './global'
import inventories from './inventories'
import manufacturers from './manufacturers'
import products from './products'
import providers from './providers'
import settings from './settings'
import stores from './stores'
import user from './user'

export default combineReducers({
  auth,
  categories,
  clients,
  customAttributes,
  global,
  i18n,
  inventories,
  manufacturers,
  products,
  providers,
  router,
  settings,
  stores,
  user,
})
