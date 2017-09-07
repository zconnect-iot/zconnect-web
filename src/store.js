import { createStore, applyMiddleware, compose as reduxCompose } from 'redux'
import { combineReducers } from 'redux-immutable'
import createHistory from 'history/createBrowserHistory'
import { routerMiddleware, routerReducer } from 'react-router-redux'
import createSagaMiddleware from 'redux-saga'

import reducers from './reducers'
import sagas from './sagas'

export const history = createHistory()

const compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || reduxCompose

const sagaMiddleware = createSagaMiddleware()

const middleware = [routerMiddleware(history), sagaMiddleware]

const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  compose(applyMiddleware(...middleware)),
)

sagas.map(sagaMiddleware.run)

export default store
