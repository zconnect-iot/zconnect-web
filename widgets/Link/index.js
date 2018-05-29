import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'

import { withPageContext } from '../../hocs'

import './style.scss'

const classes = new BEMHelper('Link')

/*
  Provides 3 possible behaviours depending on props provided. In order of priority:

  1. href - Acts like native anchor tag and navigates browser to that url
  2. route - Calls the navigate function provided by Page context passing the route
  3. action - A callback function

  Default export wraps SimpleLink with getPageContext to provide the navigate
  functionality. This means SimpleLink can only be used to call the action prop or href
*/

export class SimpleLink extends React.Component {
  onClick = (e) => {
    const { route, action, href } = this.props
    if (href) return true // Use default behaviour
    e.preventDefault()
    return route ? this.props.navigate(route) : action()
  }
  render() {
    const { className, children, href, route } = this.props
    return (
      <a
        href={href || route || '#action'}
        onClick={this.onClick}
        {...classes(null, null, className)}
      >
        {children}
      </a>
    )
  }
}

SimpleLink.propTypes = {
  action: PropTypes.func,
  route: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  navigate: PropTypes.func,
  href: PropTypes.string,
}

const noop = () => null

SimpleLink.defaultProps = {
  className: '',
  children: null,
  action: noop,
  route: '',
  navigate: noop,
  href: '',
}

export default withPageContext()(SimpleLink)
