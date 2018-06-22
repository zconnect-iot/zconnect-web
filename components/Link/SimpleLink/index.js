import React from 'react'
import { noop } from 'lodash'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'

import './style.scss'

const classes = new BEMHelper('Link')

// Simple Link is exported for rendering a Link outside of the <Page /> context
// provider e.g. in the auth components
export default class SimpleLink extends React.Component {
  onClick = (e) => {
    const { route, action, href } = this.props
    if (href) return true // Use default behaviour
    e.preventDefault()
    return route ? this.props.navigate(route) : action()
  }
  render() {
    const { className, children, href } = this.props
    return (
      <a
        href={href}
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

SimpleLink.defaultProps = {
  className: '',
  children: null,
  action: noop,
  route: '',
  navigate: noop,
  href: '',
}
