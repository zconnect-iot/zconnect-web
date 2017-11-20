import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from 'react-flexbox-grid'

import Navbar from '../containers/Navbar'
import Header from './Header'

import './style.scss'

/*
  To allow the <Navbar /> to be used with any routing tech (or none at all), <Page/>
  needs the navItems, activeRoute and navigate function to pass down to the buttons
  If a NavBar component is passed it will render this instead of the built in NavBar
*/

export default class Page extends React.Component {
  getChildContext() {
    return {
      navigate: this.props.navigate,
      location: this.props.location,
    }
  }
  navToRoot = () => this.props.navigate('/')
  render() {
    const { children, navItems, headerRightContent } = this.props
    return (
      <Grid fluid className="Page">
        <Header rightContent={headerRightContent} navToRoot={this.navToRoot} />
        { this.props.NavBar ? <this.props.NavBar /> : <Navbar items={navItems} />}
        {children}
      </Grid>
    )
  }
}

Page.propTypes = {
  navItems: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    icon: PropTypes.string,
    action: PropTypes.func,
  })),
  NavBar: PropTypes.func,
  location: PropTypes.shape({
    hash: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
    search: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  navigate: PropTypes.func.isRequired,
  headerRightContent: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
}

Page.defaultProps = {
  subtitle: '',
  headerRightContent: null,
  NavBar: null,
  navItems: [],
}

Page.childContextTypes = {
  navigate: PropTypes.func,
  location: PropTypes.shape({
    hash: PropTypes.string,
    key: PropTypes.string,
    pathname: PropTypes.string,
    search: PropTypes.string,
  }),
}
