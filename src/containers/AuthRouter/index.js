import React from 'react'
import { withRouter } from 'react-router'
import { Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { selectUserLoggedIn } from 'zc-core/auth/selectors'

import { Register, Forgotten, Login } from 'containers/auth'


function AuthRouter({ authenticated }) {
  if (authenticated) return (
    <Redirect to="/" />
  )
  return (
    <div>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={Register} />
      <Route path="/forgotten" component={Forgotten} />
    </div>
  )
}

const mapStateToProps = state => ({
  authenticated: selectUserLoggedIn(state),
})

export default withRouter(connect(
  mapStateToProps,
)(AuthRouter))
