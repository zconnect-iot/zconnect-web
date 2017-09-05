import React from 'react'
import { Link, Route, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { selectUserLoggedIn } from 'zc-core/auth/selectors'

const Dashboard = () => (
  <h2>Dashboard</h2>
)

function App({ authenticated }) {
  if (authenticated) return (<div>
    <h3>App</h3>
    <nav>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
    <Route path="/dashboard" component={Dashboard} />
  </div>)
  return (
    <Redirect
      to={{
        pathname: '/login',
        state: { from: props.location }
      }}
    />
  )
}

const mapStateToProps = state => ({
  authenticated: selectUserLoggedIn(state),
})

export default connect(mapStateToProps)(App)
