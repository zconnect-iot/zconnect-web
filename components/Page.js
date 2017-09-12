import React from 'react'
import { Grid } from 'react-flexbox-grid'

import Nav from 'containers/Nav'
import { Header } from 'components'

import './style.scss'

export default function ({ children, navItems }) {
  return (
    <Grid fluid className="Page">
      <Header />
      <Nav items={navItems} />
      {children}
    </Grid>
  )
}
