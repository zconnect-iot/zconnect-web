import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import AuthRouter from '../AuthRouter'
import AppRouter from '../AppRouter'

import { optimisticLogin } from './actions'

import '../../style/demo.scss'

class Root extends React.Component {
  componentWillMount() {
    this.props.optimisticLogin()
  }
  render() {
    return (<div>
      <Switch>
        <Route path="/login" component={AuthRouter} />
        <Route path="/signup" component={AuthRouter} />
        <Route path="/forgotten" component={AuthRouter} />
        <Route component={AppRouter} />
      </Switch>
    </div>)
  }
}

const mapDispatchToProps = dispatch => ({
  optimisticLogin: () => dispatch(optimisticLogin()),
})

export default withRouter(connect(
  null,
  mapDispatchToProps,
)(Root))
