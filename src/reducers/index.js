import { combineReducers } from 'redux'
import { i18nReducer as i18n } from 'react-redux-i18n'
import { routerReducer as router } from 'react-router-redux'
import auth from './auth'

const rootReducer = combineReducers({
  auth,
  i18n,
  router,
})

export default rootReducer
