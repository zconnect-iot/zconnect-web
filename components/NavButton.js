import React from 'react'
import PropTypes from 'prop-types'
import BEMHelper from 'react-bem-helper'

import Icon from './Icon'

const classes = new BEMHelper({
  name: 'NavButton',
})

/*
  If passed a route path clicking will call the navigate function passing the route.
  Otherwise it will simply call the action
*/

// eslint-disable-next-line react/prefer-stateless-function
export default class NavButton extends React.Component {
  navigate = () => this.context.navigate(this.props.route)
  render() {
    const { icon, title, action, route } = this.props
    const onClick = route ? this.navigate : action
    const active = this.context.location.pathname.indexOf(route) === 0
    return (
      <button {...classes(null, active ? 'active' : null)} onClick={onClick}>
        <Icon name={icon} size={30} />
        <div>{title}</div>
      </button>
    )
  }
}

NavButton.contextTypes = {
  navigate: PropTypes.func,
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
}

NavButton.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  action: PropTypes.func,
  route: PropTypes.string,
}

NavButton.defaultProps = {
  action: null,
  route: null,
}
