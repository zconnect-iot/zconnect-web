import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'

import { withPageContext } from '../../hocs'

import './style.scss'

const classes = new BEMHelper('Link')

/*
  Returns anchor tag that navigates to props.route if provided or invokes
  props.action if not. Similar to <Button/>.
*/

class Link extends React.Component {
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

Link.propTypes = {
  action: PropTypes.func,
  route: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  navigate: PropTypes.func.isRequired,
}

Link.defaultProps = {
  className: '',
  children: null,
  action: () => {},
  route: '',
}

export default withPageContext()(Link)
