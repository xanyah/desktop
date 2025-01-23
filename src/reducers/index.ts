import { combineReducers } from 'redux'

import auth from './auth'
import categories from './categories'
import clients from './clients'
import customAttributes from './custom-attributes'
import global from './global'
import inventories from './inventories'
import manufacturers from './manufacturers'
import orders from './orders'
import products from './products'
import providers from './providers'
import sales from './sales'
import settings from './settings'
import shippings from './shippings'
import stores from './stores'
import user from './user'

export default combineReducers({
  auth,
  categories,
  clients,
  customAttributes,
  global,
  inventories,
  manufacturers,
  orders,
  products,
  providers,
  // router,
  sales,
  settings,
  shippings,
  stores,
  user,
})
