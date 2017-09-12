import React from 'react'
import BEMHelper from 'react-bem-helper'

const classes = new BEMHelper({
  name: 'NavButton',
})

export default function NavButton({ title, icon, navigate, action, route, active }) {
  const onClick = route ? navigate.bind(null, route) : action
  return (
    <button {...classes(null, active ? 'active' : null)} onClick={onClick}>
      <img src={icon} alt="Nav icon" />
      <div>{title}</div>
    </button>
  )
}
