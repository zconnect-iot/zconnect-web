import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'

import Settings from '../Settings'

export default function App(props) {
  return (
    <div>
      <h3>App</h3>
      <nav>
        <Link to="/settings">Settings</Link>
      </nav>
      <Switch>
        <Route path="/settings" component={Settings} />
      </Switch>
    </div>
  )
}
