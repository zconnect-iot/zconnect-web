import React from 'react'
import { withRouter } from 'react-router'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import { selectUserLoggedIn } from 'zc-core/auth/selectors'

import App from '../App'


function AppRouter({ authenticated, location }) {
  if (authenticated) return <App />
  return (
    <Redirect
      to={{
        pathname: '/login',
        state: { from: location },
      }}
    />
  )
}

const mapStateToProps = state => ({
  authenticated: selectUserLoggedIn(state),
})

export default withRouter(connect(
  mapStateToProps,
)(AppRouter))
