import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import history from '../history'
import reducers from '../reducers'

const router = routerMiddleware(history)

const configureStore = () => 
  createStore(
    reducers,
    {},
    compose(
      applyMiddleware(logger),
      applyMiddleware(router),
      applyMiddleware(thunk),
    )
  )

export default configureStore()
