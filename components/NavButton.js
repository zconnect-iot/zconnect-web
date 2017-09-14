import React from 'react'
import PropTypes from 'react-proptypes'
import BEMHelper from 'react-bem-helper'

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
      <img src={icon} alt="Nav icon" />
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
