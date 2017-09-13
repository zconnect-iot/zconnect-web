import React from 'react'
import { Grid } from 'react-flexbox-grid'

import Navbar from 'containers/Navbar'
import { Header } from 'components'

import './style.scss'

export default function ({ children, navItems }) {
  return (
    <Grid fluid className="Page">
      <Header />
      <Navbar items={navItems} />
      {children}
    </Grid>
  )
}
