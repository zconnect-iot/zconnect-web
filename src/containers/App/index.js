import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Page from 'components/Page'
import buildingSVG from 'icons/White/Building.svg'
import faucetSVG from 'icons/White/faucet.svg'
import personSVG from 'icons/White/person.svg'
import {
  Buildings,
  Account,
} from '../../containers/demo/index'
import Settings from '../Settings'

import Widgets from '../../containers/Widgets'

export default function App() {
  return (
    <Page
      navItems={[
        { title: 'Widgets', icon: buildingSVG, route: '/widgets' },
        { title: 'Outlets', icon: faucetSVG, route: '/outlets' },
        { title: 'Account', icon: personSVG, route: '/account' },
      ]}
    >
      <Switch>
        <Route path="/widgets" component={Widgets} />
      </Switch>
    </Page>
  )
}
