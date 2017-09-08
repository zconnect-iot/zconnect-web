import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { logout } from 'zc-core/auth/actions'

import Buildings from '../../views/demo/Buildings/index'
import Settings from '../Settings'

class App extends React.Component {
  onLogout = () => this.props.logout()
  render() {
    return (
      <div>
        <h3>App</h3>
        <nav>
          <Link to="/settings">Settings</Link>
          <button onClick={this.onLogout}>Logout</button>
        </nav>

        <Buildings />

        <Switch>
          <Route path="/settings" component={Settings} />
        </Switch>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout()),
})

export default withRouter(connect(
  null,
  mapDispatchToProps,
)(App))
