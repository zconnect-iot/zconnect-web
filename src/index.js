import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import Auth from './containers/Auth'
import App from './containers/App'

import './initialiseCore'
import store, { history } from './store'


const Root = () => (
  <div>
    <Switch>
      <Route path="/login" component={Auth} />
      <Route component={App} />
    </Switch>
  </div>
)

// Render it to DOM
ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Root />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
)
