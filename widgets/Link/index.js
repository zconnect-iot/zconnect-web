import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'

import { withPageContext } from '../../hocs'

import './style.scss'

const classes = new BEMHelper('Link')

/*
  Returns anchor tag that navigates to props.route if provided or invokes
  props.action if not. Similar to <Button/>.

  Default export wraps SimpleLink with getPageContext to provide the navigate
  functionality. This means SimpleLink can only be used to call the action prop.
*/

export class SimpleLink extends React.Component {
  onClick = (e) => {
    e.preventDefault()
    const { route, action } = this.props
    return route ? this.props.navigate(route) : action()
  }
  render() {
    const { className, children, route } = this.props
    return (
      <a
        href={route}
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
}

const noop = () => null

SimpleLink.defaultProps = {
  className: '',
  children: null,
  action: noop,
  route: '',
  navigate: noop,
}

export default withPageContext()(SimpleLink)
