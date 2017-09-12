import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Page from 'components/Page'
import alarmSVG from 'icons/White/credit_card.svg'
import { Buildings } from '../../containers/demo/index'


export default function App() {
  return (
    <Page
      navItems={[
        { title: 'Buildings', icon: alarmSVG, route: '/buildings' },
        { title: 'Outlets', icon: 'someicon.png', route: '/outlets' },
        { title: 'Account', icon: 'someicon.png', route: '/account' },
      ]}
    >
      <Switch>
        <Route path="/buildings" component={Buildings} />
      </Switch>
    </Page>
  )
}
