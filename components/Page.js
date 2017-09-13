import React from 'react'
import PropTypes from 'react-proptypes'
import { Grid } from 'react-flexbox-grid'

import Navbar from 'containers/Navbar'
import { Header } from 'components'

import './style.scss'

export default function Page({ children, navItems }) {
  return (
    <Grid fluid className="Page">
      <Header />
      <Navbar items={navItems} />
      {children}
    </Grid>
  )
}

Page.propTypes = {
  navItems: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
    action: PropTypes.func,
  })).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

Page.defaultProps = {
  subtitle: '',
}
