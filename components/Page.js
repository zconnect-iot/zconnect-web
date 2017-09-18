import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'react-flexbox-grid'

import Navbar from '../containers/Navbar'
import Header from './Header'

import './style.scss'

/*
  To allow the <Navbar /> to be used with any routing tech (or none at all), <Page/>
  needs the navItems, activeRoute and navigate function to pass down to the buttons
*/

export default function Page({ children, navItems, activeRoute, navigate }) {
  return (
    <Grid fluid className="Page">
      <Header />
      <Navbar items={navItems} activeRoute={activeRoute} navigate={navigate} />
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
  activeRoute: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  navigate: PropTypes.func.isRequired,
}

Page.defaultProps = {
  subtitle: '',
}
