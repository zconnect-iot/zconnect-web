import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'

import './style.scss'

const classes = new BEMHelper('Link')

/*
  Returns anchor tag that navigates to props.route if provided or invokes
  props.action if not. Similar to <Button/>.
*/

export default class Link extends React.Component {
  navigate = () => this.context.navigate(this.props.route)
  action = (e) => {
    e.preventDefault()
    this.props.action()
  }
  render() {
    const { className, children, route } = this.props
    const onClick = route ? this.navigate : this.action
    return (
      <a
        href={route}
        onClick={onClick}
        {...classes(null, null, className)}
      >
        {children}
      </a>
    )
  }
}

Link.contextTypes = {
  navigate: PropTypes.func.isRequired,
}

Link.propTypes = {
  action: PropTypes.func,
  route: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
}

Link.defaultProps = {
  className: '',
  children: null,
  action: () => {},
  route: '',
}
