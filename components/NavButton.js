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
export default function NavButton({ title, icon, navigate, action, route, active }) {
  const onClick = route ? navigate.bind(null, route) : action
  return (
    <button {...classes(null, active ? 'active' : null)} onClick={onClick}>
      <Icon name={icon} size={30} />
      <div>{title}</div>
    </button>
  )
}

NavButton.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  navigate: PropTypes.func,
  action: PropTypes.func,
  route: PropTypes.string,
  active: PropTypes.bool.isRequired,
}

NavButton.defaultProps = {
  navigate: null,
  action: null,
  route: null,
}
