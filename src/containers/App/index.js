import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Page from 'components/Page'
import buildingSVG from 'icons/White/Building.svg'
import faucetSVG from 'icons/White/faucet.svg'
import personSVG from 'icons/White/person.svg'

import { Buildings } from '../../containers/demo/index'


export default function App() {
  return (
    <Page
      navItems={[
        { title: 'Buildings', icon: buildingSVG, route: '/buildings' },
        { title: 'Outlets', icon: faucetSVG, route: '/outlets' },
        { title: 'Account', icon: personSVG, route: '/account' },
      ]}
    >
      <Switch>
        <Route path="/buildings" component={Buildings} />
      </Switch>
    </Page>
  )
}
